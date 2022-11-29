export type SelectProps = {
  name: string;
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
  value: string | number | readonly string[] | undefined;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
};

const Select: React.FC<SelectProps> = ({
  name,
  placeholder,
  className,
  children,
  value,
  handleChange,
}) => {
  return (
    <select
      name={name}
      placeholder={placeholder}
      className={`outline-none flex items-center px-2 min-h-[40px] w-full border border-[#727272] rounded-lg overflow-hidden cursor-pointer ${className}`}
      value={value}
      onChange={handleChange}
    >
      {children}
    </select>
  );
};

export default Select;
