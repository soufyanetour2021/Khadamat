import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { api } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/consultation")({
  head: () => ({ meta: [{ title: "طلب استشارة مجانية - خدمات الإصلاح" }] }),
  component: ConsultationPage,
});

const serviceTypes = [
  "الكهرباء ⚡",
  "السباكة 🔧",
  "النجارة 🪚",
  "الصباغة 🎨",
  "التكييف ❄️",
  "الترميم 🏗️",
  "أخرى",
];

const cities = ["الدار البيضاء", "تيط مليل", "مديونة", "برشيد", "المحمدية", "النواصر", "أخرى"];

const urgencyOptions = [
  { value: "normal", label: "عادي", desc: "خلال أسبوع", color: "bg-green-100 border-green-300 text-green-800" },
  { value: "urgent", label: "عاجل", desc: "خلال يومين", color: "bg-yellow-100 border-yellow-300 text-yellow-800" },
  { value: "very_urgent", label: "عاجل جداً", desc: "اليوم أو غداً", color: "bg-red-100 border-red-300 text-red-800" },
];

const steps = [
  { num: 1, label: "البيانات الشخصية" },
  { num: 2, label: "وصف المشكلة" },
  { num: 3, label: "الصور" },
  { num: 4, label: "الموقع" },
  { num: 5, label: "التأكيد" },
];

interface FormData {
  fullName: string;
  phone: string;
  city: string;
  address: string;
  serviceType: string;
  problemDescription: string;
  urgency: string;
  images: string[];
  latitude?: number;
  longitude?: number;
}

function ConsultationPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [gpsLoading, setGpsLoading] = useState(false);

  const [form, setForm] = useState<FormData>({
    fullName: user?.fullName || "",
    phone: user?.phone || "",
    city: "",
    address: "",
    serviceType: "",
    problemDescription: "",
    urgency: "normal",
    images: [],
  });

  const updateForm = (field: keyof FormData, value: string | string[] | number) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const getGPS = () => {
    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        updateForm("latitude", pos.coords.latitude);
        updateForm("longitude", pos.coords.longitude);
        setGpsLoading(false);
      },
      () => {
        setError("تعذر الحصول على موقعك. يرجى إدخال العنوان يدوياً.");
        setGpsLoading(false);
      },
    );
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const newImages: string[] = [];
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (ev) => {
        if (ev.target?.result) {
          newImages.push(ev.target.result as string);
          if (newImages.length === files.length) {
            setForm((prev) => ({ ...prev, images: [...prev.images, ...newImages] }));
          }
        }
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (idx: number) => {
    setForm((prev) => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const validateStep = () => {
    setError("");
    if (step === 1) {
      if (!form.fullName || !form.phone || !form.city || !form.address) {
        setError("يرجى ملء جميع الحقول المطلوبة.");
        return false;
      }
    }
    if (step === 2) {
      if (!form.serviceType || !form.problemDescription) {
        setError("يرجى اختيار نوع الخدمة ووصف المشكلة.");
        return false;
      }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => Math.min(s + 1, 5));
  };

  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async () => {
    setLoading(true);
    setError("");
    try {
      await api.post("/consultations", {
        ...form,
        userId: user?.id,
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ أثناء إرسال الطلب.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <main className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-gray-50">
        <div className="text-center max-w-md">
          <div className="text-7xl mb-6">✅</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">تم إرسال طلبك بنجاح!</h1>
          <p className="text-gray-600 mb-6 leading-relaxed">
            شكراً لك! سيتواصل معك فريقنا في أقرب وقت ممكن لتأكيد الموعد وتقديم عرض السعر.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 text-right">
            <p className="text-blue-800 font-medium mb-2">ما سيحدث بعد ذلك:</p>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• سيتصل بك أحد ممثلينا خلال ساعات</li>
              <li>• سيتم تحديد موعد مناسب لك</li>
              <li>• سيصل الفني المتخصص في الوقت المحدد</li>
            </ul>
          </div>
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => navigate({ to: "/" })}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              العودة للرئيسية
            </Button>
            {user && (
              <Button
                onClick={() => navigate({ to: "/dashboard" })}
                variant="outline"
              >
                متابعة طلباتي
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[80vh] px-4 py-12 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">طلب استشارة مجانية</h1>
          <p className="text-gray-600 mt-2">أخبرنا عن مشكلتك وسنتواصل معك في أقرب وقت</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            {steps.map((s) => (
              <div key={s.num} className="flex flex-col items-center flex-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                    step >= s.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s.num ? "✓" : s.num}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${step >= s.num ? "text-blue-600" : "text-gray-400"}`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        <Card className="shadow-lg border-0">
          <CardContent className="p-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-4">
                ⚠️ {error}
              </div>
            )}

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">البيانات الشخصية</h2>
                <div className="space-y-2">
                  <Label htmlFor="fullName">الاسم الكامل *</Label>
                  <Input
                    id="fullName"
                    placeholder="محمد أحمد"
                    value={form.fullName}
                    onChange={(e) => updateForm("fullName", e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">رقم الهاتف *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+212 6 00 00 00 00"
                    value={form.phone}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    required
                    dir="ltr"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">المدينة *</Label>
                  <select
                    id="city"
                    value={form.city}
                    onChange={(e) => updateForm("city", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="">اختر مدينتك</option>
                    {cities.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">العنوان التفصيلي *</Label>
                  <textarea
                    id="address"
                    placeholder="الحي، الشارع، رقم المبنى..."
                    value={form.address}
                    onChange={(e) => updateForm("address", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px] resize-none"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 2: Problem Info */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">وصف المشكلة</h2>
                <div className="space-y-2">
                  <Label>نوع الخدمة المطلوبة *</Label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {serviceTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => updateForm("serviceType", type)}
                        className={`border-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                          form.serviceType === type
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="problemDescription">وصف المشكلة *</Label>
                  <textarea
                    id="problemDescription"
                    placeholder="اشرح المشكلة بالتفصيل: متى بدأت؟ ما الأعراض؟ هل جربت أي حل؟"
                    value={form.problemDescription}
                    onChange={(e) => updateForm("problemDescription", e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-none"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label>درجة الاستعجال *</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {urgencyOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => updateForm("urgency", opt.value)}
                        className={`border-2 rounded-xl p-3 text-right transition-colors ${
                          form.urgency === opt.value
                            ? opt.color + " border-current"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                      >
                        <div className="font-bold">{opt.label}</div>
                        <div className="text-xs opacity-75">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Images */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">صور المشكلة (اختياري)</h2>
                <p className="text-gray-600 text-sm">
                  أضف صوراً للمشكلة لمساعدة الفني على فهم الوضع بشكل أفضل وتقديم عرض سعر دقيق.
                </p>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors">
                  <div className="text-4xl mb-3">📷</div>
                  <p className="text-gray-600 mb-3">اسحب الصور هنا أو</p>
                  <label className="cursor-pointer">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      اختر الصور
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <p className="text-gray-400 text-xs mt-2">PNG, JPG حتى 5MB لكل صورة</p>
                </div>
                {form.images.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {form.images.map((img, idx) => (
                      <div key={idx} className="relative">
                        <img
                          src={img}
                          alt={`صورة ${idx + 1}`}
                          className="w-full h-24 object-cover rounded-lg border"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(idx)}
                          className="absolute top-1 left-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Location */}
            {step === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">تحديد الموقع</h2>
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-blue-800 text-sm mb-3">
                    يمكنك تحديد موقعك تلقائياً باستخدام GPS أو الاكتفاء بالعنوان الذي أدخلته.
                  </p>
                  <Button
                    type="button"
                    onClick={getGPS}
                    disabled={gpsLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {gpsLoading ? "جاري تحديد الموقع..." : "📍 تحديد موقعي تلقائياً"}
                  </Button>
                </div>
                {form.latitude && form.longitude && (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <p className="text-green-800 font-medium">✅ تم تحديد موقعك بنجاح</p>
                    <p className="text-green-700 text-sm mt-1" dir="ltr">
                      {form.latitude.toFixed(6)}, {form.longitude.toFixed(6)}
                    </p>
                  </div>
                )}
                <div className="space-y-2">
                  <Label>العنوان المدخل</Label>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 text-gray-700">
                    <p className="font-medium">{form.city}</p>
                    <p className="text-sm text-gray-600">{form.address}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirm */}
            {step === 5 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900 mb-4">مراجعة وتأكيد الطلب</h2>
                <div className="space-y-3">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-700 mb-2">البيانات الشخصية</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div><span className="text-gray-500">الاسم:</span> <span className="font-medium">{form.fullName}</span></div>
                      <div><span className="text-gray-500">الهاتف:</span> <span className="font-medium" dir="ltr">{form.phone}</span></div>
                      <div><span className="text-gray-500">المدينة:</span> <span className="font-medium">{form.city}</span></div>
                      <div className="col-span-2"><span className="text-gray-500">العنوان:</span> <span className="font-medium">{form.address}</span></div>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-bold text-gray-700 mb-2">تفاصيل المشكلة</h3>
                    <div className="space-y-2 text-sm">
                      <div><span className="text-gray-500">نوع الخدمة:</span> <span className="font-medium">{form.serviceType}</span></div>
                      <div><span className="text-gray-500">الاستعجال:</span>{" "}
                        <Badge className={
                          form.urgency === "very_urgent" ? "bg-red-100 text-red-800" :
                          form.urgency === "urgent" ? "bg-yellow-100 text-yellow-800" :
                          "bg-green-100 text-green-800"
                        }>
                          {form.urgency === "very_urgent" ? "عاجل جداً" : form.urgency === "urgent" ? "عاجل" : "عادي"}
                        </Badge>
                      </div>
                      <div><span className="text-gray-500">الوصف:</span> <p className="font-medium mt-1">{form.problemDescription}</p></div>
                    </div>
                  </div>
                  {form.images.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-bold text-gray-700 mb-2">الصور المرفقة ({form.images.length})</h3>
                      <div className="flex gap-2">
                        {form.images.slice(0, 3).map((img, idx) => (
                          <img key={idx} src={img} alt="" className="w-16 h-16 object-cover rounded-lg" />
                        ))}
                        {form.images.length > 3 && (
                          <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-600 text-sm">
                            +{form.images.length - 3}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {form.latitude && (
                    <div className="bg-green-50 border border-green-200 rounded-xl p-3 text-sm text-green-800">
                      📍 تم تحديد الموقع الجغرافي
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-6 pt-4 border-t border-gray-100">
              <Button
                type="button"
                variant="outline"
                onClick={prevStep}
                disabled={step === 1}
                className="px-6"
              >
                ← السابق
              </Button>
              {step < 5 ? (
                <Button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  التالي →
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-8"
                >
                  {loading ? "جاري الإرسال..." : "✅ إرسال الطلب"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
