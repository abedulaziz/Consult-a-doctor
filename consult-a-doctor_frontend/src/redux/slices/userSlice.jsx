import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: {
    JWT: "",
    user_id: "",
    profile_pic: ""
  }
}

export const usersReducer = createSlice({
  name: 'users',
  initialState,
  reducers: {
    insertInfo: (state, action) => {
      state.value.JWT = action.payload.access_token
      state.value.user_id = action.payload.user_id
      state.value.profile_pic = action.payload.profile_pic
    }
  }
})

// Action creators are generated for each case reducer function
export const { insertInfo } = usersReducer.actions

export default usersReducer.reducer