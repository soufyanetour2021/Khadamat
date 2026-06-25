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

export const Route = createFileRoute("/auth/login")({
  head: () => ({ meta: [{ title: "تسجيل الدخول - خدمات الإصلاح" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api.post<AuthResponse>("/auth/login", { email, password });
      setToken(data.token);
      setStoredUser(data.user);
      queryClient.setQueryData(["auth", "me"], data.user);
      if (data.user.role === "admin") {
        navigate({ to: "/admin" });
      } else {
        navigate({ to: "/dashboard" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء تسجيل الدخول.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl">🔨</Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">تسجيل الدخول</h1>
          <p className="text-gray-600 mt-1">مرحباً بك مجدداً في خدمات الإصلاح</p>
        </div>

        <Card className="shadow-lg border-0">
          <CardHeader>
            <CardTitle className="text-center text-lg text-gray-700">أدخل بياناتك</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                  ⚠️ {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="text-right"
                  dir="ltr"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  dir="ltr"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base"
                disabled={loading}
              >
                {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-4 text-gray-500">أو تسجيل الدخول بـ</span>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setError("تسجيل الدخول الاجتماعي غير متاح حالياً")}
                >
                  <span className="text-lg">🔵</span>
                  <span className="hidden sm:inline">Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setError("تسجيل الدخول الاجتماعي غير متاح حالياً")}
                >
                  <span className="text-lg">🔷</span>
                  <span className="hidden sm:inline">Facebook</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2.5 px-3 hover:bg-gray-50 transition-colors text-sm font-medium"
                  onClick={() => setError("تسجيل الدخول الاجتماعي غير متاح حالياً")}
                >
                  <span className="text-lg">🍎</span>
                  <span className="hidden sm:inline">Apple</span>
                </button>
              </div>
            </div>

            <p className="text-center text-sm text-gray-600 mt-6">
              ليس لديك حساب؟{" "}
              <Link to="/auth/register" className="text-blue-600 hover:underline font-medium">
                إنشاء حساب جديد
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
