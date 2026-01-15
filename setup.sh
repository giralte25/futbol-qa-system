#!/bin/bash

# Script de instalación rápida para el sistema de Q&A de Fútbol Español
# Este script configura el entorno local para desarrollo

echo "🚀 Iniciando instalación del Sistema Q&A Fútbol Español..."
echo ""

# Verificar Node.js
echo "📦 Verificando Node.js..."
if ! command -v node &> /dev/null
then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 18 o superior desde https://nodejs.org/"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js encontrado: $NODE_VERSION"
echo ""

# Verificar npm
echo "📦 Verificando npm..."
if ! command -v npm &> /dev/null
then
    echo "❌ npm no está instalado. Por favor instala npm."
    exit 1
fi

NPM_VERSION=$(npm -v)
echo "✅ npm encontrado: $NPM_VERSION"
echo ""

# Instalar dependencias
echo "📥 Instalando dependencias..."
npm install
echo ""

# Verificar archivo .env.local
if [ ! -f .env.local ]; then
    echo "⚠️  No se encontró archivo .env.local"
    echo "📝 Creando archivo .env.local de ejemplo..."
    cat > .env.local << EOF
# Azure Language Service Configuration
AZURE_LANGUAGE_KEY=tu_clave_de_azure
AZURE_LANGUAGE_ENDPOINT=https://tu-recurso.cognitiveservices.azure.com/
AZURE_PROJECT_NAME=futbol-qa
AZURE_DEPLOYMENT_NAME=production
EOF
    echo "✅ Archivo .env.local creado"
    echo ""
    echo "⚠️  IMPORTANTE: Debes editar el archivo .env.local con tus credenciales de Azure"
    echo "   1. Abre .env.local en tu editor"
    echo "   2. Reemplaza 'tu_clave_de_azure' con tu clave real"
    echo "   3. Reemplaza 'tu-recurso' con el nombre de tu recurso Azure"
    echo ""
else
    echo "✅ Archivo .env.local encontrado"
    echo ""
fi

echo "✨ Instalación completada!"
echo ""
echo "📚 Próximos pasos:"
echo ""
echo "1. Si aún no has configurado Azure:"
echo "   - Lee AZURE_SETUP_GUIDE.md para instrucciones detalladas"
echo "   - Crea un recurso de Language Service en Azure"
echo "   - Crea un proyecto de Custom Question Answering"
echo "   - Importa la base de conocimiento desde knowledge-base/"
echo ""
echo "2. Configura tus credenciales en .env.local"
echo ""
echo "3. Inicia el servidor de desarrollo:"
echo "   npm run dev"
echo ""
echo "4. Abre http://localhost:3000 en tu navegador"
echo ""
echo "5. Para desplegar en producción:"
echo "   - Sigue las instrucciones en AZURE_SETUP_GUIDE.md"
echo "   - Sección 'Desplegar en Azure Static Web Apps'"
echo ""
echo "📖 Documentación disponible:"
echo "   - README.md - Descripción general del proyecto"
echo "   - AZURE_SETUP_GUIDE.md - Guía de configuración de Azure"
echo "   - EJEMPLOS_RESPUESTAS.md - Ejemplos de uso"
echo "   - ENTREGA.md - Documento de entrega completo"
echo ""
echo "⚽ ¡Disfruta desarrollando tu sistema de Q&A de fútbol!"
