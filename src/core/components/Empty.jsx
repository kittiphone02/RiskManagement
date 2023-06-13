import React from "react";
// import { DatabaseIcon } from "@heroicons/react/outline";
import { HiOutlineCircleStack } from "react-icons/hi2";

const Empty = ({ text }) => {
  return (
    <div className="mt-5 flex flex-1 flex-col items-center justify-center px-4 font-lao md:mt-10">
      <p className="border-primary bg-secondary text-secondary flex h-16 w-16 items-center justify-center rounded-full border border-dashed p-12">
        <HiOutlineCircleStack className="absolute h-20 w-20 text-gray-400" />
      </p>
      <h2 className="pt-6 text-center text-2xl font-bold tracking-wide">
        ບໍ່ມີຂໍ້ມູນ
      </h2>
      <p className="text-accents-3 px-10 pt-2 pb-6 text-center">{text}</p>
    </div>
  );
};

export default Empty;
