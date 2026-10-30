# TechFoundersLab

Sitio editorial de TechFoundersLab construido con Next.js (App Router), TypeScript y Tailwind CSS.

## Desarrollo

```bash
npm install
npm run dev
```

La compilación de producción se valida con `npm run build`. Define `NEXT_PUBLIC_SITE_URL` con el dominio definitivo antes de desplegar para generar URLs correctas en metadatos, `sitemap.xml` y `robots.txt`.

## Mantener el contenido

El contenido editable vive en `content/site.ts`:

- **Videos:** agrega objetos reales al arreglo `videos`. Incluye título, descripción, categoría, URL de YouTube y miniatura. No añadas métricas salvo que sean verificadas. La biblioteca se actualiza automáticamente.
- **Libros:** agrega un objeto al arreglo `books`. Usa `proximamente` hasta tener una fecha y un enlace de compra confirmados.
- **Enlaces oficiales:** completa `youtubeUrl`, `email` y, si corresponde, `parsifalUrl` dentro de `site`.
- **Fotografía:** cuando exista una foto oficial de Carolina, guárdala en `public/images/` y reemplaza los bloques `CL.` mediante `next/image` con un texto alternativo descriptivo.
- **Estadísticas:** incorpóralas solo después de verificarlas y añade su fecha de actualización.

## Newsletter y contacto

Los formularios actuales son deliberadamente transparentes: validan los campos pero no fingen guardar información. Para activarlos:

1. Elige un proveedor con doble opt-in (por ejemplo, Buttondown, Kit o Brevo).
2. Crea una Route Handler en `app/api/newsletter/route.ts` que valide el email en servidor y llame al proveedor con una clave almacenada en variables de entorno.
3. Cambia `components/newsletter-form.tsx` para enviar a esa ruta y mostrar éxito únicamente después de una confirmación real del servidor.
4. Conecta el formulario de colaboraciones del mismo modo o usa un email oficial.
5. Actualiza la política de privacidad antes del lanzamiento.

## Analítica

No hay analítica ni cookies instaladas. Si se configura una herramienta, registra clics a YouTube, suscripciones **confirmadas**, libros y solicitudes de colaboración. Implementa consentimiento antes de cargar scripts no esenciales.

## Despliegue en Vercel

1. Importa este repositorio en Vercel.
2. Configura `NEXT_PUBLIC_SITE_URL` con el dominio de producción.
3. Añade las claves del proveedor de newsletter solo como variables privadas del servidor.
4. Usa `npm run build` como comando de compilación.
5. Revisa dominio, formularios, privacidad y metadatos antes de publicar.

## Pendientes de lanzamiento

- URL oficial del canal y videos reales.
- Fotografía oficial de Carolina.
- Proveedor de newsletter y doble opt-in.
- Email o endpoint de colaboraciones.
- Dominio definitivo y revisión legal de privacidad.
- Imagen Open Graph propia.
