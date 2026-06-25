import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "اتصل بنا - خدمات الإصلاح" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    setSent(true);
    setLoading(false);
  };

  return (
    <main className="min-h-[80vh]">
      {/* Hero */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">اتصل بنا</h1>
          <p className="text-xl text-blue-100">نحن هنا لمساعدتك في أي وقت</p>
        </div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">معلومات التواصل</h2>
              <div className="space-y-4">
                {[
                  { icon: "📞", title: "الهاتف", value: "+212 6 00 00 00 00", link: "tel:+212600000000", dir: "ltr" },
                  { icon: "💬", title: "واتساب", value: "+212 6 00 00 00 00", link: "https://wa.me/212600000000", dir: "ltr" },
                  { icon: "📧", title: "البريد الإلكتروني", value: "info@repair-services.ma", link: "mailto:info@repair-services.ma", dir: "ltr" },
                  { icon: "📍", title: "العنوان", value: "الدار البيضاء، المغرب", link: null, dir: "rtl" },
                  { icon: "🕐", title: "ساعات العمل", value: "السبت - الخميس: 8ص - 8م", link: null, dir: "rtl" },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4 bg-white rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">{item.title}</p>
                      {item.link ? (
                        <a
                          href={item.link}
                          target={item.link.startsWith("http") ? "_blank" : undefined}
                          rel="noopener noreferrer"
                          className="font-medium text-blue-600 hover:underline"
                          dir={item.dir as "ltr" | "rtl"}
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium text-gray-900">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/212600000000?text=مرحباً، أريد الاستفسار عن خدماتكم"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-xl transition-colors font-medium text-lg"
              >
                <span className="text-2xl">💬</span>
                تواصل معنا عبر واتساب
              </a>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">أرسل رسالة</h2>
              {sent ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-xl font-bold text-green-800 mb-2">تم إرسال رسالتك!</h3>
                  <p className="text-green-700">سنتواصل معك في أقرب وقت ممكن.</p>
                  <Button
                    onClick={() => { setSent(false); setForm({ name: "", email: "", phone: "", message: "" }); }}
                    className="mt-4 bg-green-600 hover:bg-green-700 text-white"
                  >
                    إرسال رسالة أخرى
                  </Button>
                </div>
              ) : (
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          placeholder="محمد أحمد"
                          value={form.name}
                          onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">البريد الإلكتروني</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="example@email.com"
                          value={form.email}
                          onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+212 6 00 00 00 00"
                          value={form.phone}
                          onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                          required
                          dir="ltr"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">رسالتك *</Label>
                        <textarea
                          id="message"
                          placeholder="اكتب رسالتك هنا..."
                          value={form.message}
                          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base"
                      >
                        {loading ? "جاري الإرسال..." : "إرسال الرسالة"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
