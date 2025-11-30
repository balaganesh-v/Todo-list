from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from services import todo_service
from database import get_db
from schemas.todo_schemas import TodoCreate, TodoUpdate, TodoResponse

router = APIRouter()

@router.post("/", response_model=TodoResponse)
def create_todo(todo: TodoCreate, db: Session = Depends(get_db)):
    try:
        return todo_service.create_todo_service(db, todo)
    except Exception as e:
        print("❌ Error in create_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=list[TodoResponse])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return todo_service.get_todos_service(db, skip, limit)
    except Exception as e:
        print("❌ Error in read_todos:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/{todo_id}", response_model=TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    try:
        db_todo = todo_service.get_todo_service(db, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in read_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{todo_id}", response_model=TodoResponse)
def update_todo(todo_id: int, todo: TodoUpdate, db: Session = Depends(get_db)):
    try:
        db_todo = todo_service.update_todo_service(db, todo_id, todo)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in update_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/{todo_id}", response_model=TodoResponse)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    try:
        db_todo = todo_service.delete_todo_service(db, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in delete_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))
