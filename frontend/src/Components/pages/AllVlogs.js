import React, { useEffect, useState } from 'react'
import Vlog from './Vlog';
import { data } from '../../utils'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Nav/Navbar";

function filterData(searchtxt, vlogs) {
    console.log(searchtxt);
    searchtxt = searchtxt.trim();
    if(searchtxt === ""){
      return vlogs;
    }
    else{
        const filteredData = vlogs.filter((vlog) => {
            const name = vlog.name.toLowerCase();
            return name.includes(searchtxt.toLowerCase());
        });
        console.log(filteredData);
        return filteredData;
    }

    }
function AllVlogs() {
    const navigate = useNavigate();
    let [vlogs, setVlogs] = useState([]);
    let [filtervlogs, setFilterVlogs] = useState([]);
    const [searchtxt, setSeachTxt] = useState("");


    function filterData(searchtxt, vlogs) {
        console.log(searchtxt);
        searchtxt = searchtxt.trim();
        if(searchtxt === ""){
          return vlogs;
        }
        else{
            const filteredData = vlogs.filter((vlog) => {
                const name = vlog.name.toLowerCase();
                return  vlog.name.includes(searchtxt);
            });
            console.log(filteredData);
            return filteredData;
        }

        }
    async function getVlogs() {
        let res = await axios.get('http://localhost:8080/allvlogs');
        setVlogs(res.data);
        setFilterVlogs(res.data);
    }
    useEffect(() => {
        getVlogs();
    }, []);


    return (
        <>
            <Navbar />
            <div className="mt-24 mb-3 md:w-96 mx-auto">
                    <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                            <h2 className='max-w-md mx-auto text-4xl z-51 m-4 font-semibold'>Blogs</h2>
                                <input
                                value={searchtxt}
                                onChange={(e)=>{setSeachTxt(e.target.value);

                                }} 
                                type="search"
                                className=" relative m-0 -mr-0.5 block w-[1px] min-w-0 flex-auto rounded-l border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out focus:z-[3] focus:border-primary focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)] focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:placeholder:text-neutral-200 dark:focus:border-primary"
                                placeholder="Search"
                                aria-label="Search"
                                aria-describedby="button-addon3" />

                    {/* <!--Search button--> */}
                    
                    <button
                    onClick={()=>{
                const data =  filterData(searchtxt,vlogs);
                setFilterVlogs(data);
            }}
                   className="relative z-[2] rounded-r border-2 border-primary px-6 py-2 text-xs font-medium uppercase text-primary transition duration-150 ease-in-out hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0"
                        type="button"
                        id="button-addon3">
                        Search
                    </button>
                   
                </div>
            </div>
        
              {/* </div>  */}
               
                {filtervlogs.map((item) => {
                    if(item)
                    return <Vlog {...item} item={item} key={item._id} id={item._id} />
                })}
            {/* </div> */}
        </>
    )
}

export default AllVlogs