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

 
];

export default privateRoutes;
