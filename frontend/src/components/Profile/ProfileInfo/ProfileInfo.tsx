"use client";

import { useState, useEffect, useRef } from "react";
import axi from "@/utils/api";
import { Switch } from "@/components/ui/switch";

interface ProfileInfoProps {
  user: any; // объект с { user, is_seller, first_name, last_name, middle_name, phone, address }
  setUser: (user: any) => void;
}

export default function ProfileInfo({ user, setUser }: ProfileInfoProps) {
  const [editing, setEditing] = useState(false);

  const [form, setForm] = useState({
    username: user.user.username,
    email: user.user.email || "",
    phone: user.phone || "",
    address: user.address || "",
    first_name: user.first_name || "",
    last_name: user.last_name || "",
    middle_name: user.middle_name || "",
  });

  const [visibleFields, setVisibleFields] = useState({
    email: true,
    phone: true,
    address: true,
  });

  const isSeller = user.is_seller;

  useEffect(() => {
    setForm({
      username: user.user.username,
      email: user.user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      first_name: user.first_name || "",
      last_name: user.last_name || "",
      middle_name: user.middle_name || "",
    });
  }, [user]);

  const initialRef = useRef({
    phone: user.phone || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleToggleField = (field: string) => {
    setVisibleFields({ ...visibleFields, [field]: !visibleFields[field] });
  };

  const handleSave = async () => {
  try {
    const payload: any = {};

    if (form.phone !== initialRef.current.phone) {
      payload.phone = form.phone;
    }

    if (Object.keys(payload).length === 0) {
      setEditing(false);
      return;
    }

    const res = await axi.post("/update_profile/", payload);
    setUser(res.data);
    setEditing(false);
  } catch (err: any) {
    console.error(err.response?.data);
  }
};


  return (
    <div className="w-full max-w-xl bg-gray-50 p-6 rounded-xl shadow mb-6">
      {!editing ? (
        <div>
          <h2 className="text-xl font-bold mb-4">{form.username}</h2>

          {/* Поля для всех */}
          {visibleFields.email && <p><b>Email:</b> {form.email || "-"}</p>}
          
          {isSeller ? (
            <>
              <p><b>Имя:</b> {form.first_name || "-"}</p>
              <p><b>Фамилия:</b> {form.last_name || "-"}</p>
              <p><b>Отчество:</b> {form.middle_name || "-"}</p>
              <p><b>Адрес компании:</b> {form.address || "-"}</p>
              <p><b>Телефон:</b> {form.phone || "-"}</p>
            </>
          ) : (
            <>
              {visibleFields.phone && <p><b>Телефон:</b> {form.phone || "-"}</p>}
              {visibleFields.address && (
                <div className="profile-row">
                  <span className="label">Адрес:</span>
                  <span className="value">{form.address}</span>
                </div>
              )}
            </>
          )}

          <div className="flex gap-2 mt-4">
            <button
              className="px-4 py-2 bg-[#7F9F7C] text-white rounded"
              onClick={() => setEditing(true)}
            >
              Редактировать
            </button>

            {/* Switch только для email и телефона у покупателя */}
            {!isSeller && (
              <div className="flex gap-2 items-center ml-4">
                <span className="text-sm font-medium">Показать:</span>
                {Object.keys(visibleFields).map((field) => (
                  <div key={field} className="flex items-center gap-1">
                    <Switch
                      checked={visibleFields[field as keyof typeof visibleFields]}
                      onCheckedChange={() => handleToggleField(field)}
                    />
                    <label className="text-sm capitalize">{field.replace("_", " ")}</label>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Имя пользователя"
          />
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border p-2 rounded"
            placeholder="Email"
          />

          {isSeller ? (
            <>
              <input
                name="first_name"
                value={form.first_name}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Имя"
              />
              <input
                name="last_name"
                value={form.last_name}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Фамилия"
              />
              <input
                name="middle_name"
                value={form.middle_name}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Отчество (если есть)"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Адрес компании"
              />
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Телефон"
              />
            </>
          ) : (
            <>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Телефон"
              />
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                className="border p-2 rounded"
                placeholder="Адрес"
              />
            </>
          )}

          <div className="flex gap-2 mt-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-[#7F9F7C] text-white rounded"
            >
              Сохранить
            </button>
            <button
              onClick={() => setEditing(false)}
              className="px-4 py-2 bg-gray-300 rounded"
            >
              Отмена
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
