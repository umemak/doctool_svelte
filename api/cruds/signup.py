import schemas.signup as signup_schema
import requests, json
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from models.user import User
import jwt
import uuid
from datetime import datetime


async def signup(db: Session, request: signup_schema.SignupRequest) -> signup_schema.SignupResponse:
    # ツールDBにuserが存在したら、エラー
    # ツールDBにuserが存在しなかったら、APIに問い合わせる
    # APIにuserが存在しなかったら、APIとツールDBに登録する
    # APIにuserが存在して、ツールDBに存在しなかったら、ツールDBに登録する
    user = db.query(User).filter(User.email == request.email).first()
    if user:
        return {"error": "user already exists"}
    load_dotenv()
    api_url = os.getenv("API_URL")
    api_key = os.getenv("API_KEY")
    url = api_url + "/login"
    headers = {"content-type": "application/json"}
    payload = {"email": request.email, "password": request.password, "app_key": api_key}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    print(r.status_code)
    print(r.text)
    rj = r.json()
    if r.status_code == 404:
        # APIにuserが存在しなかったら、APIとツールDBに登録する
        url = api_url + "/users"
        r = requests.post(url, data=json.dumps(payload), headers=headers)
        print(r.status_code)
        print(r.text)
        rj = r.json()
    new_user = User(
        email=rj["email"], name=rj["name"], token=rj["token"], expired_at=datetime.fromtimestamp(rj["expired_at"])
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    user = new_user
    return {"id": user.id, "name": user.name, "email": user.email}
