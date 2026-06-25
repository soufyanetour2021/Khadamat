import { Router } from "express";
import { desc, count, eq } from "drizzle-orm";
import { getDb } from "../db.js";
import { consultations, users, ratings } from "../schema.js";
import { adminMiddleware } from "../middleware/auth.js";

export const adminRouter = Router();

// All admin routes require admin role
adminRouter.use(adminMiddleware);

// GET /api/admin/consultations
adminRouter.get("/consultations", async (_req, res) => {
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الطلبات." });
  }
});

// GET /api/admin/stats
adminRouter.get("/stats", async (_req, res) => {
  try {
    const db = getDb();

    const [totalConsultations] = await db.select({ count: count() }).from(consultations);
    const [totalUsers] = await db.select({ count: count() }).from(users);
    const [totalRatings] = await db.select({ count: count() }).from(ratings);

    const pendingRows = await db
      .select()
      .from(consultations)
      .where(eq(consultations.status, "pending"));

    const completedRows = await db
      .select()
      .from(consultations)
      .where(eq(consultations.status, "completed"));

    const inProgressRows = await db
      .select()
      .from(consultations)
      .where(eq(consultations.status, "in_progress"));

    res.json({
      totalConsultations: totalConsultations.count,
      totalUsers: totalUsers.count,
      totalRatings: totalRatings.count,
      pendingConsultations: pendingRows.length,
      completedConsultations: completedRows.length,
      inProgressConsultations: inProgressRows.length,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الإحصائيات." });
  }
});

// GET /api/admin/users
adminRouter.get("/users", async (_req, res) => {
  try {
    const db = getDb();
    const rows = await db.select({
      id: users.id,
      fullName: users.fullName,
      email: users.email,
      phone: users.phone,
      role: users.role,
      isBlocked: users.isBlocked,
      createdAt: users.createdAt,
    }).from(users).orderBy(desc(users.createdAt));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});

// PATCH /api/admin/users/:id/block
adminRouter.patch("/users/:id/block", async (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    const { isBlocked } = req.body;
    await db.update(users).set({ isBlocked }).where(eq(users.id, id));
    res.json({ message: "تم تحديث حالة المستخدم." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});
