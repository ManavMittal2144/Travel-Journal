import React, { useEffect } from "react";
import { useState } from "react";
import "./tour.css";
import Navbar from "../Components/Nav/Navbar";
import CardItem from "../Components/TourCard/card";
import axios from 'axios'


function filterData(searchText, tourcard) {
  console.log(searchText)

  const filterData = tourcard.filter((ListItem) => ListItem.place === searchText);
  console.log(filterData);
  return filterData;
}

function Tour() {

  const [tourcard, setTour] = useState([]);
  const [searchText, setSearchText] = useState("");

  async function getCards() {
    let res = await axios.get('http://localhost:8080/allcards');
    setTour(res.data);
  }
  useEffect(() => {
    getCards();
  }, []);


  return (
    <>
      <Navbar />
      <div class="container">       
        <img
          src="https://images.unsplash.com/photo-1623941000342-fd0ccdcbb9c4?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Image"
          class="image"
        />
        <p class="centered-text">All Tours</p>
      </div>

      
      <div className="flex justify-center my-4">
        <input
          type="text"
          className="border-gray-500 border px-2 mr-3 rounded-lg w-[30%]"
          placeholder="Enter Place Name"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}

        />
        <button
          className=" shadow-lg rounded-lg py-3 px-3 bg-blue-400 hover:bg-blue-500"
          onClick={() => {
            const data = filterData(searchText, tourcard);
            console.log(data)
            setTour(data);
          }}
        >
          Search
        </button>

      </div>
      
    
      <div className="flex flex-wrap justify-center gap-4"> 
        {tourcard.map((item,idx)=>{
          return(
            <CardItem key={idx} {...item}/>
          )
        })}

      </div>
    </>
  );
}

export default Tour;
