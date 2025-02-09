import { Request, Response } from "express";
import { loginService, registerService, decodeTokenService } from "../services/auth.service";
import User from "../../domain/entities/user.entity";
import UserValidation from "../../domain/validations/user.validation";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    return res.status(200).json({ token: token });
  }
  catch(err: any) {
    if(err.message === "Invalid email") {
      return res.status(400).json({ error: "Invalid email" });
    }
    else if(err.message === "Invalid password") {
      return res.status(400).json({ error: "Invalid password" });
    }
    else if(err.message === "Error during login") {
      return res.status(500).json({ error: "Error during login" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}

export async function register(req: Request, res: Response) {
  try {
    const { error, value } = UserValidation.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const user: User = value;
    const token = await registerService(user);
    return res.status(201).json({ token: token });
  }
  catch(err: any) {
    if(err.message === "Email already exist") {
      return res.status(400).json({ error: "Email already exist" });
    }
    else if(err.message === "Error during registration") {
      return res.status(500).json({ error: "Error during registration" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}

export async function decodeToken(req: Request, res: Response) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) {
      return res.status(401).json({ error: "Token not provided" });
    }

    const user = await decodeTokenService(token);
    return res.status(200).json(user);
  }
  catch(err: any) {
    if(err.message === "User not found") {
      return res.status(404).json({ error: "User not found" });
    }
    else if(err.message === "Invalid or expired token") {
      return res.status(400).json({ error: "Invalid or expired token" });
    }
    return res.status(500).json({ error: "Internal servor error" });
  }
}
