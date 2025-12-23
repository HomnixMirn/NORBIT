"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "@/components/header/login/login";
import RegisterForm from "@/components/header/registr/registr";
import Dropdown from "@/components/header/Dropdown/dropdown";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useUser } from "@/components/UserContext/UserContext";

export default function Header() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { user, avatarUrl, setAvatarUrl, fetchUser } = useUser();

  // Проверка токена и получение данных пользователя
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthChecked(true);
      return;
    }

    fetchUser(token)
      .finally(() => setAuthChecked(true));
  }, [fetchUser]);

  const handleLoginSuccess = async (token: string) => {
    localStorage.setItem("token", token);
    await fetchUser(token); // обновляет user и avatarUrl в контексте
    setShowLogin(false);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await fetch("/api/logout"); // или твой эндпоинт
      } finally {
        localStorage.removeItem("token");
        setAvatarUrl(null); // сброс аватарки
      }
    }
    router.push("/");
  };

  const isLoggedIn = !!user;

  return (
    <>
      <header className="w-full h-14 flex justify-center border-b border-white/5">
        <div className="
          max-w-[1500px] w-full h-full px-4 sm:px-6
          flex items-center justify-between
          md:grid md:grid-cols-[auto_1fr_auto]
        ">
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-white/10"
            >
              <Menu size={22} />
            </button>

            <Link href="/" className="flex items-center gap-4 shrink-0">
              <Image src="/image/Frame.svg" alt="Logo" width={28} height={28} />
              <h1 className="md:inline text-white font-semibold text-lg">mKOLs</h1>
            </Link>
          </div>

          <nav className="hidden md:flex justify-center gap-6 lg:gap-8">
            <Link href="/" className="text-[#7E95AA] hover:text-[#FF3A44]">О нас</Link>
            <Link href="/catalog" className="text-[#7E95AA] hover:text-[#FF3A44]">Каталог</Link>
            <Link href="/faq" className="text-[#7E95AA] hover:text-[#FF3A44]">FAQ</Link>
            <Link href="/support" className="text-[#7E95AA] hover:text-[#FF3A44]">Поддержка</Link>
            <Link href="/contacts" className="text-[#7E95AA] hover:text-[#FF3A44]">Контакты</Link>
          </nav>

          <div className="flex items-center justify-end w-[120px]">
            {!authChecked ? (
              <div className="w-10 h-10" />
            ) : isLoggedIn ? (
              <Dropdown avatarUrl={avatarUrl} onLogout={handleLogout} />
            ) : (
              <Button
                className="h-9 w-[100px] bg-linear-to-r from-[#FF3A44] to-[#992329] text-white"
                onClick={() => setShowLogin(true)}
              >
                Войти
              </Button>
            )}
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-[#0B1220] p-6 flex flex-col gap-6">
            <button onClick={() => setMobileMenuOpen(false)} className="text-white self-end text-xl">✕</button>
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">О нас</Link>
            <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">Каталог</Link>
            <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">FAQ</Link>
            <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">Поддержка</Link>
            <Link href="/contacts" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">Контакты</Link>
          </div>
        </div>
      )}

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onLoginSuccess={handleLoginSuccess}
          onRegisterOpen={() => { setShowRegister(true); setShowLogin(false); }}
        />
      )}
      {showRegister && (
        <RegisterForm
          onClose={() => setShowRegister(false)}
          onLoginOpen={() => { setShowRegister(false); setShowLogin(true); }}
        />
      )}
    </>
  );
}
