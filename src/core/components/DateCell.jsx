import React from "react";
import DateFormat from "./DateFormat";

function DateCell({ value }) {
  return (
    <div className="text-gray-500">
      <DateFormat date={value} />
    </div>
  );
}

export default DateCell;
