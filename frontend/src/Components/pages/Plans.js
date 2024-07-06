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
    console.log(tourcard);
    return (
        <>
            <Navbar />
            <div className='mt-28 ml-6'>
                <p className='text-3xl font-semibold'>Plans</p>
                <div className='flex flex-wrap'>
                    {tourcard.length?tourcard.map((item, idx) => {
                        return (
                            <Card key={idx}  {...item} />
                        )
                    }):<div className='mt-4 text-lg text-gray-400'>No Plan available</div>}
                </div>
                
            </div>
      </>
    
  )
}

export default Plans