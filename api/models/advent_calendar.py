import uuid
from datetime import datetime
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Table, Text
from sqlalchemy.orm import relationship
from sqlalchemy_utils import UUIDType
from db import Base
from sqlalchemy.ext.associationproxy import association_proxy


class AdventCalendar(Base):
    __tablename__ = "advent_calendars"

    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    year = Column(Integer, nullable=False)
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now)
    updated_at = Column(DateTime, nullable=False, default=datetime.now, onupdate=datetime.now)
    deleted_at = Column(DateTime, nullable=True)
    author_id = Column(UUIDType(binary=False), ForeignKey("users.id"), nullable=False)
    author = relationship("User", back_populates="advent_calendars")
    advent_calendar_articles = relationship("AdventCalendarArticle", back_populates="advent_calendar")
    articles = association_proxy("advent_calendar_articles", "article")
