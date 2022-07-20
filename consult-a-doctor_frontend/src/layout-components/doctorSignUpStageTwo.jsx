import React from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { fillInputs, previousStage } from '../redux/slices/doctorSignUpSlice'

import {useForm} from 'react-hook-form';

// helper components
import WeekDayAvail from './weekDayAvail';

// icons
import {ReactComponent as ChevronsRight} from '../assets/icons/chevrons-right.svg';

const DoctorSignUpStageTwo = () => {

  const registrationData = useSelector((state) => state.doctorSignUp)
  const dispatch = useDispatch()

  const {register, handleSubmit, formState: {errors}} = useForm();

  const requestDoctorAccount = (data) =>{
    dispatch(fillInputs(data))
    console.log(registrationData);
  }

  return (
    <form onSubmit={ handleSubmit((data) => requestDoctorAccount(data)) } id='signUp' className='regis_form'>

      <div className="university">
        <div className="university_wrapper">
          <input {...register("university", {required: "Please mention your university"})} type="text" name="university" id="university" placeholder='University' />
          <p className='error'>{errors.university?.message}</p>
        </div>
      </div>

      <div className="availabilities">
        <h4 className='avail_title'>Set your weekly hours availabilities</h4>
        <div className="week-days">
          <WeekDayAvail weekDay="SUN" name="sunday" id="sunday" />
          <WeekDayAvail weekDay="MON" name="monday" id="monday" />
          <WeekDayAvail weekDay="TUE" name="tuesday" id="tuesday" />
          <WeekDayAvail weekDay="WED" name="wednesday" id="wednesday" />
          <WeekDayAvail weekDay="THU" name="thursday" id="thursday" />
          <WeekDayAvail weekDay="FRI" name="friday" id="friday" />
          <WeekDayAvail weekDay="SAT" name="saturday" id="saturday" />
        </div>
      </div>

      <div className="button_wrapper">
        <button className="regis_button submit_doctor_sign-up">Request Account</button>  
      </div>

      <div className="button_wrapper">
        <div onClick={() => dispatch(previousStage())} className="sign-up_previous_step change_step">
            <ChevronsRight title="Next" />
        </div>
      </div>
    </form>
  )
}

export default DoctorSignUpStageTwo