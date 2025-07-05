import React, { useEffect,useState } from 'react'
import {doc,getDoc} from 'firebase/firestore'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { db } from '../../services/firebaseConfig'
import InfoSection from '../../Componenets/InfoSection'
import Hotels from '../../Componenets/Hotels'
import PlacesToVisit from '../../Componenets/PlacesToVisit'
import Footer from '../../Componenets/Footer'
const ViewTrip = () => {
    const {tripId}= useParams()
    const [trip,setTrip]= useState([]);
    useEffect(()=>{
       tripId && GetTripData();
    },[tripId])
    // Used this function to get trip information from firebase
    const GetTripData= async()=>{
        const docRef= doc(db,'AITrips',tripId);
        const docSnap= await getDoc(docRef);
        if(docSnap.exists()){
            console.log(" Document: ",docSnap.data)
            setTrip(docSnap.data());
        }
        else{
            console.log("No such Document")
            toast("No Trip Found !")
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
      {/* Information Section */}
        <InfoSection trip={trip}/>
      {/* Recommended Hotels */}
         <Hotels trip={trip}/>
      {/* Daily Plan */}
         <PlacesToVisit trip={trip}/>
      {/* Footer */}
      <Footer trip={trip}/>
    </div>
  )
}

export default ViewTrip
