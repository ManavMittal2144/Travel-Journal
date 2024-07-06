import React from "react";
import "./card.css";
import { Link } from "react-router-dom";
import axios from 'axios'
function CardItem(props) {
  const addItem = async (event) => {
    event.preventDefault()
    const response = await axios.post(`http://localhost:8080/${props._id}/add`, {}, { withCredentials: true });
    if (response.status === 200)
      alert('Added to future plans');
  }
  return (

    <div className="figure flex flex-wrap justify-center py-3 border">

      <img className="border rounded-lg bg-gray-200" src={props.Image} />
      <figcaption>

        <p className="name font-semibold">{props.place}</p>
        <p className="info px-3 text-gray-600 mb-3">{props.p}</p>
        
        <Link to={{ pathname: "/card", state: { Image: props.Image, p: props.p } }} >
          {
             <button className="border px-2 rounded-lg py-2 shadow-lg hover:text-white hover:bg-gray-400 duration-150 bg-gray-100 mb-2" onClick={addItem}>Add to plans</button>
          }
          
        </Link>

      </figcaption>

    </div>
  );
}
export default CardItem;
