import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Transition } from "@headlessui/react"
// import { CheckCircleIcon, XIcon } from "@heroicons/react/solid"
// import { ExclamationCircleIcon } from "@heroicons/react/outline"
import { closeAlert } from "../redux/actions/alert"

// import { closeAlert } from "../redux/actions/alert"

const Alert = ({ alerts, closeAlert }) => {
  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-40 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          {alerts.map(alert => (
            <Transition
              key={alert.id}
              show={alerts.length > 0}
              as={Fragment}
              enter="transform ease-out duration-300 transition"
              enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
              enterTo="translate-y-0 opacity-100 sm:translate-x-0"
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div
                className={`w-full max-w-sm bg-${alert.color}-50 pointer-events-auto overflow-hidden rounded-lg
                                 shadow-lg`}
              >
                <div className="p-4">
                  <div className="flex items-start">
                    {/* <div className="mt-0.5 flex-shrink-0">
                      {alert.color === "green" ? (
                        <CheckCircleIcon
                          className={`h-5 w-5 text-${alert.color}-400`}
                          aria-hidden="true"
                        />
                      ) : (
                        <ExclamationCircleIcon
                          className={`h-5 w-5 text-${alert.color}-400`}
                          aria-hidden="true"
                        />
                      )}
                    </div> */}
                    <div className="ml-3 w-0 flex-1">
                      <p className={`font-lao text-${alert.color}-900`}>
                        {alert.title}!
                      </p>
                      <p
                        className={`mt-1 text-sm text-${alert.color}-500 font-lao`}
                      >
                        {alert.msg}
                      </p>
                    </div>
                    <div className="ml-4 flex flex-shrink-0">
                      <button
                        className="inline-flex rounded-md bg-transparent text-gray-400
                                                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                                                 hover:text-gray-500"
                        onClick={() => {
                          closeAlert(alert.id)
                        }}
                      >
                        <span className="sr-only">Close</span>
                        {/* <XIcon className="h-5 w-5" aria-hidden="true" /> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition>
          ))}
        </div>
      </div>
    </>
  )
}

Alert.propTypes = {
  closeAlert: PropTypes.func.isRequired,
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert,
})

export default connect(mapStateToProps, { closeAlert })(Alert)
