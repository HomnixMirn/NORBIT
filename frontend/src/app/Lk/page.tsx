// app/personal-account/page.tsx
"use client";

import { useState } from "react";
import { useUser } from "@/components/UserContext/UserContext";
import ProfileBackground from "@/components/Profile/ProfileBackground/ProfileBackground";
import ProfileAvatar from "@/components/Profile/ProfileAvatar/ProfileAvatar";
import ProfileInfo from "@/components/Profile/ProfileInfo/ProfileInfo";
import ProfileProducts from "@/components/Profile/ProfileProducts/ProfileProducts";
import SnowBackground from "@/components/SnowBackground";

export default function PersonalAccountUser() {
  const { user, setUser } = useUser();
  const [backgroundUrl, setBackgroundUrl] = useState("/images/bg-lk.jpg");

  if (!user) return null;

  // Пример продуктов
  const products = [
    { id: 1, title: "Lookbook Chanel N5", category: "Cosmetics", image: "/images/product1.jpg" },
    { id: 2, title: "Lookbook Versace", category: "Fashion", image: "/images/product2.jpg" },
  ];

  return (
    <div className="relative min-h-screen">
      <SnowBackground />
        <div className="w-max-[1980px] flex flex-col items-center">
          <div className="flex items-center w-[1450px] mt-[20px]">
            <ProfileBackground backgroundUrl={backgroundUrl} setBackgroundUrl={setBackgroundUrl} />
          </div>
          <ProfileInfo user={user} setUser={setUser} />
          <ProfileProducts products={products} isSeller={user.is_seller} />
        </div>
      </div>
  );
}
