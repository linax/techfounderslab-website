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

- **Videos:** el sitio está conectado al feed público del canal `@TechFoundersLab` y se actualiza automáticamente cada hora, sin API key. El arreglo `videos` funciona como respaldo manual si YouTube no responde.
- **Libros:** agrega un objeto al arreglo `books`. Usa `proximamente` hasta tener una fecha y un enlace de compra confirmados.
- **Enlaces oficiales:** completa `youtubeUrl`, `email` y, si corresponde, `parsifalUrl` dentro de `site`.
- **Fotografía:** cuando exista una foto oficial de Carolina, guárdala en `public/images/` y reemplaza los bloques `CL.` mediante `next/image` con un texto alternativo descriptivo.
- **Estadísticas:** incorpóralas solo después de verificarlas y añade su fecha de actualización.

## Newsletter y contacto

El formulario de newsletter envía el correo a Beehiiv desde `app/api/newsletter/route.ts`; la API key solo se usa en el servidor. Para activarlo en local y producción:

1. Crea una API key de Beehiiv con permiso para crear suscripciones (`subscriptions:write`).
2. Define `BEEHIIV_API_KEY` y `BEEHIIV_PUB_ID` como variables privadas en `.env` o `.env.local` y en el entorno de despliegue. El ID de publicación debe ser el ID prefijado que muestra Beehiiv (por ejemplo, `pub_...`); no añadas estas variables con el prefijo `NEXT_PUBLIC_`.
3. Configura el doble opt-in en Beehiiv. La integración respeta esa configuración y muestra instrucciones para confirmar por correo cuando la suscripción queda pendiente.
4. Para colaboraciones, crea la tabla indicada abajo en Supabase y define `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` como variables privadas del servidor en `.env.local` y en el entorno de despliegue. No uses el prefijo `NEXT_PUBLIC_` para la clave.
5. Completa y revisa legalmente la política de privacidad antes del lanzamiento.

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

### Tabla de solicitudes de colaboración en Supabase

Ejecuta este SQL en el editor SQL de Supabase. Las solicitudes quedan protegidas frente a lectura directa desde el navegador; solo el endpoint del servidor, con su clave privada, las inserta.

```sql
create table public.collaboration_requests (
  id bigint generated always as identity primary key,
  name text not null,
  email text not null,
  organization text not null,
  message text not null,
  consent boolean not null check (consent = true),
  created_at timestamptz not null default now()
);

alter table public.collaboration_requests enable row level security;
```

Guarda `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY` como variables privadas en el entorno de despliegue. La clave de servicio de Supabase debe permanecer solo en el servidor.
