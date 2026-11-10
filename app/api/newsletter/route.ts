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

  if (!isRecord(body) || typeof body.email !== "string" || body.consent !== true) {
    return NextResponse.json({ error: "Ingresa un correo válido y acepta la política de privacidad." }, { status: 400 });
  }

  const email = body.email.trim().toLowerCase();
  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Ingresa una dirección de correo válida." }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const publicationId = process.env.BEEHIIV_PUB_ID;
  if (!apiKey || !publicationId) {
    console.error("Beehiiv newsletter is not configured: BEEHIIV_API_KEY and BEEHIIV_PUB_ID are required.");
    return NextResponse.json({ error: "La suscripción todavía no está disponible. Inténtalo más tarde." }, { status: 503 });
  }

  let response: Response;
  try {
    response = await fetch(`https://api.beehiiv.com/v2/publications/${encodeURIComponent(publicationId)}/subscriptions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: false,
        double_opt_override: "not_set",
        utm_source: "techfounderslab",
        utm_medium: "website",
        utm_campaign: "newsletter_signup",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(10_000),
    });
  } catch (error) {
    console.error("Could not reach Beehiiv to create a newsletter subscription.", error);
    return NextResponse.json({ error: "No pudimos conectar con el servicio de suscripción. Inténtalo de nuevo más tarde." }, { status: 502 });
  }

  if (!response.ok) {
    console.error(`Beehiiv rejected the newsletter subscription request with status ${response.status}.`);
    return NextResponse.json({ error: "Beehiiv no pudo procesar la suscripción. Revisa tu correo e inténtalo más tarde." }, { status: 502 });
  }

  let result: unknown;
  try {
    result = await response.json();
  } catch (error) {
    console.error("Beehiiv returned an invalid response for the newsletter subscription.", error);
    return NextResponse.json({ error: "No pudimos confirmar la suscripción. Inténtalo de nuevo más tarde." }, { status: 502 });
  }

  const data = isRecord(result) && isRecord(result.data) ? result.data : null;
  if (!data || typeof data.status !== "string") {
    console.error("Beehiiv returned an unexpected newsletter subscription response.");
    return NextResponse.json({ error: "No pudimos confirmar la suscripción. Inténtalo de nuevo más tarde." }, { status: 502 });
  }

  if (data.status !== "active" && data.status !== "pending" && data.status !== "validating") {
    console.error(`Beehiiv created a subscription with unexpected status ${data.status}.`);
    return NextResponse.json({ error: "No se pudo completar la suscripción con ese correo. Verifica la dirección e inténtalo de nuevo." }, { status: 422 });
  }

  return NextResponse.json({ status: data.status });
}
