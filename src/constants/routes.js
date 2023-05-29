
import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ROOT,
  ROLE_ADMIN,
} from "./config";

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
    name: "Dashborad",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/",
    icon: HiOutlineHome,
    permission: [ROLE_ADMIN],
  },
  {
    name: "Branch",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/branch",
    icon: HiCubeTransparent,
    permission: [ROLE_ADMIN],
  },
  {
    name: "Likelihoods",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/likelihoods",
    icon: HiCubeTransparent,
    permission: [ROLE_ADMIN],
  },


];

