// @material-ui/icons
import DvrIcon from '@material-ui/icons/Dvr';
import DashboardPage from "views/Dashboard/Dashboard.js";
import DashboardDetailPage from "views/Dashboard/DashboardDetail.js";
import PartRegister from "views/BasicManagement/PartRegister.js";
import ItemRegister from "views/BasicManagement/ItemRegister.js";
import DentalRegister from "views/BasicManagement/DentalRegister.js";
import UserRegister from "views/Users/UserRegister.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "접수 리스트",
    icon: DvrIcon,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/dashboardDetail",
    name: "접수상세 리스트",
    icon: DvrIcon,
    component: DashboardDetailPage,
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
    name: "장치 등록",
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
];

export default dashboardRoutes;