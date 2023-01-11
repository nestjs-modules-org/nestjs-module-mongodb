import { Inject } from "@nestjs/common";
import { getClientToken, getCollectionToken, getDbToken } from "./utils";

export function InjectClient(name?: string) {
  return Inject(getClientToken(name));
}

export function InjectDb(name?: string, clientName?: string) {
  return Inject(getDbToken(name, clientName));
}

type InjectCollectionOptions = { dbName?: string; clientName?: string };

export function InjectCollection(
  name: string,
  { dbName, clientName }: InjectCollectionOptions = {}
) {
  return Inject(getCollectionToken(name, dbName, clientName));
}
