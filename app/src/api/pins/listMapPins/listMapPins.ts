import {
  collection,
  getDocsFromCache,
  getDocsFromServer,
  limit,
  query,
  where,
  type Firestore,
} from "firebase/firestore";
import { PinSchema, type Pin } from "../schemas";

interface ListMapPinsOptions {
  firestore: Firestore;
  userId: string;
  mapId: string;
  latitude: {
    upperBound: number;
    lowerBound: number;
  };
  longitude: {
    upperBound: number;
    lowerBound: number;
  };
}
export const listMapPins = async ({
  firestore,
  userId,
  mapId,
  latitude,
  longitude,
}: ListMapPinsOptions): Promise<Pin[]> => {
  const listMapPinsInBoundaryQuery = query(
    collection(firestore, "users", userId, "maps", mapId, "pins"),
    where("latitude", ">=", latitude.lowerBound),
    where("latitude", "<=", latitude.upperBound),
    where("longitude", ">=", longitude.lowerBound),
    where("longitude", "<=", longitude.upperBound),
    limit(20),
  );

  const { docs: cachedDocuments } = await getDocsFromCache(listMapPinsInBoundaryQuery).catch((error: unknown) => {
    console.log("Failed to list cached pin documents in Firestore", error);
    throw error;
  });
  if (cachedDocuments.length > 0) {
    const parsedDocuments = cachedDocuments.map((document) => document.data());
    const { data, success, error } = PinSchema.array().safeParse(parsedDocuments);

    if (success) {
      return data;
    } else {
      console.error("failed to parse cached documents", error);
      return [];
    }
  }

  const { docs: documents } = await getDocsFromServer(listMapPinsInBoundaryQuery).catch((error: unknown) => {
    console.log("Failed to list pin documents in Firestore", error);
    throw error;
  });
  if (documents.length > 0) {
    const parsedDocuments = documents.map((document) => document.data());
    const { data, success, error } = PinSchema.array().safeParse(parsedDocuments);

    if (success) {
      return data;
    } else {
      console.error("failed to parse documents", error);
      return [];
    }
  }

  return [];
};
