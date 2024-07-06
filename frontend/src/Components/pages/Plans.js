import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Navbar from "../../Components/Nav/Navbar";
import '../../routes/tour.css'
import Card from './Card';
function Plans() {
    const [tourcard, setTour] = useState([]);
    async function getCards() {
        let res = await axios.get('http://localhost:8080/cards', { withCredentials: true });
        setTour(res.data.cart);
    }
    useEffect(() => {
        getCards();
    }, []);
    return (
        <>
            <Navbar />
            <div className='mt-28 ml-6'>
                <p className='text-3xl'>Plans</p>
                <div className='flex flex-wrap'>
                    {tourcard.map((item, idx) => {
                        return (
                            <Card key={idx}  {...item} />
                        )
                    })}
                </div>
                
            </div>
      </>
    
  )
}

export default Plans