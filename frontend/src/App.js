import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from './Components/pages/Login'
import Register from './Components/pages/Register'
import NewVlog from './Components/pages/NewVlog'
import AllVlogs from './Components/pages/AllVlogs'
import Show from './Components/pages/Show'
import Edit from './Components/pages/Edit'
import Home from "./routes/home.jsx";
import Tour from "./routes/tour.jsx";
import Plans from './Components/pages/Plans.js'

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/tour' element={<Tour />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/new' element={<NewVlog />} />
          <Route path='/all' element={<AllVlogs />} />
          <Route path='/show/:id' element={<Show />} />
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/plan' element={<Plans />} />
        </Routes>
      
    </>
  )
}

export default App