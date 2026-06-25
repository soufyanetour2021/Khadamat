import { Outlet, Link, createRootRoute, useRouter } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";

function Navbar() {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">🔨</span>
            <span className="text-xl font-bold text-blue-700">خدمات الإصلاح</span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              الرئيسية
            </Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              الخدمات
            </Link>
            <Link to="/consultation" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              استشارة مجانية
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              من نحن
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
              اتصل بنا
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <>
                <span className="text-sm text-gray-600">مرحباً، {user?.fullName}</span>
                {isAdmin ? (
                  <Button asChild size="sm" variant="outline">
                    <Link to="/admin">لوحة التحكم</Link>
                  </Button>
                ) : (
                  <Button asChild size="sm" variant="outline">
                    <Link to="/dashboard">طلباتي</Link>
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={handleLogout}>
                  تسجيل الخروج
                </Button>
              </>
            ) : (
              <>
                <Button asChild size="sm" variant="ghost">
                  <Link to="/auth/login">تسجيل الدخول</Link>
                </Button>
                <Button asChild size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Link to="/auth/register">إنشاء حساب</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-2xl">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 flex flex-col gap-3">
            <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>الرئيسية</Link>
            <Link to="/services" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>الخدمات</Link>
            <Link to="/consultation" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>استشارة مجانية</Link>
            <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>من نحن</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>اتصل بنا</Link>
            {isAuthenticated ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" className="text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>لوحة التحكم</Link>
                ) : (
                  <Link to="/dashboard" className="text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>طلباتي</Link>
                )}
                <button onClick={() => { handleLogout(); setMenuOpen(false); }} className="text-right text-red-600 font-medium py-2">تسجيل الخروج</button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>تسجيل الدخول</Link>
                <Link to="/auth/register" className="text-blue-600 font-medium py-2" onClick={() => setMenuOpen(false)}>إنشاء حساب</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🔨</span>
              <span className="text-xl font-bold">خدمات الإصلاح</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              منصة متخصصة في خدمات إصلاح وصيانة المنازل والمحلات التجارية بأعلى معايير الجودة.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">الخدمات</Link></li>
              <li><Link to="/consultation" className="hover:text-white transition-colors">استشارة مجانية</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">من نحن</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>⚡ الكهرباء</li>
              <li>🔧 السباكة</li>
              <li>🪚 النجارة</li>
              <li>🎨 الصباغة</li>
              <li>❄️ التكييف</li>
              <li>🏗️ الترميم</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">تواصل معنا</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>📞 +212 6 00 00 00 00</li>
              <li>📧 info@repair-services.ma</li>
              <li>📍 الدار البيضاء، المغرب</li>
            </ul>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              💬 واتساب
            </a>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
          <p>© 2024 خدمات الإصلاح. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
}

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="grid min-h-[80vh] place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="text-6xl mb-4">🔍</p>
          <h1 className="mt-3 text-4xl font-semibold text-gray-900">الصفحة غير موجودة</h1>
          <p className="mt-4 text-base text-gray-600">
            الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          </p>
          <Button asChild className="mt-8 bg-blue-600 hover:bg-blue-700">
            <Link to="/">العودة للرئيسية</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="grid min-h-[80vh] place-items-center px-6">
        <div className="max-w-md text-center">
          <p className="text-6xl mb-4">⚠️</p>
          <h1 className="mt-3 text-4xl font-semibold text-gray-900">حدث خطأ</h1>
          <p className="mt-4 text-base text-gray-600">
            حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="bg-blue-600 hover:bg-blue-700"
            >
              حاول مرة أخرى
            </Button>
            <Button asChild variant="outline">
              <Link to="/">العودة للرئيسية</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
