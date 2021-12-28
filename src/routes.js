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
import AddToQueueIcon from '@material-ui/icons/AddToQueue';
// import Person from "@material-ui/icons/Person";
// import LibraryBooks from "@material-ui/icons/LibraryBooks";
// import Notifications from "@material-ui/icons/Notifications";
// import Unarchive from "@material-ui/icons/Unarchive";

// core components/views for Admin layout

import DashboardPage from "views/Dashboard/Dashboard.js";
import DashboardEditPage from "views/Dashboard/DashboardEdit.js";
// import UserProfile from "views/UserProfile/UserProfile.js";
// import TableList from "views/TableList/TableList.js";
// import Typography from "views/Typography/Typography.js";
// import NotificationsPage from "views/Notifications/Notifications.js";
// import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";


const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "대시보드 모니터링",
    icon: DvrIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboardEdit",
    name: "대시보드 편집",
    icon: AddToQueueIcon,
    component: DashboardEditPage,
    layout: "/admin"
  }
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin"
  // },
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
