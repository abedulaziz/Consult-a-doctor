import { configureStore } from '@reduxjs/toolkit';
import doctorSignUpReducer from './slices/doctorSignUpSlice';

export default configureStore({
  reducer: {
    doctorSignUp: doctorSignUpReducer
  }
})