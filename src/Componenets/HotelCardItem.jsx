import {React,useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import { GetPlaceDetails, PHOTO_REF_URL } from '../services/GlobalApi';

const HotelCardItem = ({hotel}) => {

     const [photoUrl,setPhotoUrl]=useState()
     
       useEffect(() => {
         if (hotel) {
           GetPlacePhoto();
         }
       }, [hotel]);
     
       const GetPlacePhoto = async () => {
         try {
           const data = {
             textQuery: hotel?.hotelName || "",
           };
     
           const response = await GetPlaceDetails(data);
     
           const photoName =
             response?.data?.places?.[0]?.photos?.[2]?.name || "placeholder";
           const PhotoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);
     
           setPhotoUrl(PhotoUrl);
         } catch (error) {
           console.error("Error fetching place details:", error);
         }
       };
       

  return (
     <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel.hotelName+","+hotel?.hotelAddress} target='_blank'>
          <div className="hover:scale-105 transition-all cursor-pointer">
            <img
              src={photoUrl?photoUrl: '/placeholder.jpg'} // Use dynamic image if available, fallback to placeholder
              alt={`Hotel`}
              className="rounded-xl h-[180px] w-full object-cover"
            />
            <div className="my-3 flex flex-col gap-2">
              <h2 className="font-medium">{hotel?.hotelName}</h2>
<h2 className="text-xs text-gray-500">📍 {hotel?.hotelAddress}</h2>
<h2 className="text-sm">💰 {hotel?.price}</h2>
<h2 className="text-sm">⭐ {hotel?.rating}</h2>

            </div>
          </div>
          </Link>
  )
}

export default HotelCardItem
