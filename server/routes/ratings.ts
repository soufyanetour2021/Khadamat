import { Router } from "express";
import { eq } from "drizzle-orm";
import { getDb } from "../db.js";
import { ratings } from "../schema.js";
import { authMiddleware } from "../middleware/auth.js";
import type { JwtPayload } from "../middleware/auth.js";
import type { Request } from "express";

export const ratingsRouter = Router();

type AuthRequest = Request & { user: JwtPayload };

// POST /api/ratings
ratingsRouter.post("/", authMiddleware, async (req, res) => {
  try {
    const user = (req as AuthRequest).user;
    const { consultationId, qualityRating, speedRating, treatmentRating, comment } = req.body;

    if (!consultationId || !qualityRating || !speedRating || !treatmentRating) {
      res.status(400).json({ error: "جميع التقييمات مطلوبة." });
      return;
    }

    const db = getDb();
    const [result] = await db.insert(ratings).values({
      consultationId,
      userId: user.userId,
      qualityRating,
      speedRating,
      treatmentRating,
      comment: comment || null,
    });

    res.status(201).json({ id: (result as { insertId: number }).insertId, message: "تم إرسال التقييم بنجاح." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء إرسال التقييم." });
  }
});

// GET /api/ratings/:consultationId
ratingsRouter.get("/:consultationId", async (req, res) => {
  try {
    const db = getDb();
    const consultationId = parseInt(req.params.consultationId);
    const rows = await db.select().from(ratings).where(eq(ratings.consultationId, consultationId));
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});
