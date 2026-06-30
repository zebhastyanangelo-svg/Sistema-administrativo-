from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models import Client

router = APIRouter(prefix="/clients", tags=["clients"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_clients(db: Session = Depends(get_db)):
    clients = db.query(Client).all()
    return [{
        "id": client.id,
        "name": client.name,
        "email": client.email,
        "phone": client.phone,
        "document": client.document,
    } for client in clients]


@router.post("/")
def create_client(payload: dict, db: Session = Depends(get_db)):
    client = Client(**payload)
    db.add(client)
    db.commit()
    db.refresh(client)
    return {"id": client.id, "name": client.name}
