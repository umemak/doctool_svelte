from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from mangum import Mangum
from routers.login import router as loginRouter
from routers.user import router as userRouter
from routers.article import router as articleRouter
from routers.review import router as reviewRouter
from routers.advent_calendar import router as adventCalendarRouter
from routers.advent_calendar_article import router as adventCalendarArticleRouter

_app = FastAPI()
_app.include_router(loginRouter)
_app.include_router(userRouter)
_app.include_router(articleRouter)
_app.include_router(reviewRouter)
_app.include_router(adventCalendarRouter)
_app.include_router(adventCalendarArticleRouter)

app = CORSMiddleware(
    app=_app,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

handler = Mangum(app, lifespan="off")
