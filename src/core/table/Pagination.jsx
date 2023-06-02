import React from "react";
// import {
//   ArrowNarrowLeftIcon,
//   ArrowNarrowRightIcon,
// } from "@heroicons/react/solid";

function Pagination({ pagination, onPrev, onNext, onPageClick }) {
  return (
    <div className="px-4 pb-4 flex justify-between items-center">
      <div className="-mt-px flex">
        <button
          type="button"
          className={pagination.prev ? "page-btn" : "page-btn-disabled"}
          disabled={!pagination.prev}
          onClick={onPrev}
        >
          {/* <ArrowNarrowLeftIcon className="mr-3 h-5 w-5 text-gray-400" /> */}
          ກັບຄືນ
        </button>
      </div>

      <div className="hidden -mt-px sm:flex">
        {pagination.pages.map((page) => (
          <button
            key={page}
            className={
              pagination.current.page === page
                ? "page-number-active"
                : "page-number"
            }
            onClick={() => onPageClick(page)}
          >
            {page}
          </button>
        ))}
      </div>

      <div className="-mt-px flex justify-end">
        <button
          type="button"
          className={pagination.next ? "page-btn" : "page-btn-disabled"}
          disabled={!pagination.next}
          onClick={onNext}
        >
          ຖັດໄປ
          {/* <ArrowNarrowRightIcon className="ml-3 h-5 w-5 text-gray-400" /> */}
        </button>
      </div>
    </div>
  );
}

export default Pagination;
