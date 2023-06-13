import { Link } from "react-router-dom";
// import {
//   BadgeCheckIcon,
//   ChatIcon,
//   ChevronRightIcon,
//   ChipIcon,
//   ShieldExclamationIcon,
//   StatusOnlineIcon,
// } from "@heroicons/react/outline";
import DateFormat from "../../core/components/DateFormat";
import classNames from "../../utils/classname";
import { RISK_OPEN, STATUS_CONFIRMED } from "../../constants/config";

function TransactionItem({ transactions }) {
  return (
    <ul className="relative z-0 divide-y divide-gray-200 border-b border-gray-200">
      {transactions.map(
        ({ _id, id, level, objective, riskStatus, status, approvedDate }) => (
          <li key={id} className="relative group hover:bg-gray-50">
            <Link to={`/transaction/${_id}`}>
              <div className="flex items-center justify-between space-x-4 py-2 px-2">
                <div className="min-w-0 space-y-3 flex items-center gap-x-3">
                  <div className="flex flex-col gap-y-2 pl-4">
                    <div className="flex items-center space-x-3">
                      {/* <StatusOnlineIcon className="w-5 h-5 text-yellow-600" /> */}
                      <span
                        className={classNames(
                          riskStatus !== RISK_OPEN
                            ? "text-indigo-600"
                            : "text-red-600",
                          "text-sm font-semibold font-lao"
                        )}
                      >
                        {status === STATUS_CONFIRMED
                          ? riskStatus
                          : "ລໍຖ້າອະນຸມັດ"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      {/* <ChipIcon className="w-5 h-5 text-indigo-700" /> */}
                      <h2 className="block text-sm font-medium font-lao text-gray-600">
                        {id}
                      </h2>
                    </div>
                    <div className="relative flex items-center space-x-2.5">
                      {/* <ChatIcon className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-500" /> */}
                      <p className="text-sm text-gray-500 group-hover:text-gray-900 font-lao">
                        {objective}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="sm:hidden">
                  {/* <ChevronRightIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  /> */}
                </div>
                <div className="hidden text-right sm:flex flex-col flex-shrink-0 gap-y-1.5 pr-4">
                  <p className="flex items-center gap-x-2 font-lao">
                    {/* <BadgeCheckIcon className="w-5 h-5 text-purple-600" /> */}

                    <DateFormat date={approvedDate} />
                  </p>
                  <p className="flex items-center gap-x-2">
                    {/* <ShieldExclamationIcon className="w-5 h-5 text-red-500" /> */}
                    <span className="text-sm font-semibold text-gray-600 font-lao">
                      {level.name}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          </li>
        )
      )}
    </ul>
  );
}

export default TransactionItem;
