
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useTranslation } from 'react-i18next';

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

// helper components
import ActionStatus from './helper-components/actionStatus';

// admin components
import AdminSpecializations from './admin/adminSpecializations';
import DoctorRequests from './admin/doctorRequests';

// import { ContextProvider } from './WebRTC-components/SocketContext';

import './App.css';

function App() {
  const { i18n } = useTranslation();
  document.dir = i18n.dir()
  return (
    <div className="App">
      <ActionStatus />
      <Router>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/doctor/specializations' element={<Specializations />}></Route>
          <Route path='/doctor/:specialization_id/accounts' element={<Doctors />}></Route>
          <Route path='/:user_id/appointments' element={<Appointments />}></Route>
          <Route path='/doctor/:doctor_id/profile' element={<Profile />}></Route>


          <Route path='/meetings/:meeting_id' element={<Meeting />}>
            
          </Route>

          <Route path='/sign-in' element={<SignIn /> }></Route>
          <Route path='/sign-up' element={<SignUp />}></Route> 
          <Route path='/doctor/sign-up' element={<DoctorSignUp />}></Route>
          <Route path='/admin/specializations' element={<AdminSpecializations />} ></Route>
          <Route path='/admin/doctor_requests' element={<DoctorRequests />} ></Route>
        </Routes>
      </Router>

    </div>
  );
}

export default App;
