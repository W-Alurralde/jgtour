
import { initializeApp } from "firebase/app";

import {
  getAuth,
  getIdTokenResult,
  GoogleAuthProvider,
} from "firebase/auth";

import { getFirestore } from "firebase/firestore";

import { getFirebaseEnv } from "./env";

const firebaseConfig = getFirebaseEnv();

// Aplicación principal de Firebase
export const app = initializeApp(firebaseConfig);

// Autenticación con Google
export const auth = getAuth(app);

export const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Base de datos Cloud Firestore
export const db = getFirestore(app);

/**
 * JGTravel - Verificación de permisos administrativos.
 *
 * Fuerza la renovación del ID Token y comprueba
 * si el usuario tiene el Custom Claim admin=true.
 *
 * No imprime ni devuelve el token.
 */
export async function checkAdminClaim(): Promise<boolean> {
  const user = auth.currentUser;

  if (!user) {
    console.log("[JGTravel] No hay usuario autenticado");
    return false;
  }

  const tokenResult = await getIdTokenResult(user, true);

  const isAdmin = tokenResult.claims.admin === true;

  console.log("[JGTravel] Administrador:", isAdmin);

  return isAdmin;
}
