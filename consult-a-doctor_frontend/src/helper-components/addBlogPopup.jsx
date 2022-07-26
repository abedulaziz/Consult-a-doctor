import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {setPopupVisibility} from '../redux/slices/addBlogPopupSlice'

const AddBlogPopup = () => {
  const popupVisibility = useSelector(state => state.addBlogPupop.value.PopupVisibitlityClass)
  console.log(popupVisibility);
  const dispatch = useDispatch()

  return (
    <div className={`cd-popup ${popupVisibility}`} >
      <div className="cd-popup-container">
        <p>Are you sure you want to delete this element?</p>
        <ul className="cd-buttons">
          <li><a href="#">Submit</a></li>
          <li><a href="#">Cancel</a></li>
        </ul>
        <a href="#" className="cd-popup-close img-replace" onClick={() =>dispatch(setPopupVisibility(""))}></a>
      </div>
    </div>
  )
}

export default AddBlogPopup