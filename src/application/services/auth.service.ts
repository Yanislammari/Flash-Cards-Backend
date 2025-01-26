import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepository from "../../infrastructure/repositories/user.repository";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET_KEY as string;
const JWT_EXPIRATION = "1h";

export async function loginService(email: string, password: string): Promise<string> {
  try {
    const user = await UserRepository.getByEmail(email);
    if(!user) {
      throw new Error("Invalid email or password");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      throw new Error("Invalid email or password");
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    return token;
  }
  catch(err) {
    throw new Error("Error during login");
  }
}
