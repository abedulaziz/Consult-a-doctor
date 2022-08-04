import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    editProfilePopup: null,
    addBlogPopup: null
  },
}

export const popupControllerSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setEditProfilePopup: (state, action) => {
      state.value.editProfilePopup = action.payload
    },
    setAddBlogPopup: (state, action) => {
      state.value.addBlogPopup = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setEditProfilePopup, setAddBlogPopup } = popupControllerSlice.actions

export default popupControllerSlice.reducer