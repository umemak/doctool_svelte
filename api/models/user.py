from sqlalchemy import Column, DateTime, String
from db import Base
from sqlalchemy_utils import UUIDType
import uuid
from datetime import datetime
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "users"
    # idカラムはデフォルトでguidになる
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    name = Column(String(255), nullable=False)
    token = Column(String(255), nullable=False)
    expired_at = Column(DateTime, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())
    deleted_at = Column(DateTime, nullable=True)
    articles = relationship("Article", back_populates="author")
    advent_calendar_articles = relationship("AdventCalendarArticle", back_populates="author")
    advent_calendars = relationship("AdventCalendar", back_populates="author")
    comments = relationship("Comment", back_populates="author")
    likes = relationship("Like", back_populates="author")
    reviews = relationship("Review", back_populates="author")
