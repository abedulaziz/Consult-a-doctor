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
      sunday: [["00:00", "00:00"]],
      monday: [["00:00", "00:00"]],
      tuesday: [["00:00", "00:00"]],
      wednesday: [["00:00", "00:00"]],
      thursday: [["00:00", "00:00"]],
      friday: [["00:00", "00:00"]],
      saturday: [["00:00", "00:00"]],
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
      state.value.availabilities[action.payload].push(["00:00", "00:00"])

    },
    updateInterval: (state, action) => {
      let index = action.payload.intervalIndex;

      const timeInterval = state.value.availabilities[action.payload.day][index]
      timeInterval[0] = action.payload.from
      timeInterval[1] = action.payload.to
    },

    deleteInterval: (state, action) => {
      const weekDay = state.value.availabilities[action.payload.day];

      state.value.availabilities[action.payload.day] = weekDay.filter(time => time[0] != action.payload.from || time[1] != action.payload.to)

    }
  },
})

// Action creators are generated for each case reducer function
export const { fillInputs, nextStage, previousStage, addInterval, deleteInterval, updateInterval } = doctorSignUpSlice.actions

export default doctorSignUpSlice.reducer