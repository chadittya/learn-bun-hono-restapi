import { prisma } from "../application/database";
import {
  LoginUserRequest,
  RegisterUserRequest,
  toUserResponse,
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
}