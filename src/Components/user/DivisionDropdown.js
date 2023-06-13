import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import classNames from "../../utils/classname";
import { getDivisionsByBranch } from "../../redux/actions/division";

function DivisionDropdown({
  getDivisionsByBranch,
  division: { divisions },
  branch,
  value,
  setValue,
  disabled,
  custumClass,
}) {
  useEffect(() => {
    getDivisionsByBranch(branch?._id);
  }, [getDivisionsByBranch, branch]);

  return (
    <Listbox
      value={value}
      onChange={(val) => setValue(val)}
      disabled={disabled}
    >
      <div className="relative">
        <Listbox.Button
          className={classNames(
            disabled ? "bg-gray-100" : "bg-white",
            "dropdown",
            custumClass
          )}
        >
          <div className="flex items-center">
            <span className="ml-3 block truncate font-lao">
              {!disabled && value ? value.name : "ເລືອກພະແນກ"}
            </span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <SelectorIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options
            className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base
                         ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
          >
            {/* No List */}
            {!divisions.length && (
              <h3 className="py-3 text-center font-lao">ຍັງບໍ່ມີຂໍ້ມູນ!</h3>
            )}
            {divisions?.map((item, index) => (
              <Listbox.Option
                key={index}
                className={({ active }) =>
                  classNames(
                    active ? "text-white bg-indigo-600" : "text-gray-900",
                    "cursor-default select-none relative py-2 pl-3 pr-9"
                  )
                }
                value={item}
              >
                {({ selected, active }) => (
                  <>
                    <p
                      className={classNames(
                        selected ? "font-semibold" : "font-normal",
                        "ml-3 block truncate font-lao"
                      )}
                    >
                      {item.name}
                    </p>
                    {selected || item._id === value?._id ? (
                      <p
                        className={classNames(
                          active ? "text-white" : "text-indigo-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </p>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}

DivisionDropdown.propTypes = {
  getDivisionsByBranch: PropTypes.func.isRequired,
  division: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  division: state.division,
});

export default connect(mapStateToProps, { getDivisionsByBranch })(
  DivisionDropdown
);
