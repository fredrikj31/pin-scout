import type { FirebaseOptions } from "firebase/app";
import { config } from "../config";

export const firebaseConfig: FirebaseOptions = {
  apiKey: config.firebase.apiKey,
  authDomain: "pin-scout.firebaseapp.com",
  projectId: "pin-scout",
  storageBucket: "pin-scout.firebasestorage.app",
  messagingSenderId: "759133125883",
  appId: "1:759133125883:web:e2e414aeb328801c59845e",
  measurementId: "G-5MHMQWCDSC",
};
