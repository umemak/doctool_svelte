import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base


class AdventCalendarArticle(Base):
    __tablename__ = "advent_calendar_articles"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    advent_calendar_id = Column(UUIDType(binary=False), ForeignKey("advent_calendars.id"), nullable=False)
    advent_calendar = relationship("AdventCalendar", back_populates="advent_calendar_articles")
    day = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    author_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="advent_calendar_articles")
    article_id = Column(UUIDType(binary=False), ForeignKey("articles.id"), nullable=False)
    article = relationship("Article", back_populates="advent_calendar_articles")
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
