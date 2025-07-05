
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
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div className="mt-5" key={index}>
            <h2 className="font-medium text-lg">{item.dayTitle}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {item.dailyPlan.map((place, index) => (
                <div key={index} className="my-3">
                  <h2 className="font-medium text-sm text-orange-600">
                    {place.timeSlot}
                  </h2>
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
