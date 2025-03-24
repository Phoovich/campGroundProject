"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import deleteBooking from "@/libs/deleteBooking";

interface bookingList {
  success: boolean;
  count: number;
  data: bookingListItem[];
}

interface bookingListItem {
  _id: string;
  checkInDate: Date;
  checkOutDate: Date;
  user: string;
  campground: {
    _id: string;
    name: string;
    province: string;
    tel: string;
    id: string;
  };
  createdAt: Date;
}

export default function BookingList({
  bookingList,
  token,
}: {
  bookingList: bookingList;
  token: string;
}) {
  const router = useRouter();
  const [bookings, setBookings] = useState<bookingListItem[]>([]);
  const [isDeleting, setIsDeleting] = useState<{ [key: string]: boolean }>({});
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // เริ่มต้นด้วยข้อมูลจาก prop
  useEffect(() => {
    if (bookingList?.data) {
      setBookings(bookingList.data);
    }
    console.log("BookingList Data:", JSON.stringify(bookingList, null, 2));
  }, [bookingList]);

  // ฟังก์ชันสำหรับลบการจอง
  const handleDeleteBooking = async (
    bookingId: string,
    campgroundName: string,
  ) => {
    // ตรวจสอบการยืนยันจากผู้ใช้
    const isConfirmed = window.confirm(
      `ยืนยันการยกเลิกการจองแคมป์ "${campgroundName}" หรือไม่?`,
    );

    if (!isConfirmed) return;

    // แสดงสถานะกำลังลบ
    setIsDeleting((prev) => ({ ...prev, [bookingId]: true }));

    try {
      const result = await deleteBooking(bookingId, token);

      if (result.success) {
        // อัปเดตรายการโดยลบการจองที่ถูกลบออกไป
        setBookings((prev) =>
          prev.filter((booking) => booking._id !== bookingId),
        );

        // แสดงข้อความสำเร็จ
        setMessage({
          type: "success",
          text: `ยกเลิกการจองแคมป์ "${campgroundName}" สำเร็จ`,
        });

        // รีเฟรชข้อมูลหลังจากลบ
        setTimeout(() => {
          router.refresh();
        }, 2000);
      } else {
        // แสดงข้อความข้อผิดพลาด
        setMessage({
          type: "error",
          text: result.message || "เกิดข้อผิดพลาดในการยกเลิกการจอง",
        });
      }
    } catch (error) {
      console.error("Failed to delete booking:", error);
      setMessage({ type: "error", text: "เกิดข้อผิดพลาดในการยกเลิกการจอง" });
    } finally {
      // คืนค่าสถานะกำลังลบ
      setIsDeleting((prev) => ({ ...prev, [bookingId]: false }));

      // ซ่อนข้อความหลังจากผ่านไป 5 วินาที
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  };

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // ถ้าไม่มีข้อมูล
  if (!bookings || bookings.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">ไม่พบการจอง</h3>
        <p className="mt-2 text-sm text-gray-500">
          คุณยังไม่มีการจองแคมป์กราวนด์ในขณะนี้
        </p>
        <div className="mt-6">
          <a
            href="/campground"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            ค้นหาแคมป์กราวนด์
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ข้อความแจ้งเตือน */}
      {message && (
        <div
          className={`mb-4 p-4 rounded-md ${message.type === "success" ? "bg-green-50 text-green-700 border border-green-200" : "bg-red-50 text-red-700 border border-red-200"}`}
        >
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 mr-2 ${message.type === "success" ? "text-green-500" : "text-red-500"}`}
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {message.type === "success" ? (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              ) : (
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              )}
            </svg>
            {message.text}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <p className="text-sm text-gray-500">วันที่: {formattedDate}</p>
        <p className="text-sm text-gray-500">
          จำนวนการจองทั้งหมด: {bookings.length} รายการ
        </p>
      </div>

      {bookings.map((booking, index) => {
        // แปลงวันที่เพื่อแสดงผล
        const checkInDate = new Date(booking.checkInDate).toLocaleDateString(
          "th-TH",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );
        const checkOutDate = new Date(booking.checkOutDate).toLocaleDateString(
          "th-TH",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        );

        // คำนวณจำนวนวันที่พัก
        const startDate = new Date(booking.checkInDate);
        const endDate = new Date(booking.checkOutDate);
        const days = Math.floor(
          (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        // สร้าง image path ตามรูปแบบที่ต้องการ
        const imagePath = `/img/${booking.campground.name}.jpg`;

        return (
          <div
            key={booking._id}
            className="bg-white border border-green-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col md:flex-row">
              {/* รูปแคมป์กราวนด์ */}
              <div className="md:w-1/3 relative h-48 md:h-auto bg-green-50">
                <img
                  src={imagePath}
                  alt={booking.campground.name}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    console.log(
                      `Failed to load image for ${booking.campground.name}`,
                    );
                    // ถ้าโหลดรูปไม่สำเร็จ แสดงไอคอนแทน
                    const target = e.currentTarget;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallbackDiv = document.createElement("div");
                      fallbackDiv.className =
                        "h-full w-full flex items-center justify-center";
                      fallbackDiv.innerHTML = `
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                      `;
                      parent.appendChild(fallbackDiv);
                    }
                  }}
                />
              </div>

              {/* รายละเอียดการจอง */}
              <div className="md:w-2/3 p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      {booking.campground.name}
                    </h2>
                    {booking.campground.province && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-1">📍</span>
                        จังหวัด{booking.campground.province}
                      </p>
                    )}
                    {booking.campground.tel && (
                      <p className="text-sm text-gray-500 mt-1">
                        <span className="inline-block mr-1">📞</span>
                        {booking.campground.tel}
                      </p>
                    )}
                  </div>

                  <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                    {days} คืน
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 uppercase font-medium">
                      เช็คอิน
                    </p>
                    <p className="font-medium mt-1">{checkInDate}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-xs text-green-600 uppercase font-medium">
                      เช็คเอาท์
                    </p>
                    <p className="font-medium mt-1">{checkOutDate}</p>
                  </div>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-600">
                      สถานะ:{" "}
                      <span className="font-medium text-green-600">
                        ยืนยันแล้ว
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      รหัสการจอง: {booking._id.substring(0, 8)}...
                    </p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className={`px-3 py-1 rounded-md text-sm transition-colors ${
                        isDeleting[booking._id]
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-red-50 text-red-600 border border-red-300 hover:bg-red-100"
                      }`}
                      onClick={() =>
                        handleDeleteBooking(
                          booking._id,
                          booking.campground.name,
                        )
                      }
                      disabled={isDeleting[booking._id]}
                    >
                      {isDeleting[booking._id]
                        ? "กำลังยกเลิก..."
                        : "ยกเลิกการจอง"}
                    </button>
                    <a
                      href={`/campground/${booking.campground.id}`}
                      className="px-3 py-1 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition-colors"
                    >
                      ดูแคมป์
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
