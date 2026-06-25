import { Router } from "express";
import { getDb } from "../db.js";
import { serviceCategories, services } from "../schema.js";
import { eq } from "drizzle-orm";

export const servicesRouter = Router();

// GET /api/services/categories - all categories with their services
servicesRouter.get("/categories", async (_req, res) => {
  try {
    const db = getDb();
    const categories = await db.select().from(serviceCategories);
    const allServices = await db.select().from(services);

    const result = categories.map((cat) => ({
      ...cat,
      services: allServices.filter((s) => s.categoryId === cat.id),
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الخدمات." });
  }
});

// GET /api/services - all services
servicesRouter.get("/", async (_req, res) => {
  try {
    const db = getDb();
    const allServices = await db.select().from(services);
    res.json(allServices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء جلب الخدمات." });
  }
});

// Seed categories if empty
servicesRouter.post("/seed", async (_req, res) => {
  try {
    const db = getDb();
    const existing = await db.select().from(serviceCategories).limit(1);
    if (existing.length > 0) {
      res.json({ message: "البيانات موجودة بالفعل." });
      return;
    }

    const cats = [
      { nameAr: "الكهرباء", icon: "⚡", description: "خدمات الكهرباء والإنارة" },
      { nameAr: "السباكة", icon: "🔧", description: "خدمات السباكة والمياه" },
      { nameAr: "النجارة", icon: "🪚", description: "خدمات النجارة والأثاث" },
      { nameAr: "الصباغة", icon: "🎨", description: "خدمات الطلاء والدهان" },
      { nameAr: "التكييف", icon: "❄️", description: "خدمات التكييف والتبريد" },
      { nameAr: "الترميم", icon: "🏗️", description: "خدمات الترميم والتجديد" },
    ];

    for (const cat of cats) {
      const [result] = await db.insert(serviceCategories).values(cat);
      const catId = (result as { insertId: number }).insertId;

      const subServices: { categoryId: number; nameAr: string }[] = [];
      if (cat.nameAr === "الكهرباء") {
        subServices.push(
          { categoryId: catId, nameAr: "إصلاح الأعطال الكهربائية" },
          { categoryId: catId, nameAr: "تركيب المقابس والأسلاك" },
          { categoryId: catId, nameAr: "تركيب الإنارة" },
          { categoryId: catId, nameAr: "إصلاح لوحات الكهرباء" },
        );
      } else if (cat.nameAr === "السباكة") {
        subServices.push(
          { categoryId: catId, nameAr: "إصلاح التسربات" },
          { categoryId: catId, nameAr: "تركيب الحنفيات" },
          { categoryId: catId, nameAr: "تركيب السخانات" },
          { categoryId: catId, nameAr: "إصلاح أنابيب المياه" },
        );
      } else if (cat.nameAr === "النجارة") {
        subServices.push(
          { categoryId: catId, nameAr: "تركيب الأبواب والنوافذ" },
          { categoryId: catId, nameAr: "إصلاح الخزائن" },
          { categoryId: catId, nameAr: "صناعة الأثاث المخصص" },
        );
      } else if (cat.nameAr === "الصباغة") {
        subServices.push(
          { categoryId: catId, nameAr: "طلاء المنازل" },
          { categoryId: catId, nameAr: "طلاء المحلات التجارية" },
          { categoryId: catId, nameAr: "إصلاح التشققات والجدران" },
        );
      } else if (cat.nameAr === "التكييف") {
        subServices.push(
          { categoryId: catId, nameAr: "تركيب المكيفات" },
          { categoryId: catId, nameAr: "الصيانة والتنظيف" },
          { categoryId: catId, nameAr: "تعبئة الغاز" },
        );
      } else if (cat.nameAr === "الترميم") {
        subServices.push(
          { categoryId: catId, nameAr: "تجديد المنازل" },
          { categoryId: catId, nameAr: "تجديد المحلات التجارية" },
          { categoryId: catId, nameAr: "إصلاح الأضرار" },
        );
      }

      if (subServices.length > 0) {
        await db.insert(services).values(subServices);
      }
    }

    res.json({ message: "تم إضافة البيانات بنجاح." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ أثناء إضافة البيانات." });
  }
});

// GET /api/services/categories/:id
servicesRouter.get("/categories/:id", async (req, res) => {
  try {
    const db = getDb();
    const id = parseInt(req.params.id);
    const [cat] = await db.select().from(serviceCategories).where(eq(serviceCategories.id, id)).limit(1);
    if (!cat) {
      res.status(404).json({ error: "الفئة غير موجودة." });
      return;
    }
    const catServices = await db.select().from(services).where(eq(services.categoryId, id));
    res.json({ ...cat, services: catServices });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "حدث خطأ." });
  }
});
