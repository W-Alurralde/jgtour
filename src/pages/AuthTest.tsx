
import { useState } from "react";
import { auth } from "../config/firebase";

type TestResult = {
  status: number;
  message: string;
};

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  async function testAuthentication() {
    setLoading(true);
    setResult(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        setResult({
          status: 401,
          message: "Primero iniciá sesión con Google.",
        });
        return;
      }

      const token = await user.getIdToken();

      const response = await fetch("/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });

      const data = await response.json();

      setResult({
        status: response.status,
        message: data.success
          ? "Firebase Admin verificó correctamente tu identidad."
          : data.error ?? "No se pudo verificar la autenticación.",
      });
    } catch (error) {
      setResult({
        status: 0,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido.",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: 600,
        margin: "60px auto",
        padding: 24,
      }}
    >
      <h1>JGTravel · Prueba de autenticación</h1>

      <p>
        Esta prueba verifica la comunicación segura entre
        Firebase Authentication y el backend de Vercel.
      </p>

      <button
        type="button"
        onClick={testAuthentication}
        disabled={loading}
      >
        {loading
          ? "Verificando..."
          : "Verificar autenticación"}
      </button>

      {result && (
        <section
          role="status"
          style={{ marginTop: 24 }}
        >
          <h2>Resultado</h2>

          <p>
            <strong>HTTP:</strong> {result.status}
          </p>

          <p>{result.message}</p>
        </section>
      )}
    </main>
  );
}
