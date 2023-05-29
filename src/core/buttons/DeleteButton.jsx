import React from "react";

import { BiTrash } from "react-icons/bi";
function DeleteButton({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-1 border border-transparent rounded-full shadow-sm text-white
             bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      onClick={onClick}
    >
      <BiTrash className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default DeleteButton;
