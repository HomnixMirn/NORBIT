"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axi from "@/utils/api";
import { API_URL, MEDIA_URL } from "@/index";

interface UserContextType {
  user: any;
  avatarUrl: string;
  setUser: (user: any) => void;
  setAvatarUrl: (url: string) => void;
  fetchUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [avatarUrl, setAvatarUrl] = useState("/images/default-avatarLK.png");

  const fetchUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await axi.get(`${API_URL}personal_account`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
      setAvatarUrl(res.data.icon ? MEDIA_URL + res.data.icon : "/images/default-avatarLK.png");
    } catch {
      localStorage.removeItem("token");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

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
