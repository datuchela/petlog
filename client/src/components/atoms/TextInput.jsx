import { useRef } from "react";

const TextInput = ({
  emoji,
  inputStyle,
  wrapperStyle,
  value,
  handleChange,
  ...inputProps
}) => {
  const inputRef = useRef();

  return (
    <div
      className={`flex items-center gap-2 px-2 min-h-[40px] border border-[#727272] rounded-lg overflow-hidden cursor-text ${wrapperStyle}`}
      onClick={() => inputRef.current.focus()}
    >
      {emoji && <div>{emoji}</div>}
      <input
        // type={type}
        // name={name}
        value={value}
        onChange={handleChange}
        className={`outline-none w-full h-full text-[#212121] bg-transparent ${inputStyle}`}
        ref={inputRef}
        {...inputProps}
      />
    </div>
  );
};

export default TextInput;
