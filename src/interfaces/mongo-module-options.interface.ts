import type { MongoClientOptions } from "mongodb";

export type MongoModuleOptions = {
  url: string;
  retryAttempts?: number;
  retryDelay?: number;
} & MongoClientOptions;

export type MongoModuleExtraOptions = { clientName?: string };
