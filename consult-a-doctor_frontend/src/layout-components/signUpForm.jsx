import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillInputs, nextStage, previousStage } from "../redux/slices/doctorSignUpSlice";
import { useForm } from "react-hook-form";


// icons
import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";

const SignUpForm = ({ isDoctorSignUp = false }) => {
  const registrationData = useSelector((state) => state.doctorSignUp);
  const password = React.useRef(null)
  const dispatch = useDispatch();
  console.log(password);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const nextSignUpStep = (data) => {
    if (isDoctorSignUp) {
      dispatch(fillInputs(data));
      dispatch(nextStage());

    }
    else {

    }
    console.log(registrationData);
  };

  return (
    <form onSubmit={handleSubmit((data) => nextSignUpStep(data))} id="signUp" className="regis_form">
      <div className="fullname">
        <div className="fname_wrapper">
          <input
            {...register("fname", { required: "First name is required", minLength: { value: 2, message: "Minimum length is 2" } })}
            type="text"
            name="fname"
            placeholder="First name"
          />
          <p className="error">{errors.fname?.message}</p>
        </div>
        <div className="fname_wrapper">
          <input
            {...register("lname", { required: "Last name is required", minLength: { value: 2, message: "Minimum length is 2" } })}
            type="text"
            name="lname"
            placeholder="Last name"
          />
          <p className="error">{errors.lname?.message}</p>
        </div>
      </div>

      <div className="email">
        <div className="email_wrapper">
          <input
            {...register("email", { required: "Email is required", pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: "Invalid email" } })}
            type="text"
            name="email"
            id="email"
            placeholder="Email"
          />
          <p className="error">{errors.email?.message}</p>
        </div>
      </div>

      <div className="password">
        <div className="password_wrapper" ref={password}>
          <input
            {...register("password", {
              required: "Password is required",
              pattern: { value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message: "Please enter a valid password" },
            })}
            type="password"
            name="password"
            id="password"
            
            placeholder="Password"
          />
          <p className="error">{errors.password?.message}</p>
        </div>
      </div>
      <div className="password_confirm">
        <div className="password_wrapper">
          <input
            {...register("password_confirmation", {
              validate: value => value === password.current.querySelector("input#password").value || "Password doesn't match",
            })}
            type="password"
            name="password_confirmation"
            id="passwordConfirmation"
            placeholder="Password confirmation"
          />
          <p className="error">{errors.password_confirmation?.message}</p>
        </div>
      </div>

      <div className="dob">
        <div className="dob_wrapper">
          <span>Date of birth:</span>
          <input {...register("date_of_birth", { required: "Date of birth is required" })} type="date" name="date_of_birth" id="dateOfBirth" />
        </div>
        <p className="error">{errors.date_of_birth?.message}</p>
      </div>

      <div className="gender">
        <div className="gender_wrapper">
          <span className="title">Gender:</span>
          <div className="selected_gender">
            <input {...register("gender", { required: "Please select your gender" })} type="radio" id="male" name="gender" value="male" />
            <label htmlFor="male">Male</label>
            <input {...register("gender", { required: "Please select your gender" })} type="radio" id="female" name="gender" value="female" />
            <label htmlFor="female">Female</label>
          </div>
        </div>
        <p className="error">{errors.gender?.message}</p>
      </div>
      <div className="button_wrapper">
        {isDoctorSignUp ? (
          <button className="sign-up_next_step change_step">
            <ChevronsRight title="Next" />
          </button>
        ) : (
          <button className="sign-up_button regis_button">Register</button>
        )}
      </div>
    </form>
  );
};

export default SignUpForm;
