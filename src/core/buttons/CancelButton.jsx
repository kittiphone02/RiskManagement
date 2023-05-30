import React from "react";


function CancelButton({ onClick }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-1 border border-transparent rounded-md border border-transparent shadow-sm text-white
             bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      onClick={onClick}
    >
     ຍົກເລີກ
    </button>
  );
}

export default CancelButton;
