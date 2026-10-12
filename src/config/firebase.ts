
import { initializeApp } from "firebase/app";

import {
  getAuth,
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
