import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import DoctorCard from "../layout-components/doctorCard";

// profile pics
import Doctor1 from "../assets/backgrounds/doctor1.jpg";
import Doctor2 from "../assets/backgrounds/doctor2.jpg";
import Doctor3 from "../assets/backgrounds/doctor3.jpg";
import Doctor4 from "../assets/backgrounds/doctor4.jpg";

// icons
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";


const Doctors = () => {
  const [doctors, setDoctors] = React.useState(null);

  let { specialization_id } = useParams();

  React.useEffect(() => {
    try {
      const getSpecDoctors = async () => {
        const doctorsRqust = await axios.get(`/${specialization_id}/doctors`);

        setDoctors(doctorsRqust.data.doctors);
      };
      getSpecDoctors();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const filterDoctors = (ev) => {
    let value = ev.target.value
    setDoctors(
      doctorData.filter((doctor) => {
        doctor.fname === value
      })
    )
  }



  return (
    <>
      <Header />

      <main>
        <div className="doctors">
          <div className="container">
            <div className="doctors_content">
              <div className="heading">
                <h2>Doctors</h2>
                <p>Discover a list of experienced doctors in many specialities and book meetings now!</p>
              </div>

              <div className="search-panel">
                <div className="search-box">
                  <SearchIcon />
                  <input onChange={(ev) => filterDoctors(ev)} type="text" placeholder="Search" />
                </div>

                <div className="sorting">
                  <label htmlFor="sortDoctors">Sort by: </label>
                  <select name="sorting" id="sortDoctors">
                    <option value="alphabetically">Alphabetical order</option>
                    <option value="rating">Rate</option>
                    <option value="rating">Number of followers</option>
                  </select>
                </div>
              </div>

              <div className="doctor-cards">
                {doctors &&
                  doctors.map((doctor) => <DoctorCard key={doctor.doctor_id} profile_pic={doctor.profile_pic} fullname={doctor.fname + " " + doctor.lname} followers="23" />)}
                {/* <DoctorCard profile_pic={Doctor1} fullname="John Doe" followers="57" />
                <DoctorCard profile_pic={Doctor3} fullname="Wan Bissaka" followers="42" />
                <DoctorCard profile_pic={Doctor4} fullname="Rayan Johnson" followers="22" />
                <DoctorCard profile_pic={Doctor2} fullname="Will Smith" followers="34" /> */}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Doctors;
