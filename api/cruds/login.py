import schemas.login as login_schema
import requests, json
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from models.user import User
import jwt
import uuid
from datetime import datetime


async def login(db: Session, request: login_schema.LoginRequest) -> login_schema.LoginResponse:
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
    user = db.query(User).filter(User.email == request.email).first()
    # userが存在したら、更新する
    # userが存在して、apiでは存在しなかったら、削除する
    # userが存在しなかったら、新しく作成する
    if user:
        if r.status_code == 404:
            db.delete(user)
            db.commit()
            # 404を返す
            return {"error": "user not found"}
        user.token = rj["token"]
        user.expired_at = datetime.fromtimestamp(rj["expired_at"])
        db.commit()
        db.refresh(user)
    else:
        new_user = User(
            email=rj["email"], name=rj["name"], token=rj["token"], expired_at=datetime.fromtimestamp(rj["expired_at"])
        )
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        user = new_user
    # JWTを生成して返す
    data = {
        "jti": str(uuid.uuid4()),
        "iss": "doctool",
        "sub": "Access Token",
        "aud": ["doctool"],
        "exp": user.expired_at,
        # "nbf": datetime.now(),
        "iat": datetime.now(),
        "id": str(user.id),
        "email": user.email,
        "name": user.name,
    }
    token = jwt.encode(payload=data, key=os.getenv("JWT_SECRET"), algorithm="HS256")
    return {"access_token": token, "id": str(user.id), "name": user.name, "email": user.email}
