from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from mangum import Mangum
from routers import login
from routers import user
from routers import article

_app = FastAPI()
_app.include_router(login.router)
_app.include_router(user.router)
_app.include_router(article.router)

app = CORSMiddleware(
    app=_app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app, lifespan="off")
