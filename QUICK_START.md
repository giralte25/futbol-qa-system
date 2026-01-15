# 🚀 Guía de Inicio Rápido - 5 Minutos

## ⏱️ Para Empezar AHORA MISMO

### Opción 1: Probar Localmente (Más Rápido)

```bash
# 1. Instalar dependencias (1 min)
cd futbol-qa-system
npm install

# 2. Configurar variables (30 seg)
# Editar .env.local con tus credenciales de Azure
# (Si no tienes Azure aún, ve a Opción 2)

# 3. Iniciar (10 seg)
npm run dev

# 4. Abrir navegador
# http://localhost:3000
```

**⏱️ Tiempo total: ~2 minutos** (si ya tienes Azure configurado)

---

### Opción 2: Ver la Demo (Sin Configuración)

Si quieres ver cómo funciona antes de configurar Azure:

```bash
# 1. Solo instalar dependencias
npm install

# 2. Ver el código y la documentación
# - Lee README.md para ver capturas
# - Lee EJEMPLOS_RESPUESTAS.md para ver resultados esperados
# - Revisa el código en app/page.tsx
```

**⏱️ Tiempo total: 1 minuto**

---

### Opción 3: Despliegue Completo (Producción)

Para tener tu propia versión desplegada en Azure:

```bash
# PASO 1: Azure Language Service (15 min)
# 1. Ir a portal.azure.com
# 2. Crear "Language Service"
# 3. Crear proyecto "Custom Question Answering"
# 4. Importar knowledge-base/futbol-espanol-qa.json
# 5. Desplegar modelo

# PASO 2: Configurar Local (2 min)
npm install
# Editar .env.local con credenciales

# PASO 3: Probar Local (1 min)
npm run dev

# PASO 4: GitHub (2 min)
git init
git add .
git commit -m "Initial commit"
git push

# PASO 5: Azure Static Web App (10 min)
# 1. Crear Static Web App en Azure
# 2. Conectar con GitHub
# 3. Configurar variables de entorno
# 4. Esperar despliegue
```

**⏱️ Tiempo total: ~30 minutos**

---

## 🎯 Lo Más Importante

### Si tienes 30 segundos:

Abre `README.md` - tiene toda la info resumida.

### Si tienes 2 minutos:

Abre `RESUMEN.md` - tiene visualizaciones y ejemplos.

### Si tienes 10 minutos:

Lee `AZURE_SETUP_GUIDE.md` - guía paso a paso completa.

### Si tienes 30 minutos:

Configura y despliega todo siguiendo la Opción 3.

---

## 🔑 Credenciales de Azure (Lo que necesitas)

```env
AZURE_LANGUAGE_KEY=****************
AZURE_LANGUAGE_ENDPOINT=https://tu-recurso.cognitiveservices.azure.com/
AZURE_PROJECT_NAME=futbol-qa
AZURE_DEPLOYMENT_NAME=production
```

### ¿Dónde las consigo?

1. Ve a [portal.azure.com](https://portal.azure.com)
2. Crea cuenta gratis (tarjeta requerida pero no se cobra)
3. Busca "Language Service" → Crear
4. Ve a "Claves y punto de conexión"
5. Copia los valores

**⏱️ Tiempo: ~5 minutos** (si es tu primera vez en Azure)

---

## 🎬 Flujo Visual del Sistema

```
Usuario escribe:                     Sistema responde:
"¿Cuántas Champions               →  "El Real Madrid ha ganado
tiene el Real Madrid?"               15 UEFA Champions League..."
                                     Confianza: 99%
                                     Tiempo: 370ms
```

---

## 📱 Preguntas de Ejemplo para Probar

Una vez que tengas el sistema corriendo, prueba estas:

### ✅ Fáciles (Confianza >95%)
- "¿Cuándo ganó España el Mundial?"
- "¿Cuántas Champions tiene el Real Madrid?"
- "Máximo goleador de La Liga"

### ✅ Medias (Confianza ~90%)
- "¿Quién es el mejor jugador español?"
- "¿Qué es El Clásico?"
- "¿Cuántas Eurocopas tiene España?"

### ✅ Específicas (Confianza >95%)
- "¿Cuántos goles tiene Messi en La Liga?"
- "¿Quién entrenaba a España en 2010?"
- "¿Cuántas UEFA tiene el Sevilla?"

---

## 🐛 Problemas Comunes (Soluciones en 1 Minuto)

### Error: "Module not found"
```bash
rm -rf node_modules
npm install
```

### Error: "No se encontró configuración de Azure"
```bash
# Verifica que .env.local existe
# Verifica que las variables están correctas
# Reinicia el servidor (Ctrl+C y npm run dev)
```

### Error: "401 Unauthorized"
```bash
# Tu clave de Azure es incorrecta
# Ve a Azure Portal y copia una nueva
# Actualiza .env.local
```

### La página no carga
```bash
# Verifica que estás en el directorio correcto
cd futbol-qa-system

# Verifica que el puerto 3000 está libre
# O cambia el puerto:
npm run dev -- -p 3001
```

---

## 📊 ¿Qué Esperar?

### Primera Carga
- Tiempo: ~1-2 segundos
- Después: <1 segundo

### Primera Pregunta
- Tiempo: ~500ms (cold start)
- Después: ~400ms promedio

### Confianza de Respuestas
- Alta (>90%): ~85% de las preguntas
- Media (70-90%): ~15% de las preguntas
- Baja (<70%): Si la pregunta está fuera del alcance

---

## 🎯 Checklist Antes de Entregar

```
Desarrollo Local:
☐ npm install ejecutado
☐ .env.local configurado
☐ npm run dev funciona
☐ http://localhost:3000 carga
☐ Preguntas de ejemplo funcionan

Azure:
☐ Language Service creado
☐ Proyecto Custom QA creado
☐ Knowledge base importada
☐ Modelo desplegado
☐ Credenciales copiadas

Producción:
☐ Código en GitHub
☐ Static Web App creada
☐ Variables de entorno configuradas
☐ GitHub Actions ejecutado
☐ URL de producción funciona

Documentación:
☐ README.md revisado
☐ AZURE_SETUP_GUIDE.md consultado
☐ EJEMPLOS_RESPUESTAS.md visto
☐ URL de producción anotada
```

---

## 🚨 Atajos de Teclado Útiles

Durante el desarrollo:

- `Ctrl + C` - Detener servidor
- `Ctrl + Shift + R` - Recargar sin caché (navegador)
- `F12` - Abrir DevTools
- `Ctrl + Shift + I` - Inspector de elementos

---

## 📞 Ayuda Rápida

| Problema | Documento |
|----------|-----------|
| No sé qué hace el proyecto | `README.md` |
| No sé cómo configurar Azure | `AZURE_SETUP_GUIDE.md` |
| Quiero ver ejemplos | `EJEMPLOS_RESPUESTAS.md` |
| Tengo preguntas específicas | `FAQ.md` |
| Necesito un resumen visual | `RESUMEN.md` |
| Necesito info para entregar | `ENTREGA.md` |

---

## 🎓 Comandos Esenciales

```bash
# Desarrollo
npm run dev          # Iniciar servidor desarrollo
npm run build        # Compilar para producción
npm start            # Iniciar producción

# Limpieza
rm -rf node_modules  # Limpiar dependencias
rm -rf .next         # Limpiar caché Next.js
npm install          # Reinstalar

# Git
git status           # Ver cambios
git add .            # Agregar todo
git commit -m "msg"  # Commit
git push             # Subir a GitHub
```

---

## ✨ Scripts de Ayuda Incluidos

### Windows
```bash
setup.bat           # Instalación automática
```

### Linux/Mac
```bash
chmod +x setup.sh   # Dar permisos
./setup.sh          # Ejecutar instalación
```

---

## 🎯 Objetivo Final

Tener una aplicación web funcionando donde puedas preguntar sobre fútbol español y obtener respuestas inteligentes en menos de medio segundo.

**URL final**: `https://tu-app.azurestaticapps.net`

---

## 💡 Tips Pro

1. **Guarda** las credenciales de Azure en un lugar seguro
2. **Prueba localmente** antes de desplegar
3. **Lee los errores** en la consola, son muy descriptivos
4. **Usa las preguntas de ejemplo** para verificar que funciona
5. **Revisa GitHub Actions** si el despliegue falla

---

## 🏁 Listo para Empezar

Ahora que sabes lo básico:

1. Elige tu opción (Local, Demo, o Producción)
2. Sigue los pasos
3. Si tienes dudas, consulta la documentación
4. ¡Disfruta tu sistema de Q&A!

---

**⚽ ¡Vamos!**

Tiempo estimado hasta ver resultados:
- **Local (con Azure)**: 5 minutos
- **Local (sin Azure)**: 2 minutos  
- **Producción completa**: 40 minutos

*Recuerda: El proyecto ya está completo. Solo necesitas configurar y desplegar.*
