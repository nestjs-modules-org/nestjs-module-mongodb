# nestjs-module-mongodb

> NestJS module for MongoDB

## Installation

```sh
npm install nestjs-module-mongodb
```

## Usage

```ts
// app.module.ts
import { Module } from "@nestjs/common";
import { MongoModule } from "nestjs-module-mongodb";

@Module({
  imports: [MongoModule.forRoot("mongodb://localhost:27017/test")],
})
export class AppModule {}
// example.module.ts
import { Module } from "@nestjs/common";
import { MongoModule } from "nestjs-module-mongodb";

@Module({
  imports: [MongoModule.forCollection("example")],
})
export class ExampleModule {}
// example.service.ts
import { Injectable } from "@nestjs/common";
import { InjectCollection } from "nestjs-module-mongodb";
import type { Collection } from "mongodb";

@Injectable()
export class ExampleService {
  constructor(
    @InjectCollection("example") private readonly collection: Collection
  ) {}
}
```
