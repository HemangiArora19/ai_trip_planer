# 🧠✈️ AI Trip Planner

An intelligent, full-stack AI-powered travel planner that helps users create **personalized itineraries** based on their preferences. This application integrates **Gemini AI**, **Google Places API**, and **Google OAuth** to deliver a seamless, interactive travel planning experience.

---

## 🚀 Features

* 🧡 **AI-Powered Itinerary Creation**
  Uses **Gemini AI** to generate tailored travel plans based on user input such as destination, travel dates, budget, interests (e.g., nature, nightlife, food), and more.

* 📍 **Nearby Attractions & Places**
  Integrates **Google Places API** to fetch real-time data on hotels, restaurants, attractions, and other points of interest based on user location or selected cities.

* 🔐 **Secure Google Authentication**
  Users can log in securely using **Google OAuth**, enabling saved trips, preferences, and a more personalized experience.

* 🗕️ **Interactive Day-wise Planner**
  The itinerary is displayed in a clean, day-by-day layout with activities, times, and map links.

* ✍️ **Customizable Suggestions**
  Users can regenerate or modify specific days or activities using AI prompts.

---

## 🧰 Tech Stack

### 🔮 AI & APIs:

* **Gemini (Google AI)** – Natural language processing for itinerary generation
* **Google Places API** – Location and place data
* **Google OAuth 2.0** – Secure user login

### 🌐 Frontend:

* **React.js** – User interface
* **Tailwind CSS** – Styling and layout
* **Axios** – API communication

### 💠 Backend:

* **Node.js & Express** – REST API
* **MongoDB** – Trip and user data storage
* **JWT** – Token-based user session management (optional with Google login)

---

## 📸 Demo Screenshots

*(Add here after deployment or development)*

*

---

## 🧪 How It Works

1. **User logs in** via Google.
2. Fills in a **trip preferences form**.
3. Gemini AI processes the input and returns a day-wise plan.
4. App fetches **real-world data** using Google Places API for hotels, attractions, etc.
5. The user can **edit, save, or regenerate** any part of the plan.
6. Trips are saved to the user's account for later viewing or editing.

---

## ⚙️ Setup Instructions

1. **Clone the repo**

   ```bash
   git clone https://github.com/your-username/ai-trip-planner.git
   cd ai-trip-planner
   ```

2. **Set up ****`.env`**** file**

   ```env
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_client_secret
   GEMINI_API_KEY=your_gemini_api_key
   PLACES_API_KEY=your_google_places_api_key
   MONGODB_URI=your_mongo_db_uri
   ```

3. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

4. **Run the app**

   ```bash
   # Start backend
   cd backend
   npm run dev

   # Start frontend
   cd ../frontend
   npm start
   ```

---

## 📌 Future Improvements

* Trip export to PDF / calendar sync
* Budget estimator integration
* Multi-user trip planning (friends/family)
* Offline mode & map caching
* Mobile app version

---

## 🧑‍💻 Author

Made with ❤️ by Hemangi
