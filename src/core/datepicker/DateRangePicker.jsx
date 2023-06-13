import React, { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
// import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import { DateRange } from "react-date-range";
import { DateFormat } from "../components";
import classNames from "../../utils/classname"; // theme css file

import "react-date-range/dist/styles.css"; // authentication style file
// import "../../assets/styles/date_range.scss";

const rangeColors = ["#6366f1", "#4f46e5", "#4338ca"];

export default function DateRangePicker({ dateRange, setDateRange }) {
  const { startDate, endDate } = dateRange;

  const handleChange = ({ range1 }) => {
    setDateRange(range1);
  };

  return (
    <Popover className="relative inline-block">
      {({ open }) => (
        <Fragment>
          <Popover.Button
            className={classNames(
              open ? "" : "text-opacity-90",
              "date-range-picker w-[14rem] group"
            )}
          >
            <p className="flex gap-x-2 text-sm text-gray-500">
              {startDate ? <DateFormat date={startDate} /> : "Start Date"}
              <span>-</span>
              {endDate ? <DateFormat date={endDate} /> : "End Date"}
            </p>
            {open ? (
              // <ChevronUpIcon
              //   className="ml-2 h-5 w-5 text-indigo-600 transition duration-150 ease-in-out group-hover:text-opacity-80"
              //   aria-hidden="true"
              // />
              1
            ) : (
              2
              // <ChevronDownIcon
              //   className="ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80"
              //   aria-hidden="true"
              // />
            )}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="date-container">
              <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <DateRange
                  dateDisplayFormat="dd/MM/yyyy"
                  showDateDisplay={false}
                  rangeColors={rangeColors}
                  onChange={handleChange}
                  maxDate={new Date()}
                  ranges={[dateRange]}
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  );
}
