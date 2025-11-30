from pydantic import BaseModel
from typing import Optional

class TodoBase(BaseModel):
    title: str
    description: Optional[str] = None
    completed: Optional[bool] = False

class TodoCreate(BaseModel):
    title: str
    description: str
    completed: bool = False


class TodoUpdate(TodoBase):
    pass

class TodoResponse(TodoBase):
    id: int

    class Config:
        orm_mode = True   # works with Pydantic v1
        from_attributes = True  # works with v2
