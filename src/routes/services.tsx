import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/services")({
  head: () => ({ meta: [{ title: "خدماتنا - خدمات الإصلاح" }] }),
  component: ServicesPage,
});

const serviceCategories = [
  {
    icon: "⚡",
    name: "الكهرباء",
    color: "bg-yellow-50 border-yellow-200",
    iconBg: "bg-yellow-100",
    description: "خدمات كهربائية شاملة للمنازل والمحلات التجارية",
    services: [
      "إصلاح الأعطال الكهربائية",
      "تركيب المقابس والأسلاك",
      "تركيب الإنارة والثريات",
      "إصلاح لوحات الكهرباء",
      "تركيب قواطع الحماية",
      "فحص وصيانة الشبكة الكهربائية",
    ],
  },
  {
    icon: "🔧",
    name: "السباكة",
    color: "bg-blue-50 border-blue-200",
    iconBg: "bg-blue-100",
    description: "حلول سباكة متكاملة لجميع مشاكل المياه",
    services: [
      "إصلاح التسربات",
      "تركيب الحنفيات والمغاسل",
      "تركيب السخانات",
      "إصلاح أنابيب المياه",
      "تركيب المراحيض",
      "تسليك المجاري",
    ],
  },
  {
    icon: "🪚",
    name: "النجارة",
    color: "bg-amber-50 border-amber-200",
    iconBg: "bg-amber-100",
    description: "أعمال نجارة احترافية للمنازل والمكاتب",
    services: [
      "تركيب الأبواب والنوافذ",
      "إصلاح الخزائن والأدراج",
      "صناعة الأثاث المخصص",
      "تركيب الأرضيات الخشبية",
      "إصلاح الأثاث المكسور",
    ],
  },
  {
    icon: "🎨",
    name: "الصباغة",
    color: "bg-pink-50 border-pink-200",
    iconBg: "bg-pink-100",
    description: "خدمات طلاء ودهان احترافية بأعلى جودة",
    services: [
      "طلاء المنازل الداخلي",
      "طلاء المنازل الخارجي",
      "طلاء المحلات التجارية",
      "إصلاح التشققات والجدران",
      "طلاء الأسقف",
    ],
  },
  {
    icon: "❄️",
    name: "التكييف",
    color: "bg-cyan-50 border-cyan-200",
    iconBg: "bg-cyan-100",
    description: "تركيب وصيانة أجهزة التكييف والتبريد",
    services: [
      "تركيب المكيفات",
      "الصيانة والتنظيف الدوري",
      "تعبئة الغاز",
      "إصلاح أعطال التكييف",
      "تركيب مكيفات مركزية",
    ],
  },
  {
    icon: "🏗️",
    name: "الترميم",
    color: "bg-orange-50 border-orange-200",
    iconBg: "bg-orange-100",
    description: "أعمال ترميم وتجديد شاملة للمنازل والمحلات",
    services: [
      "تجديد المنازل الكامل",
      "تجديد المحلات التجارية",
      "إصلاح الأضرار والشقوق",
      "تركيب البلاط والسيراميك",
      "أعمال الجبس والديكور",
    ],
  },
];

function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <main className="min-h-[80vh] px-4 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="eyebrow mb-2">خدماتنا</p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">جميع خدماتنا</h1>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            نقدم مجموعة شاملة من خدمات الإصلاح والصيانة للمنازل والمحلات التجارية بأعلى معايير الجودة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => (
            <Card
              key={cat.name}
              className={`border-2 ${cat.color} transition-all duration-200`}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-12 h-12 ${cat.iconBg} rounded-xl flex items-center justify-center text-2xl`}>
                    {cat.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{cat.name}</h2>
                    <p className="text-gray-500 text-sm">{cat.description}</p>
                  </div>
                </div>

                <div className={`overflow-hidden transition-all duration-300 ${expanded === cat.name ? "max-h-96" : "max-h-32"}`}>
                  <ul className="space-y-2">
                    {cat.services.map((service) => (
                      <li key={service} className="flex items-center text-sm">
                        <span className="text-blue-500 ml-2">•</span>
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setExpanded(expanded === cat.name ? null : cat.name)}
                    className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 flex-1"
                  >
                    {expanded === cat.name ? "عرض أقل ▲" : "عرض الكل ▼"}
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 text-white flex-1"
                  >
                    <Link to="/consultation">طلب الخدمة</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-blue-700 text-white rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-3">لم تجد ما تبحث عنه؟</h2>
          <p className="text-blue-200 mb-6">تواصل معنا وسنجد لك الحل المناسب</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/consultation">طلب استشارة مجانية</Link>
            </Button>
            <Button asChild variant="outline" className="border-white text-white hover:bg-white hover:text-blue-700">
              <Link to="/contact">اتصل بنا</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
