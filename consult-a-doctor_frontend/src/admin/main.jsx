import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Header from './header';

const Main = () => {
  return (

    <Router>
        <Routes>
          <Route path='/admin' />
            <Header />

            <Route path='/admin/specializations' element={Admin_specializations} />
            <Route path='/admin/doctor_requests' element={Doctor_requests} />


        </Routes>

    </Router>
  )
}

export default Main