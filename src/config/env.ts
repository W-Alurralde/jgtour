function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Falta la variable de entorno: ${name}`);
  }

  return value;
}

export const ENV = {
  APP_NAME: import.meta.env.VITE_APP_NAME || "JGTravel",
  APP_ENV: import.meta.env.VITE_APP_ENV || "development",
  API_URL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",

  FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
};

export function getFirebaseEnv() {
  return {
    apiKey: required("VITE_FIREBASE_API_KEY", ENV.FIREBASE_API_KEY),
    authDomain: required("VITE_FIREBASE_AUTH_DOMAIN", ENV.FIREBASE_AUTH_DOMAIN),
    projectId: required("VITE_FIREBASE_PROJECT_ID", ENV.FIREBASE_PROJECT_ID),
    storageBucket: required("VITE_FIREBASE_STORAGE_BUCKET", ENV.FIREBASE_STORAGE_BUCKET),
    messagingSenderId: required("VITE_FIREBASE_MESSAGING_SENDER_ID", ENV.FIREBASE_MESSAGING_SENDER_ID),
    appId: required("VITE_FIREBASE_APP_ID", ENV.FIREBASE_APP_ID),
  };
}