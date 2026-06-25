import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import type { Consultation } from "@/lib/api-types";

export const Route = createFileRoute("/dashboard/")({
  head: () => ({ meta: [{ title: "طلباتي - خدمات الإصلاح" }] }),
  component: DashboardPage,
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

const urgencyLabels: Record<string, string> = {
  normal: "عادي",
  urgent: "عاجل",
  very_urgent: "عاجل جداً",
};

function DashboardPage() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const { data: consultations, isLoading, error } = useQuery<Consultation[]>({
    queryKey: ["consultations", "my"],
    queryFn: () => api.get<Consultation[]>("/consultations"),
    enabled: isAuthenticated,
  });

  if (!isAuthenticated) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">يجب تسجيل الدخول</h1>
          <p className="text-gray-600 mb-6">سجل دخولك لمتابعة طلباتك</p>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/auth/login">تسجيل الدخول</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] px-4 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">طلباتي</h1>
            <p className="text-gray-600 mt-1">مرحباً، {user?.fullName}</p>
          </div>
          <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
            <Link to="/consultation">+ طلب جديد</Link>
          </Button>
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">⏳</div>
            <p className="text-gray-600">جاري تحميل طلباتك...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            ⚠️ {error instanceof Error ? error.message : "حدث خطأ أثناء تحميل الطلبات."}
          </div>
        )}

        {!isLoading && consultations && consultations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">لا توجد طلبات بعد</h2>
            <p className="text-gray-600 mb-6">أرسل طلب استشارتك الأولى الآن</p>
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/consultation">طلب استشارة مجانية</Link>
            </Button>
          </div>
        )}

        {consultations && consultations.length > 0 && (
          <div className="space-y-4">
            {consultations.map((c) => {
              const status = statusLabels[c.status] || { label: c.status, color: "bg-gray-100 text-gray-700" };
              return (
                <Card key={c.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900 text-lg">{c.serviceType}</h3>
                          <Badge className={status.color}>{status.label}</Badge>
                          {c.urgency !== "normal" && (
                            <Badge className="bg-orange-100 text-orange-700">
                              {urgencyLabels[c.urgency]}
                            </Badge>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{c.problemDescription}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📍 {c.city}</span>
                          <span>📅 {new Date(c.createdAt).toLocaleDateString("ar-MA")}</span>
                          {c.estimatedCost && (
                            <span className="text-green-700 font-medium">
                              💰 التكلفة المقدرة: {c.estimatedCost} درهم
                            </span>
                          )}
                          {c.estimatedDuration && (
                            <span>⏱️ المدة: {c.estimatedDuration}</span>
                          )}
                        </div>
                        {c.scheduledDate && (
                          <div className="mt-2 bg-indigo-50 border border-indigo-200 rounded-lg px-3 py-2 text-sm text-indigo-800">
                            📅 الموعد المحدد: {new Date(c.scheduledDate).toLocaleString("ar-MA")}
                          </div>
                        )}
                        {c.requiredMaterials && (
                          <div className="mt-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700">
                            🔩 المواد المطلوبة: {c.requiredMaterials}
                          </div>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        #{c.id}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
