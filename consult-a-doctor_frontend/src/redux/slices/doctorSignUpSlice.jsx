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
    availabilities: {
      sunday: [{
        from: "00:00",
        to: "00:00"
      }],
      monday: [{
        from: "00:00",
        to: "00:00"
      }],
      tuesday: [{
        from: "00:00",
        to: "00:00"
      }],
      wednesday: [{
        from: "00:00",
        to: "00:00"
      }],
      thursday: [{
        from: "00:00",
        to: "00:00"
      }],
      friday: [{
        from: "00:00",
        to: "00:00"
      }],
      saturday: [{
        from: "00:00",
        to: "00:00"
      }]
    }
  },
  stage: 1
}

export const doctorSignUpSlice = createSlice({
  name: 'register',
  initialState,
  reducers: {
    fillInputs: (state, action) => {
      state.value = {...state.value, ...action.payload}
    },

    previousStage: (state) => {
      state.stage = 1
    },
    nextStage: (state) => {
      state.stage = 2
    },

    addInterval: (state, action) => {
      
    }
  },
})

// Action creators are generated for each case reducer function
export const { fillInputs, nextStage, previousStage } = doctorSignUpSlice.actions

export default doctorSignUpSlice.reducer