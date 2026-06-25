import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { api } from "@/lib/api";
import { setToken, setStoredUser } from "@/lib/auth";
import { useQueryClient } from "@tanstack/react-query";
import type { AuthResponse } from "@/lib/api-types";

export const Route = createFileRoute("/auth/register")({
  head: () => ({ meta: [{ title: "إنشاء حساب - خدمات الإصلاح" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ fullName: "", email: "", phone: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("كلمتا المرور غير متطابقتين.");
      return;
    }
    if (form.password.length < 6) {
      setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل.");
      return;
    }

    setLoading(true);
    try {
      const data = await api.post<AuthResponse>("/auth/register", {
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      setToken(data.token);
      setStoredUser(data.user);
      queryClient.setQueryData(["auth", "me"], data.user);
      navigate({ to: "/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إنشاء الحساب.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl">🔨</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">إنشاء حساب جديد</h1>
          <p className="text-gray-600 mt-1">انضم إلى آلاف العملاء الراضين</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center text-lg text-gray-700">بياناتك الشخصية</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="fullName">الاسم الكامل *</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder="محمد أحمد"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="example@email.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+212 6 00 00 00 00"
                  value={form.phone}
                  onChange={handleChange}
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور *</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  required
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور *</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  dir="ltr"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base"
                disabled={loading}
              >
                {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">أو التسجيل بـ</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <span className="text-lg">🔵</span>
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <span className="text-lg">🔷</span>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <span className="text-lg">🍎</span>
                  <span className="hidden sm:inline">Apple</span>
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              لديك حساب بالفعل؟{" "}
              <Link to="/auth/login" className="text-blue-600 hover:underline font-medium">
                تسجيل الدخول
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
