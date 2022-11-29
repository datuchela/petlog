import React, { useRef } from "react";

export type TextInputProps = {
  type: string;
  name: string;
  placeholder: string;
  wrapperStyle?: string;
  emoji: string;
  value: string | number | readonly string[] | undefined;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  inputStyle?: string;
  max?: string;
  min?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  placeholder,
  wrapperStyle,
  emoji,
  value,
  handleChange,
  inputStyle,
  max,
  min,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div
      className={`flex items-center gap-2 px-2 min-h-[40px] border border-[#727272] hover:border-[#3d3d3d] rounded-lg overflow-hidden cursor-text ${wrapperStyle}`}
      onClick={() => inputRef.current!.focus()}
    >
      {emoji && <div>{emoji}</div>}
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={handleChange}
        className={`outline-none w-full h-full text-[#212121] bg-transparent ${inputStyle}`}
        ref={inputRef}
        max={max}
        min={min}
      />
    </div>
  );
};

export default TextInput;
