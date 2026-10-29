# Dewys Eguis — Portafolio V4

HTML, CSS y JavaScript; listo para GitHub Pages tras conectar Formspree.

## Activar formulario (obligatorio)

1. Crea una cuenta en https://formspree.io/ con el correo donde quieras recibir mensajes.
2. Crea un formulario para «Contacto portafolio Dewys Eguis» y verifica el correo si te lo solicita.
3. Copia el ID del endpoint (ej.: `https://formspree.io/f/abcdefgh` → `abcdefgh`).
4. En `script.js`, reemplaza `TU_FORM_ID` por ese ID público. **No publiques contraseñas ni API keys.**
5. Publica y realiza una prueba desde la URL pública; confirma la recepción en el panel y en tu correo, revisando spam.

El formulario se comunica con Formspree mediante HTTPS; no requiere backend propio. El envío funciona únicamente después de la configuración del ID. Los datos son procesados por Formspree: revisa su política y configura controles anti-spam y privacidad.

## Publicación

Sube `index.html`, `styles.css` y `script.js` a la raíz del repositorio GitHub Pages (o la carpeta configurada para Pages). No necesitas `npm install`.

## Nota

Los proyectos y la portada de la V3 se conservaron. La V4 modifica únicamente el formulario y su documentación.


## Contacto por WhatsApp (V5)
El formulario valida nombre, correo y descripción, y abre WhatsApp con el mensaje prellenado hacia +57 301 227 5448. No usa Formspree ni Web3Forms. El visitante debe pulsar **Enviar** en WhatsApp; abrir el enlace no envía nada automáticamente. Para cambiar el número, modifica `WHATSAPP_NUMBER` en `script.js` (código internacional sin +).
