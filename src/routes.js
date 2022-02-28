import React from "react";
// Soft UI Dashboard React layouts
import DvrIcon from "@material-ui/icons/Dvr";
import ReceptionRegister from "views/Reception/ReceptionRegister.js";
import ReceptionDetail from "views/Reception/ReceptionDetail.js";
import PartRegister from "views/BasicManagement/PartRegister.js";
import ItemRegister from "views/BasicManagement/ItemRegister.js";
import DentalRegister from "views/BasicManagement/DentalRegister.js";
import PriceRegister from "views/BasicManagement/PriceRegister.js";
import UserRegister from "views/Users/UserRegister.js";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import Collapse from "@material-ui/core/Collapse";
import AssignmentOutlinedIcon from "@material-ui/icons/AssignmentOutlined";
import StarsIcon from "@material-ui/icons/Stars";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
//  import SignUp from "layouts/authentication/sign-up";

const routes = [
  {
    name: "접수 리스트",
    key: "receptionRegister",
    icon: <AssignmentOutlinedIcon />,
    component: ReceptionRegister,
    path: "/receptionRegister",
    layout: "/dental",
    noCollapse: true,
    subItem: false,
  },
  {
    name: "유저 회원가입",
    key: "partRegister",
    icon: <AssignmentOutlinedIcon />,
    component: PartRegister,
    path: "/partRegister",
    layout: "/dental",
    noCollapse: false,
    subItem: true,
  },
  // {
  //   path: "/partRegister",
  //   name: "파트 등록",
  //   icon: DvrIcon,
  //   component: PartRegister,
  //   layout: "/dental",
  // },

  // {
  //   path: "/receptionRegister",
  //   name: "접수 리스트",
  //   icon: DvrIcon,
  //   component: ReceptionRegister,
  //   layout: "/dental",
  // },

  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   route: "/tables",
  //   icon: <Office size="12px" />,
  //   component: Tables,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   route: "/billing",
  //   icon: <CreditCard size="12px" />,
  //   component: Billing,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Virtual Reality",
  //   key: "virtual-reality",
  //   route: "/virtual-reality",
  //   icon: <Cube size="12px" />,
  //   component: VirtualReality,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "RTL",
  //   key: "rtl",
  //   route: "/rtl",
  //   icon: <Settings size="12px" />,
  //   component: RTL,
  //   noCollapse: true,
  // },
  // { type: "title", title: "Account Pages", key: "account-pages" },
  // {
  //   type: "collapse",
  //   name: "Profile",
  //   key: "profile",
  //   route: "/profile",
  //   icon: <CustomerSupport size="12px" />,
  //   component: Profile,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign In",
  //   key: "sign-in",
  //   route: "/authentication/sign-in",
  //   icon: <Document size="12px" />,
  //   component: SignIn,
  //   noCollapse: true,
  // },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   route: "/authentication/sign-up",
  //   icon: <SpaceShip size="12px" />,
  //   component: SignUp,
  //   noCollapse: true,
  // },
];

export default routes;
