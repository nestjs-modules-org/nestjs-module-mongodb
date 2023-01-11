import type { Provider } from "@nestjs/common";
import { ConfigurableModuleBuilder } from "@nestjs/common";

import {
  MongoModuleExtraOptions,
  MongoModuleOptions,
} from "./interfaces/mongo-module-options.interface";

import { getOptionsToken } from "./common/utils";

import {
  createClientNameProvider,
  createClientProvider,
} from "./mongo-core.providers";

function modifyOptionsProvider(provider: Provider, name?: string) {
  if (typeof provider !== "object") throw new Error("Something went wrong");
  provider.provide = getOptionsToken(name);
}

export const { ConfigurableModuleClass, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<MongoModuleOptions>()
    .setClassMethodName("forRoot")
    .setExtras<MongoModuleExtraOptions>({}, (definition, { clientName }) => {
      const [optionsProvider] = definition.providers;
      modifyOptionsProvider(optionsProvider, clientName);
      const clientNameProvider = createClientNameProvider(clientName);
      const clientProvider = createClientProvider(clientName);
      definition.providers = [
        clientNameProvider,
        optionsProvider,
        clientProvider,
      ];
      definition.exports = [clientProvider];
      return definition;
    })
    .build();
