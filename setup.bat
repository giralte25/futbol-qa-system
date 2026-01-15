@echo off
REM Script de instalación rápida para el sistema de Q&A de Fútbol Español
REM Este script configura el entorno local para desarrollo en Windows

echo 🚀 Iniciando instalación del Sistema Q&A Fútbol Español...
echo.

REM Verificar Node.js
echo 📦 Verificando Node.js...
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js no está instalado. Por favor instala Node.js 18 o superior desde https://nodejs.org/
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%
echo.

REM Verificar npm
echo 📦 Verificando npm...
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm no está instalado. Por favor instala npm.
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
echo ✅ npm encontrado: %NPM_VERSION%
echo.

REM Instalar dependencias
echo 📥 Instalando dependencias...
call npm install
echo.

REM Verificar archivo .env.local
if not exist .env.local (
    echo ⚠️  No se encontró archivo .env.local
    echo 📝 Creando archivo .env.local de ejemplo...
    (
        echo # Azure Language Service Configuration
        echo AZURE_LANGUAGE_KEY=tu_clave_de_azure
        echo AZURE_LANGUAGE_ENDPOINT=https://tu-recurso.cognitiveservices.azure.com/
        echo AZURE_PROJECT_NAME=futbol-qa
        echo AZURE_DEPLOYMENT_NAME=production
    ) > .env.local
    echo ✅ Archivo .env.local creado
    echo.
    echo ⚠️  IMPORTANTE: Debes editar el archivo .env.local con tus credenciales de Azure
    echo    1. Abre .env.local en tu editor
    echo    2. Reemplaza 'tu_clave_de_azure' con tu clave real
    echo    3. Reemplaza 'tu-recurso' con el nombre de tu recurso Azure
    echo.
) else (
    echo ✅ Archivo .env.local encontrado
    echo.
)

echo ✨ Instalación completada!
echo.
echo 📚 Próximos pasos:
echo.
echo 1. Si aún no has configurado Azure:
echo    - Lee AZURE_SETUP_GUIDE.md para instrucciones detalladas
echo    - Crea un recurso de Language Service en Azure
echo    - Crea un proyecto de Custom Question Answering
echo    - Importa la base de conocimiento desde knowledge-base/
echo.
echo 2. Configura tus credenciales en .env.local
echo.
echo 3. Inicia el servidor de desarrollo:
echo    npm run dev
echo.
echo 4. Abre http://localhost:3000 en tu navegador
echo.
echo 5. Para desplegar en producción:
echo    - Sigue las instrucciones en AZURE_SETUP_GUIDE.md
echo    - Sección 'Desplegar en Azure Static Web Apps'
echo.
echo 📖 Documentación disponible:
echo    - README.md - Descripción general del proyecto
echo    - AZURE_SETUP_GUIDE.md - Guía de configuración de Azure
echo    - EJEMPLOS_RESPUESTAS.md - Ejemplos de uso
echo    - ENTREGA.md - Documento de entrega completo
echo.
echo ⚽ ¡Disfruta desarrollando tu sistema de Q&A de fútbol!
echo.
pause
