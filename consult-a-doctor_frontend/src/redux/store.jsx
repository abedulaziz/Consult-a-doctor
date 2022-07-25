import { configureStore } from '@reduxjs/toolkit';
import doctorSignUpReducer from './slices/doctorSignUpSlice';
import userReducer from './slices/userSlice';

export default configureStore({
  reducer: {
    doctorSignUp: doctorSignUpReducer,
    userInfo: userReducer,
  }
})