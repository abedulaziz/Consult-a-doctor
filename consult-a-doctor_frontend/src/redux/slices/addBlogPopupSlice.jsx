import {createSlice} from '@reduxjs/toolkit'


export const addBlogPopupReducer = createSlice({
  name: 'addBlogPopup',
  initialState: {value: {
    PopupVisibitlityClass: ""
  }},
  reducers: {
    setPopupVisibility: (state, action) => {
      state.value.PopupVisibitlityClass = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { setPopupVisibility } = addBlogPopupReducer.actions

export default addBlogPopupReducer.reducer