"use client";

import React, { useState } from "react";
import { API_URL } from "@/index";
import axi from "@/utils/api";

interface LoginFormProps {
  onClose: () => void;
  onLoginSuccess: () => void;
  onRegisterOpen: () => void; // Добавляем пропс для открытия формы регистрации
}

export default function LoginForm({
  onClose,
  onLoginSuccess,
  onRegisterOpen,
}: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const formData = {
    login: email,
    password: password,
  };

  try {
    const response = await axi.post(`${API_URL}login`, formData);
    if (response.status === 200) {
      setSuccess("Успешная авторизация");
      setError(null);
      const token = response.data.token;
      localStorage.setItem("token", token);
      onLoginSuccess(token); // передаем токен в Header
      onClose();
    }
  } catch (error) {
    setError("Неправильный логин или пароль");
    setSuccess(null);
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-[340px]">
        <div className="auth flex direction column items-center flex-col">
          <img src="/image/Frame.svg" alt="" className="w-[50px] h-[50px]" />
          <h2 className="3xl font-bold">Добро пожаловать,</h2>
          <h2 className="font-bold" style={{ color: "#FF3A44" }}>
            путник!
          </h2>
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="text"
            ></label>
            <input
              type="text"
              id="text"
              className="w-full p-2 border border-gray-300 rounded bg-[#ECEBE4] placeholder:text-black"
              placeholder="Введите логин"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            ></label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded bg-[#ECEBE4] placeholder:text-black"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col h-[195px] justify-evenly items-center">
            <button
              type="submit"
              className="bg-[#ECEBE4] text-black px-4 py-2 rounded hover:bg-gray-300 w-[120px]"
            >
              Войти
            </button>

            <button
              type="button"
              onClick={onClose}
              className=" bg-linear-to-r from-[#FF3A44] to-[#992329] text-white px-4 py-2 rounded hover:bg-gray-600 w-[120px]"
            >
              Закрыть
            </button>
            <div className="flex flex-col items-center">
              <p className="">Нет аккаунта?</p>
              <p className="">Не проблема!</p>
              <button
                type="button"
                onClick={onRegisterOpen} // Открываем форму регистрации
                className=" text-[#7E95AA] hover:text-[#FF3A44]"
              >
                Регистрация
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}