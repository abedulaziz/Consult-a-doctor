import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stream: null
}



export const WebRTCDataSlice = createSlice({
  name: "webRTCData", 
  initialState,
  reducers: {
    setDataProperty: (state, action) => {
      state[action.payload.name] = action.payload.value
    }
  }
})

export const { setDataProperty } = WebRTCDataReducer.actions

export default WebRTCDataSlice.reducer