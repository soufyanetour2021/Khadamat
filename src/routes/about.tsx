import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "من نحن - خدمات الإصلاح" }] }),
  component: AboutPage,
});

const values = [
  { icon: "🏆", title: "الجودة أولاً", desc: "نلتزم بأعلى معايير الجودة في كل عمل نقوم به، مع ضمان رضا العميل الكامل." },
  { icon: "⚡", title: "السرعة والكفاءة", desc: "نستجيب لطلباتكم بسرعة ونحرص على إنجاز العمل في الوقت المحدد." },
  { icon: "💰", title: "أسعار شفافة", desc: "نقدم عروض أسعار واضحة وشفافة بدون رسوم خفية أو مفاجآت." },
  { icon: "🛡️", title: "ضمان الأعمال", desc: "نضمن جميع أعمالنا ونتحمل المسؤولية الكاملة عن جودة الخدمة المقدمة." },
];

const team = [
  { name: "سفيان تورمين", role: "المدير العام", icon: "👨‍💼" },
  { name: "يوسف بنعلي", role: "رئيس الفنيين", icon: "👷" },
  { name: "سارة الإدريسي", role: "مديرة خدمة العملاء", icon: "👩‍💼" },
  { name: "كريم الحسني", role: "مهندس كهرباء", icon: "⚡" },
];

const cities = ["الدار البيضاء", "تيط مليل", "مديونة", "برشيد", "المحمدية", "النواصر"];

const jobOpenings = [
  {
    title: "فني كهرباء",
    type: "دوام كامل",
    location: "الدار البيضاء والمناطق المجاورة",
    requirements: ["خبرة لا تقل عن سنة", "شهادة مهنية معترف بها", "قدرة على التنقل"],
  },
  {
    title: "فني سباكة",
    type: "دوام كامل",
    location: "الدار البيضاء والمناطق المجاورة",
    requirements: ["خبرة لا تقل عن سنة", "إتقان أعمال السباكة والتمديدات", "التزام بالمواعيد"],
  },
  {
    title: "فني تكييف وتبريد",
    type: "دوام جزئي / كامل",
    location: "الدار البيضاء والمناطق المجاورة",
    requirements: ["معرفة بأنظمة التكييف", "القدرة على التعامل مع العملاء", "مرونة في أوقات العمل"],
  },
  {
    title: "فني نجارة وديكور",
    type: "دوام كامل",
    location: "الدار البيضاء والمناطق المجاورة",
    requirements: ["خبرة في النجارة والتشطيبات", "إبداع وذوق فني", "الالتزام بالجودة"],
  },
];

function AboutPage() {
  return (
    <main className="min-h-[80vh]">
      {/* Hero */}
      <section className="hero-gradient text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">من نحن</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            منصة رائدة في خدمات إصلاح وصيانة المنازل والمحلات التجارية بالمغرب
          </p>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow mb-2">قصتنا</p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">رحلة بدأت بحلم</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                تأسست منصة خدمات الإصلاح عام 2026 بهدف توفير خدمات صيانة موثوقة وسريعة للمنازل والمحلات التجارية في منطقة الدار البيضاء الكبرى.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                بدأنا بفريق متخصص من الفنيين المحترفين، ونمونا لنصبح المنصة الأولى في المنطقة بـ 46 فنياً معتمداً وأكثر من 100 عامل وآلاف العملاء الراضين.
              </p>
              <p className="text-gray-600 leading-relaxed">
                رؤيتنا هي أن يحصل كل مواطن على خدمة صيانة موثوقة وبأسعار عادلة، مع ضمان الجودة والسرعة في الاستجابة.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: "+1000", label: "عميل راضٍ" },
                { value: "+1000", label: "مشروع منجز" },
                { value: "46", label: "فني متخصص" },
                { value: "+100", label: "عامل متخصص" },
              ].map((stat) => (
                <div key={stat.label} className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-700">{stat.value}</div>
                  <div className="text-gray-600 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">قيمنا</p>
            <h2 className="text-3xl font-bold text-gray-900">ما يميزنا</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <Card key={v.title} className="border-0 shadow-md text-center">
                <CardContent className="p-6">
                  <div className="text-4xl mb-3">{v.icon}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{v.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{v.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">خدماتنا</p>
            <h2 className="text-3xl font-bold text-gray-900">ما نقدمه</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: "⚡", name: "الكهرباء" },
              { icon: "🔧", name: "السباكة" },
              { icon: "🪚", name: "النجارة" },
              { icon: "🎨", name: "الصباغة" },
              { icon: "❄️", name: "التكييف" },
              { icon: "🏗️", name: "الترميم" },
            ].map((s) => (
              <div key={s.name} className="flex items-center gap-3 bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">{s.icon}</span>
                <span className="font-medium text-gray-900">{s.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="py-16 px-4 bg-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">مناطق التغطية</h2>
          <p className="text-blue-200 mb-8">نخدم المناطق التالية وما حولها</p>
          <div className="flex flex-wrap justify-center gap-3">
            {cities.map((city) => (
              <span key={city} className="bg-white/20 text-white border border-white/30 px-4 py-2 rounded-full text-sm">
                📍 {city}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">فريقنا</p>
            <h2 className="text-3xl font-bold text-gray-900">من يقود المنصة</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
                  {member.icon}
                </div>
                <h3 className="font-bold text-gray-900">{member.name}</h3>
                <p className="text-gray-500 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">فرص العمل</p>
            <h2 className="text-3xl font-bold text-gray-900">انضم لفريق العمل</h2>
            <p className="text-gray-600 mt-3 max-w-xl mx-auto">
              نبحث عن فنيين مهرة ومتخصصين للانضمام إلى فريقنا المتنامي. إذا كنت تمتلك الخبرة والشغف، نرحب بك!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {jobOpenings.map((job) => (
              <Card key={job.title} className="border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold text-gray-900">{job.title}</h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">{job.type}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-3 flex items-center gap-1">
                    📍 {job.location}
                  </p>
                  <ul className="space-y-1 mb-4">
                    {job.requirements.map((req) => (
                      <li key={req} className="text-sm text-gray-600 flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        {req}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Link to="/contact">تقديم طلب</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* General application */}
          <div className="bg-gradient-to-l from-blue-600 to-blue-800 rounded-2xl p-8 text-white text-center">
            <div className="text-4xl mb-3">👷</div>
            <h3 className="text-xl font-bold mb-2">لم تجد تخصصك؟</h3>
            <p className="text-blue-200 mb-5">
              أرسل لنا سيرتك الذاتية وسنتواصل معك فور توفر فرصة مناسبة لمهاراتك
            </p>
            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
              <Link to="/contact">أرسل طلبك الآن</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">انضم إلى عائلتنا</h2>
          <p className="text-gray-600 mb-8">سواء كنت عميلاً أو فنياً، نرحب بك في منصة خدمات الإصلاح</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-blue-600 hover:bg-blue-700 text-white">
              <Link to="/consultation">طلب خدمة الآن</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/contact">تواصل معنا</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
