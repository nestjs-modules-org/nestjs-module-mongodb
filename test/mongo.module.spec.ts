import { Module } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import {
  MongoModule,
  getClientToken,
  getCollectionToken,
  getDbToken,
} from "../src";

@Module({
  imports: [
    MongoModule.registerDb(),
    MongoModule.registerDb("test"),
    MongoModule.registerDb({ clientName: "test" }),
    MongoModule.registerCollection("test"),
    MongoModule.registerCollection({ dbName: "test", name: "test" }),
    MongoModule.registerCollection({ clientName: "test", name: "test" }),
  ],
})
export class TestModule {}

const url = "mongodb://localhost:27017/test";

describe("MongoModule", async () => {
  let moduleRef: TestingModule;

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [
        MongoModule.forRoot(url),
        MongoModule.forRoot({ clientName: "test", url }),
        TestModule,
      ],
    }).compile();
  });

  afterAll(async () => {
    await moduleRef.close();
  });

  it("Client should resolve", () => moduleRef.get(getClientToken()));
  it("Client with a name should resolve", () =>
    moduleRef.get(getClientToken("test")));

  it("DB should resolve", () => moduleRef.get(getDbToken()));
  it("DB with a name should resolve", () => moduleRef.get(getDbToken("test")));
  it("DB with a client name should resolve", () =>
    moduleRef.get(getDbToken(undefined, "test")));

  it("Collection should resolve", () =>
    moduleRef.get(getCollectionToken("test")));
  it("Collection with a DB name should resolve", () =>
    moduleRef.get(getCollectionToken("test", "test")));
  it("Collection with a client name should resolve", () =>
    moduleRef.get(getCollectionToken("test", undefined, "test")));
});
