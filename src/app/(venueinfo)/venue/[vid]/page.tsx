import { Suspense } from 'react';
import Image from 'next/image';
import LinearProgress from '@mui/material/LinearProgress';
import getVenue from '@/libs/getVenue';

export default async function VenueDetails({ 
  params 
}: { 
  params: { vid: string } 
}) {
  try {
    const venueResponse = await getVenue(params.vid);
    const venueData = venueResponse.data;

    return (
      <main className="flex flex-col items-center min-h-screen p-5">
        <Suspense fallback={<LinearProgress className="w-full" />}>
          <div className="max-w-6xl w-full my-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-96 rounded-xl overflow-hidden">
                <Image
                  src={venueData.picture}
                  alt={venueData.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">
                  {venueData.name}
                </h1>

                <div>
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Address:</span>
                    <p className="text-gray-800">{venueData.address}</p>
                  </div>
                  
                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Province:</span>
                    <p className="text-gray-800">{venueData.province}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">District:</span>
                    <p className="text-gray-800">{venueData.district}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Postal Code:</span>
                    <p className="text-gray-800">{venueData.postalcode}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Tel:</span>
                    <p className="text-gray-800">{venueData.tel}</p>
                  </div>

                  <div className="flex">
                    <span className="w-32 font-medium text-gray-800">Daily Rate:</span>
                    <p className="text-gray-800">{venueData.dailyrate}</p>
                  </div>
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