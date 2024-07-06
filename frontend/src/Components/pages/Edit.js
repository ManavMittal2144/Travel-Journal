import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from 'axios'
function Edit() {
    const navigate = useNavigate();
    const params = useParams();

    const [redirect, setRedirect] = useState(false);
    let [vname, setPname] = useState('');
    let [vdesc, setDesc] = useState('');
    let [vlocation, setLocation] = useState('');

    const [file,setFile]=useState([]);
    async function fetchVlog() {
        let res = await axios.get(`http://localhost:8080/${params.id}`);
        let { name, location, desc, file } = res.data;
        setPname(name);
        setDesc(desc);
        setLocation(location);
    }
    useEffect(() => {
        fetchVlog();
    }, []);

    const handleSubmit =async (event) => {
        event.preventDefault()
        try {
            const formdata = new FormData();
            for (let i = 0; i < file.length; i++) {
                formdata.append('file', file[i]);
            }
            formdata.append('name', vname);
            formdata.append('desc', vdesc);
            formdata.append('location', vlocation);
        
            const response = await axios.post(`http://localhost:8080/${params.id}`, formdata);
            
            if (response.status === 200) { setRedirect(true); }
        }
        catch (e) {
            alert('Editing failed');
        }
    }
    if (redirect) {
        return navigate('/all');
    }
    return (
        <>
        
            <div className='border-2 m-2 rounded-lg border-gray-400'>
                <form className="max-w-md m-8" onSubmit={handleSubmit}>
                    <div className="mb-6">
                        <label htmlFor="place_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Place name</label>
                        <input type="text" id="place_name" className="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" required value={vname} onChange={(e)=>{setPname(e.target.value)}} />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your description</label>
                        <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" value={vdesc} onChange={(e)=>{setDesc(e.target.value)}} required />
                    </div>

                    <div className="mb-6">
                        <label htmlFor="location" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
                        <input type="text" id="location"  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ayodhya" value={vlocation} onChange={(e)=>{setLocation(e.target.value)}} required />
                    </div>
                    <div className="mb-6">
                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-black" htmlFor="multiple_files">Upload Images</label>
                        <input className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" onChange={(e)=>{setFile(e.target.files)}} multiple />
                    </div>

                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                </form>
            </div>
        </>
    )
}

export default Edit