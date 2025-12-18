'use client'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full h-14 flex justify-center">
      <div className="max-w-[1500px] w-full flex items-center justify-between px-6">
        
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/image/Frame.svg"
            alt="Logo"
            width={32}
            height={32}
          />
          <span className="text-white font-semibold text-lg">mKOLs</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-8">
          <Link href="" className="text-[#7E95AA] hover:text-[#FF3A44] transition">
            О нас
          </Link>
          <Link href="" className="text-[#7E95AA] hover:text-[#FF3A44] transition">
            Каталог
          </Link>
          <Link href="" className="text-[#7E95AA] hover:text-[#FF3A44] transition">
            FAQ
          </Link>
          <Link href="" className="text-[#7E95AA] hover:text-[#FF3A44] transition">
            Поддержка
          </Link>
          <Link href="" className="text-[#7E95AA] hover:text-[#FF3A44] transition">
            Контакты
          </Link>
        </nav>

        {/* Login button */}
        <Button
          className="w-[100px] h-10 bg-linear-to-r from-[#FF3A44] to-[#992329] text-white hover:opacity-80"
        >
          Войти
        </Button>
      </div>
    </header>
  )
}
