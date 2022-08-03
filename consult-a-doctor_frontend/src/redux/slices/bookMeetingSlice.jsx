import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    isPopupActive: false,
    doctorFullname: ""
  },
}

export const bookMeetingSlice = createSlice({
  name: 'bookMeeting',
  initialState,
  reducers: {
    changePopupVisib: (state, action) => {
      state.value.isPopupActive = action.payload
    },
    setDoctorFullname: (state, action) => {
      state.value.doctorFullname = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { changePopupVisib, setDoctorFullname } = bookMeetingSlice.actions

export default bookMeetingSlice.reducer