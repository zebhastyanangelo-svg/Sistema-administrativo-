import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from app.db.database import SessionLocal, engine, Base
from app.models import Company, Client, Invoice, Product, Supplier, User
from app.auth.jwt import get_password_hash
from datetime import date

Base.metadata.create_all(bind=engine)
db = SessionLocal()

# --- Usuario ---
if not db.query(User).filter(User.username == "admin").first():
    db.add(User(
        username="admin",
        email="admin@example.com",
        hashed_password=get_password_hash("admin123"),
        full_name="Administrador",
    ))
    print("Usuario creado: admin / admin123")

# --- Empresas ---
if not db.query(Company).first():
    db.add_all([
        Company(name="TechSolutions SpA", email="contacto@techsolutions.cl", phone="+56 2 1234 5678", address="Av. Providencia 1234, Santiago"),
        Company(name="Distribuidora Norte Ltda", email="ventas@distribuidoranorte.cl", phone="+56 55 9876 5432", address="Calle Comercio 567, Antofagasta"),
        Company(name="Servicios del Sur EIRL", email="info@serviciosdelsur.cl", phone="+56 63 4567 8901", address="Av. Alemania 890, Valdivia"),
    ])
    print("3 empresas creadas")

# --- Clientes ---
if not db.query(Client).first():
    db.add_all([
        Client(company_id=1, name="Juan Pérez", email="juan@correo.cl", phone="+56 9 1111 1111", document="12.345.678-9"),
        Client(company_id=1, name="María González", email="maria@correo.cl", phone="+56 9 2222 2222", document="23.456.789-0"),
        Client(company_id=2, name="Carlos Muñoz", email="carlos@correo.cl", phone="+56 9 3333 3333", document="34.567.890-1"),
        Client(company_id=3, name="Ana Soto", email="ana@correo.cl", phone="+56 9 4444 4444", document="45.678.901-2"),
    ])
    print("4 clientes creados")

# --- Facturas ---
if not db.query(Invoice).first():
    db.add_all([
        Invoice(company_id=1, client_id=1, number="FAC-001", status="pagada", total=250000, issue_date=date(2025, 6, 1)),
        Invoice(company_id=1, client_id=2, number="FAC-002", status="enviada", total=180000, issue_date=date(2025, 6, 5)),
        Invoice(company_id=2, client_id=3, number="FAC-003", status="borrador", total=95000, issue_date=date(2025, 6, 10)),
        Invoice(company_id=3, client_id=4, number="FAC-004", status="pagada", total=520000, issue_date=date(2025, 5, 20)),
    ])
    print("4 facturas creadas")

# --- Productos ---
if not db.query(Product).first():
    db.add_all([
        Product(name="Laptop Pro 15\"", description="Laptop empresarial 16GB RAM", price=1200000, stock=15, category="Equipos"),
        Product(name="Monitor 27\" 4K", description="Monitor IPS UHD", price=450000, stock=8, category="Equipos"),
        Product(name="Teclado Mecánico RGB", description="Switch red, retroiluminado", price=85000, stock=0, category="Periféricos"),
        Product(name="Mouse Inalámbrico", description="Ergonómico, 6 botones", price=45000, stock=22, category="Periféricos"),
        Product(name="Escritorio Eléctrico", description="Altura regulable, 140x70", price=650000, stock=3, category="Muebles"),
        Product(name="Silla Ergonómica", description="Respaldo mesh, soporte lumbar", price=380000, stock=10, category="Muebles"),
    ])
    print("6 productos creados")

# --- Proveedores ---
if not db.query(Supplier).first():
    db.add_all([
        Supplier(name="Importec Chile Ltda", contact_name="Pedro Ramírez", email="pedro@importec.cl", phone="+56 2 5555 1234", address="Av. Los Industriales 500, Santiago"),
        Supplier(name="Distribuidora TIC S.A.", contact_name="Laura Vega", email="laura@distic.cl", phone="+56 2 5555 5678", address="Calle Tecnología 890, Santiago"),
        Supplier(name="Mundo Muebles SpA", contact_name="Roberto Díaz", email="roberto@mundomuebles.cl", phone="+56 32 7777 8888", address="Ruta 68 Km 12, Valparaíso"),
    ])
    print("3 proveedores creados")

db.commit()
db.close()
print("\nSeed completado.")
