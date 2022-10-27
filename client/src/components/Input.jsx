import { useRef } from "react";

const Input = ({
  children,
  label,
  name,
  placeholder,
  emoji,
  onChange,
  value,
  size,
  required,
  pattern,
  type,
  error,
  className,
  ...rest
}) => {
  const inputRef = useRef();
  const wrapperRef = useRef();

  const handleClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col gap-3">
      <label
        className={`text-base font-normal ${
          error ? "text-red-600" : "text-gray-800"
        }`}
        htmlFor={name}
      >
        {label}
        {error && ` - ${error}`}
      </label>
      <div
        ref={wrapperRef}
        onClick={handleClick}
        className={`border ${
          error
            ? "border-red-600 hover:border-gray-900"
            : "border-gray-400 hover:border-gray-900"
        } border-gray-400 rounded-md px-2 overflow-hidden flex items-center min-w-[272px] max-w-[272px] h-12`}
      >
        <p className="select-none">{emoji}</p>
        <div className="flex items-center justify-start gap-0 w-full">
          <input
            className={`outline-none pl-2 py-3 w-full h-full text-base font-normal text-gray-800 ${className}`}
            size={size}
            type={type || "text"}
            name={name}
            id={name}
            placeholder={placeholder}
            ref={inputRef}
            value={value}
            onChange={onChange}
            pattern={pattern}
            required={required}
            {...rest}
          />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Input;
