import {useState,useEffect} from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from "../services/GlobalApi";
const PlacesCardItem = ({ place }) => {
   const [photoUrl,setPhotoUrl]=useState()
  
    useEffect(() => {
      if (place) {
        GetPlacePhoto();
      }
    }, [place]);
  
    const GetPlacePhoto = async () => {
      try {
        const data = {
          textQuery: place.placeName || "",
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

    <Link 
      to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(place.placeName)} 
      target='_blank' 
      className="block"
    >
      <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all cursor-pointer'>
        <img 
          src={photoUrl} 
          alt="Placeholder"
          className='w-[130px] h-[130px] rounded-xl mt-2 object-cover' 
        />
        <div>
          <h2 className='font-bold text-lg'>{place.placeName}</h2>
          <p className='text-sm text-gray-400'>{place.placeDetails}</p>
          <h2 className='mt-2'>🕙 {place.travelTime}</h2>
          {/* <Button className='size-sm'><FaMapLocationDot/></Button> */}
        </div>
      </div>
    </Link>
  );
};

export default PlacesCardItem;
