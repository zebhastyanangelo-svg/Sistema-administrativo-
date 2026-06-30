from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import inspect, text
from app.db.database import Base, engine
from app.api import health
from app.api.v1 import companies, clients, invoices

app = FastAPI(title="Sistema Administrativo", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def ensure_database_schema() -> None:
    Base.metadata.create_all(bind=engine)

    with engine.begin() as connection:
        inspector = inspect(connection)
        if "companies" in inspector.get_table_names():
            columns = {column["name"] for column in inspector.get_columns("companies")}
            for column_name, column_type in {
                "email": "VARCHAR(255)",
                "phone": "VARCHAR(50)",
                "address": "VARCHAR(255)",
            }.items():
                if column_name not in columns:
                    connection.execute(text(f"ALTER TABLE companies ADD COLUMN {column_name} {column_type}"))


ensure_database_schema()

app.include_router(health.router)
app.include_router(companies.router)
app.include_router(clients.router)
app.include_router(invoices.router)
