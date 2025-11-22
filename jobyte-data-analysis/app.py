# app.py
from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from dotenv import load_dotenv, dotenv_values
import pandas as pd

load_dotenv()

env = dotenv_values(".env")

POSTGRES_USER = env.get("POSTGRES_USER")
POSTGRES_PASSWORD = env.get("POSTGRES_PASSWORD")
POSTGRES_DB = env.get("POSTGRES_DB")
POSTGRES_HOST = env.get("POSTGRES_HOST", "localhost")
POSTGRES_PORT = env.get("POSTGRES_PORT", "5432")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)


# ============================================================
# MÉTRICAS GERAIS (SELEÇÃO POR EMPRESA)
# ============================================================
def get_last_n_days_counts(days: int, enterprise_id: str):
    days_window = max(days - 1, 0)

    sql = text("""
        WITH date_range AS (
            SELECT generate_series(
                (current_date - :days_window * INTERVAL '1 day')::date,
                current_date::date,
                INTERVAL '1 day'
            )::date AS day
        ),
        counts AS (
            SELECT date(sp.created_at) AS day, COUNT(*) AS qty
            FROM selection_processes sp
            INNER JOIN vacancies v ON v.id = sp.vacancy_id
            WHERE v.enterprise_id = :enterprise_id
            GROUP BY date(sp.created_at)
        )
        SELECT dr.day, COALESCE(c.qty, 0) AS qty
        FROM date_range dr
        LEFT JOIN counts c ON c.day = dr.day
        ORDER BY dr.day;
    """)

    rows = db.session.execute(sql, {
        "days_window": days_window,
        "enterprise_id": enterprise_id
    }).fetchall()

    # --- Pandas aplicado ---
    df = pd.DataFrame(rows, columns=["date", "quantity"])
    df["day"] = range(1, len(df) + 1)

    return df.to_dict(orient="records")


@app.route("/api/metrics/selection-processes/<string:enterprise_id>", methods=["GET"])
def selection_process_metrics(enterprise_id: str):
    days = int(request.args.get("days", 30))
    if days <= 0 or days > 30:
        abort(400, "invalid days")

    # 1 — Últimos dias (via Pandas)
    last_days = get_last_n_days_counts(days, enterprise_id)

    # 2 — Total de processos
    total_df = pd.read_sql(
        "SELECT * FROM selection_processes", db.engine
    )
    total = len(total_df)

    # 3 — Candidatos únicos
    total_candidates = total_df["candidate_id"].nunique()

    # 4 — Vagas únicas
    total_vacancies = total_df["vacancy_id"].nunique()

    # 5 — Média por vaga
    avg_per_vacancy = total / total_vacancies if total_vacancies > 0 else 0

    # 6 — Top 5 dias com mais candidaturas
    df_top = (
        total_df.assign(day=total_df["created_at"].dt.date)
        .groupby("day")
        .size()
        .reset_index(name="quantity")
        .sort_values("quantity", ascending=False)
        .head(5)
    )
    top_days = df_top.to_dict(orient="records")

    return jsonify({
        "last_n_days": last_days,
        "summary": {
            "total_selection_processes": int(total),
            "total_unique_candidates": int(total_candidates),
            "total_unique_vacancies": int(total_vacancies),
            "avg_per_vacancy": avg_per_vacancy,
        },
        "top_days": top_days
    })


# ============================================================
# MÉTRICAS POR VAGA ESPECÍFICA
# ============================================================
@app.route("/api/metrics/vacancy/<string:vacancy_id>", methods=["GET"])
def vacancy_metrics(vacancy_id: str):

    # Verifica se a vaga existe
    vacancy = db.session.execute(text("""
        SELECT id, title, status, created_at, updated_at 
        FROM vacancies 
        WHERE id = :vacancy_id
    """), {"vacancy_id": vacancy_id}).fetchone()

    if not vacancy:
        abort(404, "Vacancy not found")

    # Carrega todos os processos da vaga
    df = pd.read_sql(
        text("SELECT * FROM selection_processes WHERE vacancy_id = :vacancy_id"),
        db.engine,
        params={"vacancy_id": vacancy_id},
        parse_dates=["created_at"]
    )

    # Se não há processos, retorna métricas zeradas
    if df.empty:
        date_index = pd.date_range(
            end=pd.Timestamp.today().normalize(),
            periods=30,
            freq="D"
        )

        last_30_days = [
            {"date": d.date().isoformat(), "quantity": 0}
            for d in date_index
        ]

        return jsonify({
            "vacancy": {
                "id": str(vacancy.id),
                "title": vacancy.title,
                "status": vacancy.status,
                "created_at": vacancy.created_at.isoformat(),
                "updated_at": vacancy.updated_at.isoformat()
            },
            "metrics": {
                "total_applications": 0,
                "unique_candidates": 0,
                "applications_last_30_days": last_30_days,
                "first_application": None,
                "last_application": None,
                "peak_day": None,
                "avg_hours_between_applications": None
            }
        })

    # ---------------- MÉTRICAS ----------------

    total = int(len(df))
    unique_candidates = int(df["candidate_id"].nunique())

    # Últimos 30 dias
    df["day"] = df["created_at"].dt.date

    date_index = pd.date_range(
        end=pd.Timestamp.today().normalize(),
        periods=30,
        freq="D"
    ).date

    counts = df.groupby("day").size()
    counts = counts.reindex(date_index, fill_value=0)

    last_30_days = [
        {"date": d.isoformat(), "quantity": int(q)}
        for d, q in zip(date_index, counts.tolist())
    ]

    # Primeira e última candidatura
    first_app = df["created_at"].min()
    last_app = df["created_at"].max()

    first_app = first_app.isoformat() if pd.notnull(first_app) else None
    last_app = last_app.isoformat() if pd.notnull(last_app) else None

    # Pico
    peak = df.groupby("day").size().reset_index(name="quantity")
    if len(peak) > 0:
        peak = peak.sort_values("quantity", ascending=False).iloc[0]
        peak_day = {
            "date": peak["day"].isoformat(),
            "quantity": int(peak["quantity"])
        }
    else:
        peak_day = None

    # Intervalo médio entre candidaturas (horas)
    df_sorted = df.sort_values("created_at")
    df_sorted["prev"] = df_sorted["created_at"].shift(1)

    diffs = (
        (df_sorted["created_at"] - df_sorted["prev"])
        .dt.total_seconds() / 3600
    ).dropna()

    avg_interval = float(diffs.mean()) if len(diffs) > 0 else None

    # ---------------- RETORNO FINAL ----------------

    return jsonify({
        "vacancy": {
            "id": str(vacancy.id),
            "title": vacancy.title,
            "status": vacancy.status,
            "created_at": vacancy.created_at.isoformat(),
            "updated_at": vacancy.updated_at.isoformat()
        },
        "metrics": {
            "total_applications": total,
            "unique_candidates": unique_candidates,
            "applications_last_30_days": last_30_days,
            "first_application": first_app,
            "last_application": last_app,
            "peak_day": peak_day,
            "avg_hours_between_applications": avg_interval
        }
    })



# ============================================================
# MÉTRICAS DAS PERGUNTAS PRÉ-CANDIDATURA
# ============================================================
@app.route("/api/metrics/questions-before/<string:vacancy_id>", methods=["GET"])
def questions_before_metrics(vacancy_id: str):

    # Trazendo as respostas + nome da plataforma
    df = pd.read_sql(
        f"""
            SELECT qb.id,
                   qb.acquaintance_email,
                   qb.acquaintance_name,
                   qb.created_at,
                   qb.you_work_at_company,
                   qb.has_acquaintance_in_company,
                   qb.plataform_id,
                   p.name AS platform_name
            FROM questions_before qb
            LEFT JOIN platforms p ON p.id = qb.plataform_id
            WHERE qb.vacancy_id = '{vacancy_id}'
        """,
        db.engine
    )

    df_platforms = (
        df.groupby("platform_name")
        .size()
        .reset_index(name="quantity")
        .fillna({"platform_name": "Desconhecida"})
    )

    platforms_distribution = df_platforms.rename(
        columns={"platform_name": "platform"}
    ).to_dict(orient="records")

    total = len(df)

    percent_work = df["you_work_at_company"].mean() * 100 if total else 0

    percent_acquaintance = df["has_acquaintance_in_company"].mean() * 100 if total else 0

    df_names = df[df["acquaintance_name"].notna() & (df["acquaintance_name"] != "")]
    top_names = (
        df_names["acquaintance_name"]
        .value_counts()
        .head(5)
        .reset_index()
        .rename(columns={"index": "name", "acquaintance_name": "quantity"})
        .to_dict(orient="records")
    )

    return jsonify({
        "pie_chart": platforms_distribution,
        "summary": {
            "total_responses": total,
            "percent_work_at_company": percent_work,
            "percent_has_acquaintance": percent_acquaintance,
            "top_5_acquaintance_names": top_names
        }
    })

if __name__ == "__main__":
    app.run(port=5000, debug=True)
