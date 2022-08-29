import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillInputs, addInterval } from '../redux/slices/doctorSignUpSlice'


// helper components
import TimeInterval from '../helper-components/timeInterval';

// icons
import {ReactComponent as Trash} from '../assets/icons/trash-2.svg';
import {ReactComponent as Plus} from '../assets/icons/plus.svg';

const WeekDayAvail = ({weekDay, name, id}) => {


  const availabilities = useSelector((state) => state.doctorSignUp.value.availabilities)
  const dispatch = useDispatch()
  const weekDayAvail = availabilities[name]




  return (
    <div className='week-day-avail'>
      
      <div className="setting_avail">
        <div className="week-day">
          <input type="checkbox" name={name} id={id} />
          <label htmlFor={id} >{weekDay}</label>
        </div>

        <div className="times">

          {weekDayAvail.map((interval, i) => 
            <TimeInterval weekDay={name} key={i} from={interval[0]} to={interval[1]} />
          )}

        </div>

        <div className="add-time">
          <Plus onClick={() => dispatch(addInterval(name))} />
        </div>
      </div>
      
    </div>
  )
}

export default WeekDayAvail