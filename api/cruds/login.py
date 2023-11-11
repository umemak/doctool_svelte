import schemas.login as login_schema
import requests, json
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from models.user import User


async def login(db: Session, request: login_schema.LoginRequest) -> login_schema.LoginResponse:
    load_dotenv()
    api_url = os.getenv("API_URL")
    api_key = os.getenv("API_KEY")
    url = api_url + "/login"
    headers = {'content-type': 'application/json'}
    payload  = {"email": request.email, "password": request.password, "app_key": api_key}
    r = requests.post(url, data=json.dumps(payload), headers=headers)
    print(r.status_code)
    print(r.text)
    rj = r.json()
    new_user = User(email=rj["email"], password=request.password, name=rj["name"])
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"access_token": rj["token"]}
