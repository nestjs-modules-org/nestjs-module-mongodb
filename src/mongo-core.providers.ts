import { Logger } from "@nestjs/common";
import { MongoClient } from "mongodb";
import { defer, lastValueFrom, retry, timer } from "rxjs";

import type {
  MongoModuleOptions,
  MongoModuleExtraOptions,
} from "./interfaces/mongo-module-options.interface";
import {
  MONGODB_DEFAULT_NAME,
  getClientToken,
  getOptionsToken,
} from "./common/utils";
import { MONGODB_CLIENT_NAME_TOKEN } from "./mongo.constants";

export function createClientNameProvider(name = MONGODB_DEFAULT_NAME) {
  return {
    provide: MONGODB_CLIENT_NAME_TOKEN,
    useValue: name,
  };
}

export function createClientProvider(name?: string) {
  return {
    provide: getClientToken(name),
    useFactory({
      url,
      clientName = MONGODB_DEFAULT_NAME,
      retryAttempts = 6,
      retryDelay = 6e3,
      ...config
    }: MongoModuleOptions & Partial<MongoModuleExtraOptions>) {
      const logger = new Logger(`MongoModule(${clientName})`);
      const client = new MongoClient(url, config);
      return lastValueFrom(
        defer(() => client.connect()).pipe(
          retry({
            count: retryAttempts,
            delay(error, count) {
              logger.error(
                `Failed to connect to MongoDB server. Retrying in ${retryDelay}ms. Attempt ${count} of ${retryAttempts}. Error: ${error.message}`
              );
              return timer(retryDelay);
            },
          })
        )
      );
    },
    inject: [getOptionsToken(name)],
  };
}
