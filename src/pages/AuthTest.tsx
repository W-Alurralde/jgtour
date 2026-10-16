
import { useState } from "react";
import {
  auth,
  checkAdminClaim,
} from "../config/firebase";

type TestResult = {
  status: number;
  message: string;
};

export default function AuthTest() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<TestResult | null>(null);

  const [adminLoading, setAdminLoading] = useState(false);
  const [adminResult, setAdminResult] = useState<boolean | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);

  const [inventoryLoading, setInventoryLoading] = useState(false);
  const [inventoryResult, setInventoryResult] =
    useState<TestResult | null>(null);

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

      const token = await user.getIdToken(true);

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

  async function testAdminPermission() {
    setAdminLoading(true);
    setAdminResult(null);
    setAdminError(null);

    try {
      if (!auth.currentUser) {
        setAdminError("Primero iniciá sesión con Google.");
        return;
      }

      const isAdmin = await checkAdminClaim();

      setAdminResult(isAdmin);
    } catch (error) {
      setAdminError(
        error instanceof Error
          ? error.message
          : "No se pudo verificar el permiso administrativo."
      );
    } finally {
      setAdminLoading(false);
    }
  }

  async function testInventoryAccess() {
    setInventoryLoading(true);
    setInventoryResult(null);

    try {
      const user = auth.currentUser;

      if (!user) {
        setInventoryResult({
          status: 401,
          message: "Primero iniciá sesión con Google.",
        });
        return;
      }

      // Seguridad: esta prueba solo debe realizarse
      // con una cuenta sin permisos administrativos.
      const tokenResult = await user.getIdTokenResult(true);

      if (tokenResult.claims.admin === true) {
        setInventoryResult({
          status: 0,
          message:
            "Prueba bloqueada: esta cuenta es administradora. " +
            "Utilizá una cuenta sin permiso admin.",
        });
        return;
      }

      const response = await fetch(
        "/api/admin/inventory/preview",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${tokenResult.token}`,
          },
          cache: "no-store",
        }
      );

      // No mostramos información del inventario.
      // Solo el código HTTP y el mensaje de error.
      const data = await response.json();

      setInventoryResult({
        status: response.status,
        message:
          response.status === 403
            ? data.error ?? "Acceso administrativo denegado."
            : response.status === 200
              ? "ALERTA: el servidor permitió el acceso."
              : data.error ?? "Respuesta inesperada del servidor.",
      });
    } catch (error) {
      setInventoryResult({
        status: 0,
        message:
          error instanceof Error
            ? error.message
            : "Error desconocido.",
      });
    } finally {
      setInventoryLoading(false);
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
        Esta página permite verificar la autenticación con
        Firebase y los permisos administrativos de tu cuenta.
      </p>

      <section style={{ marginTop: 32 }}>
        <h2>1. Autenticación Firebase</h2>

        <p>
          Comprueba la comunicación segura con el backend.
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
          <div role="status" style={{ marginTop: 16 }}>
            <p>
              <strong>HTTP:</strong> {result.status}
            </p>
            <p>{result.message}</p>
          </div>
        )}
      </section>

      <hr style={{ margin: "32px 0" }} />

      <section>
        <h2>2. Permiso administrador</h2>

        <p>
          Renueva el ID Token y verifica el Custom Claim
          admin sin mostrar el token.
        </p>

        <button
          type="button"
          onClick={testAdminPermission}
          disabled={adminLoading}
        >
          {adminLoading
            ? "Verificando permiso..."
            : "Verificar permiso Admin"}
        </button>

        {adminResult !== null && (
          <div role="status" style={{ marginTop: 16 }}>
            <p>
              <strong>Administrador:</strong>{" "}
              {adminResult ? "true" : "false"}
            </p>
            <p>
              {adminResult
                ? "Permiso administrativo reconocido correctamente."
                : "La sesión actual no tiene el permiso admin."}
            </p>
          </div>
        )}

        {adminError && (
          <p role="alert" style={{ marginTop: 16 }}>
            {adminError}
          </p>
        )}
      </section>

      <hr style={{ margin: "32px 0" }} />

      <section>
        <h2>3. Acceso administrativo al inventario</h2>

        <p>
          Comprueba que una cuenta autenticada sin permiso
          administrador no pueda acceder al inventario.
        </p>

        <button
          type="button"
          onClick={testInventoryAccess}
          disabled={inventoryLoading}
        >
          {inventoryLoading
            ? "Verificando acceso..."
            : "Probar acceso al inventario"}
        </button>

        {inventoryResult && (
          <div role="status" style={{ marginTop: 16 }}>
            <p>
              <strong>HTTP:</strong> {inventoryResult.status}
            </p>

            <p>{inventoryResult.message}</p>

            {inventoryResult.status === 403 && (
              <p>
                Acceso denegado correctamente. La cuenta no
                tiene permisos administrativos.
              </p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
