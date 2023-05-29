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

 
];

export default privateRoutes;
