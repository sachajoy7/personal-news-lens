
import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="space-y-4 px-4">
      {[...Array(3)].map((_, index) => (
        <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {/* Image skeleton */}
          <div className="h-48 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation" />
          
          {/* Content skeleton */}
          <div className="p-4 space-y-3">
            <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation rounded-lg w-4/5" />
            <div className="space-y-2">
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation rounded w-full" />
              <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation rounded w-3/4" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation rounded w-1/3" />
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse bg-[length:200%_100%] bg-gradient-animation rounded-full w-16" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
