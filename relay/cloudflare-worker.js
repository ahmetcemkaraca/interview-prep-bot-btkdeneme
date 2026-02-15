export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    const incomingSecret = request.headers.get("x-telegram-bot-api-secret-token") || "";
    const enforceSecret = String(env.ENFORCE_TELEGRAM_SECRET || "true").toLowerCase() !== "false";

    if (enforceSecret) {
      if (!incomingSecret || incomingSecret !== env.TELEGRAM_WEBHOOK_SECRET) {
        return new Response("Unauthorized", { status: 401 });
      }
    }

    const rawBody = await request.text();

    const response = await fetch(
      `${env.APPWRITE_ENDPOINT}/functions/${env.APPWRITE_FUNCTION_ID}/executions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Appwrite-Project": env.APPWRITE_PROJECT_ID,
          "X-Appwrite-Key": env.APPWRITE_API_KEY
        },
        body: JSON.stringify({
          path: "/",
          method: "POST",
          headers: {
            "x-telegram-bot-api-secret-token": incomingSecret
          },
          body: rawBody
        })
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      return new Response(`Relay Error: ${errText}`, { status: 502 });
    }

    return new Response("OK", { status: 200 });
  }
};
