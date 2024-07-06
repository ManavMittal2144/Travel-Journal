import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
function Header() {
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);
    useEffect(() => {
        fetch('http://localhost:8080/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo => {
                setUsername(userInfo.username);
            });
        });
    }, []);

    function logout() {
        fetch('http://localhost:8080/logout', {
            credentials: 'include',
            method: 'POST',
        });
        setUsername(null);
        navigate('/');
    }
    return (
        <div className='flex p-3 justify-between ' >
            <h2 className='font-bold text-3xl pl-2 text-black select-none'>Travel Vlog</h2>
            <div className='flex space-x-14'>
                {
                    username && (
                        <>
                            <button className='border-2 rounded-lg p-1.5 bg-gray-100 hover:bg-gray-400 ease-in duration-100' type='submit'><Link to='/new'>Create Vlog</Link></button>
                        <button className='border-2 rounded-lg p-1.5 bg-gray-300 hover:bg-gray-400 ease-in duration-100' type='submit' onClick={logout}>Logout</button>
                        </>
                    )
                }
                {
                    !username &&
                    (
                        <>
                        <button className='border-2 rounded-lg p-1.5 bg-gray-300 hover:bg-gray-400 ease-in duration-100' type='submit'><Link to='/login'>Login</Link></button>
                            <button className='border-2 rounded-lg p-1.5 bg-gray-300 hover:bg-gray-400 ease-in duration-100' type='submit'><Link to='/register'>Signup</Link></button>
                        </>
                    )
                }
                
            </div>
        </div>
    )
}

export default Header