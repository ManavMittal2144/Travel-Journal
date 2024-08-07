import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Login() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate();
    const submit = async (e) => {
        e.preventDefault();
        try {
            // alert('submited');
            const response = await axios.post('http://localhost:8080/login', {
                username: username,
                password: password,
            }, { withCredentials:true});
            if (response.status === 200) { setRedirect(true); }
            else
                alert('wrong credentials');
        }
        catch (e) {
            alert('wrong credentials');
            // console.log(e);
        }
    }
    if (redirect) {
        return navigate('/');
    }
    return (
        <>
            
            <div className='max-w-md mx-auto m-16 p-9 border-2 rounded-xl border-gray-400'>
                <div className="max-w-md mx-auto mb-7 pl-28 text-3xl">Login</div>
                <form className="max-w-md mx-auto" onSubmit={submit} >
                    <div className="relative z-0 w-full group mb-7">
                        <input type="text" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={username} onChange={(e) => { setUsername(e.target.value) }} required />
                        <label for="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Username</label>
                    </div>
                    <div className="relative z-0 w-full  group mb-7">
                        <input type="password" name="floating_password" id="floating_password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                        <label for="floating_password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                    </div>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mb-6">Submit</button>
                </form>
                <p className='text-gray-600'>Don't have account : <Link className='underline text-blue-600' to='/register'>Signup</Link></p>
            </div>


        </>
    )
}

export default Login