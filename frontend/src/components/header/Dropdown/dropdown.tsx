"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface DropdownProps {
  avatarUrl: string | null;
  onLogout: () => void;
}

export default function Dropdown({ avatarUrl, onLogout }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  // Закрытие по клику вне (мобилка)
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* overlay для мобилки */}
      {open && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        ref={ref}
        className="relative z-50"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Avatar button */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center justify-center w-14 h-14 rounded-full hover:bg-white/10 transition focus:outline-none"
        >
          <img
            src={avatarUrl || "/images/default-avatar.png"}
            alt="Аватар"
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.currentTarget.src = "/images/default-avatar.png";
            }}
          />
        </button>

        {/* Dropdown */}
        <div
          className={`
            absolute right-0 w-48 rounded-lg shadow-lg border
            bg-white text-gray-700
            transition-all duration-200
            ${open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"}
          `}
        >
          <ul className="py-1">
            <li>
              <Link
                href="/Lk"
                onClick={() => setOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100"
              >
                Профиль
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  setOpen(false);
                  onLogout();
                  window.location.href = "/"; // переходим на главную
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Выйти
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
