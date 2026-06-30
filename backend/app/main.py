from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import Base, engine
from app.api import health
from app.api.v1 import companies, clients, invoices, products, suppliers
from app.auth.router import router as auth_router

app = FastAPI(title="Sistema Administrativo", version="0.2.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)

app.include_router(health.router)
app.include_router(companies.router)
app.include_router(clients.router)
app.include_router(invoices.router)
app.include_router(products.router)
app.include_router(suppliers.router)
app.include_router(auth_router)
