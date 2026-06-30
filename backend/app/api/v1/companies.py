from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models import Company

router = APIRouter(prefix="/companies", tags=["companies"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_companies(db: Session = Depends(get_db)):
    companies = db.query(Company).all()
    return [{
        "id": company.id,
        "name": company.name,
        "email": company.email,
        "phone": company.phone,
        "address": company.address,
    } for company in companies]


@router.post("/")
def create_company(payload: dict, db: Session = Depends(get_db)):
    company = Company(**payload)
    db.add(company)
    db.commit()
    db.refresh(company)
    return {"id": company.id, "name": company.name}
