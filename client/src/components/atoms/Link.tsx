import { Link as RouterLink, To } from "react-router-dom";

interface LinkProps extends React.HTMLAttributes<HTMLLinkElement> {
  children: React.ReactNode;
  className?: string;
  to: To;
}

const Link: React.FC<LinkProps> = (props) => {
  return (
    <RouterLink
      className={`text-blue-500 hover:text-blue-400 font-medium ${props.className}`}
      to={props.to}
    >
      {props.children}
    </RouterLink>
  );
};

export default Link;
