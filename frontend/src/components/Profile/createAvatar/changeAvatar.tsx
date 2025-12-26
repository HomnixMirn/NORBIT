"use client";

import { useState, useEffect } from "react";
import axi from "@/utils/api";
import { API_URL, MEDIA_URL } from "@/index";
import { useUser } from "@/components/UserContext/UserContext";

interface LkProps {
  onClose: () => void;
}

const AvatarUpload = ({ onClose }: LkProps) => {
  const { setAvatarUrl } = useUser(); // <-- берём setAvatarUrl из контекста

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const file = e.target.files[0];

    if (file.size > 16 * 1024 * 1024) {
      setError("Размер файла не должен превышать 16 МБ.");
      setFile(null);
      setPreview(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      setError("Пожалуйста, выберите файл изображения.");
      setFile(null);
      setPreview(null);
      return;
    }

    setFile(file);
    setError(null);

    const reader = new FileReader();
    reader.onloadend = () => setPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Файл не выбран.");
      return;
    }

    const formData = new FormData();
    formData.append("icon", file);

    try {
      const response = await axi.post(`${API_URL}set_icon_profile/`, formData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (response.status === 200) {
        setSuccess("Аватарка успешно загружена");
        setError(null);

       setAvatarUrl(`${MEDIA_URL}${response.data.icon}?t=${Date.now()}`); // <-- обновляем контекст

        setTimeout(() => onClose(), 1000);
      } else {
        throw new Error(response.data.message || "Ошибка при загрузке аватарки");
      }
    } catch (err) {
      console.error("Ошибка:", err);
      setError("Ошибка при загрузке аватарки");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50">
        <h2 className="text-xl font-bold mb-4 text-center text-[#7F9F7C]">
          Смена аватарки
        </h2>
        {error && <div className="text-[#9F7C7C] mb-4">{error}</div>}
        {success && <div className="text-[#7F9F7C] mb-4">{success}</div>}

        <form onSubmit={(e) => e.preventDefault()} encType="multipart/form-data">
          <div className="mb-4">
            <label htmlFor="avatar" className="block text-sm font-medium mb-2 text-gray-500">
              Выберите новую аватарку
            </label>

            {preview && (
              <div className="mb-4 flex justify-center">
                <img src={preview} alt="Предпросмотр аватарки" className="w-32 h-32 rounded-full object-cover" />
              </div>
            )}

            <div className="flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-[#7F9F7C] text-white py-2 px-4 rounded hover:bg-[#6B8768] focus:outline-none"
              >
                Сменить аватарку
              </label>
              <input id="file-upload" type="file" className="sr-only" onChange={handleFileChange} required />
              <span className="ml-2 text-gray-500 text-sm">{file ? file.name : "Файл не выбран"}</span>
            </div>
          </div>

          <div className="flex gap-2">
            <button type="button" onClick={handleUpload} className="w-full bg-[#ECEBE4] text-[#90A07C] p-2 rounded hover:bg-[#D1D1CB]">
              Сохранить
            </button>
            <button type="button" onClick={onClose} className="w-full bg-[#ECEBE4] text-[#90A07C] p-2 rounded hover:bg-[#D1D1CB]">
              Закрыть
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AvatarUpload;
