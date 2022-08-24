import React from 'react'

import { t } from "i18next";

// icons
import Logo from '../assets/brand/transparent_background_logo.png';
import {ReactComponent as Facebook} from '../assets/icons/facebook.svg';
import {ReactComponent as Instagram} from '../assets/icons/instagram.svg';
import {ReactComponent as Twitter} from '../assets/icons/twitter.svg';
import {ReactComponent as Linkedin} from '../assets/icons/linkedin.svg';

// helper components
import FooterLink from '../helper-components/footerLink';

const Footer = () => {
  return (
    <footer>
      <div className="footer_content">
        <div className="container">

          <div className="sections">

            <div className="left-section-links">
              <div className="section">
                <h3 className="registration">{t("lang.footer.registration_sec.header")}</h3>

                <ul>
                  <FooterLink target="/sign-up" alt="sign-up" text={t("lang.footer.registration_sec.links.normal_user_sign_up")} />
                  <FooterLink target="/doctor/sign-up" alt="doctor sign-up" text={t("lang.footer.registration_sec.links.doctor_sign_up")} />
                </ul>
                
              </div>
              <div className="section">
                <h3 className="log-in">{t("lang.footer.log_in_sec.header")}</h3>

                <ul>
                  <FooterLink target="/sign-in" alt="sign-in" text={t("lang.footer.log_in_sec.links.log_in")} />
                </ul>
                
              </div>
            </div>

            <div className="right-section-links">

              <div className="section">
                <h3 className="sections">{t("lang.footer.sections.header")}</h3>

                <ul>
                  <FooterLink target="/" alt="homepage" text={t("lang.footer.sections.links.home_link")} />
                  <FooterLink target="/doctor/specializations" alt="specializations" text={t("lang.footer.sections.links.specializations_link")}  />
                  <FooterLink target="/doctor/specializations/accounts" alt="doctors page" text={t("lang.footer.sections.links.doctors_link")}  />
                  <FooterLink target="/my-appointments" alt="my appointments" text={t("lang.footer.sections.links.my_appointments")}  />
                </ul>
                
              </div>
            </div>

          </div>

        </div>
      </div>
      <div className="buttom_footer">
        <div className="container">
          <div className="buttom_footer_content">

            <div className="logo">
              <img src={ Logo }/>
            </div>

            <div className="social-media">
              <ul>
                <li className="facebook"><Facebook /></li>
                <li className="instagram"><Instagram /></li>
                <li className="twitter"><Twitter /></li>
                <li className="linkedin"><Linkedin /></li>
              </ul>
            </div>

          </div>

        </div>
      </div>
    </footer>
  )
}

export default Footer