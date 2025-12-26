// components/ProfileBackground/ProfileBackground.tsx
"use client";

import { useState } from "react";
import ProfileAvatar from "../ProfileAvatar/ProfileAvatar";
import { useUser } from "@/components/UserContext/UserContext";

interface ProfileBackgroundProps {
  backgroundUrl: string;
  setBackgroundUrl: (url: string) => void;
}

export default function ProfileBackground({ backgroundUrl, setBackgroundUrl }: ProfileBackgroundProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const { avatarUrl, setAvatarUrl } = useUser();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setBackgroundUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="relative w-full h-60 rounded-xl overflow-hidden mb-6">
      {/* Фон */}
      <img
        src={preview || backgroundUrl}
        alt="Background"
        className="w-full h-full object-cover"
      />

      {/* Аватарка поверх фона, слева с отступом */}
      <div className="absolute bottom-9 left-[40px]">
        <ProfileAvatar avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
      </div>

      {/* Кнопка изменить фон */}
      <label className="absolute bottom-2 right-2 bg-black/50 text-white px-3 py-1 rounded cursor-pointer z-20">
        Изменить фон
        <input type="file" className="hidden" onChange={handleFileChange} />
      </label>
    </div>

  );
}
