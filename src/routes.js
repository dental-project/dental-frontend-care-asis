/*!

=========================================================
* Material Dashboard React - v1.9.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import DvrIcon from '@material-ui/icons/Dvr';
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";

// core components/views for Admin layout

import DashboardPage from "views/Dashboard/Dashboard.js";
import PartRegister from "views/BasicManagement/PartRegister.js";
import ItemRegister from "views/BasicManagement/ItemRegister.js";
import DentalRegister from "views/BasicManagement/DentalRegister.js";
import UserRegister from "views/Users/UserRegister.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "기공물대장",
    icon: DvrIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/partRegister",
    name: "파트 등록",
    icon: DvrIcon,
    component: PartRegister,
    layout: "/admin"
  },
  {
    path: "/itemRegister",
    name: "종목 등록",
    icon: DvrIcon,
    component: ItemRegister,
    layout: "/admin"
  },
  {
    path: "/dentalRegister",
    name: "치과 등록",
    icon: DvrIcon,
    component: DentalRegister,
    layout: "/admin"
  },

  {
    path: "/userRegister",
    name: "유저 회원가입",
    icon: DvrIcon,
    component: UserRegister,
    layout: "/admin"
  }
  // {
  //   path: "/table",
  //   name: "Table List",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: LibraryBooks,
  //   component: Typography,
  //   layout: "/admin"
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: Notifications,
  //   component: NotificationsPage,
  //   layout: "/admin"
  // },
  // {
  //   path: "/upgrade-to-pro",
  //   name: "Upgrade To PRO",
  //   icon: Unarchive,
  //   component: UpgradeToPro,
  //   layout: "/admin"
  // }
];

export default dashboardRoutes;
