import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    element: null
  },
}

export const editProfileSlice = createSlice({
  name: 'editProfile',
  initialState,
  reducers: {
    setElement: (state, action) => {
      state.value.element = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setElement } = editProfileSlice.actions

export default editProfileSlice.reducer