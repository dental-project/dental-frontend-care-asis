/** 
  All of the routes for the Soft UI Dashboard React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/
import React from "react";
// Soft UI Dashboard React layouts
import DvrIcon from '@material-ui/icons/Dvr';
import ReceptionRegister from "views/Reception/ReceptionRegister.js";
import ReceptionDetail from "views/Reception/ReceptionDetail.js";
import PartRegister from "views/BasicManagement/PartRegister.js";
import ItemRegister from "views/BasicManagement/ItemRegister.js";
import DentalRegister from "views/BasicManagement/DentalRegister.js";
import PriceRegister from "views/BasicManagement/PriceRegister.js";
import UserRegister from "views/Users/UserRegister.js";



import ListItemIcon from '@material-ui/core/ListItemIcon';
import Collapse from '@material-ui/core/Collapse';
import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import StarsIcon from '@material-ui/icons/Stars';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
//  import SignUp from "layouts/authentication/sign-up";

const routes = [
  {
    name: "접수 리스트",
    key: "receptionRegister",
    icon: <AssignmentOutlinedIcon />,
    component: ReceptionRegister,
    route: "/receptionRegister",
    layout: "/dental",
  },
  {
    name: "유저 회원가입",
    key: "partRegister",
    icon: <AssignmentOutlinedIcon />,
    component: PartRegister,
    route: "/partRegister",
    layout: "/dental",
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
