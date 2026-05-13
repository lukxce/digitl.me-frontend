import { getStrapiUrl } from "./strapi.js";

/**
 * @param {string} email
 */
export async function createSubscriber(email) {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (process.env.STRAPI_API_TOKEN) {
    headers.set("Authorization", `Bearer ${process.env.STRAPI_API_TOKEN}`);
  }

  const res = await fetch(getStrapiUrl("api/subscribers"), {
    method: "POST",
    headers,
    body: JSON.stringify({
      data: { email },
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Strapi ${res.status} ${res.statusText}: ${body.slice(0, 500)}`,
    );
  }

  return res.json();
}
