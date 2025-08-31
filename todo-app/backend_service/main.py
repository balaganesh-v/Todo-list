from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
import schemas, crud, models
from database import engine, Base, get_db

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="FastAPI TODO App with MySQL")

# Allowed origins (React dev servers)
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],   # allow all HTTP methods
    allow_headers=["*"],   # allow all headers
)

# -------------------------
# Routes with error handling
# -------------------------

@app.post("/todos/", response_model=schemas.TodoResponse)
def create_todo(todo: schemas.TodoCreate, db: Session = Depends(get_db)):
    try:
        return crud.create_todo(db, todo)
    except Exception as e:
        print("❌ Error in create_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/todos/", response_model=list[schemas.TodoResponse])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    try:
        return crud.get_todos(db, skip=skip, limit=limit)
    except Exception as e:
        print("❌ Error in read_todos:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/todos/{todo_id}", response_model=schemas.TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db)):
    try:
        db_todo = crud.get_todo(db, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in read_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.put("/todos/{todo_id}", response_model=schemas.TodoResponse)
def update_todo(todo_id: int, todo: schemas.TodoUpdate, db: Session = Depends(get_db)):
    try:
        db_todo = crud.update_todo(db, todo_id, todo)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in update_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))


@app.delete("/todos/{todo_id}", response_model=schemas.TodoResponse)
def delete_todo(todo_id: int, db: Session = Depends(get_db)):
    try:
        db_todo = crud.delete_todo(db, todo_id)
        if not db_todo:
            raise HTTPException(status_code=404, detail="Todo not found")
        return db_todo
    except HTTPException:
        raise
    except Exception as e:
        print("❌ Error in delete_todo:", e)
        raise HTTPException(status_code=500, detail=str(e))
