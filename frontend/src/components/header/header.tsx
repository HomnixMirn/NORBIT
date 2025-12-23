// Header.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import LoginForm from "@/components/header/login/login";
import RegisterForm from "@/components/header/registr/registr";
import Dropdown from "@/components/header/Dropdown/dropdown";
import axi from "@/utils/api";
import { API_URL, MEDIA_URL } from "@/index";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
export default function Header() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAuthChecked(true);
    return;
  }

  fetchUser(token).finally(() => {
    setAuthChecked(true);
  });
}, []);

 const fetchUser = async (token: string) => {
  try {
    const res = await axi.get(API_URL + "personal_account", {
      headers: { Authorization: `Bearer ${token}` },
    });

    setIsLoggedIn(true);
    setAvatarUrl(
      res.data.icon
        ? MEDIA_URL + res.data.icon
        : "/image/default-avatar.png"
    );
  } catch {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setAvatarUrl(null);
  }
};


  const handleLoginSuccess = (token: string) => {
    localStorage.setItem("token", token);
    fetchUser(token);
    setShowLogin(false);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        await axi.get(API_URL + "logout", {
          headers: { Authorization: `Bearer ${token}` },
        });
      } finally {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        setAvatarUrl(null);
        router.push("/");
      }
    }
  };

  return (
    <>
      <header className="w-full h-14 flex justify-center bg-[#0B1220] border-b border-white/5">
        <div className="
          max-w-[1500px] w-full h-full px-4 sm:px-6
          flex items-center justify-between
          md:grid md:grid-cols-[auto_1fr_auto]
        ">
          <div className="flex items-center gap-4 shrink-0">
            {/* Burger – mobile only */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-md hover:bg-white/10"
            >
              <Menu size={22} />
            </button>
            {/* Logo */}
            <Link href={"/"} className="flex items-center gap-4 shrink-0">
              <Image src="/image/Frame.svg" alt="Logo" width={28} height={28} />
              <h1 className="md:inline text-white font-semibold text-lg">
                mKOLs
              </h1>
            </Link>
          </div>

            {/* NAV */}
            <nav className="hidden md:flex justify-center gap-6 lg:gap-8">
              <Link href="/" className="text-[#7E95AA] hover:text-[#FF3A44]">О нас</Link>
              <Link href="/catalog" className="text-[#7E95AA] hover:text-[#FF3A44]">Каталог</Link>
              <Link href="/faq" className="text-[#7E95AA] hover:text-[#FF3A44]">FAQ</Link>
              <Link href="/support" className="text-[#7E95AA] hover:text-[#FF3A44]">Поддержка</Link>
              <Link href="/contacts" className="text-[#7E95AA] hover:text-[#FF3A44]">Контакты</Link>
            </nav>
          </div>

          
          <div className="flex items-center justify-end w-[120px]">
            {!authChecked ? (
              <div className="w-10 h-10" />
            ) : isLoggedIn ? (
              <Dropdown avatarUrl={avatarUrl} onLogout={handleLogout} />
            ) : (
              <Button className="h-9 w-[100px] bg-linear-to-r from-[#FF3A44] to-[#992329] text-white"
                onClick={() => setShowLogin(true)}
              >
                Войти
              </Button>
            )}
          </div>
      </header>

          {mobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
              <div className="absolute top-0 right-0 w-64 h-full bg-[#0B1220] p-6 flex flex-col gap-6">
                {/* Close */}
                  <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-white self-end text-xl"
                >
                  ✕
                </button>
                {/* Links */}
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">
                  О нас
                </Link>
                <Link href="/catalog" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">
                  Каталог
                </Link>
                <Link href="/faq" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">
                  FAQ
                </Link>
                <Link href="/support" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">
                  Поддержка
                </Link>
                <Link href="/contacts" onClick={() => setMobileMenuOpen(false)} className="text-[#7E95AA] hover:text-white">
                  Контакты
                </Link>
              </div>
            </div>
          )}
          
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} onRegisterOpen={() => { setShowRegister(true); setShowLogin(false); }} />}
      {showRegister && <RegisterForm onClose={() => setShowRegister(false)} onLoginOpen={() => { setShowRegister(false); setShowLogin(true); }} />}
    </>
  );
}
