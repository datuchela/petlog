import { Link as RouterLink } from "react-router-dom";

const Link = ({ children, to, className }) => {
  return (
    <RouterLink
      className={`text-gray-600 hover:text-gray-800 font-medium ${className}`}
      to={to}
    >
      {children}
    </RouterLink>
  );
};

export default Link;
