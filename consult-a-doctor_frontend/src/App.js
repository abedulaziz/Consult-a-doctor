
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import ScriptTag from 'react-script-tag';

// page components
import Home from './page-components/home';
import Specializations from './page-components/specializations';
import Doctors from './page-components/doctors';
import Profile from './page-components/profile';
import SignIn from './page-components/signIn';
import SignUp from './page-components/signUp';
import Appointments from './page-components/appointments';
import DoctorSignUp from './page-components/doctorSignUp';
import Meeting from './page-components/meeting';

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doctor/specializations' element={<Specializations />}></Route>
          <Route path='/doctor/accounts' element={<Doctors />}></Route>
          <Route path='/my-appointments' element={<Appointments />}></Route>
          <Route path='/doctor/:doctor_id/profile' element={<Profile />}></Route>
          <Route path='/meeting' element={<Meeting />}></Route>

          <Route path='/sign-in' element={<SignIn />}></Route>
          <Route path='/sign-up' element={<SignUp />}></Route> 
          <Route path='/doctor/sign-up' element={<DoctorSignUp />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
