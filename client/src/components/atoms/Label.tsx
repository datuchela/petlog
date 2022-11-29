import React from "react";

const Label: React.FC<React.LabelHTMLAttributes<HTMLLabelElement>> = (
  props
) => {
  return (
    <label
      className={`text-[#212121] ${props.className}`}
      htmlFor={props.htmlFor}
    >
      {props.children}
    </label>
  );
};

export default Label;
