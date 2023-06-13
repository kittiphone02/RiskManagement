import React from "react";
import { HiOutlineKey } from "react-icons/hi2";
function ResetPasswordButton({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white
             bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
      onClick={onClick}
    >
      <HiOutlineKey className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default ResetPasswordButton;
