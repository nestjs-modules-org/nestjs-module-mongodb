import type { MongoClient } from "mongodb";

import { getClientToken, getDbToken, getCollectionToken } from "./common/utils";

export function createDbProvider(name?: string, clientName?: string) {
  return {
    provide: getDbToken(name, clientName),
    useFactory(client: MongoClient) {
      return client.db(name);
    },
    inject: [getClientToken(clientName)],
  };
}

export function createCollectionProvider(
  name: string,
  dbName?: string,
  clientName?: string
) {
  return {
    provide: getCollectionToken(name, dbName, clientName),
    useFactory(client: MongoClient) {
      return client.db(dbName).collection(name);
    },
    inject: [getClientToken(clientName)],
  };
}
