import { configureStore } from '@reduxjs/toolkit';
import doctorSignUpReducer from './slices/doctorSignUpSlice';
import userReducer from './slices/userSlice';
import addBlogPopupReducer from './slices/addBlogPopupSlice';
import bookMeetingReducer from './slices/bookMeetingSlice';
import editProfileReducer from './slices/editProfileSlice';

export default configureStore({
  reducer: {
    doctorSignUp: doctorSignUpReducer,
    userInfo: userReducer,
    addBlogPupop: addBlogPopupReducer,
    bookMeeting: bookMeetingReducer,
    editProfile: editProfileReducer
  }
})