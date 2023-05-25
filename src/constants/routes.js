
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

export const movementRoute = [
  {
    name: "ລາຍການຄວາມສ່ຽງ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/register",
    icon: HomeIcon,
    permission: [ROLE_APPROVE, ROLE_VERIFY, ROLE_USER],
  },


];

