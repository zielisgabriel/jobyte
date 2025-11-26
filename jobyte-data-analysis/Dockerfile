FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    libpq-dev \
    gcc \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
COPY app.py .
RUN pip install -r requirements.txt
COPY gunicorn_config.py gunicorn_config.py

EXPOSE 5000

CMD [ "gunicorn", "-c", "gunicorn_config.py", "app:app" ]
