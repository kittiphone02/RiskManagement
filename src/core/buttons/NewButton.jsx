import React from "react";

import { BiPlus } from "react-icons/bi";
function NewButton({ onClick }) {
  return (
    <button type="button" 
    
    className=" flex items-center p-1 border border-transparent rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
    
    onClick={onClick}>
      <BiPlus className="w-6" />
      <span className="font-lao">ເພີ່ມ</span>
    </button>
  );
}

export default NewButton;
