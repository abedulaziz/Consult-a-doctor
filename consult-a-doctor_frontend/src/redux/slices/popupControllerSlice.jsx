import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   value: {
      editProfilePopup: null,
      addBlogPopup: null,
      bookMeetingPopup: null,
      addSpecialization: null,
      userProfilePopup: null,
   },
};

export const popupControllerSlice = createSlice({
   name: "editProfile",
   initialState,
   reducers: {
      setEditProfilePopup: (state, action) => {
         state.value.editProfilePopup = action.payload;
      },
      setAddBlogPopup: (state, action) => {
         state.value.addBlogPopup = action.payload;
      },
      setBookMeetingPopup: (state, action) => {
         state.value.bookMeetingPopup = action.payload;
      },
      setAddSpecialization: (state, action) => {
         state.value.addSpecialization = action.payload;
      },
      setUserProfilePopup: (state, action) => {
         state.value.userProfilePopup = action.payload;
      },
   },
});

// Action creators are generated for each case reducer function
export const { setEditProfilePopup, setAddBlogPopup, setBookMeetingPopup, setAddSpecialization, setUserProfilePopup } = popupControllerSlice.actions;

export default popupControllerSlice.reducer;
