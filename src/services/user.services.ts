import { User } from "@prisma/client";
import { prisma } from "../application/database";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
  UpdateUserRequest,
  UserResponse,
} from "../models/user.model";
import { UserValidation } from "../validations/user.validation";
import { HTTPException } from "hono/http-exception";

export class UserService {
  static async register(request: RegisterUserRequest): Promise<UserResponse> {
    request = UserValidation.REGISTER.parse(request);

    const totalSameUser = await prisma.user.count({
      where: { username: request.username },
    });
    if (totalSameUser != 0) {
      throw new HTTPException(400, {
        message: "Username already exist",
      });
    }

    request.password = await Bun.password.hash(request.password, {
      algorithm: "bcrypt",
      cost: 10,
    });

    const user = await prisma.user.create({
      data: request,
    });

    return toUserResponse(user);
  }

  static async login(request: LoginUserRequest): Promise<UserResponse> {
    request = UserValidation.LOGIN.parse(request);

    let user = await prisma.user.findUnique({
      where: {
        username: request.username,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "Username or Password is wrong",
      });
    }

    const verifyPassword = await Bun.password.verify(
      request.password,
      user.password,
      "bcrypt"
    );

    if (!verifyPassword) {
      throw new HTTPException(401, {
        message: "Username or Password is wrong",
      });
    }

    user = await prisma.user.update({
      where: {
        username: request.username,
      },
      data: {
        token: crypto.randomUUID(),
      },
    });

    const response = toUserResponse(user);
    response.token = user.token!;

    return response;
  }

  static async get(token: string | undefined | null): Promise<User> {
    const result = UserValidation.TOKEN.safeParse(token);

    if (result.error) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    token = result.data;

    const user = await prisma.user.findFirst({
      where: {
        token: token,
      },
    });

    if (!user) {
      throw new HTTPException(401, {
        message: "Unauthorized",
      });
    }

    return user;
  }

  static async update(
    user: User,
    request: UpdateUserRequest
  ): Promise<UserResponse> {
    request = UserValidation.UPDATE.parse(request);

    if (request.name) {
      user.name = request.name;
    }

    if (request.password) {
      user.password = await Bun.password.hash(request.password, {
        algorithm: "bcrypt",
        cost: 10,
      });
    }

    user = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: user,
    });

    return toUserResponse(user);
  }

  static async logout(user: User): Promise<boolean> {
    await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        token: null,
      },
    });

    return true;
  }
}
