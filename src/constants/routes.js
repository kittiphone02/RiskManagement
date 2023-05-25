import {

  InboxIcon,

} from "@heroicons/react/outline";

import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ROOT,
  ROLE_ADMIN,
} from "./config";

export const movementRoute = [
  {
    name: "ລາຍການຄວາມສ່ຽງ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/register",
    icon: InboxIcon,
    permission: [ROLE_APPROVE, ROLE_VERIFY, ROLE_USER],
  },


];

