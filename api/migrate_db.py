from sqlalchemy import create_engine

from models.article import Base as article
from models.tag import Base as tag
from models.user import Base as user
from models.comment import Base as comment
from models.like import Base as like
from models.review import Base as review
from models.advent_calendar import Base as advent_calendar
from models.advent_calendar_article import Base as advent_calendar_article

import os
from dotenv import load_dotenv

load_dotenv()

DB_USER = os.getenv("DB_USER")
DB_PASS = os.getenv("DB_PASS")
DB_HOST = os.getenv("DB_HOST")
DB_PORT = os.getenv("DB_PORT")
DB_NAME = os.getenv("DB_NAME")

DB_URL = f"mysql+mysqlconnector://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}?charset=utf8"
engine = create_engine(DB_URL, echo=True)


def reset_database():
    tag.metadata.drop_all(bind=engine)
    tag.metadata.create_all(bind=engine)
    user.metadata.drop_all(bind=engine)
    user.metadata.create_all(bind=engine)
    article.metadata.drop_all(bind=engine)
    article.metadata.create_all(bind=engine)
    comment.metadata.drop_all(bind=engine)
    comment.metadata.create_all(bind=engine)
    like.metadata.drop_all(bind=engine)
    like.metadata.create_all(bind=engine)
    review.metadata.drop_all(bind=engine)
    review.metadata.create_all(bind=engine)
    advent_calendar.metadata.drop_all(bind=engine)
    advent_calendar.metadata.create_all(bind=engine)
    advent_calendar_article.metadata.drop_all(bind=engine)
    advent_calendar_article.metadata.create_all(bind=engine)


if __name__ == "__main__":
    reset_database()
