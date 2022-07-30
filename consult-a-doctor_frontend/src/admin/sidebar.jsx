import React from "react";

// icons
import { ReactComponent as AccountRequestIcon } from '../assets/icons/account_request.svg';
import { ReactComponent as SpecializationsIcon } from '../assets/icons/specializations.svg';

// helper components
import NavItem from "./admin_helper_components/sidebar_nav_Item";

import Logo from "../assets/brand/transparent_background_brand.png";

const Sidebar = () => {
   return (
      <div className="sidebar">
         <div className="logo">
            <img className="sidebar_logo" src={Logo} alt="consult a doctor" />
         </div>

         <div className="separator"></div>
         <div className="nav-Links">
            <NavItem path="/admin/doctor_requests" className="doctor_req_link" content="Doctor account requests" icon={<AccountRequestIcon />} />
            <NavItem path="/admin/specializations" className="specializations_link" content="Doctor specializations" icon={<SpecializationsIcon />} />
         </div>
      </div>
   );
};

export default Sidebar;
