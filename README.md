# ElyApp - API REST con Elysia y Bun

Una API REST moderna construida con Elysia.js, Bun y PostgreSQL.

## 🚀 Características

- Framework web Elysia.js
- Runtime Bun para máximo rendimiento
- PostgreSQL con Drizzle ORM
- Tests E2E
- Estructura modular por paquetes
- TypeScript

## 📋 Prerequisitos

- Bun >= 1.0.0
- PostgreSQL >= 14
- Node.js >= 18 (opcional)

## 🛠️ Instalación

1. Clona el repositorio:
```bash
git clone <repository-url>
cd elyapp
```

2. Instala las dependencias:
```bash
bun install
```

3. Configura las variables de entorno:
```bash
cp .env.example .env
```

4. Configura la base de datos:
```bash
# Crea la base de datos
createdb elyapp

# Ejecuta las migraciones
bun run migrate
```

## 🚀 Uso

### Desarrollo
```bash
bun run dev
```

### Tests
```bash
# Crear base de datos de prueba
createdb elyapp_test

# Ejecutar migraciones en base de datos de prueba
bun run migrate:test

# Ejecutar tests
bun run test
```

## 📁 Estructura del Proyecto

```
src/
├── db/                 # Configuración de base de datos
├── packs/             # Módulos de la aplicación
│   └── users/         # Módulo de usuarios
│       ├── models/    # Modelos y schemas
│       ├── services/  # Lógica de negocio
│       ├── routes/    # Rutas de la API
│       └── dtos/      # Objetos de transferencia de datos
└── __tests__/         # Tests E2E
```

## 📝 API Endpoints

### Users
- `GET /api/v1/users` - Obtener todos los usuarios
- `GET /api/v1/users/:id` - Obtener un usuario por ID
- `POST /api/v1/users` - Crear un nuevo usuario
- `PUT /api/v1/users/:id` - Actualizar un usuario
- `DELETE /api/v1/users/:id` - Eliminar un usuario

## 🛠️ Construido con

- [Bun](https://bun.sh/) - Runtime JavaScript
- [Elysia](https://elysiajs.com/) - Framework web
- [Drizzle ORM](https://orm.drizzle.team/) - ORM para TypeScript
- [PostgreSQL](https://www.postgresql.org/) - Base de datos

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - mira el archivo [LICENSE.md](LICENSE.md) para detalles
