import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    fname: "",
    lname: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
    university: "",
    about: "",
    gender: "",
    availability: {
      monday: {},
      tuesday: {},
      wednesday: {},
      thursday: {},
      friday: {},
      saturday: {},
      sunday: {}
    }
  },
  stage: 0
}

export const doctorSignUpSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fillInputs: (state, action) => {

      state.value = {...state.value, ...action.payload}
    },

    incrementStage: (state) => {
      state.stage = 1
    }
  },
})

// Action creators are generated for each case reducer function
export const { fillInputs, incrementStage } = doctorSignUpSlice.actions

export default doctorSignUpSlice.reducer