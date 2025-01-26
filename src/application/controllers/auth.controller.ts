import { Request, Response } from "express";
import { loginService } from "../services/auth.service";

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    const token = await loginService(email, password);
    return res.status(200).json(token);
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
