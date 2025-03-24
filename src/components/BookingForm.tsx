"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { addBooking } from "@/libs/addBooking";
import getUserProfile from "@/libs/getUserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { useSession } from "next-auth/react";

export default function BookingForm({ campground }: { campground: any }) {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [totalNights, setTotalNights] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");
  const router = useRouter();
  const { data: session } = useSession();

  // Calculate total nights and price when dates change
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      // Calculate difference in days
      const diffTime = checkOut.getTime() - checkIn.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays > 0) {
        setTotalNights(diffDays);
        // Calculate total price if campground and dailyrate exist
        if (campground && campground.dailyrate) {
          setTotalPrice(diffDays * campground.dailyrate);
        }
      } else {
        setTotalNights(0);
        setTotalPrice(0);
      }
    } else {
      setTotalNights(0);
      setTotalPrice(0);
    }
  }, [checkInDate, checkOutDate, campground]);

  useEffect(() => {
    // Fetch user profile when session is available

    console.log("Current session:", session);

    const fetchUserProfile = async () => {
      if (session?.user?.token) {
        try {
          const userData = await getUserProfile(session.user.token);
          setUserProfile(userData);
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
          setError("Failed to fetch user profile. Please try again later.");
        }
      }
    };

    fetchUserProfile();
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submission attempt with data:", {
      checkInDate,
      checkOutDate,
      campgroundId,
      session: session
        ? {
            user: {
              name: session.user?.name,
              email: session.user?.email,
              token: session.user?.token ? "Token exists" : "No token",
            },
            expires: session.expires,
          }
        : "No session",
    });

    if (!checkInDate || !checkOutDate) {
      setError("กรุณาเลือกวันที่เช็คอินและเช็คเอาท์");
      return;
    }

    const checkInDateObj = new Date(checkInDate);
    const checkOutDateObj = new Date(checkOutDate);

    if (checkOutDateObj <= checkInDateObj) {
      setError("วันที่เช็คเอาท์ต้องมาหลังวันที่เช็คอิน");
      return;
    }

    if (!campgroundId) {
      setError("ไม่พบรหัสแคมป์กราวนด์");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      if (!session || !session.user || !session.user.token) {
        setError("คุณต้องเข้าสู่ระบบก่อนทำการจอง");
        return;
      }

      // Now passing all required parameters to addBooking
      const bookingData = await addBooking({
        campgroundId: campgroundId,
        checkInDate: checkInDateObj,
        checkOutDate: checkOutDateObj,
        token: session.user.token,
      });

      // ทำการบันทึกเรียบร้อยแล้ว แสดง UI สำเร็จก่อนนำทาง
      setIsLoading(false);
      // แสดง UI สำเร็จก่อน redirect ประมาณ 1.5 วินาที
      setTimeout(() => {
        // Redirect to my bookings page
        router.push("/mybooking");
      }, 1500);

      return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-xl max-w-md w-full text-center">
            <svg
              className="w-16 h-16 text-green-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              จองสำเร็จ!
            </h2>
            <p className="text-gray-600 mb-6">
              การจองของคุณได้รับการยืนยันแล้ว
            </p>
            <p className="text-sm text-gray-500">
              กำลังนำคุณไปยังหน้าการจองของฉัน...
            </p>
          </div>
        </div>
      );
    } catch (error: any) {
      setError(error.message || "เกิดข้อผิดพลาดในการจอง โปรดลองอีกครั้ง");
      setIsLoading(false);
    }
  };

  // If no session, show login prompt
  if (!session) {
    return (
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="bg-green-600 px-6 py-4">
          <h2 className="text-xl font-bold text-white">ข้อมูลการจอง</h2>
        </div>
        <div className="p-6 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-yellow-500 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            กรุณาเข้าสู่ระบบ
          </h3>
          <p className="text-gray-500 mb-6">
            คุณต้องเข้าสู่ระบบก่อนทำการจองแคมป์กราวนด์
          </p>
          <button
            onClick={() => router.push("/api/auth/signin")}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            เข้าสู่ระบบ
          </button>
        </div>
      </div>
    );
  }

  // Get today's date in YYYY-MM-DD format for min attribute
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-green-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white">ข้อมูลการจอง</h2>
      </div>

      <div className="p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
            <div className="flex">
              <svg
                className="h-5 w-5 text-red-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {userProfile && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <h3 className="font-medium text-blue-800 mb-2 flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                ข้อมูลผู้จอง
              </h3>
              <div className="text-sm text-gray-700">
                <p className="mb-1">
                  <span className="font-medium">ชื่อ:</span>{" "}
                  {userProfile.data.name || "ไม่มีข้อมูล"}
                </p>
                <p className="mb-1">
                  <span className="font-medium">อีเมล:</span>{" "}
                  {userProfile.data.email || "ไม่มีข้อมูล"}
                </p>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันที่เช็คอิน:
              </label>
              <input
                type="date"
                value={checkInDate}
                onChange={(e) => setCheckInDate(e.target.value)}
                min={today}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                วันที่เช็คเอาท์:
              </label>
              <input
                type="date"
                value={checkOutDate}
                onChange={(e) => setCheckOutDate(e.target.value)}
                min={checkInDate || today}
                className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
              />
            </div>

            {!campgroundId && (
              <div className="bg-yellow-50 p-4 rounded-md text-yellow-800 text-sm">
                <div className="flex">
                  <svg
                    className="h-5 w-5 text-yellow-500 mr-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <div>
                    <p className="font-medium">ไม่พบข้อมูลแคมป์กราวนด์</p>
                    <p className="mt-1">กรุณาเลือกแคมป์กราวนด์ก่อนทำการจอง</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* สรุปการจอง */}
          {totalNights > 0 && campground && (
            <div className="bg-gray-50 p-4 rounded-lg mt-4">
              <h3 className="font-medium text-gray-800 mb-3">สรุปการจอง</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวนคืน:</span>
                  <span className="font-medium">{totalNights} คืน</span>
                </div>
                {campground.dailyrate && (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ราคาต่อคืน:</span>
                      <span className="font-medium">
                        ฿{campground.dailyrate.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-green-800 font-bold pt-2 border-t border-gray-200 mt-2">
                      <span>ราคารวม:</span>
                      <span>฿{totalPrice.toLocaleString()}</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !campgroundId}
              className={`w-full p-3 rounded-lg text-white font-medium shadow-sm ${
                isLoading || !campgroundId
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700 transition-colors"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  กำลังดำเนินการ...
                </div>
              ) : (
                "ยืนยันการจอง"
              )}
            </button>
          </div>

          <div className="text-center text-sm text-gray-500 mt-4">
            <p>เมื่อยืนยันการจองคุณยอมรับข้อกำหนดและเงื่อนไขของเรา</p>
            <p className="mt-1">
              การยกเลิกการจองสามารถทำได้ฟรีภายใน 24 ชั่วโมง
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
