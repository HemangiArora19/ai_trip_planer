
// import React from "react";
// import PlacesCardItem from "./PlacesCardItem";


// const PlacesToVisit = ({ trip }) => {
//     console.log(trip)
//   return (
//     <div>
//       <h2 className="font-bold text-lg">Places to Visit</h2>
//       <div>
//         {trip?.tripData?.itinerary?.map((item, index) => (
//           <div className="mt-5" key={index}>
//             <h2 className="font-medium text-lg">{item.day}</h2>
//             <div className="grid md:grid-cols-2 gap-5">
//               {item.schedule.map((place, index) => (
//                 <div key={index} className="my-3">
//                   <h2 className="font-medium text-sm text-orange-600">
//                     {place.time}
//                   </h2>
//                   <PlacesCardItem place={place} />
//                 </div>
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PlacesToVisit;


import React from "react";
import PlacesCardItem from "./PlacesCardItem";

const PlacesToVisit = ({ trip }) => {
  console.log(trip);

  return (
    <div className="mt-10">
      <h2 className="font-bold text-xl sm:text-2xl mb-4">Places to Visit</h2>

      <div className="space-y-8">
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-lg sm:text-xl mb-3">
              {item.dayTitle}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {item.dailyPlan.map((place, idx) => (
                <div key={idx}>
                  <h4 className="text-sm text-orange-600 mb-1">
                    {place.timeSlot}
                  </h4>
                  <PlacesCardItem place={place} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;
