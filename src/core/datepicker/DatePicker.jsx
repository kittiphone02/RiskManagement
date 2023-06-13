import React, { useState } from "react";
import PropTypes from "prop-types";
import "./DatePicker.css";
import { HiChevronUp, HiChevronDown } from "react-icons/hi2";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRangePicker } from "react-date-range";
import { addDays, subDays } from "date-fns";
import classNames from "../../utils/classname"; // theme css file
import { DateFormat } from "../components";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";

const DatePicker = ({ onChange }) => {
  const [state, setState] = useState([
    {
      startDate: subDays(new Date(), 7),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);

  const handleOnChange = (ranges) => {
    const { selection } = ranges;
    onChange(selection);
    setState([selection]);

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
              {/* {startDate ? <DateFormat date={startDate} /> : "Start Date"} */}
              <span>-</span>
              {/* {endDate ? <DateFormat date={endDate} /> : "End Date"} */}
            </p>
            {open ? (
              <HiChevronUp
                className="ml-2 h-5 w-5 text-indigo-600 transition duration-150 ease-in-out group-hover:text-opacity-80"
                aria-hidden="true"
              />
            ) : (
              <HiChevronDown
                className="ml-2 h-5 w-5 text-gray-400 transition duration-150 ease-in-out group-hover:text-opacity-80"
                aria-hidden="true"
              />
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
                <DateRangePicker
                  staticRanges={[]}
                  inputRanges={[]}
                  onChange={handleOnChange}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={1}
                  ranges={state}
                  direction="horizontal"
                />
              </div>
            </Popover.Panel>
          </Transition>
        </Fragment>
      )}
    </Popover>
  );
};

DatePicker.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default DatePicker;
