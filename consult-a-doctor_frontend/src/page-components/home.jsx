import React from "react";

import { useSelector } from 'react-redux'
import axios from "axios";

import { Trans } from "react-i18next";

// icons
import CheckTwoSqure from "../assets/icons/CheckTwoSquare.svg";
import PersonVideo from "../assets/icons/PersonVideo.svg";
import Development from "../assets/icons/Development.svg";
import HandsThumbsUp from "../assets/icons/HandThumbsUp.svg";

// backgrounds
import DoctorsSupportImg from "../assets/backgrounds/doctors_support.png";

// helper components
import Meta from "../helper-components/meta";
import Feature from "../helper-components/feature";
import TopDoctor from "../helper-components/topDoctor";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import { t } from "i18next";

const Home = () => {
   const [topDoctors, setTopDoctors] = React.useState(null);
   const topDoctorsSection = React.useRef(null);

   const popupController = useSelector((state) => state.popupController.value);

   React.useEffect(() => {
      try {
         const getTopDoctors = async () => {
            const topDoctorsRqust = await axios.get("/users/top-four-doctors");
            setTopDoctors(topDoctorsRqust.data.topDoctors);
         };
         getTopDoctors();
      } catch (err) {
         console(err);
      }

      // top doctors section animation
      const animateTopDoctors = () => {
         const parent = topDoctorsSection.current;
         const secondChild = parent.childNodes[1]
         // secondChild.style.right = "100px"
         
         setInterval(() => {
            
            parent.appendChild(parent.childNodes[0]);
            parent.childNodes.forEach((child) => {
               child.classList.remove("active");
            });
   
            parent.childNodes[0].style.order = "5";
            parent.childNodes[1].classList.add("active");
         }, 3000);
      }
      animateTopDoctors()

   }, []);

   return (
      <div>
         <Meta />

         <Header />
         <main>
            {/* hero section */}
            <div className="hero">
               <div className="container">
                  <div className="hero-content">
                     <div className="heading">
                        <h1>
                           {/* Reach our doctors <span className="theme-colored">now!</span> */}
                           <Trans components={{ span: <span /> }}>lang.homepage.hero.header</Trans>
                        </h1>
                        <p>{t("lang.homepage.hero.desc")}</p>
                     </div>

                     <ul className="hero_features">
                        <li>
                           <img src={CheckTwoSqure} />
                           <p>{t("lang.homepage.hero.specifics.specific_1")}</p>
                        </li>
                        <li>
                           <img src={CheckTwoSqure} />
                           <p>{t("lang.homepage.hero.specifics.specific_2")}</p>
                        </li>
                        <li>
                           <img src={CheckTwoSqure} />
                           <p>{t("lang.homepage.hero.specifics.specific_3")}</p>
                        </li>
                     </ul>
                  </div>
               </div>
            </div>

            {/* features section */}
            <div className="features">
               <div className="container">
                  <div className="features-content">
                     <Feature
                        icon={PersonVideo}
                        header={t("lang.homepage.features.section_1.header")}
                        description={t("lang.homepage.features.section_1.desc")}
                     />
                     <Feature
                        icon={Development}
                        header={t("lang.homepage.features.section_2.header")}
                        description={t("lang.homepage.features.section_2.desc")}
                     />
                     <Feature
                        icon={HandsThumbsUp}
                        header={t("lang.homepage.features.section_3.header")}
                        description={t("lang.homepage.features.section_3.desc")}
                     />
                  </div>
               </div>
            </div>

            {/* doctor support section */}
            <div className="doctor_supp">
               <div className="container">
                  <div className="supp-content">
                     <div className="side_img">
                        <img src={DoctorsSupportImg} />
                     </div>

                     <div className="supp_text">
                        <h2 className="heading">{t("lang.homepage.doctor_support.header")}</h2>
                        <p className="description">
                           <Trans components={{br: <br />}}>{t("lang.homepage.doctor_support.desc")}</Trans>
                        </p>
                     </div>
                  </div>
               </div>
            </div>

            {/* top doctors section */}
            <div className="top_doctors">
               <div className="side_padding_container">
                  <div className="top_doctors-content">
                     <div className="top_doctors_text">
                        <h2 className="heading">{t("lang.homepage.top_doctors.header")}</h2>
                        <p className="description">{t("lang.homepage.top_doctors.desc")}</p>
                     </div>

                     <div ref={topDoctorsSection} className="top_doctors-details">
                        {topDoctors &&
                           topDoctors.map((doctor) => (
                              <TopDoctor
                                 key={doctor.doctor_id}
                                 fullName={doctor.fname + " " + doctor.lname}
                                 age={doctor.age}
                                 speciality={doctor.speciality}
                                 doctorImg={doctor.profile_pic}
                              />
                           ))}
                     </div>
                  </div>
               </div>
            </div>
         </main>

         <Footer />

         {popupController.userProfilePopup}
      </div>
   );
};

export default Home;
