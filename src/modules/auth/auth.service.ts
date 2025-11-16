import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { createClient } from "redis";
import { UserService } from "@modules/users/users.service";

const redis = createClient();
redis.connect();

export class AuthService {
  static async login(email: string, password: string) {
    const user = UserService.findByEmail(email);

    if (!user) throw new Error("INVALID_CREDENTIALS");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("INVALID_CREDENTIALS");

    const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    await redis.set(`refresh:${user.id}`, refreshToken);

    return { accessToken, refreshToken };
  }

  static async refresh(token: string) {
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as any;

    const savedToken = await redis.get(`refresh:${payload.id}`);
    if (!savedToken || savedToken !== token) throw new Error("INVALID_REFRESH");

    const newAccess = jwt.sign({ id: payload.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    return { accessToken: newAccess };
  }

  static async logout(userId: number) {
    await redis.del(`refresh:${userId}`);
  }
}
