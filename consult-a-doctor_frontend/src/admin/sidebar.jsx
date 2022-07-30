import React from "react";

// icons
import { ReactComponent as AccountRequestIcon } from '../assets/icons/account_request.svg';

// helper components
import NavItem from "./admin_helper_components/sidebar_nav_Item";

import Logo from "../assets/brand/transparent_background_brand.png";

const Sidebar = () => {
   return (
      <div className="sidebar">
         <div className="logo">
            <img src={Logo} alt="consult a doctor" />
         </div>

         <div className="separator"></div>
         <div className="nav-Links">
            <NavItem path="/admin/specializations" />
            <NavItem path="/admin/doctor_requests" className="doctor_req_link" content="Doctor account requests" icon={<AccountRequestIcon />} />
         </div>
      </div>
   );
};

export default Sidebar;
