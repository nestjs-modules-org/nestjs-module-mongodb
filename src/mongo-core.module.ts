import type { OnApplicationShutdown } from "@nestjs/common";
import { Global, Inject, Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";

import { getClientToken } from "./common/utils";

import { MONGODB_CLIENT_NAME_TOKEN } from "./mongo.constants";
import { ConfigurableModuleClass } from "./mongo-core.module-definition";

@Global()
@Module({})
export class MongoCoreModule
  extends ConfigurableModuleClass
  implements OnApplicationShutdown
{
  @Inject(MONGODB_CLIENT_NAME_TOKEN) private readonly clientName: string;
  @Inject(ModuleRef) private readonly moduleRef: ModuleRef;

  onApplicationShutdown() {
    const client = this.moduleRef.get(getClientToken(this.clientName));
    return client.close();
  }
}
