import React from "react";

const StatusBar = ({ message, color }) => {
  return (
    <div
      className={`${
        color ? `bg-[${color}]` : "bg-pink-200"
      } w-full h-4 text-sm z-30`}
    >
      {message}
    </div>
  );
};

export default StatusBar;
