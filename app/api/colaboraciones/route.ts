import { NextResponse } from "next/server";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "La solicitud no tiene un formato válido." }, { status: 400 });
  }

  if (
    !isRecord(body) ||
    typeof body.name !== "string" ||
    typeof body.email !== "string" ||
    typeof body.organization !== "string" ||
    typeof body.message !== "string" ||
    body.consent !== true
  ) {
    return NextResponse.json({ error: "Completa los campos y acepta el tratamiento de datos." }, { status: 400 });
  }

  const name = body.name.trim();
  const email = body.email.trim().toLowerCase();
  const organization = body.organization.trim();
  const message = body.message.trim();
  if (!name || name.length > 200 || !organization || organization.length > 200 || message.length < 5 || message.length > 5000) {
    return NextResponse.json({ error: "Revisa los campos: la propuesta debe tener entre 5 y 5000 caracteres." }, { status: 400 });
  }
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ingresa una dirección de correo válida." }, { status: 400 });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("Collaboration form is not configured: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.");
    return NextResponse.json({ error: "El formulario todavía no está disponible. Inténtalo más tarde." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/collaboration_requests`, {
      method: "POST",
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({ name, email, organization, message, consent: true }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Could not reach Supabase to save a collaboration request.", error);
    return NextResponse.json({ error: "No pudimos guardar tu propuesta. Inténtalo de nuevo más tarde." }, { status: 502 });
  }

  if (!response.ok) {
    console.error(`Supabase rejected the collaboration request with status ${response.status}.`);
    return NextResponse.json({ error: "No pudimos guardar tu propuesta. Inténtalo de nuevo más tarde." }, { status: 502 });
  }

  return NextResponse.json({ status: "saved" }, { status: 201 });
}
