import { createMessage } from "../../../lib/messages.js";

function normalizeEmail(value) {
  if (typeof value !== "string") return null;
  const email = value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return null;
  return email;
}

function normalizeText(value) {
  if (typeof value !== "string") return null;
  const text = value.trim();
  return text.length > 0 ? text : null;
}

export async function POST(request) {
  let payload;
  try {
    payload = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const email = normalizeEmail(payload?.data?.email);
  const text = normalizeText(payload?.data?.text);

  if (!email) {
    return Response.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (!text) {
    return Response.json({ error: "Message text is required." }, { status: 400 });
  }

  try {
    const data = await createMessage({ email, text });
    return Response.json(data, { status: 201 });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to create message.";
    return Response.json({ error: message }, { status: 502 });
  }
}
