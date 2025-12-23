"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import axi from "@/utils/api";
import { API_URL, MEDIA_URL } from "@/index";
import AvatarUpload from "@/components/createAvatar/changeAvatar";
import { useUser } from "@/components/UserContext/UserContext";
export default function PersonalAccountUser() {
  const router = useRouter();

  const [user, setUser] = useState<any>(null);
  const {avatarUrl, setAvatarUrl, fetchUser } = useUser();
  const [isChangeAvatarVisible, setIsChangeAvatarVisible] = useState(false);

  // Проверка токена + загрузка пользователя
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
      return;
    }

    axi
      .get(`${API_URL}personal_account`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);

        if (res.data.icon) {
          setAvatarUrl(MEDIA_URL + res.data.icon);
        }
      })
      .catch(() => {
        router.push("/");
      });
  }, [router]);

  return (
    <div className="bg-[url('/images/bg-lk.jpg')] bg-cover min-h-screen flex justify-center items-start pt-20">
      <div className="flex flex-col items-center bg-white rounded-[24px] p-10 shadow-lg">
        <Image
            src={avatarUrl}
            alt="avatar"
            width={120}
            height={120}
            className="rounded-full cursor-pointer bg-gray-200"
            onClick={() => setIsChangeAvatarVisible(true)}
        />

        <h1 className="mt-4 text-2xl font-bold">
          {user?.user?.username}
        </h1>

        {isChangeAvatarVisible && (
          <AvatarUpload
            onClose={() => setIsChangeAvatarVisible(false)}
          />
        )}
      </div>
    </div>
  );
}
