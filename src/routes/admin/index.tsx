import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import type { Consultation, AdminStats, ConsultationStatus } from "@/lib/api-types";

export const Route = createFileRoute("/admin/")({
  head: () => ({ meta: [{ title: "لوحة التحكم - خدمات الإصلاح" }] }),
  component: AdminPage,
});

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: "قيد الانتظار", color: "bg-gray-100 text-gray-700" },
  reviewing: { label: "قيد المراجعة", color: "bg-blue-100 text-blue-700" },
  quoted: { label: "تم التسعير", color: "bg-purple-100 text-purple-700" },
  scheduled: { label: "محدد موعد", color: "bg-indigo-100 text-indigo-700" },
  in_progress: { label: "جاري التنفيذ", color: "bg-yellow-100 text-yellow-700" },
  completed: { label: "مكتمل", color: "bg-green-100 text-green-700" },
  cancelled: { label: "ملغي", color: "bg-red-100 text-red-700" },
};

const statusOptions = [
  { value: "pending", label: "قيد الانتظار" },
  { value: "reviewing", label: "قيد المراجعة" },
  { value: "quoted", label: "تم التسعير" },
  { value: "scheduled", label: "محدد موعد" },
  { value: "in_progress", label: "جاري التنفيذ" },
  { value: "completed", label: "مكتمل" },
  { value: "cancelled", label: "ملغي" },
];

function EditModal({
  consultation,
  onClose,
}: {
  consultation: Consultation;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({
    status: consultation.status,
    estimatedCost: consultation.estimatedCost || "",
    estimatedDuration: consultation.estimatedDuration || "",
    requiredMaterials: consultation.requiredMaterials || "",
  });
  const [error, setError] = useState("");

  const mutation = useMutation({
    mutationFn: (data: typeof form) =>
      api.patch(`/consultations/${consultation.id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "consultations"] });
      queryClient.invalidateQueries({ queryKey: ["admin", "stats"] });
      onClose();
    },
    onError: (err) => {
      setError(err instanceof Error ? err.message : "حدث خطأ.");
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg shadow-2xl">
        <CardHeader>
          <CardTitle>تحديث الطلب #{consultation.id}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded text-sm">
              {error}
            </div>
          )}
          <div className="space-y-2">
            <Label>الحالة</Label>
            <select
              value={form.status}
              onChange={(e) => setForm((p) => ({ ...p, status: e.target.value as ConsultationStatus }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {statusOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label>التكلفة المقدرة (درهم)</Label>
            <Input
              type="number"
              placeholder="0.00"
              value={form.estimatedCost}
              onChange={(e) => setForm((p) => ({ ...p, estimatedCost: e.target.value }))}
              dir="ltr"
            />
          </div>
          <div className="space-y-2">
            <Label>المدة المقدرة</Label>
            <Input
              placeholder="مثال: يوم واحد، 3 ساعات"
              value={form.estimatedDuration}
              onChange={(e) => setForm((p) => ({ ...p, estimatedDuration: e.target.value }))}
            />
          </div>
          <div className="space-y-2">
            <Label>المواد المطلوبة</Label>
            <textarea
              placeholder="قائمة المواد والقطع المطلوبة..."
              value={form.requiredMaterials}
              onChange={(e) => setForm((p) => ({ ...p, requiredMaterials: e.target.value }))}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
            />
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <Button variant="outline" onClick={onClose}>إلغاء</Button>
            <Button
              onClick={() => mutation.mutate(form)}
              disabled={mutation.isPending}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {mutation.isPending ? "جاري الحفظ..." : "حفظ التغييرات"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminPage() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [selectedConsultation, setSelectedConsultation] = useState<Consultation | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  const { data: stats } = useQuery<AdminStats>({
    queryKey: ["admin", "stats"],
    queryFn: () => api.get<AdminStats>("/admin/stats"),
    enabled: isAdmin,
  });

  const { data: consultations, isLoading } = useQuery<Consultation[]>({
    queryKey: ["admin", "consultations"],
    queryFn: () => api.get<Consultation[]>("/admin/consultations"),
    enabled: isAdmin,
  });

  if (!isAuthenticated || !isAdmin) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">غير مسموح</h1>
          <p className="text-gray-600 mb-6">هذه الصفحة للمسؤولين فقط</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </main>
    );
  }

  const filtered = consultations?.filter(
    (c) => statusFilter === "all" || c.status === statusFilter,
  ) || [];

  return (
    <main className="min-h-[80vh] px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">لوحة التحكم</h1>
          <p className="text-gray-600 mt-1">إدارة طلبات الاستشارة والخدمات</p>
        </div>

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
            {[
              { label: "إجمالي الطلبات", value: stats.totalConsultations, icon: "📋", color: "bg-blue-50 border-blue-200" },
              { label: "المستخدمون", value: stats.totalUsers, icon: "👥", color: "bg-purple-50 border-purple-200" },
              { label: "قيد الانتظار", value: stats.pendingConsultations, icon: "⏳", color: "bg-yellow-50 border-yellow-200" },
              { label: "جاري التنفيذ", value: stats.inProgressConsultations, icon: "🔧", color: "bg-orange-50 border-orange-200" },
              { label: "مكتملة", value: stats.completedConsultations, icon: "✅", color: "bg-green-50 border-green-200" },
              { label: "التقييمات", value: stats.totalRatings, icon: "⭐", color: "bg-pink-50 border-pink-200" },
            ].map((stat) => (
              <Card key={stat.label} className={`border ${stat.color}`}>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-600 mt-1">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              statusFilter === "all" ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            الكل ({consultations?.length || 0})
          </button>
          {statusOptions.map((opt) => {
            const count = consultations?.filter((c) => c.status === opt.value).length || 0;
            return (
              <button
                key={opt.value}
                onClick={() => setStatusFilter(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === opt.value ? "bg-blue-600 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
              >
                {opt.label} ({count})
              </button>
            );
          })}
        </div>

        {/* Consultations Table */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">جاري التحميل...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border">
                <div className="text-4xl mb-3">📭</div>
                <p className="text-gray-600">لا توجد طلبات</p>
              </div>
            ) : (
              filtered.map((c) => {
                const status = statusLabels[c.status] || { label: c.status, color: "bg-gray-100 text-gray-700" };
                return (
                  <Card key={c.id} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-5">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="text-gray-400 text-sm">#{c.id}</span>
                            <h3 className="font-bold text-gray-900">{c.fullName}</h3>
                            <Badge className={status.color}>{status.label}</Badge>
                            <Badge className="bg-gray-100 text-gray-700">{c.serviceType}</Badge>
                          </div>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{c.problemDescription}</p>
                          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                            <span>📞 <span dir="ltr">{c.phone}</span></span>
                            <span>📍 {c.city}</span>
                            <span>📅 {new Date(c.createdAt).toLocaleDateString("ar-MA")}</span>
                            {c.estimatedCost && (
                              <span className="text-green-700 font-medium">💰 {c.estimatedCost} درهم</span>
                            )}
                          </div>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => setSelectedConsultation(c)}
                          className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
                        >
                          تحديث
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        )}
      </div>

      {selectedConsultation && (
        <EditModal
          consultation={selectedConsultation}
          onClose={() => setSelectedConsultation(null)}
        />
      )}
    </main>
  );
}
