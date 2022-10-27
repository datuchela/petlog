import { useRef, useEffect } from "react";

const Radio = ({ label, radioName, name, onChange, checked, required }) => {
  const radioRef = useRef();

  return (
    <div className="flex-1 h-full">
      <label
        className={`cursor-pointer w-full h-full flex items-center justify-center select-none ${
          radioRef?.current?.checked && "bg-yellow-200"
        }`}
        htmlFor={name}
      >
        {label}
      </label>
      <input
        ref={radioRef}
        className="hidden"
        type="radio"
        name={radioName}
        id={name}
        value={name}
        onChange={onChange}
        checked={checked}
        required={required}
      />
    </div>
  );
};

export default Radio;
