import { configureStore } from '@reduxjs/toolkit';
import doctorSignUpReducer from './slices/doctorSignUpSlice';
import userReducer from './slices/userSlice';
import webRTCReducer from './slices/webRTCDataSlice';

export default configureStore({
  reducer: {
    doctorSignUp: doctorSignUpReducer,
    userInfo: userReducer,
    webRTCData: webRTCReducer
  }
})