import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { getDb } from "../db.js";
import { notifications } from "../schema.js";
import { authMiddleware } from "../middleware/auth.js";
import type { JwtPayload } from "../middleware/auth.js";
import type { Request } from "express";

export const notificationsRouter = Router();

type AuthRequest = Request & { user: JwtPayload };

// GET /api/notifications
notificationsRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = (req as AuthRequest).user;
    const db = getDb();
    const rows = await db
      .select()
      .from(notifications)
      .where(eq(notifications.userId, user.userId))
      .orderBy(desc(notifications.createdAt));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الإشعارات." });
  }
});

// PATCH /api/notifications/:id/read
notificationsRouter.patch("/:id/read", authMiddleware, async (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(String(req.params.id));
    await db.update(notifications).set({ isRead: true }).where(eq(notifications.id, id));
    res.json({ message: "تم تحديث الإشعار." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});
