import {
  mysqlTable,
  varchar,
  text,
  int,
  timestamp,
  boolean,
  decimal,
  mysqlEnum,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  phone: varchar("phone", { length: 50 }),
  passwordHash: varchar("password_hash", { length: 255 }),
  role: mysqlEnum("role", ["customer", "admin", "technician"]).default("customer").notNull(),
  provider: mysqlEnum("provider", ["local", "google", "facebook", "apple"])
    .default("local")
    .notNull(),
  isBlocked: boolean("is_blocked").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const serviceCategories = mysqlTable("service_categories", {
  id: int("id").autoincrement().primaryKey(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  icon: varchar("icon", { length: 100 }).notNull(),
  description: text("description"),
});

export const services = mysqlTable("services", {
  id: int("id").autoincrement().primaryKey(),
  categoryId: int("category_id").notNull(),
  nameAr: varchar("name_ar", { length: 255 }).notNull(),
  descriptionAr: text("description_ar"),
  basePrice: decimal("base_price", { precision: 10, scale: 2 }),
});

export const consultations = mysqlTable("consultations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id"),
  fullName: varchar("full_name", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 50 }).notNull(),
  city: varchar("city", { length: 100 }).notNull(),
  address: text("address").notNull(),
  serviceType: varchar("service_type", { length: 100 }).notNull(),
  problemDescription: text("problem_description").notNull(),
  urgency: mysqlEnum("urgency", ["normal", "urgent", "very_urgent"]).default("normal").notNull(),
  status: mysqlEnum("status", [
    "pending",
    "reviewing",
    "quoted",
    "scheduled",
    "in_progress",
    "completed",
    "cancelled",
  ])
    .default("pending")
    .notNull(),
  estimatedCost: decimal("estimated_cost", { precision: 10, scale: 2 }),
  estimatedDuration: varchar("estimated_duration", { length: 100 }),
  requiredMaterials: text("required_materials"),
  scheduledDate: timestamp("scheduled_date"),
  assignedTechnicianId: int("assigned_technician_id"),
  latitude: decimal("latitude", { precision: 10, scale: 8 }),
  longitude: decimal("longitude", { precision: 11, scale: 8 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const consultationImages = mysqlTable("consultation_images", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultation_id").notNull(),
  imageUrl: text("image_url").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ratings = mysqlTable("ratings", {
  id: int("id").autoincrement().primaryKey(),
  consultationId: int("consultation_id").notNull(),
  userId: int("user_id").notNull(),
  qualityRating: int("quality_rating").notNull(),
  speedRating: int("speed_rating").notNull(),
  treatmentRating: int("treatment_rating").notNull(),
  comment: text("comment"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  titleAr: varchar("title_ar", { length: 255 }).notNull(),
  messageAr: text("message_ar").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
