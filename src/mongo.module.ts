import type { DynamicModule } from "@nestjs/common";
import { Module } from "@nestjs/common";

import type { ForCollectionOptions } from "./interfaces/for-collection-options.interface";
import type { ForDbOptions } from "./interfaces/for-db-options.interface";
import {
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from "./mongo-core.module-definition";
import { MongoCoreModule } from "./mongo-core.module";
import { createCollectionProvider, createDbProvider } from "./mongo.providers";

@Module({})
export class MongoModule {
  static forRoot(urlOrOptions: string | typeof OPTIONS_TYPE) {
    const options =
      typeof urlOrOptions === "string" ? { url: urlOrOptions } : urlOrOptions;
    return {
      module: MongoModule,
      imports: [MongoCoreModule.forRoot(options)],
    };
  }

  static forRootAsync(options: typeof ASYNC_OPTIONS_TYPE) {
    return {
      module: MongoModule,
      imports: [MongoCoreModule.forRootAsync(options)],
    };
  }

  static registerDb(...args: (string | ForDbOptions)[]): DynamicModule {
    const options = args.flat();
    if (options.length === 0) options.push({});
    const providers = options.map((options) => {
      if (typeof options === "string") options = { name: options };
      return createDbProvider(options.name, options.clientName);
    });
    return {
      module: MongoModule,
      providers: providers,
      exports: providers,
    };
  }

  static registerCollection(
    ...args: (string | ForCollectionOptions)[]
  ): DynamicModule {
    const options = args.flat();
    const providers = options.map((options) => {
      if (typeof options === "string")
        options = {
          name: options,
        };
      return createCollectionProvider(
        options.name,
        options.dbName,
        options.clientName
      );
    });
    return {
      module: MongoModule,
      providers: providers,
      exports: providers,
    };
  }

  // TODO: registerCollectionAsync, registerDbAsync
}
