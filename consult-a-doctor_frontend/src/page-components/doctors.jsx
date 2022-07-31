import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { t } from "i18next";

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
                <h2>{t("lang.doctors.header")}</h2>
                <p>{t("lang.doctors.desc")}</p>
              </div>

              <div className="search-panel">
                <div className="search-box">
                  <SearchIcon />
                  <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder={t("lang.doctors.search_panel.search_box_placeholder")} />
                </div>

                <div className="sorting">
                  <label htmlFor="sortDoctors">{t("lang.doctors.search_panel.sorting_sec.label")}</label>
                  <select name="sorting" id="sortDoctors" onChange={(ev) => sortDoctors(ev)}>
                    <option value="alphabetically">{t("lang.doctors.search_panel.sorting_sec.options.option_1")}</option>
                    <option value="rating">{t("lang.doctors.search_panel.sorting_sec.options.option_2")}</option>
                    <option value="rating">{t("lang.doctors.search_panel.sorting_sec.options.option_3")}</option>
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
