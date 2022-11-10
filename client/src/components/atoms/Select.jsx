const Select = ({ children, styling, ...rest }) => {
  return (
    <select
      className={`outline-none flex items-center px-2 min-h-[40px] w-full border border-[#727272] rounded-lg overflow-hidden cursor-pointer ${styling}`}
      {...rest}
    >
      {children}
    </select>
  );
};

export default Select;
