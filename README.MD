# Prueba Técnica para Desarrollador Full Stack

## Características

- Agregar nuevos usuarios con nombre, correo electrónico y edad
- Ver lista de todos los usuarios
- Eliminar usuarios existentes
- Diseño responsivo utilizando Bootstrap

## Tecnologías Utilizadas

- Backend:
  - Node.js
  - Express
  - PostgreSQL
- Frontend:
  - Angular
  - Bootstrap
- Otros:
  - API RESTful
  - Formularios Reactivos en Angular

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente:

- Node.js (v14 o posterior)
- npm (generalmente viene con Node.js)
- PostgreSQL (v12 o posterior)
- Angular CLI (v12 o posterior)

## Configuración de la base de datos

1. Crea una nueva base de datos en PostgreSQL.
2. Ejecuta el siguiente comando SQL para crear la tabla `usuarios`:

```sql
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    correo VARCHAR(100),
    edad INT
);
```
