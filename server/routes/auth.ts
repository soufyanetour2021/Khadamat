import { Router } from "express";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { getDb } from "../db.js";
import { users } from "../schema.js";
import { signToken } from "../middleware/auth.js";

export const authRouter = Router();

// POST /api/auth/register
authRouter.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, provider = "local" } = req.body;

    if (!fullName || !email) {
      res.status(400).json({ error: "الاسم الكامل والبريد الإلكتروني مطلوبان." });
      return;
    }

    const db = getDb();
    const existing = await db.select().from(users).where(eq(users.email, email)).limit(1);
    if (existing.length > 0) {
      res.status(409).json({ error: "البريد الإلكتروني مستخدم بالفعل." });
      return;
    }

    let passwordHash: string | undefined;
    if (password) {
      passwordHash = await bcrypt.hash(password, 10);
    }

    const [result] = await db.insert(users).values({
      fullName,
      email,
      phone: phone || null,
      passwordHash: passwordHash || null,
      role: "customer",
      provider: provider as "local" | "google" | "facebook" | "apple",
      isBlocked: false,
    });

    const userId = (result as { insertId: number }).insertId;
    const token = signToken({ userId, email, role: "customer" });

    res.status(201).json({
      token,
      user: { id: userId, fullName, email, phone, role: "customer" },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء إنشاء الحساب." });
  }
});

// POST /api/auth/login
authRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ error: "البريد الإلكتروني وكلمة المرور مطلوبان." });
      return;
    }

    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

    if (!user) {
      res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({ error: "تم حظر هذا الحساب. يرجى التواصل مع الدعم." });
      return;
    }

    if (!user.passwordHash) {
      res.status(401).json({ error: "هذا الحساب يستخدم تسجيل الدخول الاجتماعي." });
      return;
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "البريد الإلكتروني أو كلمة المرور غير صحيحة." });
      return;
    }

    const token = signToken({ userId: user.id, email: user.email, role: user.role });

    res.json({
      token,
      user: { id: user.id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء تسجيل الدخول." });
  }
});

// GET /api/auth/me
authRouter.get("/me", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "غير مصرح." });
      return;
    }
    const { verifyToken } = await import("../middleware/auth.js");
    const payload = verifyToken(authHeader.slice(7));
    const db = getDb();
    const [user] = await db.select().from(users).where(eq(users.id, payload.userId)).limit(1);
    if (!user) {
      res.status(404).json({ error: "المستخدم غير موجود." });
      return;
    }
    res.json({ id: user.id, fullName: user.fullName, email: user.email, phone: user.phone, role: user.role });
  } catch {
    res.status(401).json({ error: "رمز المصادقة غير صالح." });
  }
});
