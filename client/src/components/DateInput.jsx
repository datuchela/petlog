import { useRef } from "react";

const DateInput = ({
  label,
  emoji,
  name,
  onChange,
  value,
  required,
  min,
  max,
}) => {
  const dateRef = useRef();

  return (
    <div className="flex flex-col gap-3">
      <label className="text-base font-normal text-gray-800" htmlFor={name}>
        {label}
      </label>
      <div
        className={`flex items-center gap-2 border border-gray-400 rounded-md px-2 overflow-hidden hover:border-gray-900 min-w-[272px] max-w-[272px] h-12`}
      >
        <p className="select-none">{emoji}</p>
        <div className="flex items-center justify-start gap-0 w-full h-full">
          <input
            ref={dateRef}
            className={`flex w-full h-full outline-none date ${
              dateRef?.current?.value ? "text-gray-800" : "text-gray-400"
            }`}
            type="date"
            name={name}
            id={name}
            placeholder="mm-dd-yyyy"
            onChange={onChange}
            value={value}
            required={required}
            min={min}
            max={max}
          />
        </div>
      </div>
    </div>
  );
};

export default DateInput;
