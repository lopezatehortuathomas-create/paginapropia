<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/bd472bfd-866b-4803-a06a-fbc96209c64d

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Abrir con Live Server

Live Server no puede ejecutar directamente los archivos React/TypeScript del proyecto. Primero genera la versión estática:

1. Instala las dependencias con `npm install`.
2. Ejecuta `npm run build`.
3. En VS Code, abre `dist/index.html` con Live Server.

Cada vez que hagas cambios en el código, vuelve a ejecutar `npm run build` antes de actualizar la página.
