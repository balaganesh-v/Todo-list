from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import engine (database connection) and Base (models parent)
# ❗ When this line runs, the connection to MySQL is already made
from database import engine, Base

# Import your router (all TODO API routes)
from controllers.todo_controllers import router


# This line reads all models (tables) that inherit from Base
# and creates them in the MySQL database if they don't exist.
# ❗ This is where TABLES are created in your DB.
Base.metadata.create_all(bind=engine)


# Create the FastAPI application
app = FastAPI(title="FastAPI TODO App with MySQL")



# List of frontend URLs allowed to talk to this backend
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3001",
]

# Allow frontend (React or others) to access this API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],         # Which frontends can access this API?
    allow_credentials=True,        # Allow cookies/auth
    allow_methods=["*"],           # Allow all HTTP methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],           # Allow all headers
)


# -------------- ROUTES / CONTROLLERS -------------- #

# Add all routes from todo_controllers under the /todos prefix
# Example: /todos/add, /todos/update, /todos/delete, etc.
app.include_router(router, prefix="/todos", tags=["todos"])
