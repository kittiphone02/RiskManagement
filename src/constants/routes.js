
import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ROOT,
  ROLE_ADMIN,
} from "./config";

import { BsPerson } from "react-icons/bs";
import { 
  HiOutlineHome,
  HiCubeTransparent,
  HiOutlineSignal,
  HiOutlineBuildingOffice2,
  HiOutlineArrowTrendingUp,
  HiOutlineChartBar,
  HiOutlineExclamationCircle,

} from "react-icons/hi2";

export const dashbroadRoute = [
  
    {
      name: "ໜ້າຫຼັກ",
      description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
      route: "/",
      icon: HiOutlineHome,
      permission: [ROLE_ADMIN,ROLE_USER],
    },
  
];


export const movementRoute = [

  {
    name: "ຂໍ້ມູນສາຂາ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/branch",
    icon: HiOutlineBuildingOffice2,
    permission: [ROLE_ADMIN],
  },
  {
    name: "ຂໍ້ມູນຄວາມເປັນໄປໄດ້",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/likelihoods",
    icon: HiOutlineArrowTrendingUp,
    permission: [ROLE_ADMIN],
  },
  {
    name: "ຂໍ້ມູນພະເເນກ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/division",
    icon: HiCubeTransparent,
    permission: [ROLE_ADMIN],
  },
  {
    name: "ຂໍ້ມູນປະເມີນຄວາມສ່ຽງ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/Measure",
    icon: HiOutlineChartBar,
    permission: [ROLE_ADMIN],
  },

  {
    name: "ລາຍງານຄວາມສ່ຽງ",
    description: "ຈັດການຂໍ້ມູນລາຍງານຄວາມສ່ຽງທັງໝົດ.",
    route: "/Transaction",
    icon: HiOutlineSignal,
    permission: [ROLE_USER],
  },

  {
    name: "ຂໍ້ມູນຜູ້ໃຊ້",
    description: "ຈັດການຂໍ້ມູນຂໍ້ມູນຜູ້ໃຊ້ (Users)",
    route: "/users",
    icon: HiOutlineSignal,
    permission: [ROLE_ADMIN],
  },

  {
    name: "ຂໍ້ມູນຜົນກະທົບ",
    description: "ຈັດການຂໍ້ມູນຂໍ້ມູນຜູ້ໃຊ້ (Users)",
    route: "/impact",
    icon: HiOutlineExclamationCircle,
    permission: [ROLE_ADMIN],
  },
  {
    name: "ຂໍ້ມູນລະດັບຄວາມສ່ຽງ",
    description: "ຈັດການຂໍ້ມູນຂໍ້ມູນຜູ້ໃຊ້ (Users)",
    route: "/levels",
    icon: HiOutlineChartBar,
    permission: [ROLE_ADMIN],
  },
  





];

