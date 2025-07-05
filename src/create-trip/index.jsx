import React, { useState } from "react";
import Autocomplete from "react-google-places-autocomplete";
import { Input } from "../components/ui/input";
import {
  SelectBudgetOptions,
  SelectTravelsList,
  AI_PROMPT,
} from "../constansts/options";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { chatSession } from "../services/AIMODAL.jsx";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import Footer from "../Componenets/Footer";

const CreateTrip = () => {
  const [place, setPlace] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    if (name === "noOfDays" && value > 5) {
      toast("Please enter a trip of 5 days or less.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: "application/json",
        },
      })
      .then((resp) => {
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        OnGenerateTrips(); // Retry after login
      })
      .catch((error) => {
        console.error("Google user fetch error:", error);
        toast("Google Sign-In failed.");
      });
  };

  const OnGenerateTrips = async () => {
    // Step 1: Check if all form fields are filled
    if (
      !formData?.location ||
      !formData?.noOfDays ||
      !formData?.budget ||
      !formData?.traveller
    ) {
      toast("Please enter all the details.");
      return;
    }

    // Step 2: Check login
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }

    // Step 3: Proceed with trip generation
    setLoading(true);
    let FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location?.label)
      .replace("{traveler}", formData?.traveller)
      .replace("{budget}", formData?.budget)
      .replaceAll("{totalDays}", formData?.noOfDays);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const responseText = await result?.response?.text();
      SaveAiTrip(responseText);
    } catch (error) {
      console.error("Trip generation failed:", error);
      toast("Failed to generate trip.");
    } finally {
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();

    try {
      await setDoc(doc(db, "AITrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        userEmail: user?.email,
        id: docId,
      });
      navigate("/view-trip/" + docId);
    } catch (error) {
      console.error("Error saving trip:", error);
      toast("Error saving trip.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10">
      <h2 className="font-bold text-3xl text-gray-800">
        Tell us your travel preferences 🗺️🌳
      </h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic details, and we’ll help you plan your trip.
      </p>

      <div className="mt-12 flex flex-col gap-12">
        {/* Destination Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            What is your destination?
          </h2>
          <Autocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v);
              },
            }}
            placeholder="Enter a location"
            options={{ types: ["(cities)"] }}
            className="w-full"
          />
        </div>

        {/* Number of Days */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            How many days are you planning your trip?
          </h2>
          <Input
            placeholder="e.g., 3"
            type="number"
            onChange={(e) => handleInputChange("noOfDays", e.target.value)}
            className="w-full"
          />
        </div>

        {/* Budget Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            What is your budget?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-shadow ${
                  formData?.budget === item.title
                    ? "shadow-lg border-black"
                    : "hover:shadow"
                }`}
                onClick={() => handleInputChange("budget", item.title)}
              >
                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className="font-bold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Companions */}
        <div>
          <h2 className="text-lg font-semibold text-gray-700 mb-3">
            Who do you plan on traveling with?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SelectTravelsList.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border cursor-pointer transition-shadow ${
                  formData?.traveller === item.people
                    ? "shadow-lg border-black"
                    : "hover:shadow"
                }`}
                onClick={() => handleInputChange("traveller", item.people)}
              >
                <h2 className="text-4xl mb-2">{item.icon}</h2>
                <h2 className="font-bold text-gray-800">{item.title}</h2>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="my-10 flex justify-end">
        <Button disabled={loading} onClick={OnGenerateTrips}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
       
      </div>

      {/* Google Sign-In Dialog */}
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="./logo.svg" alt="App Logo" />
              <h2 className="font-bold text-lg mt-7">Sign In with Google</h2>
              <p>Sign in app with Google Authentication securely</p>
              <Button
                disabled={loading}
                className="w-full mt-5 cursor-pointer gap-5 flex items-center"
                onClick={login}
              >
                <FcGoogle className="h-7 w-7" />
                Sign In with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
