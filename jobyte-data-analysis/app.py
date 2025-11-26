from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from dotenv import load_dotenv
import os
import pandas as pd

load_dotenv()

POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
POSTGRES_HOST = os.getenv("POSTGRES_HOST", "localhost")
POSTGRES_PORT = os.getenv("POSTGRES_PORT", "5432")

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)

def get_daily_selection_process_counts(days: int, enterprise_id: str):
    days_window = max(days - 1, 0)

    sql = text(
        """
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
        """
    )

    rows = db.session.execute(
        sql, {"days_window": days_window, "enterprise_id": enterprise_id}
    ).fetchall()

    df = pd.DataFrame(rows, columns=["date", "quantity"])
    df["day"] = range(1, len(df) + 1)
    return df.to_dict(orient="records")


@app.route("/api/metrics/selection-processes/<string:enterprise_id>", methods=["GET"])
def get_enterprise_selection_process_metrics(enterprise_id: str):
    days = int(request.args.get("days", 30))
    if days <= 0 or days > 30:
        abort(400, "invalid days")

    last_days = get_daily_selection_process_counts(days, enterprise_id)

    selection_df = pd.read_sql(
        "SELECT * FROM selection_processes", db.engine, parse_dates=["created_at"]
    )
    total_selection_processes = int(len(selection_df))
    total_unique_candidates = int(selection_df["candidate_id"].nunique()) if not selection_df.empty else 0
    total_unique_vacancies = int(selection_df["vacancy_id"].nunique()) if not selection_df.empty else 0
    avg_per_vacancy = total_selection_processes / total_unique_vacancies if total_unique_vacancies > 0 else 0

    top_days_df = (
        selection_df.assign(day=selection_df["created_at"].dt.date)
        .groupby("day")
        .size()
        .reset_index(name="quantity")
        .sort_values("quantity", ascending=False)
        .head(5)
    )
    top_days = top_days_df.to_dict(orient="records")

    return jsonify(
        {
            "last_n_days": last_days,
            "summary": {
                "total_selection_processes": total_selection_processes,
                "total_unique_candidates": total_unique_candidates,
                "total_unique_vacancies": total_unique_vacancies,
                "avg_per_vacancy": avg_per_vacancy,
            },
            "top_days": top_days,
        }
    )


# ============================================================
# MÉTRICAS POR VAGA ESPECÍFICA
# ============================================================
@app.route("/api/metrics/vacancy/<string:vacancy_id>", methods=["GET"])
def get_vacancy_metrics(vacancy_id: str):
    vacancy = db.session.execute(
        text(
            """
            SELECT id, title, status, created_at, updated_at 
            FROM vacancies 
            WHERE id = :vacancy_id
            """
        ),
        {"vacancy_id": vacancy_id},
    ).fetchone()

    if not vacancy:
        abort(404, "Vacancy not found")

    selection_df = pd.read_sql(
        text("SELECT * FROM selection_processes WHERE vacancy_id = :vacancy_id"),
        db.engine,
        params={"vacancy_id": vacancy_id},
        parse_dates=["created_at"],
    )

    if selection_df.empty:
        date_index = pd.date_range(
            end=pd.Timestamp.today().normalize(), periods=30, freq="D"
        )
        last_30_days = [{"date": d.date().isoformat(), "quantity": 0} for d in date_index]
        return jsonify(
            {
                "vacancy": {
                    "id": str(vacancy.id),
                    "title": vacancy.title,
                    "status": vacancy.status,
                    "created_at": vacancy.created_at.isoformat(),
                    "updated_at": vacancy.updated_at.isoformat(),
                },
                "metrics": {
                    "total_applications": 0,
                    "unique_candidates": 0,
                    "applications_last_30_days": last_30_days,
                    "first_application": None,
                    "last_application": None,
                    "peak_day": None,
                    "avg_hours_between_applications": None,
                },
            }
        )

    total_applications = int(len(selection_df))
    unique_candidates = int(selection_df["candidate_id"].nunique())

    selection_df["day"] = selection_df["created_at"].dt.date
    date_index = pd.date_range(
        end=pd.Timestamp.today().normalize(), periods=30, freq="D"
    ).date
    counts = selection_df.groupby("day").size().reindex(date_index, fill_value=0)
    last_30_days = [
        {"date": d.isoformat(), "quantity": int(q)} for d, q in zip(date_index, counts.tolist())
    ]

    first_application = selection_df["created_at"].min()
    last_application = selection_df["created_at"].max()
    first_application = first_application.isoformat() if pd.notnull(first_application) else None
    last_application = last_application.isoformat() if pd.notnull(last_application) else None

    peak_df = selection_df.groupby("day").size().reset_index(name="quantity")
    if len(peak_df) > 0:
        peak_row = peak_df.sort_values("quantity", ascending=False).iloc[0]
        peak_day = {"date": peak_row["day"].isoformat(), "quantity": int(peak_row["quantity"])}
    else:
        peak_day = None

    sorted_df = selection_df.sort_values("created_at")
    sorted_df["prev"] = sorted_df["created_at"].shift(1)
    diffs_hours = ((sorted_df["created_at"] - sorted_df["prev"]).dt.total_seconds() / 3600).dropna()
    avg_hours_between_applications = float(diffs_hours.mean()) if len(diffs_hours) > 0 else None

    return jsonify(
        {
            "vacancy": {
                "id": str(vacancy.id),
                "title": vacancy.title,
                "status": vacancy.status,
                "created_at": vacancy.created_at.isoformat(),
                "updated_at": vacancy.updated_at.isoformat(),
            },
            "metrics": {
                "total_applications": total_applications,
                "unique_candidates": unique_candidates,
                "applications_last_30_days": last_30_days,
                "first_application": first_application,
                "last_application": last_application,
                "peak_day": peak_day,
                "avg_hours_between_applications": avg_hours_between_applications,
            },
        }
    )



# ============================================================
# MÉTRICAS DAS PERGUNTAS PRÉ-CANDIDATURA
# ============================================================
@app.route("/api/metrics/questions-before/<string:vacancy_id>", methods=["GET"])
def get_questions_before_metrics(vacancy_id: str):
    data_df = pd.read_sql(
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
        db.engine,
    )

    platforms_df = (
        data_df.groupby("platform_name").size().reset_index(name="quantity").fillna({"platform_name": "Desconhecida"})
    )
    platforms_distribution = platforms_df.rename(columns={"platform_name": "platform"}).to_dict(orient="records")

    total_responses = len(data_df)
    percent_work_at_company = data_df["you_work_at_company"].mean() * 100 if total_responses else 0
    percent_has_acquaintance = data_df["has_acquaintance_in_company"].mean() * 100 if total_responses else 0

    names_df = data_df[data_df["acquaintance_name"].notna() & (data_df["acquaintance_name"] != "")]
    top_5_acquaintance_names = (
        names_df["acquaintance_name"].value_counts().head(5).reset_index().rename(columns={"index": "name", "acquaintance_name": "quantity"}).to_dict(orient="records")
    )

    return jsonify(
        {
            "pie_chart": platforms_distribution,
            "summary": {
                "total_responses": total_responses,
                "percent_work_at_company": percent_work_at_company,
                "percent_has_acquaintance": percent_has_acquaintance,
                "top_5_acquaintance_names": top_5_acquaintance_names,
            },
        }
    )

if __name__ == "__main__":
    app.run(port=5000, debug=True)
