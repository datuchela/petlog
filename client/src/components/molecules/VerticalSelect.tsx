import Label from "../atoms/Label";
import Select, { SelectProps } from "../atoms/Select";

interface VerticalSelectProps extends SelectProps {
  label: string;
}

const VerticalSelect: React.FC<VerticalSelectProps> = (props) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{props.label}</Label>
      <Select className="w-[272px] h-12" {...props}>
        {props.children}
      </Select>
    </div>
  );
};

export default VerticalSelect;
