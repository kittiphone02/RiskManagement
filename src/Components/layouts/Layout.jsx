import { Fragment } from "react";
import Navbar from "./Navbar";


export default function Layout({ children }) {
  return (
    <Fragment>
      {/* Navbar */}
      <Navbar />
      <div className="layout bg-white">
        {/* Main Content */}
        <main>{children}</main>
        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </Fragment>
  );
}
