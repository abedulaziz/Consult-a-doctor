import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteInterval } from '../redux/slices/doctorSignUpSlice'

import moment from 'moment';


// icons
import {ReactComponent as Trash} from '../assets/icons/trash-2.svg';

const TimeInterval = ({weekDay, from, to}) => {
  const availabilities = useSelector((state) => state.doctorSignUp.value.availabilities)
  const dispatch = useDispatch()

  const timeFrom = React.useRef(null)
  const timeTo = React.useRef(null)
  const timeInterval = React.useRef(null)

  const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]


  // console.log(timeInterval.current.parentNode);

  const validateTime = () => {
    let hourFrom = timeFrom.current.value;
    let hourTo = timeTo.current.value;



    if (hourFrom >= hourTo) {
      timeTo.current.value = moment(hourFrom, "HH:mm").add(1, "hour").format("HH:mm")
    }
  }


  return (
    <div ref={timeInterval} className="time-interval">

      <select ref={timeFrom} name="time-from" id="from" value={from} onChange={validateTime}>
        <option value="00:00">00:00</option>
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="05:00">05:00</option>
        <option value="06:00">06:00</option>
        <option value="07:00">07:00</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
        <option value="23:00">23:00</option>
      </select>

      <span className="separator"> - </span>

      <select ref={timeTo} name="to" id="to" value={to} onChange={validateTime}>
        <option value="00:00">00:00</option>
        <option value="01:00">01:00</option>
        <option value="02:00">02:00</option>
        <option value="03:00">03:00</option>
        <option value="04:00">04:00</option>
        <option value="05:00">05:00</option>
        <option value="06:00">06:00</option>
        <option value="07:00">07:00</option>
        <option value="08:00">08:00</option>
        <option value="09:00">09:00</option>
        <option value="10:00">10:00</option>
        <option value="11:00">11:00</option>
        <option value="12:00">12:00</option>
        <option value="13:00">13:00</option>
        <option value="14:00">14:00</option>
        <option value="15:00">15:00</option>
        <option value="16:00">16:00</option>
        <option value="17:00">17:00</option>
        <option value="18:00">18:00</option>
        <option value="19:00">19:00</option>
        <option value="20:00">20:00</option>
        <option value="21:00">21:00</option>
        <option value="22:00">22:00</option>
        <option value="23:00">23:00</option>
      </select>

      <div className="trash">
        <Trash onClick={() =>{
          dispatch(deleteInterval({day:weekDay, from: timeFrom.current.value, to: timeTo.current.value}))
          console.log(availabilities)
          }
        }  />
      </div>
    </div>
  )
}

export default TimeInterval