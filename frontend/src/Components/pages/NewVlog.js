import React, { useState } from 'react'
import 'https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/datepicker.min.js'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Navbar from "../../Components/Nav/Navbar";


function NewVlog() {
    const [pname, setPname] = useState('');
    const [desc, setDesc] = useState('');
    const [location, setLocation] = useState('');
    const [file, setFile] = useState();
    const [redirect, setRedirect] = useState(false);
    let navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            const formdata = new FormData();
            for (let i = 0; i < file.length; i++) {
                formdata.append('file', file[i]);
            }
            formdata.append('name', pname);
            formdata.append('desc', desc);
            formdata.append('location', location);
            
            let res = await axios.post('http://localhost:8080/post', formdata, { withCredentials: true });
            setRedirect(true);
        }
        catch (e) {
            console.log(e);
        }
    }
    if (redirect) {
        return navigate('/all');
    }
    return (
        <>
            <Navbar />
            <div className='mt-24'>
                <p className='text-3xl m-4'>Create Vlog</p>
                <div className='border-2 m-2 rounded-lg border-gray-400'>
                    <form class="max-w-md m-8" onSubmit={submit}>
                        <div class="mb-6">
                            <label for="place_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Place name</label>
                            <input type="text" id="place_name" class="bg-white-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={pname} name="name" onChange={(e) => { setPname(e.target.value) }} required />
                        </div>
                        <div class="mb-6">
                            <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Your description</label>
                            <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-white-500 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={desc} name='desc' onChange={(e) => { setDesc(e.target.value) }} required />
                        </div>

                        <div class="mb-6">
                            <label for="location" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Location</label>
                            <input type="text" id="location" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" value={location} onChange={(e) => { setLocation(e.target.value) }} name='location' required />
                        </div>
                        <div class="mb-6">
                            <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-black" for="multiple_files">Upload Images</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none  dark:border-gray-600 dark:placeholder-gray-400" id="multiple_files" type="file" name='file' onChange={(e) => { setFile(e.target.files) }} multiple />
                        </div>

                        <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                    </form>
                </div>
            </div>
            
        </>
    )
}

export default NewVlog