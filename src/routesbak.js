// @material-ui/icons
import DvrIcon from '@material-ui/icons/Dvr';
import ReceptionRegister from "views/Reception/ReceptionRegister.js";
import ReceptionDetail from "views/Reception/ReceptionDetail.js";
import PartRegister from "views/BasicManagement/PartRegister.js";
import ItemRegister from "views/BasicManagement/ItemRegister.js";
import DentalRegister from "views/BasicManagement/DentalRegister.js";
import PriceRegister from "views/BasicManagement/PriceRegister.js";
import UserRegister from "views/Users/UserRegister.js";

const dashboardRoutes = [
  {
    path: "/receptionRegister",
    name: "접수 리스트",
    icon: DvrIcon,
    component: ReceptionRegister,
    layout: "/dental"
  },
  {
    path: "/receptionDetail",
    name: "접수상세 리스트",
    icon: DvrIcon,
    component: ReceptionDetail,
    layout: "/dental"
  },
  {
    path: "/partRegister",
    name: "파트 등록",
    icon: DvrIcon,
    component: PartRegister,
    layout: "/dental"
  },
  {
    path: "/itemRegister",
    name: "장치 등록",
    icon: DvrIcon,
    component: ItemRegister,
    layout: "/dental"
  },
  {
    path: "/dentalRegister",
    name: "치과 등록",
    icon: DvrIcon,
    component: DentalRegister,
    layout: "/dental"
  },
  {
    path: "/priceRegister",
    name: "단가 등록",
    icon: DvrIcon,
    component: PriceRegister,
    layout: "/dental"
  },
  {
    path: "/userRegister",
    name: "유저 회원가입",
    icon: DvrIcon,
    component: UserRegister,
    layout: "/dental"
  }
];

export default dashboardRoutes;