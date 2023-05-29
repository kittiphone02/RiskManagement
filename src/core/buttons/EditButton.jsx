import React from "react";
import { BiEditAlt } from "react-icons/bi";

function EditButton({ onClick }) {
  return (

    
    <button
      type="button"
      className="focus:outline-none inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-1 text-white shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      onClick={onClick}
    >
      <BiEditAlt className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}

export default EditButton;
