import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from '../helper-components/loader';

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";

// layout components
import Appointment from "../layout-components/appointment";

const Appointments = () => {
  const [loader, setLoader] = React.useState(<Loader />);
  const [appoinAsDoctor, setAppoinAsDoctor] = React.useState(null);
  const [appoinAsPatient, setAppoinAsPatient] = React.useState(null);

  const userInfo = useSelector((state) => state.userInfo.value);

  React.useEffect(() => {
    try {
      const getAppointments = async () => {
        const appoinRqust = await axios.get(`/users/${userInfo.user_id}/appointments`, {
          headers: {
            Authorization: `Bearer ${userInfo.JWT}`
          }
        });

        console.log(appoinRqust);
        setAppoinAsDoctor(appoinRqust.data.appointmentsAsDoctor);
        setAppoinAsPatient(appoinRqust.data.appointmentsAsPatient);
        setLoader(null)
      };
      getAppointments();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <>
    {loader}
      <Header />

      <div className="appointments">
        <div className="container">
          <div className="appoin_content">
            <div className="heading">
              <h2>My Appointments</h2>
            </div>

            <div className="appoin-cards">
              {appoinAsDoctor &&
                appoinAsDoctor.map((appointment) => (
                  <Appointment
                    meeting_id={appointment.id}
                    key={appointment.id}
                    doctor_name={appointment.fname + " " + appointment.lname}
                    duration={appointment.from.substring(-3) + " - " + appointment.to.substring(-3)}
                    date={appointment.date}
                  />
                ))}
              {appoinAsPatient &&
                appoinAsPatient.map((appointment) => (
                  <Appointment
                    meeting_id={appointment.id}
                    key={appointment.id}
                    doctor_name={appointment.fname + " " + appointment.lname}
                    duration={appointment.from.substring(-3) + " - " + appointment.to.substring(-3)}
                    date={appointment.date}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Appointments;
