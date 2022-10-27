const Button = ({ children, className, ...props }) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center py-4 bg-[#333333] hover:bg-[#262626] text-white font-medium w-full rounded-lg ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
