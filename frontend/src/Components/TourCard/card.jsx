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

    <div className="figure">

      <img src={props.Image} />
      <figcaption>

        <p className="name">{props.place}</p>
        <p className="info">{props.p}</p>
        
        <Link to={{ pathname: "/card", state: { Image: props.Image, p: props.p } }} >
          {
             <button className="btn" onClick={addItem}>Add to plans</button>
          }
          
        </Link>

      </figcaption>

    </div>
  );
}
export default CardItem;
