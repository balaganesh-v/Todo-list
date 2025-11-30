from sqlalchemy import create_engine     # Helps us connect to the MySQL database and run SQL commands
from sqlalchemy.ext.declarative import declarative_base   # Needed for creating or using excisting database tables using Python classes
from sqlalchemy.orm import sessionmaker  # Creates sessions so we can talk to the database

# MySQL connection details (username, password, host, database name)
DATABASE_URL = "mysql+pymysql://root:root@localhost:3306/todo_db"

# The engine is the main connection to the database
engine = create_engine(DATABASE_URL)

# SessionLocal will create a NEW database session every time we call SessionLocal()
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base is the parent class for all our database models
# Every table we create will use Base as a parent
Base = declarative_base()

# This function gives us a fresh database session for each request
def get_db():
    db = SessionLocal()       # Make a new session (new connection to database)
    try:
        yield db              # Give the session to the FastAPI route
    finally:
        db.close()            # When the request is finished, close the session
