import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fillInputs, nextStage, previousStage } from '../redux/slices/doctorSignUpSlice'

import {useForm} from 'react-hook-form';
import moment from 'moment';

// helper components
import TimeInterval from '../helper-components/timeInterval';

// icons
import {ReactComponent as Trash} from '../assets/icons/trash-2.svg';
import {ReactComponent as Plus} from '../assets/icons/plus.svg';

const WeekDayAvail = ({weekDay, name, id}) => {


  const availabilities = useSelector((state) => state.doctorSignUp.value.availabilities)
  const dispatch = useDispatch()
  const weekDayAvail = availabilities[name]

  console.log(weekDayAvail);



  return (
    <div className='week-day-avail'>
      
      <div className="setting_avail">
        <div className="week-day">
          <input type="checkbox" name={name} id={id} />
          <label htmlFor={id} >{weekDay}</label>
        </div>

        <div className="times">

          {weekDayAvail.map((interval, i) => 
            <TimeInterval key={i} from={interval.from} to={interval.to} />
          )}

        </div>

        <div className="add-time">
          <Plus />
        </div>
      </div>
      

    </div>
  )
}

export default WeekDayAvail