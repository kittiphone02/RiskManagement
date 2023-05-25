import {
  ROLE_APPROVE,
  ROLE_CREATE,
  ROLE_VERIFY,
  ROLE_USER,
  ROLE_ADMIN,
  ROLE_ROOT,
} from "./config";


import Test from "../Pages/test/Test";

const privateRoutes = [
  {
    Component: Test,
    path: "/Test",
    permission: [ROLE_APPROVE, ROLE_CREATE, ROLE_VERIFY, ROLE_USER],
  },

 
];

export default privateRoutes;
