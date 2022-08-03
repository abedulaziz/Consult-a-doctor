import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    isPopupActive: false,
    fname: "",
    lname: "",
    profile_pic: ""
  },
}

export const bookMeetingSlice = createSlice({
  name: 'bookMeeting',
  initialState,
  reducers: {
    changePopupVisib: (state, action) => {
      state.value.isPopupActive = action.payload
    },
    setName: (state, action) => {
      let prop = action.payload.prop
      state.value[prop] = action.payload.value
    },
    setDoctorProfilePic: (state, action) => {
      state.value.profile_pic = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changePopupVisib, setName, setDoctorProfilePic } = bookMeetingSlice.actions

export default bookMeetingSlice.reducer