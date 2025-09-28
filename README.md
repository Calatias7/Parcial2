# Restaurante Órdenes (Node + Express + PostgreSQL + Frontend puro)

Instrucciones de la hoja implementadas. Listo para desplegar en Render.

## Estructura
- **db/schema.sql**: crea tablas `clientes` y `ordenes`.
- **db/seed.sql**: datos de ejemplo.
- **backend**: API REST (Express).
- **frontend**: HTML/CSS/JS simple que consume la API.

## Variables de entorno
Copiar `backend/.env.example` a `.env` y ajustar `DATABASE_URL` y `PORT`.

## Scripts
```bash
cd backend
npm install
npm run dev
```

## Endpoints
1. `POST /clientes/registrar` → `{ nombre, email, telefono }`
2. `POST /clientes/login` → `{ email, telefono }`
3. `POST /ordenes` → `{ cliente_id, platillo_nombre, notas }`
4. `GET /ordenes/cliente/:id`
5. `PUT /ordenes/:id/estado` → avanza: pending → preparing → delivered

## Despliegue Render (resumen)
1. Crear servicio Web (Node).
2. Añadir var `DATABASE_URL` con la URL de PostgreSQL (instancia Render).
3. Comando start: `node src/server.js` (ya definido en package.json).
4. Añadir health route `/` (ya incluido).
5. Habilitar `Auto-Deploy` desde GitHub.
