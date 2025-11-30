from sqlalchemy.orm import Session
from repositories import todo_repository
from schemas.todo_schemas import TodoCreate, TodoUpdate

def create_todo_service(db: Session, todo: TodoCreate):
    return todo_repository.create_todo(db, todo)

def get_todos_service(db: Session, skip: int = 0, limit: int = 100):
    return todo_repository.get_todos(db, skip, limit)

def get_todo_service(db: Session, todo_id: int):
    return todo_repository.get_todo(db, todo_id)

def update_todo_service(db: Session, todo_id: int, todo: TodoUpdate):
    return todo_repository.update_todo(db, todo_id, todo)

def delete_todo_service(db: Session, todo_id: int):
    return todo_repository.delete_todo(db, todo_id)
