import { describe, it, expect, afterEach, beforeEach } from "bun:test";
import { ContactTest, UserTest } from "./test.utils";
import app from "../src";
import { logger } from "../src/application/logging";

describe("POST /api/contacts", () => {
  beforeEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.create();
  });

  afterEach(async () => {
    await ContactTest.deleteAll();
    await UserTest.delete();
  });

  it("should reject if token is invalid", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "wrong",
      },
      body: JSON.stringify({
        firstName: "",
      }),
    });

    expect(response.status).toBe(401);

    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it("should reject if contact is invalid", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        firstName: "",
      }),
    });

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.error).toBeDefined();
  });

  it("should success if contact is valid (only firstName)", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        firstName: "galih",
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.firstName).toBe("galih");
    expect(body.data.lastName).toBeNull();
    expect(body.data.email).toBeNull();
    expect(body.data.phone).toBeNull();
  });

  it("should success if contact is valid (fulldata)", async () => {
    const response = await app.request("/api/contacts", {
      method: "post",
      headers: {
        Authorization: "test",
      },
      body: JSON.stringify({
        firstName: "galih",
        lastName: "arizza",
        email: "galih@galih.com",
        phone: "123456789",
      }),
    });

    expect(response.status).toBe(200);

    const body = await response.json();
    // console.log(body);
    expect(body.data).toBeDefined();
    expect(body.data.firstName).toBe("galih");
    expect(body.data.lastName).toBe("arizza");
    expect(body.data.email).toBe("galih@galih.com");
    expect(body.data.phone).toBe("123456789");
  });
});
