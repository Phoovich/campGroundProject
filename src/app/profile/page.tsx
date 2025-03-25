

import DateReserve from "@/components/DateReserve";
import { TextField, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import getUserProfile from "@/libs/getUserProfile";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) return null;

  const profile = await getUserProfile(session.user.token);
  const createdAt = new Date(profile.data.createdAt);

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-900 to-blue-50 flex items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white rounded-xl shadow-lg overflow-hidden p-6">
        <h2 className="text-2xl font-bold text-center text-green-700 mb-4">ข้อมูลโปรไฟล์</h2>
        <div className="space-y-4">
          <div>
            <span className="text-gray-600 font-semibold">ชื่อ-นามสกุล:</span>
            <p className="text-lg text-gray-900">{profile.data.name}</p>
          </div>
          <div>
            <span className="text-gray-600 font-semibold">อีเมล:</span>
            <p className="text-lg text-gray-900">{profile.data.email}</p>
          </div>
          <div>
            <span className="text-gray-600 font-semibold">เป็นสมาชิกตั้งแต่:</span>
            <p className="text-lg text-gray-900">{createdAt.toDateString()}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
