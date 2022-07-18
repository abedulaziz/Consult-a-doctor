import React from 'react'

// layout components
import Header from '../layout-components/header';
import Footer from '../layout-components/footer';

// layout components
import Appointment from '../layout-components/appointment';

const Appointments = () => {
  return (
    <>
      <Header />

      <div className="appointments">
        <div className="container">
          <div className="appoin_content">

            <div className="heading">
              <h2>My Appointments</h2>
            </div>

            <div className="appoin-cards">
              <Appointment doctor_name="John Doe" duration="11:00 - 13:00" date="Feb 17, 2022" />
              <Appointment doctor_name="Mickel Smith" duration="14:00 - 14:30" date="March 14, 2022" />
              <Appointment doctor_name="Wallac Johnson" duration="01:00 - 03:00" date="March 5, 2022" />
              <Appointment doctor_name="Wan Bissaka" duration="12:00 - 13:00" date="Feb 22, 2022" />
              <Appointment doctor_name="Marco Asensio" duration="20:00 - 21:00" date="December 17, 2022" />
            </div>

          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Appointments