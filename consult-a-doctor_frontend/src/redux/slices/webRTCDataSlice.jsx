import React from 'react'
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stream: null,
  myVideo,
  userVideo,
  me: null,
  call: null,
  callAccepted: false,
  callEnded: false,
  
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

export const { setDataProperty } = WebRTCDataSlice.actions

export default WebRTCDataSlice.reducer