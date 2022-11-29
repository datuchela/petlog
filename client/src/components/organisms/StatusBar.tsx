import React from "react";

type Props = {
  color: String;
  message: String;
};

const StatusBar: React.FC<Props> = (props) => {
  return (
    <div
      className={`${
        props.color ? `bg-[${props.color}]` : "bg-pink-200"
      } w-full h-4 text-sm z-30`}
    >
      {props.message}
    </div>
  );
};

export default StatusBar;
