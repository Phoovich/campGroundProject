"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import BookingForm from "@/components/BookingForm";
import getCampground from "@/libs/getCampground";
import Image from "next/image";
import Link from "next/link";

export default function BookingPage() {
  const [campground, setCampground] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const campgroundId = searchParams.get("campgroundId");

  useEffect(() => {
    const fetchCampground = async () => {
      if (!campgroundId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const data = await getCampground(campgroundId);
        setCampground(data);
        setError(null);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลแคมป์กราวนด์ได้ โปรดลองใหม่อีกครั้ง");
        console.error("Error fetching campground:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampground();
  }, [campgroundId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-10 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        {/* เส้นทางการนำทาง (Breadcrumb) */}
        <nav className="text-sm text-gray-500 mb-6">
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
            {campground ? (
              <>
                <li>
                  <Link
                    href={`/campground/${campgroundId}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {campground.name}
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
                <li className="text-green-600 font-medium">จองที่พัก</li>
              </>
            ) : (
              <li className="text-green-600 font-medium">จองที่พัก</li>
            )}
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          จองที่พักแคมป์กราวนด์
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* ด้านซ้าย: ข้อมูลแคมป์กราวนด์ (2/5 ของความกว้าง) */}
          <div className="lg:col-span-2">
            {isLoading ? (
              <div className="bg-white rounded-xl shadow-md p-4">
                <div className="animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-lg mb-4"></div>
                  <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2 w-1/2"></div>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-red-500 mx-auto mb-4"
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
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ไม่สามารถโหลดข้อมูลได้
                  </h3>
                  <p className="text-gray-500">{error}</p>
                </div>
              </div>
            ) : !campground ? (
              <div className="bg-white rounded-xl shadow-md p-6">
                <div className="text-center">
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
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    ไม่พบข้อมูลแคมป์กราวนด์
                  </h3>
                  <p className="text-gray-500 mb-4">
                    กรุณาเลือกแคมป์กราวนด์ที่ต้องการจอง
                  </p>
                  <Link
                    href="/campground"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  >
                    เลือกแคมป์กราวนด์
                  </Link>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/img/${campground.name}.jpg`}
                    alt={campground.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 40vw"
                    onError={(e) => {
                      // @ts-ignore
                      e.target.src = "/img/default-campground.jpg";
                    }}
                  />
                  {campground.dailyrate && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full font-bold drop-shadow-md">
                      ฿{campground.dailyrate.toLocaleString()} / คืน
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {campground.name}
                  </h2>

                  <div className="flex items-start mb-2 text-gray-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2 flex-shrink-0"
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
                    <span>
                      {campground.address}, {campground.district},{" "}
                      {campground.province} {campground.postalcode}
                    </span>
                  </div>

                  <div className="flex items-center mb-4 text-gray-600 text-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500 mr-2"
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
                    <span>{campground.tel}</span>
                  </div>

                  <div className="bg-green-50 rounded-lg p-4 mt-2">
                    <h3 className="font-medium text-gray-700 mb-2">
                      สิ่งอำนวยความสะดวก
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
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
                        <span className="text-sm text-gray-600">
                          พื้นที่กางเต็นท์
                        </span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
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
                        <span className="text-sm text-gray-600">ห้องน้ำ</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
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
                        <span className="text-sm text-gray-600">ที่จอดรถ</span>
                      </div>
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-green-500 mr-2"
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
                        <span className="text-sm text-gray-600">WiFi</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ด้านขวา: ฟอร์มจอง (3/5 ของความกว้าง) */}
          <div className="lg:col-span-3">
            <BookingForm campground={campground} />
          </div>
        </div>
      </div>
    </div>
  );
}

