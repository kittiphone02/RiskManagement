/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { AdjustmentsIcon } from "@heroicons/react/outline";
import classNames from "../../utils/classname";
import { dataTypes, dateTypes } from "../../constants/filterOption";

function FilterDropdown({ dateType, dataType, setDateType, setDataType }) {
  return (
    <Menu as="div" className="relative inline-block text-left font-lao z-10">
      <div>
        <Menu.Button
          className="rounded-md shadow-sm p-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          style={{ height: "2.4rem" }}
        >
          <AdjustmentsIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="flex flex-col">
            <label className="p-2 text-center text-base font-semibold text-indigo-700">
              ຕັ້ງຄ່າການກອງຂໍ້ມູນ
            </label>

            <div className="px-4 py-2 border-t">
              <label className="text-base font-medium text-indigo-900">
                ການກໍານົດເວລາ
              </label>
              <fieldset className="mt-1.5">
                <div className="space-y-1">
                  {dateTypes.map((item) => (
                    <label
                      htmlFor={item.value}
                      key={item.value}
                      className={classNames(
                        item.value === dateType?.value ? "bg-indigo-100" : "",
                        "flex items-center px-2 py-1.5 rounded-lg hover:bg-indigo-50 cursor-pointer group"
                      )}
                    >
                      <input
                        id={item.value}
                        name="date"
                        type="radio"
                        defaultChecked={item.value === dateType?.value}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        onChange={() => setDateType(item)}
                      />
                      <p
                        className={classNames(
                          item.value === dateType?.value
                            ? "text-gray-700"
                            : "text-gray-500",
                          "ml-3 block text-sm font-medium group-hover:text-gray-700"
                        )}
                      >
                        {item.name}
                      </p>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>

            <div className="px-4 py-2 mb-2 border-t">
              <label className="text-base font-medium text-indigo-900">
                ການສະແດງຂໍ້ມູນ
              </label>
              <fieldset className="mt-2">
                <div className="space-y-1">
                  {dataTypes.map((item) => (
                    <label
                      htmlFor={item.value}
                      key={item.value}
                      className={classNames(
                        item.value === dataType?.value ? "bg-indigo-100" : "",
                        "flex items-center px-2 py-1.5 rounded-lg hover:bg-indigo-50 cursor-pointer group"
                      )}
                    >
                      <input
                        id={item.value}
                        name="data"
                        type="radio"
                        defaultChecked={item.value === dataType?.value}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                        onChange={() => setDataType(item)}
                      />
                      <p
                        className={classNames(
                          item.value === dataType?.value
                            ? "text-gray-700"
                            : "text-gray-500",
                          "ml-3 block text-sm font-medium group-hover:text-gray-700"
                        )}
                      >
                        {item.name}
                      </p>
                    </label>
                  ))}
                </div>
              </fieldset>
            </div>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default FilterDropdown;
