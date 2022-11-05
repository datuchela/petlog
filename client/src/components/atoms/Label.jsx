const Label = ({ children, htmlFor, className }) => {
  return (
    <label className={`text-[#212121] ${className}`} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

export default Label;
