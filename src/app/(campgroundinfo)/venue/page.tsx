'use client';

import { Suspense } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import CampgroundCatalog from '@/components/CampgroundCatalog';
import { getCampgrounds } from '@/libs/getCampgrounds';

const CampgroundPage: React.FC = () => {
  const campgroundsPromise = getCampgrounds();

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Campgrounds</h1>
      
      <Suspense 
        fallback={
          <div className="flex flex-col items-center space-y-3 w-full">
            <div className="w-full max-w-md">
              <LinearProgress 
                sx={{
                  height: 4,
                  backgroundColor: '#f3f4f6',
                  '& .MuiLinearProgress-bar': {
                    backgroundColor: '#3b82f6'
                  }
                }}
              />
            </div>
            <p className="text-sm text-gray-600">Loading campgrounds...</p>
          </div>
        }
      >
        <CampgroundCatalog campgroundsJson={campgroundsPromise} />
      </Suspense>
    </div>
  );
};

export default CampgroundPage;