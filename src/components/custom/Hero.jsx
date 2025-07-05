import React from "react"
import { Button } from "../ui/button"
import {Link} from 'react-router-dom'
import Footer from "../../Componenets/Footer"
import { useNavigate } from 'react-router-dom';

function Hero() {
   const navigate = useNavigate();

  const handleClick = () => {
    navigate('/create-trip');
  };
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h1 className="font-extrabold text-[50px] text-center mt-16">
        <span className="text-[#bd4f41]">Discover Your Next Adventure with Al:</span>
        <br/>Personalized Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center">
       Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>
       <Button onClick={handleClick}>
        Get Started, It's Easy
      </Button>
      <img src='/Landing.png' className="mt-20"/>
      <Footer/>
    </div>
  )
}

export default Hero

