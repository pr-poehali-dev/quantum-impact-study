"""Приём заявок с формы обратной связи сайта Ритуал 13"""
import json
import os
from datetime import datetime


def handler(event: dict, context) -> dict:
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    if event.get("httpMethod") != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body") or "{}")
    name = body.get("name", "").strip()
    phone = body.get("phone", "").strip()
    message = body.get("message", "").strip()

    if not name or not phone:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя и телефон обязательны"})}

    import psycopg2
    conn = psycopg2.connect(os.environ["DATABASE_URL"])
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO contact_requests (name, phone, message, created_at) VALUES (%s, %s, %s, %s)",
        (name, phone, message, datetime.utcnow()),
    )
    conn.commit()
    cur.close()
    conn.close()

    return {
        "statusCode": 200,
        "headers": headers,
        "body": json.dumps({"ok": True}),
    }