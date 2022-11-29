import React from "react";

const Heading: React.FC<React.HtmlHTMLAttributes<HTMLHeadingElement>> = (
  props
) => {
  return <h1 className="font-semibold text-4xl">{props.children}</h1>;
};

export default Heading;
