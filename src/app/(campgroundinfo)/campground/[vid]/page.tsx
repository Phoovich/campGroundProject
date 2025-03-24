"use client";

import { Suspense } from "react";
import Image from "next/image";
import LinearProgress from "@mui/material/LinearProgress";
import getCampground from "@/libs/getCampground";
import { useRouter } from "next/navigation";

export default async function CampgroundDetails({
  params,
}: {
  params: { vid: string };
}) {
  const router = useRouter();

  try {
    const campgroundResponse = await getCampground(params.vid);
    const campgroundData = campgroundResponse.data;
    return (
      <main className="flex flex-col items-center min-h-screen p-5">
        <Suspense fallback={<LinearProgress className="w-full" />}>
          <div className="max-w-6xl w-full my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={`/img/${campgroundData.name}.jpg`}
                  alt={campgroundData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  {campgroundData.name}
                </h1>

                <div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">
                      Address:
                    </span>
                    <p className="text-gray-800">{campgroundData.address}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">
                      Province:
                    </span>
                    <p className="text-gray-800">{campgroundData.province}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">
                      District:
                    </span>
                    <p className="text-gray-800">{campgroundData.district}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">
                      Postal Code:
                    </span>
                    <p className="text-gray-800">{campgroundData.postalcode}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Tel:</span>
                    <p className="text-gray-800">{campgroundData.tel}</p>
                  </div>
                </div>
                <div className="mt-12">
                  <button
                    onClick={() =>
                      router.push(`/booking?campgroundId=${params.vid}`)
                    }
                    className=" w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Booking Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Suspense>
      </main>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-xl">Not Found</div>
      </div>
    );
  }
}
