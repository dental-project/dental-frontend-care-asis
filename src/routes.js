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
import CircleIcon from '@mui/icons-material/Circle';
//  import SignUp from "layouts/authentication/sign-up";

const routes = [
  {
    name: "접수 리스트",
    key: "receptionRegister",
    icon: <AssignmentOutlinedIcon />,
    component: ReceptionRegister,
    path: "/receptionRegister",
    layout: "/dental",
  },
  {
    name: "기초 등록",
    key: "standardRegister",
    icon: <ExpandMore />,
    layout: "/dental",
    subItem: [
      {
        name: "접수상세 리스트",
        key: "receptionDetail",
        icon: <CircleIcon />,
        component: ReceptionDetail,
        path: "/receptionRegister",
        layout: "/dental",        
      },
      {
        name: "파트 등록",
        key: "partRegister",
        icon: <CircleIcon />,
        component: PartRegister,
        path: "/partRegister",
        layout: "/dental",
      },
    ],
  },
  {
    name: "유저 회원가입",
    key: "partRegister",
    icon: <AssignmentOutlinedIcon />,
    component: PartRegister,
    path: "/partRegister",
    layout: "/dental",
  },
];

export default routes;
