import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "خدمات الإصلاح والصيانة - المنازل والمحلات" },
      {
        name: "description",
        content: "منصة متخصصة في خدمات إصلاح وصيانة المنازل والمحلات التجارية بأعلى معايير الجودة والسرعة.",
      },
    ],
  }),
  component: LandingPage,
});

const serviceCategories = [
  {
    icon: "⚡",
    name: "الكهرباء",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    services: ["إصلاح الأعطال الكهربائية", "تركيب المقابس والأسلاك", "تركيب الإنارة", "إصلاح لوحات الكهرباء"],
  },
  {
    icon: "🔧",
    name: "السباكة",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    services: ["إصلاح التسربات", "تركيب الحنفيات", "تركيب السخانات", "إصلاح أنابيب المياه"],
  },
  {
    icon: "🪚",
    name: "النجارة",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    services: ["تركيب الأبواب والنوافذ", "إصلاح الخزائن", "صناعة الأثاث المخصص"],
  },
  {
    icon: "🎨",
    name: "الصباغة",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
    services: ["طلاء المنازل", "طلاء المحلات التجارية", "إصلاح التشققات والجدران"],
  },
  {
    icon: "❄️",
    name: "التكييف",
    color: "bg-cyan-50 border-cyan-200",
    iconBg: "bg-cyan-100",
    services: ["تركيب المكيفات", "الصيانة والتنظيف", "تعبئة الغاز"],
  },
  {
    icon: "🏗️",
    name: "الترميم",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    services: ["تجديد المنازل", "تجديد المحلات التجارية", "إصلاح الأضرار"],
  },
];

const stats = [
  { value: "+5000", label: "عميل راضٍ", icon: "👥" },
  { value: "+8000", label: "مشروع منجز", icon: "✅" },
  { value: "+200", label: "فني متخصص", icon: "👷" },
  { value: "4.9/5", label: "تقييم العملاء", icon: "⭐" },
];

const cities = ["الدار البيضاء", "تيط مليل", "مديونة", "برشيد", "المحمدية", "النواصر"];

const testimonials = [
  {
    name: "أحمد بنعلي",
    city: "الدار البيضاء",
    rating: 5,
    comment: "خدمة ممتازة وسريعة. الفني وصل في الوقت المحدد وأصلح المشكلة الكهربائية بكفاءة عالية.",
  },
  {
    name: "فاطمة الزهراء",
    city: "المحمدية",
    rating: 5,
    comment: "تجربة رائعة! طلبت خدمة السباكة وتم الرد بسرعة وإرسال فني محترف. أنصح بهم بشدة.",
  },
  {
    name: "محمد الإدريسي",
    city: "برشيد",
    rating: 5,
    comment: "أفضل خدمة صيانة استخدمتها. الأسعار معقولة والجودة عالية. شكراً جزيلاً.",
  },
];

function LandingPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-white/20 text-white border-white/30 text-sm px-4 py-1">
            🏆 الخدمة الأولى في المنطقة
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            احصل على أفضل خدمات
            <br />
            <span className="text-orange-300">إصلاح وصيانة</span>
            <br />
            المنازل والمحلات
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            بسرعة وأمان وبأسعار تنافسية. فنيون محترفون في خدمتك على مدار الساعة في الدار البيضاء والمناطق المجاورة.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6 rounded-xl shadow-lg"
            >
              <Link to="/consultation">📋 طلب استشارة مجانية</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-700 text-lg px-8 py-6 rounded-xl"
            >
              <Link to="/services">🔍 استعرض خدماتنا</Link>
            </Button>
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-blue-100 text-sm">
            <span className="flex items-center gap-2">✅ ضمان الجودة</span>
            <span className="flex items-center gap-2">⚡ استجابة سريعة</span>
            <span className="flex items-center gap-2">💰 أسعار تنافسية</span>
            <span className="flex items-center gap-2">🛡️ فنيون معتمدون</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-blue-700">{stat.value}</div>
                <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">خدماتنا</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">كل ما تحتاجه في مكان واحد</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              نقدم مجموعة شاملة من خدمات الإصلاح والصيانة للمنازل والمحلات التجارية
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat) => (
              <Card key={cat.name} className={`service-card border-2 ${cat.color} hover:shadow-lg cursor-pointer`}>
                <CardContent className="p-6">
                  <div className={`w-14 h-14 ${cat.iconBg} rounded-xl flex items-center justify-center text-3xl mb-4`}>
                    {cat.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{cat.name}</h3>
                  <ul className="space-y-1">
                    {cat.services.map((service) => (
                      <li key={service} className="text-gray-600 text-sm flex items-center gap-2">
                        <span className="text-blue-500">•</span>
                        {service}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white" size="sm">
                    <Link to="/consultation">طلب الخدمة</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link to="/services">عرض جميع الخدمات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">كيف يعمل</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">3 خطوات بسيطة</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", icon: "📋", title: "أرسل طلبك", desc: "املأ نموذج الاستشارة المجانية مع وصف المشكلة وموقعك" },
              { step: "2", icon: "📞", title: "نتواصل معك", desc: "يتواصل معك فريقنا لتحديد موعد مناسب وتقديم عرض السعر" },
              { step: "3", icon: "✅", title: "نحل المشكلة", desc: "يصل الفني المتخصص ويحل المشكلة بكفاءة وضمان الجودة" },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="py-16 px-4 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">مناطق التغطية</h2>
          <p className="text-blue-200 mb-8">نخدم المناطق التالية وما حولها</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <Badge key={city} className="bg-white/20 text-white border-white/30 text-base px-4 py-2">
                📍 {city}
              </Badge>
            ))}
          </div>
          <p className="mt-6 text-blue-200 text-sm">هل مدينتك غير مدرجة؟ تواصل معنا وسنحاول خدمتك</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">آراء العملاء</p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">ماذا يقول عملاؤنا</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Card key={t.name} className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex mb-3">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-yellow-400 text-xl">⭐</span>
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 leading-relaxed">"{t.comment}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{t.name}</p>
                      <p className="text-gray-500 text-sm">{t.city}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">هل تحتاج إلى مساعدة؟</h2>
          <p className="text-gray-600 mb-8 text-lg">
            احصل على استشارة مجانية الآن ودعنا نحل مشكلتك بسرعة واحترافية
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 rounded-xl">
              <Link to="/consultation">📋 طلب استشارة مجانية</Link>
            </Button>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-lg px-8 py-4 rounded-xl transition-colors font-medium"
            >
              💬 تواصل عبر واتساب
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
