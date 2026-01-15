# ❓ Preguntas Frecuentes (FAQ)

## 📋 General

### ¿Qué es este proyecto?

Es un sistema inteligente de preguntas y respuestas sobre fútbol español que utiliza Azure Language Service (Custom Question Answering). Los usuarios pueden hacer preguntas en lenguaje natural y el sistema busca la mejor respuesta en su base de conocimiento.

### ¿Qué temas cubre el sistema?

El sistema cubre:
- Selección española (Mundiales, Eurocopas, jugadores)
- La Liga (equipos, goleadores, récords)
- UEFA Champions League
- UEFA Europa League
- Jugadores históricos
- Estadios y rivalidades
- Récords y estadísticas

### ¿Es gratis?

Sí, el proyecto utiliza los tiers gratuitos de Azure:
- Azure Language Service (Free F0): 20 llamadas/minuto
- Azure Static Web Apps (Free): 100 GB ancho de banda/mes
- Azure Search (Free): 50 MB almacenamiento
- Total: **0€/mes**

---

## 🔧 Instalación y Configuración

### ¿Qué necesito para ejecutar el proyecto localmente?

Necesitas:
- Node.js 18 o superior
- npm o yarn
- Una cuenta de Azure (tier gratuito)
- Git (opcional)

### ¿Cómo instalo las dependencias?

```bash
cd futbol-qa-system
npm install
```

O ejecuta el script de instalación:
- Windows: `setup.bat`
- Linux/Mac: `./setup.sh`

### ¿Dónde obtengo las credenciales de Azure?

1. Ve al [Portal de Azure](https://portal.azure.com)
2. Crea un recurso de Language Service
3. Ve a "Claves y punto de conexión"
4. Copia la clave y el endpoint
5. Configúralos en `.env.local`

Ver `AZURE_SETUP_GUIDE.md` para instrucciones detalladas.

### ¿Qué variables de entorno necesito?

```env
AZURE_LANGUAGE_KEY=tu_clave_de_azure
AZURE_LANGUAGE_ENDPOINT=https://tu-recurso.cognitiveservices.azure.com/
AZURE_PROJECT_NAME=futbol-qa
AZURE_DEPLOYMENT_NAME=production
```

---

## 🚀 Despliegue

### ¿Cómo despliego la aplicación en Azure?

1. Sigue la guía en `AZURE_SETUP_GUIDE.md`
2. Crea un Azure Static Web App
3. Conecta con tu repositorio de GitHub
4. Configura las variables de entorno en Azure
5. El despliegue es automático via GitHub Actions

### ¿Cuánto tarda el despliegue?

- Primera vez: ~5-10 minutos
- Despliegues subsecuentes: ~3-5 minutos

### ¿Puedo usar Vercel o Netlify en lugar de Azure?

Sí, pero necesitas Azure Language Service para el backend de Q&A. Puedes desplegar el frontend en cualquier plataforma que soporte Next.js, pero la API de Azure es necesaria.

---

## 💡 Uso del Sistema

### ¿Cómo hago una pregunta?

Simplemente escribe tu pregunta en lenguaje natural:
- "¿Cuántas Champions ha ganado el Real Madrid?"
- "¿Quién ganó el Mundial 2010?"
- "Máximo goleador de La Liga"

El sistema entiende diferentes formas de preguntar.

### ¿Qué tipo de preguntas puedo hacer?

Preguntas sobre:
- Títulos y palmarés de equipos
- Estadísticas de jugadores
- Récords históricos
- Competiciones (La Liga, Champions, etc.)
- Fechas y eventos históricos
- Estadios y rivalidades

### ¿Por qué algunas respuestas tienen baja confianza?

La confianza baja puede indicar:
- La pregunta no está en la base de conocimiento
- La pregunta es muy genérica
- Hay errores ortográficos significativos
- La pregunta está fuera del alcance (ej: fútbol sudamericano)

### ¿Cómo puedo mejorar la precisión?

1. Sé específico en tus preguntas
2. Usa preguntas completas en lugar de palabras clave
3. Revisa los ejemplos en `EJEMPLOS_RESPUESTAS.md`
4. Agrega más preguntas a la base de conocimiento

---

## 🛠️ Desarrollo y Personalización

### ¿Cómo agrego más preguntas y respuestas?

1. Edita `knowledge-base/futbol-espanol-qa.json`
2. Agrega tu nuevo par Q&A siguiendo el formato existente
3. Ve a Azure Language Studio
4. Importa el archivo actualizado o agrega manualmente
5. Guarda y vuelve a desplegar el modelo

### ¿Puedo cambiar el tema a otro deporte?

Sí, simplemente:
1. Crea una nueva base de conocimiento con tu tema
2. Importa en Azure Language Studio
3. Actualiza los textos del frontend (título, ejemplos, etc.)

### ¿Cómo personalizo los colores y estilos?

Edita `tailwind.config.ts` y `app/globals.css`:

```typescript
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      primary: '#tu-color',
      secondary: '#tu-color-secundario',
    }
  }
}
```

### ¿Puedo agregar más funcionalidades?

Sí, algunas ideas:
- Chat conversacional con historial
- Búsqueda por categorías
- Sistema de favoritos
- Compartir respuestas en redes sociales
- Modo oscuro
- Múltiples idiomas

---

## 🐛 Solución de Problemas

### Error: "No se encontró configuración de Azure"

**Problema**: Las variables de entorno no están configuradas.

**Solución**:
1. Verifica que `.env.local` existe
2. Comprueba que las variables están correctamente escritas
3. En producción, verifica las variables en Azure Portal > Configuration

### Error: "401 Unauthorized"

**Problema**: La clave de Azure es incorrecta o expiró.

**Solución**:
1. Ve a Azure Portal > Tu recurso > Claves y punto de conexión
2. Copia una nueva clave
3. Actualiza `.env.local` o las variables en Azure
4. Reinicia la aplicación

### Error: "404 Not Found"

**Problema**: El proyecto o deployment no existe en Azure.

**Solución**:
1. Verifica que `AZURE_PROJECT_NAME` es correcto
2. Verifica que `AZURE_DEPLOYMENT_NAME` es correcto
3. Asegúrate de haber desplegado el modelo en Language Studio

### La aplicación no inicia localmente

**Problema**: Puede haber errores de dependencias o configuración.

**Solución**:
```bash
# Limpiar caché y reinstalar
rm -rf node_modules package-lock.json
npm install

# Verificar versión de Node
node -v  # Debe ser 18 o superior

# Iniciar en modo debug
npm run dev
```

### Las respuestas son incorrectas

**Problema**: La base de conocimiento puede tener errores.

**Solución**:
1. Revisa el contenido en `knowledge-base/`
2. Verifica que la información es correcta
3. Actualiza en Language Studio
4. Vuelve a entrenar y desplegar el modelo

### El despliegue en Azure falla

**Problema**: Puede haber errores en GitHub Actions.

**Solución**:
1. Ve a tu repositorio > Actions
2. Revisa los logs de error
3. Verifica que las variables secretas están configuradas
4. Comprueba que el token de Azure es válido

---

## 📊 Rendimiento

### ¿Qué tan rápido es el sistema?

- Tiempo de respuesta promedio: ~415ms
- Primer acceso (cold start): ~1-2 segundos
- Tiempo de carga de página: <2 segundos

### ¿Cuántas consultas soporta?

- Tier gratuito: 20 llamadas/minuto
- Tier estándar: Miles de llamadas/minuto
- Para más tráfico, actualiza tu plan de Azure

### ¿Cómo puedo mejorar el rendimiento?

1. **Frontend**:
   - Ya está optimizado con Next.js
   - Code splitting automático
   - Caching de rutas

2. **Backend**:
   - Considera implementar caching de respuestas frecuentes
   - Usa Azure CDN para assets estáticos
   - Actualiza al tier pagado para más throughput

3. **Base de Conocimiento**:
   - Organiza mejor las categorías
   - Elimina duplicados
   - Optimiza metadata

---

## 💰 Costos y Escalabilidad

### ¿Cuándo debo actualizar del tier gratuito?

Actualiza cuando:
- Superes 20 llamadas/minuto consistentemente
- Necesites más de 50 MB de almacenamiento
- Requieras SLA garantizado
- Necesites soporte prioritario

### ¿Cuánto cuesta el tier pagado?

Aprox (puede variar por región):
- Language Service S0: ~$1/1000 llamadas
- Azure Search Basic: ~$75/mes
- Static Web Apps Standard: ~$9/mes

### ¿El sistema escala automáticamente?

Sí:
- Azure Static Web Apps escala automáticamente
- Azure Language Service maneja el load balancing
- No necesitas configurar nada

---

## 🔒 Seguridad

### ¿Es seguro almacenar las credenciales en .env.local?

Sí, para desarrollo local. El archivo `.env.local` está en `.gitignore` y no se sube a GitHub.

En producción, las variables van a Azure Portal > Configuration (encriptadas).

### ¿Puedo limitar quién usa la aplicación?

Sí, opciones:
1. Agregar autenticación (Azure AD, Auth0, etc.)
2. Usar API keys para la aplicación
3. Configurar CORS en Azure
4. Implementar rate limiting personalizado

### ¿Los datos de los usuarios se almacenan?

No, el sistema no almacena:
- Preguntas de usuarios
- Datos personales
- Historial de búsquedas

Todo es stateless y procesado en tiempo real.

---

## 📱 Mobile y Accesibilidad

### ¿Funciona en móviles?

Sí, el diseño es completamente responsive:
- Mobile-first approach
- Funciona en iOS y Android
- Optimizado para pantallas pequeñas

### ¿Es accesible?

Sí, incluye:
- Semántica HTML correcta
- Contraste de colores adecuado
- Navegación por teclado
- Compatible con lectores de pantalla

---

## 🌍 Internacionalización

### ¿Puedo usar otros idiomas?

Sí, pasos:
1. Crea una base de conocimiento en otro idioma
2. Traduce el frontend
3. Configura el idioma en Azure Language Service
4. Despliega

Azure soporta múltiples idiomas incluyendo inglés, francés, alemán, etc.

### ¿Puedo tener múltiples idiomas simultáneamente?

Sí, necesitas:
1. Crear un proyecto por idioma en Azure
2. Implementar selector de idioma en el frontend
3. Llamar al proyecto correcto según el idioma seleccionado

---

## 📚 Recursos Adicionales

### ¿Dónde encuentro más documentación?

- `README.md` - Descripción general
- `AZURE_SETUP_GUIDE.md` - Configuración de Azure
- `EJEMPLOS_RESPUESTAS.md` - Ejemplos de uso
- `ENTREGA.md` - Documento completo de entrega

### ¿Hay tutoriales en video?

Este proyecto no incluye videos, pero puedes encontrar tutoriales sobre:
- [Azure Language Service](https://learn.microsoft.com/azure/cognitive-services/language-service/)
- [Next.js](https://www.youtube.com/c/Vercel)
- [Azure Static Web Apps](https://learn.microsoft.com/azure/static-web-apps/)

### ¿Puedo contribuir al proyecto?

Sí, contribuciones bienvenidas:
1. Fork el repositorio
2. Crea una rama para tu feature
3. Haz tus cambios
4. Envía un Pull Request

---

## 🎓 Casos de Uso Avanzados

### ¿Puedo integrarlo con un chatbot?

Sí, ideas:
- Usar la API route como backend para WhatsApp Bot
- Integrar con Telegram Bot
- Crear un bot de Discord
- Usar con Microsoft Teams

### ¿Puedo crear una app móvil nativa?

Sí:
- Usa React Native con la misma API
- O Flutter/Swift/Kotlin llamando a la API route
- La lógica de backend no cambia

### ¿Puedo agregar voz?

Sí:
- Azure Speech Service para voz a texto
- Text-to-Speech para leer respuestas
- Crear un asistente de voz completo

---

## 🤝 Soporte

### ¿Dónde puedo obtener ayuda?

1. Revisa esta FAQ
2. Lee la documentación en el proyecto
3. Busca en Azure Docs
4. Revisa los issues en GitHub
5. Contacta al mantenedor del proyecto

### ¿Cómo reporto un bug?

1. Ve a GitHub Issues
2. Describe el problema claramente
3. Incluye pasos para reproducir
4. Agrega capturas si es posible
5. Menciona tu entorno (OS, Node version, etc.)

---

**¿No encontraste tu pregunta?** Revisa la documentación completa o crea un issue en GitHub.
