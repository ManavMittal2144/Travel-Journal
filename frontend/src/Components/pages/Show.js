import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
import Navbar from "../../Components/Nav/Navbar";

const Show=()=> {
    const params = useParams();
    let [vlog, setVlog] = useState({
        name: '',
        location: '',
        desc: '',
        file:[]
    })
    async function fetchVlog() {
        let res = await axios.get(`http://localhost:8080/${params.id}`);
        let { name, location, desc, file } = res.data;
        console.log(res.data);
        setVlog({ name, location, desc, file });
    }
    useEffect(() => {
        fetchVlog();
    }, []);
    return (
        <>
            <Navbar />
            <div className='mt-24 ml-6 '>
                <p className='max-w-md mx-auto text-4xl'>{ vlog.name}</p>
                <p className='text-xl mb-4'>Location - {vlog.location}</p>
                <p className='text-lg mb-4'>{vlog.desc}</p>
                <p className='text-lg mb-2'>Images: </p>
                <div className='flex flex-wrap gap-x-8 gap-y-4'>
                    {vlog.file.map((item) => {
                        {/* return <Vlog item={item} key={item._id} id={item._id} /> */}
                        return <img src={require(`../../../Images/${item}`)} alt="nope" className='h-72 w-96 rounded-lg' />
                    })}
                    
                    
                </div>
            </div>

        </>
    )
}

export default Show