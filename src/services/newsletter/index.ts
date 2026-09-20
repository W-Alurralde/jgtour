export interface NewsletterResponse {
  success: boolean;

  subscriber?: {
    email: string;
    status: string;
    alreadySubscribed?: boolean;
  };

  error?: string;
}

const NEWSLETTER_API_URL =
  import.meta.env.VITE_NEWSLETTER_API_URL;

export async function subscribeNewsletter(
  email: string
): Promise<NewsletterResponse> {
  if (!NEWSLETTER_API_URL) {
    throw new Error(
      "Falta la variable VITE_NEWSLETTER_API_URL"
    );
  }

  const response = await fetch(
    NEWSLETTER_API_URL,
    {
      method: "POST",

      headers: {
        "Content-Type":
          "text/plain;charset=utf-8",
      },

      body: JSON.stringify({
        action: "subscribeNewsletter",

        data: {
          email,
          source: "footer",
        },
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      `Error en newsletter: ${response.status}`
    );
  }

  const result: NewsletterResponse =
    await response.json();

  if (!result.success) {
    throw new Error(
      result.error ||
        "No se pudo completar la suscripción"
    );
  }

  return result;
}