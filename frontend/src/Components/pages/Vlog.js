import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios'

function Vlog({ item, key }) {
  const navigate = useNavigate();


  const [username, setUsername] = useState(null);
  const [unid, setUnid] = useState(null);
  useEffect(() => {
    fetch('http://localhost:8080/profile', {
      credentials: 'include',
    }).then(response => {
      response.json().then(userInfo => {
        setUsername(userInfo.username);
        setUnid(userInfo.id);
      });
    });
  }, []);

  const handleSubmit = (id) => {
    navigate(`/show/${id}`);
  };
  const handleSubmit2 = (id) => {
    navigate(`/edit/${id}`)
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/${id}`);

        navigate('/all');
    } catch (error) {
      console.error('Error deleting vlog:', error);
      // Handle error if necessary
    }
  };
  return (
    <>
      
      <div className='border-2 m-3 rounded-lg border-gray-400 p-3'>
        <p className='max-w-md mx-auto text-xl font-medium mb-2'>{item.name}</p>
        <div className='flex gap-x-4'>
          <img src={require(`../../../Images/${item.file[0]}`)} alt="" className=' w-52 rounded-lg' />
          <p className='mt-2' >{item.desc}</p>
        </div>
        <div className='flex justify-end' >
          <form className="max-w-md m-3 ">
            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={()=>handleSubmit(item._id)}>Show</button>
          </form>
          {
            unid === item.author._id && (<form className="max-w-md m-3 ">
              <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => handleSubmit2(item._id)}>Edit</button>
            </form>)
          }
          {
            item.author && unid === item.author._id &&
            (<form className="m-3">
              <button
                type="submit"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </form>)}
        </div>
      </div>
    </>
  )
}

export default Vlog