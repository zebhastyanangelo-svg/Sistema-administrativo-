# Sistema Administrativo

Este proyecto inicia una base para un sistema administrativo tipo Odoo, pensado para que sea sencillo de usar y escalar. Incluye:

- Backend en Python con FastAPI
- Frontend en React con Vite
- Base de datos PostgreSQL
- Configuración inicial lista para desarrollo

## Estructura del proyecto

```text
.
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   └── db/
│   ├── requirements.txt
│   └── .venv/
├── frontend/
│   ├── src/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── database/
│   └── init.sql
├── docker-compose.yml
└── README.md
```

## Requisitos

- Python 3.10+
- Node.js 18+
- Docker y Docker Compose
- Git

## 1. Base de datos PostgreSQL

Inicia la base de datos con Docker Compose:

```bash
docker compose up -d db
```

La base de datos queda disponible en:

- Host: localhost
- Puerto: 5432
- Usuario: admin
- Contraseña: admin123
- Base de datos: sistema_administrativo

## 2. Backend (Python)

Crea y activa un entorno virtual:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Ejecuta la API:

```bash
uvicorn app.main:app --reload --port 8000
```

La API estará disponible en:

- http://localhost:8000
- http://localhost:8000/health

## 3. Frontend (React)

Instala dependencias y levanta el frontend:

```bash
cd frontend
npm install
npm run dev
```

La interfaz quedará disponible en:

- http://localhost:5173

## 4. Variables de entorno

Crea un archivo .env en backend con valores similares a estos:

```env
DATABASE_URL=postgresql://admin:admin123@localhost:5432/sistema_administrativo
```

## 5. Siguientes pasos

- Agregar autenticación de usuarios
- Crear módulos de clientes, proveedores, ventas y compras
- Añadir permisos por rol
- Conectar el frontend con la API REST

## Notas importantes

- El proyecto está pensado como una base inicial y puede crecer hacia un sistema más completo.
- Para producción se recomienda usar variables de entorno seguras y un usuario distinto para PostgreSQL.
- Si cambias la configuración de Docker, ajusta también los valores de la conexión en el backend.
