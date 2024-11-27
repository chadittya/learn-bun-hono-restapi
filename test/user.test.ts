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

describe("GET /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be able to get user", async () => {
    const response = await app.request("/api/users/current", {
      method: "get",
      headers: {
        Authorization: "test",
      },
    });

    expect(response.status).toBe(200);

    // console.log(response);

    const body = await response.json();
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.username).toBe("test");
    expect(body.data.name).toBe("test");
  });
  it("should not be able to get user if token is invalid", async () => {
    const response = await app.request("/api/users/current", {
      method: "get",
      headers: {
        Authorization: "wrong",
      },
    });

    expect(response.status).toBe(401);

    // console.log(response);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });
  it("should not be able to get user if dont have authorization header header", async () => {
    const response = await app.request("/api/users/current", {
      method: "get",
    });

    expect(response.status).toBe(401);

    // console.log(response);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });
});

describe("PATCH /api/users/current", () => {
  beforeEach(async () => {
    await UserTest.create();
  });
  afterEach(async () => {
    await UserTest.delete();
  });

  it("should be rejected if request is invalid", async () => {
    const response = await app.request("/api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        name: "",
        password: "",
      }),
    });

    expect(response.status).toBe(400);

    // console.log(response);

    const body = await response.json();
    // console.log(body);
    expect(body.error).toBeDefined();
  });

  it("should can update name only", async () => {
    const response = await app.request("/api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        name: "galih",
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    // logger.error(body);
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.name).toBe("galih");
  });

  it("should can update password only", async () => {
    let response = await app.request("/api/users/current", {
      method: "patch",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        password: "update",
      }),
    });

    expect(response.status).toBe(200);

    // console.log(response);

    const body = await response.json();
    // logger.error(body);
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.name).toBe("test");

    response = await app.request("/api/users/login", {
      method: "post",
      body: JSON.stringify({
        username: "test",
        password: "update",
      }),
    });

    expect(response.status).toBe(200);
  });
});
