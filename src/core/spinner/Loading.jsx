import React from "react";

function Loading() {
  const circleCommonClasses = "h-5 w-5 bg-purple-600 rounded-full";
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity">
          <span
            className="inline-block align-middle h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <div
            className="inline-block align-middle rounded-lg px-10 py-6 text-left
            transform transition-all sm:my-8 sm:p-6"
          >
            <div className="flex justify-center px-4 py-2">
              <div className={`${circleCommonClasses} mr-2 animate-bounce`} />
              <div
                className={`${circleCommonClasses} mr-2 animate-bounce200`}
              />
              <div className={`${circleCommonClasses} animate-bounce400`} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
