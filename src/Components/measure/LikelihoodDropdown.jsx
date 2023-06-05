import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Listbox, Transition } from "@headlessui/react";
import { HiCheck, HiOutlineChevronUpDown } from "react-icons/hi2";
import classNames from "../../utils/classname";
import { getRiskLikelihoods } from  "../../features/likelihoods/likelihoodsSlice";
import { Fragment } from "react";

function LikelihoodDropdown({ value, setValue }) {
  const dispatch = useDispatch();
  
  const { likelihoods, loading } = useSelector((state) => state.likelihoods);

  useEffect(() => {
    dispatch(getRiskLikelihoods());
  }, [dispatch]);


  return (
    <Listbox value={value} onChange={(val) => setValue(val)}>
      <div className="relative mt-1">
        <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
          <div className="flex items-center">
            <span className="ml-3 block truncate font-lao">
              {value ? value.value : "ເລືອກຄວາມເປັນໄປໄດ້"}
            </span>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <HiOutlineChevronUpDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </Listbox.Button>

        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
            {/* No List */}
            {!likelihoods.length && (
              <h3 className="py-3 text-center font-lao">ຍັງບໍ່ມີຂໍ້ມູນ!</h3>
            )}
            {likelihoods?.map((item, index) => (
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
                      {item.value}
                    </p>
                    {selected ? (
                      <p
                        className={classNames(
                          active ? "text-white" : "text-indigo-600",
                          "absolute inset-y-0 right-0 flex items-center pr-4"
                        )}
                      >
                        <HiCheck className="h-5 w-5" aria-hidden="true" />
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

// LikelihoodDropdown.propTypes = {
//   value: PropTypes.object,
//   setValue: PropTypes.func.isRequired,
// };

export default LikelihoodDropdown;
