from fastapi import FastAPI, Request, HTTPException
import hmac
import hashlib
import os

app = FastAPI()

WEBHOOK_SECRET = os.environ.get("WEBHOOK_SECRET")

@app.post("/webhook")
async def github_webhook(request: Request):
    signature = request.headers.get("X-Hub-Signature-256")
    body = await request.body()

    # Handle missing signature header
    if not signature:
        raise HTTPException(status_code=401, detail="Missing signature header")

    expected = "sha256=" + hmac.new(
        WEBHOOK_SECRET.encode(),
        body,
        hashlib.sha256
    ).hexdigest()

    if not hmac.compare_digest(signature, expected):
        raise HTTPException(status_code=401, detail="Invalid signature")

    payload = await request.json()

    if payload.get("ref") != "refs/heads/main":
        return {"status": "ignored"}

    print("Main branch was updated!")

    return {"status": "ok"}
