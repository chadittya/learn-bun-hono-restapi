import { Hono } from "hono";
import { LoginUserRequest, RegisterUserRequest } from "../models/user.model";
import { UserService } from "../services/user.services";

export const userController = new Hono();

userController.post("/api/users", async (c) => {
  const request = (await c.req.json()) as RegisterUserRequest;

  const response = await UserService.register(request);

  return c.json({
    data: response,
  });
});

userController.post("/api/users/login", async (c) => {
  const request = (await c.req.json()) as LoginUserRequest;

  const response = await UserService.login(request);

  return c.json({
    data: response,
  });
});
