// // Install dependencies before running:
// // npm install @google/genai mime dotenv

// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// const model = genAI.getGenerativeModel({
//   model: "gemini-1.5-flash",
// });

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };


//   export const chatSession = model.startChat({
//     generationConfig,
 
//     history: [
//         {
//       role: 'user',
//       parts: [
//         {
//           text: `Generate Travel Plan for Location: Las Vegas, for for Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format.`,
//         },
//       ],
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: `**Examining the Core Task**

// I've been breaking down the user's request. My focus is on the core task: travel planning. I've noted the location (Las Vegas) and duration (3 days), which are essential parameters. I'm now delving into the implicit needs of a travel plan, like activities and accommodation types, to inform the plan's structure.


// `,
//         },
//       ],
//     },
//     {
//       role: 'user',
//       parts: [
//         {
//           text: `INSERT_INPUT_HERE`,
//         },
//       ],
//     },
//     ],
//   });





// Install dependencies before running:
// npm install @google/genai mime dotenv

// import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// // Initialize the Generative AI client
// const genAI = new GoogleGenerativeAI(apiKey);

// // Retrieve the specific generative model
// const model = genAI.getGenerativeModel({
//   model: "gemini-2.5-pro",
// });

// // Define generation configuration
// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8192,
//   responseMimeType: "application/json",
// };

// // Start the chat session with the AI model
// export const chatSession = model.startChat({
//   generationConfig,
//   history: [
   
//       ],
    
 
// });


import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

// Initialize the Generative AI client
const genAI = new GoogleGenerativeAI(apiKey);

// Retrieve the specific generative model
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro", // Using 1.5-pro as it's generally available and excellent for this task
});

// Define generation configuration
const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

// Start the chat session with the AI model
export const chatSession = model.startChat({
  generationConfig,
  // CORRECTED HISTORY: The model's response now matches the user's request.
  history: [
    {
      role: "user",
      parts: [{ text: "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget ,Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location for 3 days with each day plan with best time to visit in JSON format." }],
    },
    {
      role: "model",
      parts: [{ text: `
{
  "tripDetails": {
    "location": "Las Vegas",
    "durationDays": 3,
    "budget": "Cheap",
    "travelerType": "Couple",
    "bestTimeToVisit": "Spring (March-May) or Fall (September-November) for pleasant weather. For the cheapest rates, visit mid-week (Tuesday-Thursday)."
  },
  "hotelOptions": [
    {
      "hotelName": "Flamingo Las Vegas Hotel & Casino",
      "hotelAddress": "3555 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "$40 - $150 per night (highly variable)",
      "hotelImageUrl": "https://images.unsplash.com/photo-1570229339908-b0a79b265147",
      "geoCoordinates": { "latitude": 36.1162, "longitude": -115.1706 },
      "rating": 3.5,
      "description": "A classic, center-Strip hotel known for its vibrant pink theme, GO Pool dayclub, and the Flamingo Wildlife Habitat, a free-to-visit garden with live flamingos."
    },
    {
      "hotelName": "The LINQ Hotel + Experience",
      "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "$45 - $170 per night (highly variable)",
      "hotelImageUrl": "https://images.unsplash.com/photo-1621361994101-52d3a94f3b7c",
      "geoCoordinates": { "latitude": 36.1179, "longitude": -115.1709 },
      "rating": 4.0,
      "description": "Modern, energetic hotel with smaller, efficient rooms. It offers direct access to the LINQ Promenade, home to the High Roller observation wheel, restaurants, and shops."
    },
    {
      "hotelName": "Excalibur Hotel & Casino",
      "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
      "price": "$30 - $120 per night (highly variable)",
      "hotelImageUrl": "https://images.unsplash.com/photo-1605833443442-578d0f4133d2",
      "geoCoordinates": { "latitude": 36.0986, "longitude": -115.1755 },
      "rating": 3.0,
      "description": "A budget-friendly, castle-themed resort on the south end of the Strip. Great for those who want a fun theme without a high price tag. Connected to Luxor and Mandalay Bay via a free tram."
    }
  ],
  "itinerary": [
    {
      "day": 1,
      "dayTitle": "South Strip Exploration & Iconic Sights",
      "dailyPlan": [
        {
          "placeName": "Welcome to Fabulous Las Vegas Sign",
          "placeDetails": "Start your trip with an iconic photo at the world-famous sign. It's best to go in the morning to avoid long lines and the midday heat. There's free parking available.",
          "placeImageUrl": "https://images.unsplash.com/photo-1543783286-8a3e65a6393e",
          "geoCoordinates": { "latitude": 36.0820, "longitude": -115.1728 },
          "ticketPricing": "Free",
          "rating": 4.5,
          "timeSlot": "Morning (9:00 AM - 10:00 AM)",
          "travelTime": "Approx. 5-10 min drive/Uber from South Strip hotels."
        },
        {
          "placeName": "M&M's World & Coca-Cola Store",
          "placeDetails": "Explore four floors of chocolatey fun at M&M's World and then head next door to the Coca-Cola store to sample sodas from around the globe.",
          "placeImageUrl": "https://images.unsplash.com/photo-1559618580-19269e88493a",
          "geoCoordinates": { "latitude": 36.1044, "longitude": -115.1723 },
          "ticketPricing": "Free to enter; costs for purchases.",
          "rating": 4.4,
          "timeSlot": "Late Morning (11:00 AM - 1:00 PM)",
          "travelTime": "Walkable from most mid-strip locations."
        },
        {
          "placeName": "Bellagio Conservatory & Botanical Gardens",
          "placeDetails": "A stunning and free attraction inside the Bellagio. The elaborate floral displays change with the seasons and are breathtakingly beautiful. A perfect romantic spot.",
          "placeImageUrl": "https://images.unsplash.com/photo-1597539958316-52255ab50338",
          "geoCoordinates": { "latitude": 36.1126, "longitude": -115.1767 },
          "ticketPricing": "Free",
          "rating": 4.8,
          "timeSlot": "Afternoon (3:00 PM - 4:00 PM)",
          "travelTime": "Walk across the street from the LINQ/Flamingo area."
        },
        {
          "placeName": "Bellagio Fountains Show",
          "placeDetails": "Witness the iconic water show, synchronized to music and lights. Shows run every 30 minutes in the afternoon and every 15 minutes in the evening. A must-see Vegas experience.",
          "placeImageUrl": "https://images.unsplash.com/photo-1533106418989-88901b0c03ca",
          "geoCoordinates": { "latitude": 36.1126, "longitude": -115.1767 },
          "ticketPricing": "Free",
          "rating": 4.9,
          "timeSlot": "Evening (Shows from 8:00 PM onwards)",
          "travelTime": "Located in front of the Bellagio."
        }
      ]
    },
    {
      "day": 2,
      "dayTitle": "Center Strip & Fremont Street Experience",
      "dailyPlan": [
        {
          "placeName": "The LINQ Promenade",
          "placeDetails": "Walk through this open-air dining, shopping, and entertainment district. It has a lively atmosphere day and night. Consider riding the High Roller for amazing views (book tickets online for discounts).",
          "placeImageUrl": "https://images.unsplash.com/photo-1597539958316-52255ab50338",
          "geoCoordinates": { "latitude": 36.1179, "longitude": -115.1709 },
          "ticketPricing": "Free to walk; High Roller approx. $25-40.",
          "rating": 4.6,
          "timeSlot": "Afternoon (2:00 PM - 5:00 PM)",
          "travelTime": "Central to many hotels."
        },
        {
          "placeName": "The Venetian Grand Canal Shoppes",
          "placeDetails": "Get a taste of Venice in Vegas. Stroll along the indoor canals, watch the gondolas, and enjoy the street performers in St. Mark's Square. It's a great way to escape the heat.",
          "placeImageUrl": "https://images.unsplash.com/photo-1583340762953-273a7d7b461f",
          "geoCoordinates": { "latitude": 36.1213, "longitude": -115.1697 },
          "ticketPricing": "Free to walk; Gondola rides are extra.",
          "rating": 4.7,
          "timeSlot": "Late Afternoon (5:00 PM - 6:30 PM)",
          "travelTime": "10-minute walk from the LINQ."
        },
        {
          "placeName": "Fremont Street Experience",
          "placeDetails": "Head to Downtown Las Vegas for the ultimate block party. Witness the Viva Vision light show on the massive overhead canopy, see live bands, and soak in the old-school Vegas vibe.",
          "placeImageUrl": "https://images.unsplash.com/photo-1555633934-4a47e2a4e4d6",
          "geoCoordinates": { "latitude": 36.1707, "longitude": -115.1451 },
          "ticketPricing": "Free",
          "rating": 4.6,
          "timeSlot": "Evening (8:00 PM onwards)",
          "travelTime": "Approx. 15-20 min drive/bus from the Strip."
        }
      ]
    },
    {
      "day": 3,
      "dayTitle": "Art, History & Relaxation",
      "dailyPlan": [
        {
          "placeName": "Flamingo Wildlife Habitat",
          "placeDetails": "A serene and free attraction located on the Flamingo hotel grounds. See Chilean flamingos, ringed teal ducks, swans, and turtles in a lush garden setting. A peaceful start to the day.",
          "placeImageUrl": "https://images.unsplash.com/photo-1598948128389-3715c7a0d4c8",
          "geoCoordinates": { "latitude": 36.1162, "longitude": -115.1706 },
          "ticketPricing": "Free",
          "rating": 4.5,
          "timeSlot": "Morning (10:00 AM - 11:00 AM)",
          "travelTime": "Located at the Flamingo hotel."
        },
        {
          "placeName": "The Neon Museum",
          "placeDetails": "Explore the 'Neon Boneyard' where iconic Las Vegas signs are retired. It's a fascinating look at the city's artistic history. Booking tickets in advance is highly recommended as it sells out.",
          "placeImageUrl": "https://images.unsplash.com/photo-1620392137953-470a5953c898",
          "geoCoordinates": { "latitude": 36.1824, "longitude": -115.1357 },
          "ticketPricing": "Approx. $20-30 per person.",
          "rating": 4.7,
          "timeSlot": "Afternoon (Choose a time slot when booking)",
          "travelTime": "Approx. 10-15 min drive from Fremont Street."
        },
        {
          "placeName": "Explore a Resort of Your Choice",
          "placeDetails": "Spend the last evening exploring a resort you haven't seen yet. Walk through Caesars Palace, see the Eiffel Tower at Paris Las Vegas, or find a cheap happy hour. It's the perfect way to have one last look at the dazzling Strip.",
          "placeImageUrl": "https://images.unsplash.com/photo-1596205218822-b9148ab415f3",
          "geoCoordinates": { "latitude": 36.1164, "longitude": -115.1748 },
          "ticketPricing": "Free",
          "rating": 4.5,
          "timeSlot": "Evening",
          "travelTime": "Walkable."
        }
      ]
    }
  ]
}
      `}],
    },
  ],
});