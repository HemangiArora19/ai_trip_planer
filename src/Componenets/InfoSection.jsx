

// import React, { useEffect, useState } from "react";
// import { IoIosSend } from "react-icons/io";
// import { Button } from "../components/ui/button";
// import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi";



// const InfoSection = ({ trip }) => {

//    const [photoUrl,setPhotoUrl]=useState()

//   useEffect(() => {
//     if (trip) {
//       GetPlacePhoto();
//     }
//   }, [trip]);

//   const GetPlacePhoto = async () => {
//     try {
//       const data = {
//         textQuery: trip?.userSelection?.location?.label || "",
//       };

//       const response = await GetPlaceDetails(data);

//       const photoName =
//         response?.data?.places?.[0]?.photos?.[3]?.name || "placeholder";
//       const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

//       setPhotoUrl(PhotoUrl);
//     } catch (error) {
//       console.error("Error fetching place details:", error);
//     }
//   };
  

//   return (
//     <div>
//       <img
//         src={photoUrl?photoUrl: '/placeholder.jpg'}
//         alt="Placeholder for location"
//         className="h-[340px] w-full object-cover rounded"
//       />
//       <div className="flex justify-between items-center">
//         <div className="my-5 flex flex-col gap-2">
//           <h2 className="font-bold text-2xl">
//             {trip?.userSelection?.location?.label || "Unknown Location"}
//           </h2>
//           <div className="flex gap-5">
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               📅 {trip?.userSelection?.noOfDays || 0} Day
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               💰 {trip?.userSelection?.budget || "Not Specified"} Budget
//             </h2>
//             <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
//               🥂 No. of Travelers: {trip?.userSelection?.traveller || 0}
//             </h2>
//           </div>
//         </div>
//         <Button className="mt-10">
//           <IoIosSend />
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default InfoSection;

import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";
import { Button } from "../components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi";

const InfoSection = ({ trip }) => {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label || "",
      };

      const response = await GetPlaceDetails(data);

      const photoName =
        response?.data?.places?.[0]?.photos?.[3]?.name || "placeholder";
      const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

      setPhotoUrl(PhotoUrl);
    } catch (error) {
      console.error("Error fetching place details:", error);
    }
  };

  return (
    <div>
      <img
        src={photoUrl ? photoUrl : "/placeholder.jpg"}
        alt="Location"
        className="h-[240px] sm:h-[300px] md:h-[340px] w-full object-cover rounded-xl"
      />

      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-xl sm:text-2xl">
            {trip?.userSelection?.location?.label || "Unknown Location"}
          </h2>

          <div className="flex flex-wrap gap-2 sm:gap-4">
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-md">
              📅 {trip?.userSelection?.noOfDays || 0} Day
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-md">
              💰 {trip?.userSelection?.budget || "Not Specified"} Budget
            </span>
            <span className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs sm:text-sm md:text-md">
              🥂 No. of Travelers: {trip?.userSelection?.traveller || 0}
            </span>
          </div>
        </div>

        <div className="self-end sm:self-auto">
          <Button className="rounded-full mt-2 sm:mt-0">
            <IoIosSend size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
