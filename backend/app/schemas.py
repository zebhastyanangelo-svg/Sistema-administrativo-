from datetime import date, datetime
from typing import Optional
from pydantic import BaseModel, EmailStr


class CompanyCreate(BaseModel):
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class CompanyResponse(BaseModel):
    id: int
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ClientCreate(BaseModel):
    company_id: Optional[int] = None
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    document: Optional[str] = None

class ClientUpdate(BaseModel):
    company_id: Optional[int] = None
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    document: Optional[str] = None

class ClientResponse(BaseModel):
    id: int
    company_id: Optional[int] = None
    name: str
    email: Optional[str] = None
    phone: Optional[str] = None
    document: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class InvoiceCreate(BaseModel):
    company_id: Optional[int] = None
    client_id: Optional[int] = None
    number: str
    status: str = "borrador"
    total: float = 0
    issue_date: Optional[date] = None

class InvoiceUpdate(BaseModel):
    company_id: Optional[int] = None
    client_id: Optional[int] = None
    number: Optional[str] = None
    status: Optional[str] = None
    total: Optional[float] = None
    issue_date: Optional[date] = None

class InvoiceResponse(BaseModel):
    id: int
    company_id: Optional[int] = None
    client_id: Optional[int] = None
    number: str
    status: str
    total: float
    issue_date: Optional[date] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class ProductCreate(BaseModel):
    name: str
    description: Optional[str] = None
    price: float = 0
    stock: int = 0
    category: Optional[str] = None

class ProductUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    stock: Optional[int] = None
    category: Optional[str] = None

class ProductResponse(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    price: float
    stock: int
    category: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class SupplierCreate(BaseModel):
    name: str
    contact_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierUpdate(BaseModel):
    name: Optional[str] = None
    contact_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None

class SupplierResponse(BaseModel):
    id: int
    name: str
    contact_name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class UserCreate(BaseModel):
    username: str
    email: Optional[str] = None
    password: str
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    username: str
    email: Optional[str] = None
    full_name: Optional[str] = None
    is_active: bool
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}

class Token(BaseModel):
    access_token: str
    token_type: str

class LoginRequest(BaseModel):
    username: str
    password: str
