import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import DoctorCard from "../layout-components/doctorCard";


// icons
import { ReactComponent as SearchIcon } from "../assets/icons/search.svg";


const Doctors = () => {
  const [doctors, setDoctors] = React.useState(null);
  const [searchValue, setSearchValue] = React.useState("")

  let { specialization_id } = useParams();

  React.useEffect(() => {
    try {
      const getSpecDoctors = async () => {
        const doctorsRqust = await axios.get(`/${specialization_id}/doctors`);
        console.log(doctorsRqust)
        setDoctors(doctorsRqust.data.doctors);
      };
      getSpecDoctors();
    } catch (err) {
      console.log(err);
    }
  }, []);



  const sortDoctors = (ev) => {
    
    // setDoctors(doctors.sort((a, b) => {
    //   let aFullname = a.fname + " " + a.lname
    //   let bFullname = b.fname + " " + b.lname
    //   console.log(ev.target.value);

    //   switch (ev.target.value) {
    //     case "alphabetically":
    //       return aFullname < bFullname ? -1 : 1;
    //       break;
      
    //     default:
    //       break;
    //   }

    // }))
    let hah = doctors.sort((a, b) => 
      a.fname + a.lname < b.fname + b.lname ? -1 : 1
    )

    console.log(hah, doctors);

    switch (ev.target.value) {
      case "alphabetically":
        setDoctors(hah)
        break;
      case "rating":
        // sortedArray = b.fname + " " + b.lname
        break;
    
      default:
        break;
    }
    console.log(doctors);
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
                  <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder="Search" />
                </div>

                <div className="sorting">
                  <label htmlFor="sortDoctors">Sort by: </label>
                  <select name="sorting" id="sortDoctors" onChange={(ev) => sortDoctors(ev)}>
                    <option value="alphabetically">Alphabetical order</option>
                    <option value="rating">Rate</option>
                    <option value="rating">Number of followers</option>
                  </select>
                </div>
              </div>

              <div className="doctor-cards">

                {
                  doctors && doctors.filter(doctor => {
                    console.log("haha")
                  let fullname = doctor.fname + " " + doctor.lname;
                  return fullname.match(new RegExp(searchValue, "i"))
                })
                .map(doctor => 
                  <DoctorCard doctor_id={doctor.doctor_id} key={doctor.doctor_id} profile_pic={doctor.profile_pic} fullname={doctor.fname + " " + doctor.lname} followers="23" />
                )}

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
