import User from "../../domain/entities/user.entity";
import UserRepository from "../../infrastructure/repositories/user.repository";
import Payload from "../../shared/utils/payload";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
const JWT_EXPIRATION = "1h";
const SALT_ROUNDS = 10;

export async function loginService(email: string, password: string): Promise<string> {
  try {
    const user = await UserRepository.getByEmail(email);
    if(!user) {
      throw new Error("Invalid email");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
  }
  catch(err: any) {
    if(err.message === "Invalid email" || err.message === "Invalid password") {
      throw err;
    }
    throw new Error("Error during login");
  }
}

export async function registerService(user: User): Promise<string> {
  try {
    const existingUser = await UserRepository.getByEmail(user.email);
    if(existingUser) {
      throw new Error("Email already exist");
    }

    const hashedPassword = await bcrypt.hash(user.password, SALT_ROUNDS);

    const newUser = await UserRepository.addUser({
      username: user.username,
      email: user.email,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
  }
  catch(err: any) {
    if(err.message === "Email already exist") {
      throw err;
    }
    throw new Error("Error during registration");
  }
}

export async function decodeToken(token: string): Promise<User> {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as Payload;
    const user = await UserRepository.getUserById(decoded.id);

    if(!user) {
      throw new Error("User not found");
    }

    return user;
  }
  catch(err: any) {
    if(err.message === "User not found") {
      throw err;
    }
    throw new Error("Invalid or expired token");
  }
}
