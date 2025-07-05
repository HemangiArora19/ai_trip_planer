// import React, { useEffect,useState } from 'react'
// import {doc,getDoc} from 'firebase/firestore'
// import { useParams } from 'react-router-dom'
// import { toast } from 'sonner'
// import { db } from '../../services/firebaseConfig'
// import InfoSection from '../../Componenets/InfoSection'
// import Hotels from '../../Componenets/Hotels'
// import PlacesToVisit from '../../Componenets/PlacesToVisit'
// import Footer from '../../Componenets/Footer'
// const ViewTrip = () => {
//     const {tripId}= useParams()
//     const [trip,setTrip]= useState([]);
//     useEffect(()=>{
//        tripId && GetTripData();
//     },[tripId])
//     // Used this function to get trip information from firebase
//     const GetTripData= async()=>{
//         const docRef= doc(db,'AITrips',tripId);
//         const docSnap= await getDoc(docRef);
//         if(docSnap.exists()){
//             console.log(" Document: ",docSnap.data)
//             setTrip(docSnap.data());
//         }
//         else{
//             console.log("No such Document")
//             toast("No Trip Found !")
//         }
//     }
//   return (
//     <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
//       {/* Information Section */}
//         <InfoSection trip={trip}/>
//       {/* Recommended Hotels */}
//          <Hotels trip={trip}/>
//       {/* Daily Plan */}
//          <PlacesToVisit trip={trip}/>
//       {/* Footer */}
//       <Footer trip={trip}/>
//     </div>
//   )
// }

// export default ViewTrip
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { db } from '../../services/firebaseConfig';
import InfoSection from '../../Componenets/InfoSection';
import Hotels from '../../Componenets/Hotels';
import PlacesToVisit from '../../Componenets/PlacesToVisit';
import Footer from '../../Componenets/Footer';
import Loader from '../../Componenets/Loader'; // Make sure this path is correct

const ViewTrip = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user) {
      toast.error('Please sign in to view this trip.');
      navigate('/');
      return;
    }

    if (tripId) {
      GetTripData();
    }
  }, [tripId]);

  const GetTripData = async () => {
    try {
      const docRef = doc(db, 'AITrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();

        if (data.userEmail !== user.email) {
          toast.error('You are not authorized to view this trip.');
          navigate('/create-trip');
          return;
        }

        setTrip(data);
      } else {
        toast.error('No Trip Found!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error fetching trip:', error);
      toast.error('Something went wrong while fetching the trip.');
      navigate('/');
    }
  };

  if (!trip) {
    return <Loader />;
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-44 2xl:px-56 py-10 space-y-12">
      {/* Responsive padding applied */}
      <InfoSection trip={trip} />
      <Hotels trip={trip} />
      <PlacesToVisit trip={trip} />
      <Footer trip={trip} />
    </div>
  );
};

export default ViewTrip;
