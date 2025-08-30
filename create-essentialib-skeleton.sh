#!/usr/bin/env bash
set -e

echo "== Essentialib Skeleton: Creación de estructura =="

# 1. Estructura de directorios
mkdir -p src/js/core
mkdir -p src/js/components
mkdir -p src/css/components
mkdir -p src/css/utilities
mkdir -p scripts
mkdir -p demos/shared
mkdir -p dist

# 2. Archivos raíz
cat > package.json <<'EOF'
{
  "name": "essentialib",
  "version": "0.1.0",
  "type": "module",
  "description": "Essentialib - UI micro framework + AdvancedSelect + RESTClient",
  "license": "MIT",
  "author": "Pedro Saa",
  "scripts": {
    "dev": "echo \"Agregar bundler (esbuild / rollup) si se requiere\"",
    "build:css": "node scripts/build-css.js",
    "build": "npm run build:css && node scripts/build-bundle-placeholder.js",
    "zip": "node scripts/build-zip.js",
    "dist:full": "npm run build && npm run zip"
  },
  "dependencies": {},
  "devDependencies": {
    "archiver": "^6.0.2"
  }
}
EOF

cat > .gitignore <<'EOF'
node_modules/
.tmp/
*.log
dist/*.map
dist/essentialib.iife.min.js.map
# Puedes decidir si ignorar el ZIP; por ahora lo versionamos:
# dist/essentialib-all.zip
EOF

cat > LICENSE <<'EOF'
MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
... (puedes completar con tu nombre) ...
EOF

# 3. README
cat > README.md <<'EOF'
# Essentialib (Skeleton)

Este repositorio contiene una versión base de Essentialib con:
- Componentes UI (alert, modal, dropdown, tooltip, etc.)
- AdvancedSelect (versión simplificada)
- RESTClient (interceptores, retries, cache)
- Sistema de build placeholder (concatenación simple)
- Empaquetado ZIP (dist/essentialib-all.zip)
- Demos en /demos

## Scripts

```bash
npm install
npm run build
npm run zip
npm run dist:full