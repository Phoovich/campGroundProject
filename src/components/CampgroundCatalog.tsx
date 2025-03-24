import { useState, useEffect } from "react";
import Link from "next/link";

interface CampgroundItem {
  _id: string;
  name: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
  tel: string;
  picture: string;
  dailyrate: number;
  __v: number;
  id: string;
}

interface CampgroundJson {
  success: boolean;
  count: number;
  data: CampgroundItem[];
}

export default function CampgroundCatalog({
  campgroundsJson,
  searchTerm = "",
}: {
  campgroundsJson: Promise<CampgroundJson>;
  searchTerm?: string;
}) {
  const [campgrounds, setCampgrounds] = useState<CampgroundItem[]>([]);
  const [filteredCampgrounds, setFilteredCampgrounds] = useState<
    CampgroundItem[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewType, setViewType] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const loadCampgrounds = async () => {
      try {
        const data = await campgroundsJson;
        setCampgrounds(data.data);
        setFilteredCampgrounds(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading campgrounds:", error);
        setIsLoading(false);
      }
    };

    loadCampgrounds();
  }, [campgroundsJson]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCampgrounds(campgrounds);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = campgrounds.filter(
      (camp) =>
        camp.name.toLowerCase().includes(lowercasedSearch) ||
        camp.province.toLowerCase().includes(lowercasedSearch) ||
        camp.district.toLowerCase().includes(lowercasedSearch) ||
        camp.address.toLowerCase().includes(lowercasedSearch),
    );
    setFilteredCampgrounds(filtered);
  }, [searchTerm, campgrounds]);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div id="campgrounds" className="font-sans">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          {filteredCampgrounds.length} แคมป์กราวนด์ให้เลือก
          {searchTerm && (
            <span className="text-green-600"> สำหรับ "{searchTerm}"</span>
          )}
        </h2>

        <div className="flex space-x-2">
          <button
            className={`p-2 rounded-md ${viewType === "grid" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setViewType("grid")}
            aria-label="Grid view"
          >
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </button>
          <button
            className={`p-2 rounded-md ${viewType === "list" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setViewType("list")}
            aria-label="List view"
          >
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
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {filteredCampgrounds.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-gray-400 mx-auto mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            ไม่พบแคมป์กราวนด์
          </h3>
          <p className="text-gray-500 mb-4">
            ลองปรับเปลี่ยนคำค้นหาของคุณเพื่อดูผลลัพธ์เพิ่มเติม
          </p>
          <button
            onClick={() => setFilteredCampgrounds(campgrounds)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
          >
            แสดงแคมป์ทั้งหมด
          </button>
        </div>
      ) : viewType === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCampgrounds.map((campgroundItem) => (
            <CampCard key={campgroundItem.id} campground={campgroundItem} />
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {filteredCampgrounds.map((campgroundItem) => (
            <CampListItem key={campgroundItem.id} campground={campgroundItem} />
          ))}
        </div>
      )}
    </div>
  );
}

function CampCard({ campground }: { campground: CampgroundItem }) {
  return (
    <Link href={`/campground/${campground.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48">
          <img
            src={`/img/${campground.name}.jpg`}
            alt={campground.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/img/default-campground.jpg"; // ต้องเตรียมรูปภาพนี้
            }}
          />
          {campground.dailyrate && (
            <div className="absolute top-0 right-0 bg-green-600 text-white text-sm font-semibold px-3 py-1 m-2 rounded-full">
              ฿{campground.dailyrate.toLocaleString()}/คืน
            </div>
          )}
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {campground.name}
          </h3>
          <div className="flex items-start mb-2 text-gray-600 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-1 flex-shrink-0"
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
              {campground.district}, {campground.province}
            </span>
          </div>
          <div className="mt-auto pt-3 border-t border-gray-100 flex justify-between items-center">
            <div className="text-sm text-gray-500">{campground.tel}</div>
            <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-1 rounded transition-colors duration-300">
              ดูรายละเอียด
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

function CampListItem({ campground }: { campground: CampgroundItem }) {
  return (
    <Link href={`/campground/${campground.id}`}>
      <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col sm:flex-row">
        <div className="sm:w-56 h-44 sm:h-auto">
          <img
            src={`/img/${campground.name}.jpg`}
            alt={campground.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/img/default-campground.jpg"; // ต้องเตรียมรูปภาพนี้
            }}
          />
        </div>
        <div className="p-5 flex-1 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {campground.name}
            </h3>
            {campground.dailyrate && (
              <div className="bg-green-600 text-white text-sm font-semibold px-3 py-1 rounded-full">
                ฿{campground.dailyrate.toLocaleString()}/คืน
              </div>
            )}
          </div>

          <div className="flex items-start mb-2 text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-1 flex-shrink-0"
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
              {campground.address}, {campground.district}, {campground.province}{" "}
              {campground.postalcode}
            </span>
          </div>

          <div className="text-sm text-gray-500 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 inline-block mr-1"
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
            {campground.tel}
          </div>

          <div className="mt-auto flex justify-end">
            <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded transition-colors duration-300">
              จองตอนนี้
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
