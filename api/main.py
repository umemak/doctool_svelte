from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware
from mangum import Mangum
from logging import getLogger, StreamHandler, DEBUG
import sys
from fastapi.routing import APIRoute
from typing import Callable

from routers.login import router as loginRouter
from routers.user import router as userRouter
from routers.article import router as articleRouter
from routers.review import router as reviewRouter
from routers.advent_calendar import router as adventCalendarRouter
from routers.advent_calendar_article import router as adventCalendarArticleRouter


logger = getLogger(__name__)
handler = StreamHandler(sys.stdout)
handler.setLevel(DEBUG)
logger.addHandler(handler)
logger.setLevel(DEBUG)


class LoggingContextRoute(APIRoute):
    def get_route_handler(self) -> Callable:
        original_route_handler = super().get_route_handler()

        async def custom_route_handler(request: Request) -> Response:
            """
            時間計測
            """
            before = time.time()
            response: Response = await original_route_handler(request)
            duration = round(time.time() - before, 4)

            record = {}
            time_local = datetime.datetime.fromtimestamp(before)
            record["time_local"] = time_local.strftime("%Y/%m/%d %H:%M:%S%Z")
            if await request.body():
                record["request_body"] = (await request.body()).decode("utf-8")
            record["request_headers"] = {k.decode("utf-8"): v.decode("utf-8") for (k, v) in request.headers.raw}
            record["remote_addr"] = request.client.host
            record["request_uri"] = request.url.path
            record["request_method"] = request.method
            record["request_time"] = str(duration)
            record["status"] = response.status_code
            record["response_body"] = response.body.decode("utf-8")
            record["response_headers"] = {k.decode("utf-8"): v.decode("utf-8") for (k, v) in response.headers.raw}
            logger.info(json.dumps(record))
            return response

        return custom_route_handler


_app = FastAPI()
_app.router.route_class = LoggingContextRoute
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
