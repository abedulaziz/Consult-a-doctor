import { configureStore } from '@reduxjs/toolkit';
import doctorSignUpReducer from './slices/doctorSignUpSlice';
import userReducer from './slices/userSlice';
import addBlogPopupReducer from './slices/addBlogPopupSlice';

export default configureStore({
  reducer: {
    doctorSignUp: doctorSignUpReducer,
    userInfo: userReducer,
    addBlogPupop: addBlogPopupReducer
  }
})