// components/ProfileAvatar/ProfileAvatar.tsx
"use client";

import { useState } from "react";
import AvatarUpload from "@/components/Profile/createAvatar/changeAvatar";

interface ProfileAvatarProps {
  avatarUrl: string;
  setAvatarUrl: (url: string) => void;
}

export default function ProfileAvatar({ avatarUrl, setAvatarUrl }: ProfileAvatarProps) {
  const [isChangeAvatarVisible, setIsChangeAvatarVisible] = useState(false);

  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src={avatarUrl}
        alt="Avatar"
        className="w-32 h-32 rounded-full cursor-pointer object-cover"
        onClick={() => setIsChangeAvatarVisible(true)}
      />
      {isChangeAvatarVisible && <AvatarUpload onClose={() => setIsChangeAvatarVisible(false)} />}
    </div>
  );
}
