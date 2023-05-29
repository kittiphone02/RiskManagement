import React from "react";

export default function Loader(){
  return (
    <div className="mt-4 flex justify-center">
      <span className="circle animate-loader" />
      <span className="circle animation-delay-200 animate-loader" />
      <span className="circle animation-delay-400 animate-loader" />
    </div>
  );
};


