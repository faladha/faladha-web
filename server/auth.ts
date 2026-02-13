import { Request, Response, NextFunction } from "express";
import bcrypt from "bcryptjs";
import { storage } from "./storage";

declare module "express-session" {
  interface SessionData {
    userId?: string;
    userRole?: string;
    userEmail?: string;
    userName?: string;
  }
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "غير مصرح - يرجى تسجيل الدخول" });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "غير مصرح - يرجى تسجيل الدخول" });
  }
  if (req.session.userRole !== "admin") {
    return res.status(403).json({ error: "ليس لديك صلاحيات كافية" });
  }
  next();
}

export function requireEditor(req: Request, res: Response, next: NextFunction) {
  if (!req.session?.userId) {
    return res.status(401).json({ error: "غير مصرح - يرجى تسجيل الدخول" });
  }
  if (req.session.userRole !== "admin" && req.session.userRole !== "editor") {
    return res.status(403).json({ error: "ليس لديك صلاحيات كافية" });
  }
  next();
}
