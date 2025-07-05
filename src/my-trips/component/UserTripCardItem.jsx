import React,{useState,useEffect} from 'react'
import { GetPlaceDetails, PHOTO_REF_URL } from '../../services/GlobalApi';
import { Link } from 'react-router-dom';
const UserTripCardItem = ({trip}) => {
 const [photoUrl,setPhotoUrl]=useState()
 
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
    <Link to={'/view-trip/'+trip?.id}>
    <div className='hover:scale-105 transition-all'>
        <img src={photoUrl?photoUrl:'/placeholder.png'} className='object-cover rounded-xl h-[220px]'></img>
        <h2 className='font-bold text-lg'>{trip?.userSelection?.location?.label}</h2>
        <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trip with {trip?.userSelection?.budget} Budget</h2>
    </div>
    </Link>
  )
}

export default UserTripCardItem