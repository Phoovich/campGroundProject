"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/libs/register";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = { name, email, password };

    try {
      const result = await registerUser(userData);
      console.log("ลงทะเบียนสำเร็จ:", result);
      router.push("/login");
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "เกิดข้อผิดพลาดในการสร้างบัญชี กรุณาลองใหม่",
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">ลงทะเบียน</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="ชื่อเต็ม"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="email"
          placeholder="อีเมล"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-4 p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded"
        >
          ลงทะเบียน
        </button>
      </form>
    </div>
  );
}
