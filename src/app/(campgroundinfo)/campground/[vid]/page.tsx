"use client"; // เพิ่มบรรทัดนี้ที่ด้านบนสุดของไฟล์

import Image from "next/image";
import Link from "next/link";
import getCampground from "@/libs/getCampground";
import { Suspense, useState, useEffect } from "react";

export default function CampgroundDetails({
  params,
}: {
  params: { vid: string };
}) {
  const [campgroundData, setCampgroundData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCampground = async () => {
      setIsLoading(true);
      try {
        const data = await getCampground(params.vid);
        setCampgroundData(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error
            ? err
            : new Error("Failed to fetch campground data"),
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampground();
  }, [params.vid]);

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !campgroundData) {
    return <ErrorComponent />;
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-600 to-blue-50 py-10 px-4 sm:px-6">
      {/* เส้นทางการนำทาง (Breadcrumb) */}
      <div className="max-w-6xl mx-auto mb-6">
        <nav className="text-sm text-white mb-6">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-green-600 transition-colors">
                หน้าหลัก
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li>
              <Link
                href="/campground"
                className="hover:text-green-600 transition-colors"
              >
                แคมป์กราวนด์
              </Link>
            </li>
            <li className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </li>
            <li className="text-orange-200 font-medium">
              {campgroundData.name}
            </li>
          </ol>
        </nav>

        {/* ส่วนหัวและภาพ Hero */}
        <div className="relative rounded-xl overflow-hidden h-80 mb-8">
          <Image
            src={`/img/${campgroundData.name}.jpg`}
            alt={campgroundData.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 80vw"
            priority
            onError={(e) => {
              // @ts-ignore
              e.target.src = "/img/default-campground.jpg";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-6 text-white">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-md">
                {campgroundData.name}
              </h1>
              <p className="text-lg text-white/90 drop-shadow-sm flex items-center">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {campgroundData.district}, {campgroundData.province}
              </p>
            </div>
          </div>

          {/* แสดงราคา */}
          {campgroundData.dailyrate && (
            <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold drop-shadow-md">
              ฿{campgroundData.dailyrate.toLocaleString()} / คืน
            </div>
          )}
        </div>

        {/* เนื้อหาหลักในรูปแบบการ์ด */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* คอลัมน์ซ้าย: รายละเอียดแคมป์ */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
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
                    เกี่ยวกับแคมป์กราวนด์
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="prose prose-green max-w-none">
                  <p className="text-gray-600 mb-4">
                    {campgroundData.description ||
                      `${campgroundData.name} เป็นแคมป์กราวนด์ที่ตั้งอยู่ใน ${campgroundData.district} จังหวัด ${campgroundData.province} ให้บริการพื้นที่กางเต็นท์ท่ามกลางธรรมชาติที่สวยงาม เหมาะสำหรับผู้ที่ชื่นชอบการท่องเที่ยวแบบผจญภัย`}
                  </p>
                </div>
              </div>
            </div>

            {/* ส่วนสถานที่ตั้ง */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    สถานที่ตั้ง
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4 text-gray-600">
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">
                      ที่อยู่:
                    </span>
                    <p>{campgroundData.address}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">
                      อำเภอ:
                    </span>
                    <p>{campgroundData.district}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">
                      จังหวัด:
                    </span>
                    <p>{campgroundData.province}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-700">
                      รหัสไปรษณีย์:
                    </span>
                    <p>{campgroundData.postalcode}</p>
                  </div>
                </div>

                {/* แผนที่ (จำลอง) */}
                <div className="mt-6 h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <div className="w-full h-full bg-gray-200 relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3876.0870513424684!2d100.52411147597026!3d13.713177286674709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30e2996660cbfbd1%3A0x4cdfe3b0c74fc8f9!2z4Lir4Li04LinIOC4q-C4tOC4pyAoIEhpZXcgSGlldyAp!5e0!3m2!1sth!2sth!4v1742844241483!5m2!1sth!2sth"
                        width="600"
                        height="450"
                        style={{ border: 0 }} // Use an object for style
                        allowFullScreen // Use camelCase for allowfullscreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนสิ่งอำนวยความสะดวก */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    สิ่งอำนวยความสะดวก
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">พื้นที่กางเต็นท์</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">ห้องน้ำ/ห้องอาบน้ำ</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">ที่จอดรถ</span>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-600">เข้าถึงง่าย</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* คอลัมน์ขวา: การจองและข้อมูลติดต่อ */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    จองที่พัก
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="bg-green-50 p-4 rounded-lg mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">
                      ราคาต่อคืน
                    </span>
                    <span className="text-lg font-bold text-green-600">
                      ฿
                      {campgroundData.dailyrate
                        ? campgroundData.dailyrate.toLocaleString()
                        : "1,500"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-2">
                    ราคารวมค่าบริการและภาษี
                  </p>
                  <div className="border-t border-green-200 my-3"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-medium">
                      พร้อมเข้าพัก
                    </span>
                    <span className="text-green-600">ทันที</span>
                  </div>
                </div>

                <Link
                  href={`/booking?campgroundId=${params.vid}`}
                  className="block w-full text-center bg-green-600 text-white font-medium px-4 py-3 rounded-lg hover:bg-green-700 transition-colors shadow-md"
                >
                  จองตอนนี้
                </Link>

                <p className="text-center text-sm text-gray-500 mt-3">
                  สามารถยกเลิกการจองได้ฟรีภายใน 24 ชั่วโมง
                </p>
              </div>
            </div>

            {/* ส่วนข้อมูลติดต่อ */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                    ติดต่อ
                  </h2>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">โทรศัพท์</h3>
                    <p className="text-gray-600">{campgroundData.tel}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-700">อีเมล</h3>
                    <p className="text-gray-600">
                      contact@
                      {campgroundData.name.toLowerCase().replace(/\s+/g, "")}
                      .com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ส่วนรีวิว */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="border-b border-gray-100">
                <div className="flex justify-between items-center px-6 py-4">
                  <h2 className="text-xl font-bold text-gray-800 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                      />
                    </svg>
                    รีวิว
                  </h2>
                  <span className="inline-flex items-center bg-green-100 text-green-800 px-2.5 py-0.5 rounded-full text-sm font-medium">
                    <svg
                      className="h-4 w-4 text-yellow-500 mr-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    4.8
                  </span>
                </div>
              </div>

              <div className="p-6">
                <p className="text-center text-gray-500">ยังไม่มีรีวิว</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

// Component แสดงตัว Loading
function LoadingSkeleton() {
  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <div className="animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>

        <div className="h-80 bg-gray-200 rounded-xl mb-8"></div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-10 bg-gray-100 mb-4"></div>
              <div className="p-6">
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded mb-3"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-10 bg-gray-100 mb-4"></div>
              <div className="p-6">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
                <div className="h-64 bg-gray-200 rounded-lg mt-6"></div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-10 bg-gray-100 mb-4"></div>
              <div className="p-6">
                <div className="bg-gray-200 h-24 rounded-lg mb-6"></div>
                <div className="h-12 bg-gray-200 rounded-lg"></div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="h-10 bg-gray-100 mb-4"></div>
              <div className="p-6">
                <div className="h-24 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Component แสดงข้อผิดพลาด
function ErrorComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-red-600 p-6 text-white text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 mx-auto mb-4"
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
          <h2 className="text-2xl font-bold mb-2">ไม่พบข้อมูลแคมป์กราวนด์</h2>
          <p className="text-white/80">
            อาจเกิดจากรหัสไม่ถูกต้องหรือแคมป์กราวนด์ไม่มีอยู่ในระบบ
          </p>
        </div>
        <div className="p-6 text-center">
          <p className="text-gray-600 mb-6">
            กรุณาตรวจสอบ URL
            หรือกลับไปที่หน้าค้นหาแคมป์กราวนด์เพื่อเลือกแคมป์อื่น
          </p>
          <Link
            href="/campground"
            className="inline-block bg-green-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            ค้นหาแคมป์กราวนด์
          </Link>
        </div>
      </div>
    </div>
  );
}
