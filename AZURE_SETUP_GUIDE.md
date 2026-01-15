# Guía Completa: Configuración de Azure Language Service y Despliegue

Esta guía te llevará paso a paso para configurar Azure Custom Question Answering y desplegar tu aplicación en Azure Static Web Apps.

## 📋 Requisitos Previos

- Cuenta de Azure (puedes crear una gratuita en https://azure.microsoft.com/free/)
- Node.js 18 o superior instalado
- Git instalado

## 🔧 Parte 1: Crear y Configurar Azure Language Service

### Paso 1: Crear un recurso de Language Service

1. Inicia sesión en el [Portal de Azure](https://portal.azure.com)

2. Haz clic en **"Crear un recurso"** en la esquina superior izquierda

3. Busca **"Language Service"** y selecciónalo

4. Haz clic en **"Crear"**

5. Rellena los detalles:
   - **Suscripción**: Selecciona tu suscripción
   - **Grupo de recursos**: Crea uno nuevo llamado `futbol-qa-rg`
   - **Región**: Selecciona la más cercana (ej: `France central`)
   - **Nombre**: `futbol-qa-language` (debe ser único globalmente)
   - **Plan de tarifa**: Selecciona **Free F0** (20 llamadas por minuto, gratis)

6. Haz clic en **"Revisar y crear"** y luego en **"Crear"**

7. Espera a que se complete el despliegue (1-2 minutos)

### Paso 2: Obtener las credenciales

1. Una vez creado, ve al recurso

2. En el menú izquierdo, selecciona **"Claves y punto de conexión"**

3. Copia los siguientes valores (los necesitarás después):
   - **CLAVE 1** (Azure Language Key)
   - **Punto de conexión** (Azure Language Endpoint)
### Paso 3: Habilitar Custom Question Answering

1. En el portal de Azure, ve a tu recurso Language Service

2. En el menú izquierdo, busca **"Características"**

3. Busca **"Custom question answering"** y habilítalo si no está habilitado

4. Es posible que necesites crear un recurso de Azure Search:
   - Nombre: `futbol-qa-search`
   - Plan de tarifa: **Free** (si está disponible)

### Paso 4: Crear el proyecto de Question Answering

1. Ve a [Language Studio](https://language.cognitive.azure.com/)

2. Inicia sesión con tu cuenta de Azure

3. Selecciona tu suscripción y el recurso de Language que acabas de crear

4. En la página principal, selecciona **"Custom question answering"**

5. Haz clic en **"Create new project"**

6. Rellena los detalles:
   - **Nombre del proyecto**: `futbol-qa`
   - **Descripción**: `Sistema de preguntas y respuestas sobre fútbol español`
   - **Idioma**: `Español`
   - **Respuesta por defecto**: `Lo siento, no encontré información sobre eso. Pregunta sobre fútbol español.`

7. Haz clic en **"Create project"**

### Paso 5: Importar la base de conocimiento

Tienes dos opciones para importar los datos:

#### Opción A: Importar desde archivo (Recomendado)

1. En Language Studio, dentro de tu proyecto `futbol-qa`, ve a **"Manage sources"**

2. Haz clic en **"Add source"** > **"Files"**

3. Sube el archivo `knowledge-base/futbol-espanol-qa.json` o `futbol-espanol-qa.md`

4. Haz clic en **"Add files"**

5. Espera a que se procese (1-2 minutos)

#### Opción B: Agregar manualmente

1. Ve a la pestaña **"Edit knowledge base"**

2. Para cada pregunta y respuesta:
   - Haz clic en **"Add question pair"**
   - Pega la respuesta en el campo **"Answer"**
   - Agrega las preguntas alternativas en **"Questions"**
   - Agrega metadatos si lo deseas

### Paso 6: Entrenar y publicar el modelo

1. Una vez agregadas todas las preguntas, haz clic en **"Save"** en la parte superior

2. Haz clic en **"Test"** para probar algunas preguntas

3. Cuando estés satisfecho, haz clic en **"Deploy knowledge base"**

4. Selecciona:
   - **Nombre del despliegue**: `production`
   - Haz clic en **"Deploy"**

5. Espera a que se complete el despliegue

### Paso 7: Obtener los detalles del proyecto

1. Una vez desplegado, ve a **"Deploy knowledge base"**

2. Anota:
   - **Project Name**: `futbolqa`
   - **Deployment Name**: `production`

## 🚀 Parte 2: Configurar y Desplegar en Azure Static Web Apps

### Paso 1: Preparar el proyecto localmente

1. Abre una terminal en el directorio del proyecto:

```bash
cd futbol-qa-system
```

2. Crea un archivo `.env.local` con tus credenciales de Azure:

```bash
AZURE_LANGUAGE_KEY=tu_clave_de_azure
AZURE_LANGUAGE_ENDPOINT=https://futbol-qa-language.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=futbolqa&api-version=2021-10-01&deploymentName=production
AZURE_PROJECT_NAME=futbolqa
```

3. Instala las dependencias:

```bash
npm install
```

4. Prueba la aplicación localmente:

```bash
npm run dev
```

5. Abre http://localhost:3000 en tu navegador y prueba algunas preguntas

### Paso 2: Crear un repositorio en GitHub

1. Crea un nuevo repositorio en GitHub (puede ser privado o público)

2. Inicializa Git en tu proyecto (si no lo has hecho):

```bash
git init
git add .
git commit -m "Initial commit: Football Q&A system"
git branch -M main
git remote add origin https://github.com/tu-usuario/futbol-qa-system.git
git push -u origin main
```

### Paso 3: Crear Azure Static Web App

1. Ve al [Portal de Azure](https://portal.azure.com)

2. Haz clic en **"Crear un recurso"**

3. Busca **"Static Web App"** y selecciónalo

4. Haz clic en **"Crear"**

5. Rellena los detalles:
   - **Suscripción**: Tu suscripción
   - **Grupo de recursos**: Usa `futbol-qa-rg` (el mismo que antes)
   - **Nombre**: `futbol-qa-app` (debe ser único)
   - **Plan**: **Free** (100 GB de ancho de banda gratis)
   - **Región**: Selecciona la más cercana
   - **Origen del despliegue**: **GitHub**

6. Haz clic en **"Iniciar sesión con GitHub"** y autoriza Azure

7. Selecciona:
   - **Organización**: Tu usuario de GitHub
   - **Repositorio**: El repositorio que creaste
   - **Rama**: `main`

8. En **"Detalles de la compilación"**:
   - **Valor preestablecido de compilación**: `Next.js`
   - **Ubicación de la aplicación**: `/` (raíz)
   - **Ubicación de la API**: déjalo vacío
   - **Ubicación de salida**: déjalo vacío (Next.js lo maneja automáticamente)

9. Haz clic en **"Revisar y crear"** y luego en **"Crear"**

### Paso 4: Configurar las variables de entorno en Azure

1. Una vez creado el recurso, ve a tu Static Web App en el portal de Azure

2. En el menú izquierdo, selecciona **"Configuration"**

3. Haz clic en **"Add"** para agregar cada variable de entorno:
   - **Name**: `AZURE_LANGUAGE_KEY` | **Value**: Tu clave de Azure
   - **Name**: `AZURE_LANGUAGE_ENDPOINT` | **Value**: Tu endpoint de Azure
   - **Name**: `AZURE_PROJECT_NAME` | **Value**: `futbol-qa`
   - **Name**: `AZURE_DEPLOYMENT_NAME` | **Value**: `production`

4. Haz clic en **"Save"** después de agregar todas las variables

### Paso 5: Esperar al despliegue

1. GitHub Actions se ejecutará automáticamente para construir y desplegar tu aplicación

2. Puedes ver el progreso en:
   - Tu repositorio de GitHub > pestaña **"Actions"**
   - O en el portal de Azure en la sección **"GitHub Action runs"**

3. El despliegue tarda aproximadamente 5-10 minutos

### Paso 6: Acceder a tu aplicación

1. Una vez completado el despliegue, ve a tu Static Web App en Azure

2. En la página de **"Información general"**, encontrarás la URL de tu aplicación

3. La URL será algo como: `https://futbol-qa-app.azurestaticapps.net`

4. Haz clic en la URL para acceder a tu aplicación desplegada

## 🔄 Actualizaciones futuras

Cada vez que hagas un push a la rama `main` de tu repositorio, Azure Static Web Apps reconstruirá y redespleara automáticamente tu aplicación.

```bash
git add .
git commit -m "Descripción de los cambios"
git push
```

## ⚙️ Optimizaciones Configuradas

### En Azure Language Service:

1. **Umbral de confianza**: Configurado en 0.3 para balance entre precisión y cobertura
2. **Answer Span**: Habilitado para respuestas más precisas
3. **Top 1**: Solo devuelve la mejor respuesta para reducir latencia
4. **Metadata filtering**: Configurado para permitir búsquedas categorizadas

### En la Aplicación:

1. **Caching**: Next.js cachea las rutas automáticamente
2. **Optimización de imágenes**: Next.js Image component (si agregas imágenes)
3. **Code splitting**: Automático con Next.js App Router
4. **Preguntas de ejemplo**: Para mejorar la experiencia del usuario
5. **Indicador de confianza visual**: Para que los usuarios vean la calidad de la respuesta
6. **Manejo de errores**: Mensajes claros cuando algo falla

## 🐛 Solución de problemas

### Error: "No se encontró configuración de Azure"

- Verifica que las variables de entorno estén configuradas correctamente en Azure
- Asegúrate de que los nombres coincidan exactamente

### Error: 401 Unauthorized

- Verifica que tu clave de Azure sea correcta
- Asegúrate de que el endpoint sea el correcto (debe terminar en `/`)

### Error: 404 Not Found

- Verifica que el nombre del proyecto y el deployment name sean correctos
- Asegúrate de que hayas desplegado el knowledge base en Language Studio

### Las respuestas no son precisas

- Agrega más preguntas alternativas en Language Studio
- Ajusta el umbral de confianza en el código
- Revisa las respuestas en Language Studio y mejóralas

## 📞 Recursos adicionales

- [Documentación de Azure Language Service](https://learn.microsoft.com/azure/cognitive-services/language-service/)
- [Documentación de Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)
- [Documentación de Next.js](https://nextjs.org/docs)

## 💰 Costos

- **Language Service Free Tier**: 20 llamadas/minuto, gratis
- **Azure Static Web Apps Free Tier**: 100 GB ancho de banda/mes, gratis
- **Azure Search Free Tier**: 50 MB almacenamiento, gratis

Total: **0€/mes** para uso básico y aprendizaje
