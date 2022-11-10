import Label from "../atoms/Label";
import Select from "../atoms/Select";

const VerticalSelect = ({ children, label, name, ...rest }) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Select name={name} styling="w-[272px] h-12" {...rest}>
        {children}
      </Select>
    </div>
  );
};

export default VerticalSelect;
