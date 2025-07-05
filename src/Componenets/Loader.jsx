import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#bd4f41]"></div>
      <p className="mt-4 text-gray-600 text-lg">Fetching your trip plan...</p>
    </div>
  );
};

export default Loader;
