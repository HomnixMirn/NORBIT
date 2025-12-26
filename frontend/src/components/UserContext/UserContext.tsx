"use client";

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import axi from "@/utils/api";
import { API_URL, MEDIA_URL } from "@/index";

interface UserContextType {
  user: any;
  avatarUrl: string;
  setUser: (user: any) => void;
  setAvatarUrl: (url: string) => void;
  fetchUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState("/images/default-avatarLK.png");

  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axi.get(`${API_URL}personal_account`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
      setAvatarUrl(res.data.icon ? `${MEDIA_URL}${res.data.icon}?t=${Date.now()}` : "/images/default-avatarLK.png");
    } catch {
      localStorage.removeItem("token");
      setUser(null);
      setAvatarUrl("/images/default-avatarLK.png");
    }
  }, []);

  // вызываем один раз при маунте
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <UserContext.Provider value={{ user, avatarUrl, setUser, setAvatarUrl, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
