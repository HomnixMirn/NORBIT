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
  const [role, setRole] = useState<"buyer" | "seller">("buyer");

  // Для продавца
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const payload: any = {
        login,
        email,
        password,
        password2: confirmPassword,
        is_seller: role === "seller",
      };

      if (role === "seller") {
        payload.first_name = firstName;
        payload.last_name = lastName;
        payload.middle_name = middleName;
        payload.address = address;
      }

      const response = await fetch(`${API_URL}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
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
        <div className="flex flex-col items-center mb-4">
          <img src="/image/Frame.svg" alt="" className="w-[50px] h-[50px]" />
          <h2 className="text-2xl font-bold">Чувствуй себя как</h2>
          <h2 className="text-2xl font-bold" style={{ color: "#FF3A44" }}>дома!</h2>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {step === "register" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Логин"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              className="w-full p-2 border rounded bg-[#ECEBE4]"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded bg-[#ECEBE4]"
              required
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-[#ECEBE4]"
              required
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded bg-[#ECEBE4]"
              required
            />

            <div>
              <p className="mb-2 font-medium text-gray-500">Я хочу зарегистрироваться как:</p>
              <div className="flex gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="buyer"
                    checked={role === "buyer"}
                    onChange={() => setRole("buyer")}
                  />
                  Покупатель
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="role"
                    value="seller"
                    checked={role === "seller"}
                    onChange={() => setRole("seller")}
                  />
                  Продавец
                </label>
              </div>
            </div>

            {role === "seller" && (
              <>
                <input
                  type="text"
                  placeholder="Имя"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border rounded bg-[#ECEBE4]"
                  required
                />
                <input
                  type="text"
                  placeholder="Фамилия"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full p-2 border rounded bg-[#ECEBE4]"
                  required
                />
                <input
                  type="text"
                  placeholder="Отчество (если есть)"
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                  className="w-full p-2 border rounded bg-[#ECEBE4]"
                />
                <input
                  type="text"
                  placeholder="Адрес компании"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full p-2 border rounded bg-[#ECEBE4]"
                  required
                />
              </>
            )}

            <div className="flex gap-2 mt-2">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#ECEBE4] rounded hover:bg-gray-300"
              >
                Регистрация
              </button>
              <button
                type="button"
                onClick={onClose}
                className="w-full px-4 py-2 bg-linear-to-r from-[#FF3A44] to-[#992329] text-white rounded"
              >
                Закрыть
              </button>
            </div>

            <div className="flex flex-col items-center mt-2">
              <p>Есть аккаунт? <button onClick={onLoginOpen} className="text-[#7E95AA] hover:text-[#FF3A44]">Вход</button></p>
            </div>
          </form>
        )}

        {step === "verify" && (
          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Введите код из письма"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-2 border rounded bg-[#ECEBE4]"
              required
            />
            <button
              type="submit"
              className="w-full mt-2 px-4 py-2 bg-[#ECEBE4] rounded hover:bg-gray-300"
            >
              Подтвердить
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
