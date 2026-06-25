import { Router } from "express";
import { eq, desc } from "drizzle-orm";
import { getDb } from "../db.js";
import { consultations, consultationImages } from "../schema.js";
import { authMiddleware } from "../middleware/auth.js";
import type { JwtPayload } from "../middleware/auth.js";
import type { Request } from "express";

export const consultationsRouter = Router();

type AuthRequest = Request & { user: JwtPayload };

// POST /api/consultations - create consultation (public)
consultationsRouter.post("/", async (req, res) => {
  try {
    const {
      fullName,
      phone,
      city,
      address,
      serviceType,
      problemDescription,
      urgency = "normal",
      latitude,
      longitude,
      images = [],
      userId,
    } = req.body;

    if (!fullName || !phone || !city || !address || !serviceType || !problemDescription) {
      res.status(400).json({ error: "جميع الحقول المطلوبة يجب ملؤها." });
      return;
    }

    const db = getDb();
    const [result] = await db.insert(consultations).values({
      userId: userId || null,
      fullName,
      phone,
      city,
      address,
      serviceType,
      problemDescription,
      urgency: urgency as "normal" | "urgent" | "very_urgent",
      status: "pending",
      latitude: latitude ? String(latitude) : null,
      longitude: longitude ? String(longitude) : null,
    });

    const consultationId = (result as { insertId: number }).insertId;

    if (images && images.length > 0) {
      for (const imageUrl of images) {
        await db.insert(consultationImages).values({ consultationId, imageUrl });
      }
    }

    res.status(201).json({ id: consultationId, message: "تم إرسال طلب الاستشارة بنجاح." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء إرسال الطلب." });
  }
});

// GET /api/consultations - list (requires auth)
consultationsRouter.get("/", authMiddleware, async (req, res) => {
  try {
    const user = (req as AuthRequest).user;
    const db = getDb();

    let rows;
    if (user.role === "admin") {
      rows = await db.select().from(consultations).orderBy(desc(consultations.createdAt));
    } else {
      rows = await db
        .select()
        .from(consultations)
        .where(eq(consultations.userId, user.userId))
        .orderBy(desc(consultations.createdAt));
    }

    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الطلبات." });
  }
});

// GET /api/consultations/:id
consultationsRouter.get("/:id", authMiddleware, async (req, res) => {
  try {
    const user = (req as AuthRequest).user;
    const db = getDb();
    const id = parseInt(String(req.params.id));

    const [consultation] = await db
      .select()
      .from(consultations)
      .where(eq(consultations.id, id))
      .limit(1);

    if (!consultation) {
      res.status(404).json({ error: "الطلب غير موجود." });
      return;
    }

    if (user.role !== "admin" && consultation.userId !== user.userId) {
      res.status(403).json({ error: "غير مسموح." });
      return;
    }

    const images = await db
      .select()
      .from(consultationImages)
      .where(eq(consultationImages.consultationId, id));

    res.json({ ...consultation, images });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});

// PATCH /api/consultations/:id - update status/quote (admin)
consultationsRouter.patch("/:id", authMiddleware, async (req, res) => {
  try {
    const user = (req as AuthRequest).user;
    if (user.role !== "admin") {
      res.status(403).json({ error: "غير مسموح." });
      return;
    }

    const db = getDb();
    const id = parseInt(String(req.params.id));
    const { status, estimatedCost, estimatedDuration, requiredMaterials, scheduledDate, assignedTechnicianId } = req.body;

    const updateData: Partial<typeof consultations.$inferInsert> = {};
    if (status) updateData.status = status;
    if (estimatedCost !== undefined) updateData.estimatedCost = String(estimatedCost);
    if (estimatedDuration) updateData.estimatedDuration = estimatedDuration;
    if (requiredMaterials) updateData.requiredMaterials = requiredMaterials;
    if (scheduledDate) updateData.scheduledDate = new Date(scheduledDate);
    if (assignedTechnicianId) updateData.assignedTechnicianId = assignedTechnicianId;

    await db.update(consultations).set(updateData).where(eq(consultations.id, id));

    res.json({ message: "تم تحديث الطلب بنجاح." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء تحديث الطلب." });
  }
});
