import React from "react";
import Navbar from "../Components/Nav/Navbar";
import Hero from "../Components/Hero/Hero";
import CardItem from "../Components/TourCard/card";
import cardList from "../Components/TourCard/cardlist";
import "./tour.css";
import Crousel from '../Components/pages/crousel'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
function Home() {

  const firstFive = cardList.slice(3,7);       

  return (
    <div class="whole">
      
      <Navbar />
      <Hero
        cName="hero"
        heroImg="https://images.unsplash.com/photo-1472213984618-c79aaec7fef0?q=80&w=1455&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        title="Your Journey Your Story"
        text="Choose Your Favourite Destination"
        buttonText="Travel Plan"
        url="/"
        btnClass="show"
      />
      <h1 className="heading">Our Features Tours</h1>

      <div
        style={{
          display: "flex",
          flexWrap:'wrap',
          margin:'30px auto',
        }}
      > 
        {firstFive.map((item,idx)=>{
          return(
            <CardItem key={idx} {...item}/>
          )
        })}
        <Crousel/>
      </div>
    </div>
  );
}
export default Home;
