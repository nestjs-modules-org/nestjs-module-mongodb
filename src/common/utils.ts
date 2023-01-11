export const MONGODB_DEFAULT_NAME = "default";

export function getOptionsToken(name = MONGODB_DEFAULT_NAME) {
  return `MONGODB_CONFIG(${name})`;
}

export function getClientToken(name = MONGODB_DEFAULT_NAME) {
  return `MongoDBClient_${name}`;
}

export function getDbToken(name = MONGODB_DEFAULT_NAME, clientName?: string) {
  return `${getClientToken(clientName)}/MongoDBDatabase_${name}`;
}

export function getCollectionToken(
  name: string,
  dbName?: string,
  clientName?: string
) {
  return `${getDbToken(dbName, clientName)}/MongoDBCollection_${name}`;
}
