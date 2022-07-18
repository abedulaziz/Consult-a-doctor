
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'

// page components
import Home from './page-components/home';
import Specializations from './page-components/specializations';
import Doctors from './page-components/doctors';
import Profile from './page-components/profile';
import SignIn from './page-components/signIn';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doctor/specializations' element={<Specializations />}></Route>
          <Route path='/doctor/accounts' element={<Doctors />}></Route>
          <Route path='/doctor/:doctor_id/profile' element={<Profile />}></Route>

          <Route path='/sign-in' element={<SignIn />}></Route>
          {/* <Route path='/sign-up' element={<SignUp />}></Route>  */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
