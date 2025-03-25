import { getBookings } from "@/libs/getBookings";
import BookingList from "@/components/BookingList";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

const Mybooking = async () => {
  // รอให้ getServerSession ทำงานเสร็จก่อนด้วย await
  const session = await getServerSession(authOptions);

  // ตรวจสอบว่ามีเซสชันหรือไม่
  if (!session) {
    // ถ้าไม่มี session ให้ redirect ไปหน้า login
    redirect("/api/auth/signin");
  }

  // ตรวจสอบว่ามี token หรือไม่
  if (!session.user?.token) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">การจองของฉัน</h1>
          </div>
          <div className="p-6 text-center">
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-red-700">
                ไม่พบข้อมูลการยืนยันตัวตน
              </h2>
              <p className="text-red-600 mt-2">
                ระบบไม่พบ token สำหรับการเข้าถึง API
              </p>
              <p className="text-red-600 mt-1">
                กรุณา logout และ login ใหม่อีกครั้ง
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ส่ง token ไปที่ getBookings function
  const bookingData = await getBookings(session.user.token);

  // Log ข้อมูลที่ได้จาก API ที่ server side (จะเห็นใน terminal)
  console.log(
    "Server-side booking data:",
    JSON.stringify(bookingData, null, 2),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-500 to-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-green-600 px-6 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">การจองของฉัน</h1>
            <span className="text-sm text-green-100">
              {new Date().toLocaleDateString("th-TH", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6">
              รายการจองแคมป์กราวนด์ของคุณทั้งหมด
              {session.user.name && (
                <span className="font-medium"> คุณ{session.user.name}</span>
              )}
            </p>

            {/* ส่ง token ไปพร้อมกับข้อมูล bookingList */}
            <BookingList bookingList={bookingData} token={session.user.token} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mybooking;
