import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, to, className }) => {
  return (
    <RouterLink
      className={`text-blue-500 hover:text-blue-400 font-medium ${className}`}
      to={to}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
