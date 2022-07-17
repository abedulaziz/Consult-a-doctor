
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

// page components
import Home from './page-components/home';
import Specializations from './page-components/specializations';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doctor/specializations' element={<Specializations />}></Route>
          {/* <Route path='/doctors' element={<Doctors />}></Route>
          <Route path='/profile' element={<Profile />}></Route>

          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route>  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
