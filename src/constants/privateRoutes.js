import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ADMIN,
  ROLE_ROOT,
} from "./config";


import Test from "../Pages/test/Test";
import Branch from "../Pages/branch/branch";
import Likelihood from "../Pages/likelihoods/Likelihood";
import Division from "../Pages/division/Division"
import Measure from "../Pages/measure/Measure"
import Transaction from "../Pages/transaction/Transaction"
import TransactionDetail from "../Pages/transaction/TransactionDetail";
import User from "../Pages/user/User";
import Impact from "../Pages/impact/Impact";
import Level from "../Pages/level/level";

const privateRoutes = [
  {
    Component: Test,
    path: "/Test",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Branch,
    path: "/branch",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Likelihood,
    path: "/likelihoods",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Division,
    path: "/division",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Measure,
    path: "/measure",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Transaction,
    path: "/transaction",
    permission: [ROLE_USER],
  },
  {
    Component: Transaction,
    path: "/transaction",
    permission: [ROLE_USER],
  },
  {
    Component: TransactionDetail,
    path: "/transaction/:id",
    permission: [ROLE_USER, ROLE_VERIFY, ROLE_APPROVE],
  },
  {
    Component: User,
    path: "/users",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Impact,
    path: "/impact",
    permission: [ROLE_ADMIN],
  },
  {
    Component: Level,
    path: "/levels",
    permission: [ROLE_ADMIN],
  },

 
];

export default privateRoutes;
