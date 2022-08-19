import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserProfilePopup } from "../redux/slices/popupControllerSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import jwt_decode from "jwt-decode";

import { useTranslation } from "react-i18next";
// helper components
import NavItem from "../helper-components/navItem";
import PatientInfoPopup from "../helper-components/patientInfoPopup";

// icons
import { ReactComponent as Menu } from "../assets/icons/menu.svg";
import DefaultProfilePic from "../assets/backgrounds/default_profile_picture.svg";

import Logo from "../assets/brand/transparent_background_brand.png";
import MobileLogo from "../assets/brand/transparent_background_logo.png";

const Header = () => {
   const { t, i18n } = useTranslation();
   const header = React.useRef(null);
   const NavBar = React.useRef(null);
   const navigate = useNavigate();

   const dispatch = useDispatch();

   const [userInfo, setUserInfo] = React.useState(null);

   const [logo, setLogo] = React.useState(MobileLogo);

   React.useEffect(() => {
      window.screen.width < 590 ? setLogo(MobileLogo) : setLogo(Logo);

      const checkAuthentication = async () => {
         try {
            await axios.get("isAuthenticated", {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            });

            setUserInfo(jwt_decode(localStorage.getItem("JWT")));
         } catch (err) {
            setUserInfo(undefined);
         }
      };
      checkAuthentication();
   }, []);

   window.addEventListener("scroll", () => {
      if (window.pageYOffset > 0) {
         if (header.current !== null) {
            header.current.style.padding = "15px 0";
            header.current.style.backgroundColor = "var(--light-text-color)";
         }
      } else {
         if (header.current !== null) {
            header.current.style.padding = "20px 0";
            header.current.style.backgroundColor = "transparent";
         }
      }
   });

   const displayNav = () => {
      let currDisplay = NavBar.current.style.display;

      if (currDisplay === "none" || currDisplay === "") {
         NavBar.current.style.display = "block";
      } else NavBar.current.style.display = "none";
   };

   return (
      <header className="page_heading" ref={header}>
         <div className="container">
            <div className="header-content">
               <div className="brand">
                  <div className="logo">
                     <img src={logo} alt="consult a doctor" />
                  </div>
               </div>

               <nav ref={NavBar}>
                  <div className="nav-wrapper">
                     <NavItem path="/" className="home-link" content={t("lang.header.nav_links.home_link")} />
                     <NavItem path="/doctor/specializations" className="specializations-link" content={t("lang.header.nav_links.specializations_link")} />
                     <NavItem path="/doctor/all/accounts" className="doctors-link" content={t("lang.header.nav_links.doctors_link")} />
                     <NavItem
                        path={userInfo ? `/${userInfo.sub}/appointments` : "/sign-in"}
                        className="appointments-link"
                        content={t("lang.header.nav_links.my_appointments")}
                     />
                  </div>
               </nav>

               <div className="account_status">
                  <div className="languages">
                     <select name="language" defaultValue={t("lang.header.current_lan")} id="language" onChange={(ev) => i18n.changeLanguage(ev.target.value)}>
                        <option value="en">English</option>
                        <option value="ar">العربية</option>
                        <option value="fr">Français</option>
                     </select>
                  </div>

                  {userInfo !== null && (
                     <>
                        {userInfo !== undefined ? (
                           <>
                              <div
                                 className="profile-pic"
                                 onClick={() =>
                                    userInfo.type === "doctor" ? navigate(`/doctor/${userInfo.sub}/profile`) : dispatch(setUserProfilePopup(<PatientInfoPopup />))
                                 }
                              >
                                 <div className="pic_wrapper">
                                    <img src={userInfo.profile_pic_uri ? userInfo.profile_pic_uri : DefaultProfilePic} alt="profile" />
                                 </div>
                              </div>
                              <div className="menu">
                                 <Menu onClick={() => displayNav()} />
                              </div>
                           </>
                        ) : (
                           <>
                              <Link to="/sign-in">
                                 <button className="sign-in_button">{t("lang.header.registration.sign_in_button")}</button>
                              </Link>
                              <Link to="/sign-up">
                                 <button className="sign-up_button">{t("lang.header.registration.sign_up_button")}</button>
                              </Link>
                              <div className="menu">
                                 <Menu onClick={() => displayNav()} />
                              </div>
                           </>
                        )}
                     </>
                  )}
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
