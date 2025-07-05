

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebaseConfig';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import UserTripCardItem from './component/UserTripCardItem';
import { Input } from '@/components/ui/input'; // Adjust if needed
import { toast } from 'sonner';

const MyTrips = () => {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      navigate('/');
      return;
    }

    try {
      const q = query(collection(db, 'AITrips'), where('userEmail', '==', user.email));
      const querySnapshot = await getDocs(q);
      const trips = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUserTrips(trips);
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to load trips.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (tripId) => {
    try {
      await deleteDoc(doc(db, 'AITrips', tripId));
      setUserTrips((prevTrips) => prevTrips.filter((trip) => trip.id !== tripId));
      toast.success("Trip deleted successfully ");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete trip ❌");
    }
  };

  const filteredTrips = userTrips.filter((trip) =>
    trip?.userSelection?.location?.label
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-6">My Trips</h2>

      <Input
        placeholder="Search by destination"
        className="mb-6"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading ? (
          [1, 2, 3, 4, 5, 6].map((item) => (
            <div
              key={item}
              className="h-[220px] w-full bg-slate-200 animate-pulse rounded-xl"
            ></div>
          ))
        ) : filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <UserTripCardItem
              key={trip.id}
              trip={trip}
              onDelete={() => handleDelete(trip.id)}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No trips found.</p>
        )}
      </div>
    </div>
  );
};

export default MyTrips;

