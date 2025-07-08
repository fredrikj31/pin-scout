import { z } from "zod";

const envVarsSchema = z.object({
  VITE_FIREBASE_APPCHECK_DEBUG_TOKEN: z.string().optional(),
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_FIREBASE_AUTH_DOMAIN: z.string(),
  VITE_FIREBASE_PROJECT_ID: z.string(),
  VITE_FIREBASE_STORAGE_BUCKET: z.string(),
  VITE_FIREBASE_MESSAGING_SENDER_ID: z.string(),
  VITE_FIREBASE_APP_ID: z.string(),
  VITE_FIREBASE_MEASUREMENT_ID: z.string(),
  VITE_RECAPTCHA_SITE_KEY: z.string(),
  VITE_GOOGLE_MAPS_API_KEY: z.string(),
});

const envVars = envVarsSchema.safeParse(import.meta.env);
if (!envVars.success) {
  console.error("There is an error with your environment variables.");
  throw envVars.error;
}

export const config = {
  firebase: {
    debugToken: envVars.data.VITE_FIREBASE_APPCHECK_DEBUG_TOKEN,
    apiKey: envVars.data.VITE_FIREBASE_API_KEY,
    authDomain: envVars.data.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: envVars.data.VITE_FIREBASE_PROJECT_ID,
    storageBucket: envVars.data.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: envVars.data.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: envVars.data.VITE_FIREBASE_APP_ID,
    measurementId: envVars.data.VITE_FIREBASE_MEASUREMENT_ID,
  },
  googleMaps: {
    apiKey: envVars.data.VITE_GOOGLE_MAPS_API_KEY,
  },
  recaptcha: {
    siteKey: envVars.data.VITE_RECAPTCHA_SITE_KEY,
  },
};
