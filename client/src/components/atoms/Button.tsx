import React from "react";

const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (
  props
) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center px-4 py-2 h-12 rounded-lg bg-[#3F3F3F] hover:bg-[#2b2b2b] disabled:bg-[#a7a7a7] text-lg text-gray-100 font-semibold`}
    >
      {props.children}
    </button>
  );
};

export default Button;
