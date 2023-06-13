// import { BadgeCheckIcon, StatusOnlineIcon } from "@heroicons/react/outline";
import { RISK_OPEN, ROLE_USER } from "../../constants/config";
import classNames from "../../utils/classname";

function Banner({ onClick, status, role }) {
  return (
    <div
      className={classNames(
        status === RISK_OPEN ? "bg-red-500" : "bg-indigo-600",
        " max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8"
      )}
    >
      <div className="flex items-center justify-between flex-wrap">
        <div className="w-0 flex-1 flex items-center">
          <p
            className={classNames(
              status === RISK_OPEN
                ? "bg-white text-indigo-600"
                : "bg-indigo-800 text-white",
              "flex p-2 rounded-lg shadow-sm"
            )}
          >
            {/* <StatusOnlineIcon className="h-6 w-6" aria-hidden="true" /> */}
          </p>
          <p className="ml-3 font-medium text-white truncate">
            <span className="hidden md:inline underline mr-1">ສະຖານະພາບ:</span>
            <span className="hidden ml-2 md:inline">{status}</span>
            <span className="hidden ml-3 md:inline">
              ({status === RISK_OPEN ? "ຍັງມີຄວາມສ່ຽງ" : "ບໍ່ມີຄວາມສ່ຽງແລ້ວ"})
            </span>
          </p>
        </div>
        {role === ROLE_USER && status === RISK_OPEN && (
          <button type="button" className="btn-white" onClick={onClick}>
            {/* <BadgeCheckIcon className="w-6" /> */}
            <span>CLOSE</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Banner;
