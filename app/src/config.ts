import { z } from "zod";

const envVarsSchema = z.object({
  VITE_FIREBASE_APPCHECK_DEBUG_TOKEN: z.string().optional(),
  VITE_FIREBASE_API_KEY: z.string(),
  VITE_RECAPTCHA_SITE_KEY: z.string(),
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
  },
  recaptcha: {
    siteKey: envVars.data.VITE_RECAPTCHA_SITE_KEY,
  },
};
