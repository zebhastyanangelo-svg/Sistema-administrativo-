from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.db.database import SessionLocal
from app.models import Invoice

router = APIRouter(prefix="/invoices", tags=["invoices"])


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/")
def list_invoices(db: Session = Depends(get_db)):
    invoices = db.query(Invoice).all()
    return [{
        "id": invoice.id,
        "number": invoice.number,
        "status": invoice.status,
        "total": float(invoice.total),
        "issue_date": str(invoice.issue_date),
    } for invoice in invoices]


@router.post("/")
def create_invoice(payload: dict, db: Session = Depends(get_db)):
    invoice = Invoice(**payload)
    db.add(invoice)
    db.commit()
    db.refresh(invoice)
    return {"id": invoice.id, "number": invoice.number}
