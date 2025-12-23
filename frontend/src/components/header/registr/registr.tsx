import React, { useState } from "react";
import { API_URL } from "@/index";

export default function RegisterForm({
  onClose,
  onLoginOpen,
}: {
  onClose: () => void;
  onLoginOpen: () => void;
}) {
  const [step, setStep] = useState<"register" | "verify">("register");
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (password !== confirmPassword) {
    setError("Пароли не совпадают");
    return;
  }

  try {
    const response = await fetch(`${API_URL}register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login,
        email,
        password,
        password2: confirmPassword,
      }),
    });

    const data = await response.text();

    if (response.ok) {
      setError(null);
      setSuccess("Введите код из письма");
      setStep("verify");
    } else {
      setError(data || "Ошибка регистрации");
    }
  } catch {
    setError("Ошибка при отправке запроса");
  }
};

const handleVerify = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API_URL}verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        code,
      }),
    });

    const data = await response.text();

    if (response.ok) {
      setSuccess("Почта подтверждена");
      setError(null);

      setTimeout(() => {
        onClose();
        onLoginOpen();
      }, 1000);
    } else {
      setError(data || "Неверный код");
    }
  } catch {
    setError("Ошибка подтверждения");
  }
};


  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg z-50 w-[340px]">
        <div className="flex direction column items-center flex-col">
          <img src="/image/Frame.svg"alt="" className="w-[50px] h-[50px]" />
          <h2 className="3xl font-bold">Чувствуй себя как</h2>
          <h2 className="3xl font-bold" style={{color: "#FF3A44"}}>дома!</h2>
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        {step === "register" && (
          <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-500"
              htmlFor="login"
            >
            </label>
            <input
              type="login"
              id="login"
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-black bg-[#ECEBE4]"
              placeholder="Введите логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-500"
              htmlFor="email"
            >
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-black bg-[#ECEBE4]"
              placeholder="Введите email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-500"
              htmlFor="password"
            >
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border border-gray-300 rounded  text-black placeholder:text-black bg-[#ECEBE4]"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2 text-gray-500 "
              htmlFor="confirmPassword"
            >
            </label>
            <input
              type="password"
              id="confirmPassword"
              className="w-full p-2 border border-gray-300 rounded text-black placeholder:text-black bg-[#ECEBE4]"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col h-[110px] items-center justify-evenly">
            <button
              type="submit"
              className="bg-[#ECEBE4] text-black px-4 py-2 rounded hover:bg-gray-300 w-[120px]"
            >
              Регистрация
            </button>

          
          <button
            onClick={onClose}
            className=" bg-linear-to-r from-[#FF3A44] to-[#992329] text-white px-4 py-2 rounded hover:bg-gray-600 w-[120px]"
          >
            Закрыть
          </button>
        </div>
        <div className="flex flex-col items-center ">
          <p>Есть аккаунт?</p>
          <p>Тогда заходи</p>
          <p>не стесняйся!</p>
          <button
              type="button"
              onClick={onLoginOpen} // Открываем форму регистрации
              className="text-[#7E95AA] hover:text-[#FF3A44]"
            >
              Вход
            </button>
        </div>
        </form>
        )}
        {step === "verify" && (
          <form onSubmit={handleVerify}>
            <div className="mb-4">
              <input
                type="text"
                className="w-full p-2 border rounded bg-[#ECEBE4] text-black"
                placeholder="Введите код из письма"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="bg-[#ECEBE4] text-black px-4 py-2 rounded w-full"
            >
              Подтвердить
            </button>
          </form> 
          )}
      </div>
    </div>
  );
}