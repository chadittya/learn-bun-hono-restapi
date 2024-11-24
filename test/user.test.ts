import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import app from "../src";
import { logger } from "../src/application/logging";
import { UserTest } from "./test.utils";

describe("POST /api/users", () => {
  afterEach(async () => {
    await UserTest.delete();
  });
  it("should reject register new user if request is invalid", async () => {
    const response = await app.request("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: "",
        password: "",
        name: "",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(400);
    expect(body.error).toBeDefined();
  });
  it("should reject register new user if username already exist", async () => {
    await UserTest.create();

    const response = await app.request("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "test",
        name: "test",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(400);
    expect(body.error).toBeDefined();
  });
  it("should can register new user", async () => {
    const response = await app.request("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "test",
        name: "test",
      }),
    });

    const body = await response.json();
    logger.debug(body);

    expect(response.status).toBe(200);
    expect(body.data).toBeDefined();
    expect(body.data.username).toBe("test");
    expect(body.data.name).toBe("test");
  });
});

describe("POST /api/users/login", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should can login", async () => {
    const response = await app.request("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "test",
      }),
    });

    const body = await response.json();
    // logger.debug(body)

    expect(response.status).toBe(200);
    expect(body.data.token).toBeDefined();
  });
  it("should reject if username wrong", async () => {
    const response = await app.request("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: "wrongtest",
        password: "test",
      }),
    });

    const body = await response.json();
    // logger.debug(body)

    expect(response.status).toBe(401);
    expect(body.error).toBeDefined();
  });
  it("should reject if password wrong", async () => {
    const response = await app.request("/api/users/login", {
      method: "POST",
      body: JSON.stringify({
        username: "test",
        password: "wrongpassword",
      }),
    });

    const body = await response.json();
    // logger.debug(body)

    expect(response.status).toBe(401);
    expect(body.error).toBeDefined();
  });
});
