// API types for the Arabic repair services platform

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone?: string | null;
  role: "customer" | "admin" | "technician";
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface ServiceCategory {
  id: number;
  nameAr: string;
  icon: string;
  description?: string | null;
  services?: Service[];
}

export interface Service {
  id: number;
  categoryId: number;
  nameAr: string;
  descriptionAr?: string | null;
  basePrice?: string | null;
}

export type ConsultationStatus =
  | "pending"
  | "reviewing"
  | "quoted"
  | "scheduled"
  | "in_progress"
  | "completed"
  | "cancelled";

export type ConsultationUrgency = "normal" | "urgent" | "very_urgent";

export interface Consultation {
  id: number;
  userId?: number | null;
  fullName: string;
  phone: string;
  city: string;
  address: string;
  serviceType: string;
  problemDescription: string;
  urgency: ConsultationUrgency;
  status: ConsultationStatus;
  estimatedCost?: string | null;
  estimatedDuration?: string | null;
  requiredMaterials?: string | null;
  scheduledDate?: string | null;
  assignedTechnicianId?: number | null;
  latitude?: string | null;
  longitude?: string | null;
  createdAt: string;
  images?: ConsultationImage[];
}

export interface ConsultationImage {
  id: number;
  consultationId: number;
  imageUrl: string;
  createdAt: string;
}

export interface Rating {
  id: number;
  consultationId: number;
  userId: number;
  qualityRating: number;
  speedRating: number;
  treatmentRating: number;
  comment?: string | null;
  createdAt: string;
}

export interface Notification {
  id: number;
  userId: number;
  titleAr: string;
  messageAr: string;
  isRead: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalConsultations: number;
  totalUsers: number;
  totalRatings: number;
  pendingConsultations: number;
  completedConsultations: number;
  inProgressConsultations: number;
}

export interface CreateConsultationInput {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  serviceType: string;
  problemDescription: string;
  urgency: ConsultationUrgency;
  latitude?: number;
  longitude?: number;
  images?: string[];
  userId?: number;
}
