# Ciudades Clima API

API REST para gestionar ciudades favoritas y consultar su clima actual en tiempo real, usando la API de OpenWeatherMap.

## Tecnologías

- Node.js + Express
- PostgreSQL
- JWT para autenticación
- bcrypt para hasheo de contraseñas
- axios para consumo de API externa (OpenWeatherMap)

## Funcionalidades

- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT
- CRUD de ciudades favoritas por usuario (protegido)
- Consulta de clima actual en tiempo real para cada ciudad guardada

## Endpoints

### Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /auth/registro | Registra un nuevo usuario |
| POST | /auth/login | Inicia sesión y devuelve un token JWT |

### Ciudades favoritas (requieren token)
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | /ciudades | Agrega una ciudad favorita |
| GET | /ciudades | Lista las ciudades favoritas del usuario |
| DELETE | /ciudades/:id | Elimina una ciudad favorita |
| GET | /ciudades/:id/clima | Consulta el clima actual de una ciudad guardada |

## Cómo correrlo localmente

1. Clona el repositorio
2. Instala dependencias: `npm install`
3. Crea un archivo `.env` con:

PORT=3000
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=clima_db
JWT_SECRET=tu_secreto
OPENWEATHER_API_KEY=tu_api_key

4. Crea la base de datos y las tablas (ver `schema.sql` o la sección de estructura de base de datos abajo)
5. Corre el servidor: `npm run dev`

## Estructura de la base de datos

```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE ciudades_favoritas (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
  nombre_ciudad VARCHAR(100) NOT NULL,
  pais VARCHAR(100),
  fecha_agregada TIMESTAMP DEFAULT NOW()
);
```

## Autor

Briam Pérez