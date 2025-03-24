"use client";

import { Suspense, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CampgroundCatalog from "@/components/CampgroundCatalog";
import { getCampgrounds } from "@/libs/getCampgrounds";
import Image from "next/image";

const CampgroundPage: React.FC = () => {
  const campgroundsPromise = getCampgrounds();
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Hero Section */}
      <div className="relative h-80 sm:h-96 w-full overflow-hidden">
        <Image
          src="/img/cover.jpg" // ต้องเตรียมรูปภาพนี้ หรือใช้รูปภาพอื่นที่เหมาะสม
          alt="Explore Campgrounds"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 bg-black bg-opacity-30">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Discover Nature's Getaways
          </h1>
          <p className="text-xl text-white max-w-2xl mb-8 drop-shadow-md">
            Find and book the perfect campground for your next adventure
          </p>

          {/* Search Box */}
          <div className="w-full max-w-xl relative">
            <input
              type="text"
              placeholder="Search by name, location, or province..."
              className="w-full px-5 py-3 rounded-full shadow-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700 transition duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-10">
          <button className="bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-green-600 hover:text-white transition duration-300">
            All Campgrounds
          </button>
          <button className="bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-green-600 hover:text-white transition duration-300">
            Northern Thailand
          </button>
          <button className="bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-green-600 hover:text-white transition duration-300">
            Central Thailand
          </button>
          <button className="bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-green-600 hover:text-white transition duration-300">
            Southern Thailand
          </button>
          <button className="bg-white px-5 py-2 rounded-full shadow text-sm font-medium hover:bg-green-600 hover:text-white transition duration-300">
            Best Rated
          </button>
        </div>

        {/* Campground Catalog */}
        <Suspense
          fallback={
            <div className="flex flex-col items-center space-y-5 w-full py-12">
              <div className="w-full max-w-md">
                <LinearProgress
                  sx={{
                    height: 5,
                    backgroundColor: "#e5e7eb",
                    "& .MuiLinearProgress-bar": {
                      backgroundColor: "#10b981",
                    },
                  }}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-700"></div>
                <p className="text-gray-600">กำลังโหลดข้อมูลแคมป์กราวนด์...</p>
              </div>
            </div>
          }
        >
          <CampgroundCatalog
            campgroundsJson={campgroundsPromise}
            searchTerm={searchTerm}
          />
        </Suspense>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Campgrounds?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-green-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-green-100 p-3 rounded-full mb-4">
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                High Quality Selections
              </h3>
              <p className="text-gray-600">
                All our campgrounds are carefully selected to ensure quality,
                safety, and beautiful natural surroundings.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Easy Booking Process
              </h3>
              <p className="text-gray-600">
                Book your campground in minutes with our simple, secure booking
                system. No hidden fees or complications.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-yellow-50 rounded-lg shadow-sm hover:shadow-md transition duration-300">
              <div className="bg-yellow-100 p-3 rounded-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-yellow-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">
                24/7 Customer Support
              </h3>
              <p className="text-gray-600">
                Our friendly support team is always available to help with any
                questions or concerns during your trip.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-green-700 text-white py-12 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book a campground today and start creating unforgettable memories in
            nature.
          </p>
          <a
            href="#campgrounds"
            className="inline-block bg-white text-green-700 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition duration-300"
          >
            Explore Campgrounds
          </a>
        </div>
      </div>
    </div>
  );
};

export default CampgroundPage;
