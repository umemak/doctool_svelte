from sqlalchemy import Column, DateTime, String
from db import Base
from sqlalchemy_utils import UUIDType
import uuid
from datetime import datetime

class User(Base):
    __tablename__ = "users"
    # idカラムはデフォルトでguidになる
    id = Column(UUIDType(binary=False), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, nullable=False)
    password = Column(String(255), nullable=False)
    name = Column(String(255), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now())
    updated_at = Column(DateTime, nullable=False, default=datetime.now(), onupdate=datetime.now())
    deleted_at = Column(DateTime, nullable=True)

