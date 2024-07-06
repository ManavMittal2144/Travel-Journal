import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [redirect, setRedirect] = useState(false);
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
    }).then(response => {
      setRedirect(true);
    })
    setUsername(null);
    
  }
  if (redirect)
    navigate('/');
  return (

    <nav className="NavbarItems">
      <h1 className="navbar-logo " style={{color:'orange'}}>Travel log</h1>

      <ul className="nav-menu">
        <ul className="nav-menu">
          <li >
            <Link className="nav-links" to='/'>
              <i> Home</i>
            </Link>
          </li>
          <li >
            <Link className="nav-links" to='/all'>
              <i> Vlogs</i>
            </Link>
          </li>
          <li >
            <Link className="nav-links" to='/tour'>
              <i> Tour</i>
            </Link>
          </li>
          {
            username && (<>
              <li >
                <Link className="nav-links" to='/plan'>
                  <i>Plans</i>
                </Link>
              </li>
              <li >
                <Link className="nav-links" to='/new'>
                  <i> Create Vlog</i>
                </Link>
              </li>
              <li >
                <Link className="nav-links" onClick={logout}>
                  <i>Logout</i>
                </Link>
              </li>
            </>
            )
          }

          {
            !username && (
              <>
                <li >
                  <Link className="nav-links" to='/login'>
                    <i> Login</i>
                  </Link>
                </li>
                <li >
                  <Link className="nav-links" to='/register'>
                    <i> Register</i>
                  </Link>
                </li>
              </>)
          }

        </ul>

      </ul>

    </nav>
  );
};

export default Navbar;
