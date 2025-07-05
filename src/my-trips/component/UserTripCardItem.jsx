
import React, { useState, useEffect } from 'react';
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { useNavigate } from 'react-router-dom';

const UserTripCardItem = ({ trip, onDelete }) => {
  const [photoUrl, setPhotoUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label || '',
      };

      const response = await GetPlaceDetails(data);
      const photoName =
        response?.data?.places?.[0]?.photos?.[3]?.name || 'placeholder';
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error('Error fetching place details:', error);
    }
  };

  return (
    <div className="bg-white shadow rounded-xl overflow-hidden flex flex-col">
      {/* Image */}
      <div
        className="cursor-pointer"
        onClick={() => navigate(`/view-trip/${trip?.id}`)}
      >
        <img
          src={photoUrl ? photoUrl : '/placeholder.png'}
          alt="Trip"
          className="object-cover h-[220px] w-full"
        />
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-bold text-lg mb-1">
            {trip?.userSelection?.location?.label || 'Unknown Destination'}
          </h2>
          <p className="text-sm text-gray-500">
            {trip?.userSelection?.noOfDays || '?'} Days trip with{' '}
            {trip?.userSelection?.budget || '?'} Budget
          </p>
        </div>

        {/* Delete button */}
        {onDelete && (
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent card navigation
              onDelete();
            }}
            className="mt-4 text-sm text-white bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition w-fit self-start"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default UserTripCardItem;
