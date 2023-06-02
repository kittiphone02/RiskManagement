
import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ROOT,
  ROLE_ADMIN,
} from "./config";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import {
  Bars3CenterLeftIcon,
  BellIcon,
  ClockIcon,
  CogIcon,
  CreditCardIcon,
  DocumentChartBarIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { BsPerson } from "react-icons/bs";
import { 
  HiOutlineHome,
  HiCubeTransparent

} from "react-icons/hi2";



export const movementRoute = [
  {
    name: "Management",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/hosting", // Update the route to "/hosting"
    icon: HiOutlineHome,
    permission: [ROLE_ADMIN],
    menus: ["auth", "app settings", "storage", "hosting"], // Add submenus
  }
];


export const subMenusList = [
    {
      name: "Management",
      icon: RiBuilding3Line,
      menus: ["/", "branch", "likelihoods", "division"],  
      permission: [ROLE_ADMIN],
    },
    {
      name: "analytics",
      icon: TbReportAnalytics,
      menus: ["dashboard", "realtime", "events"],
      permission: [ROLE_ADMIN],
    },
  ];


