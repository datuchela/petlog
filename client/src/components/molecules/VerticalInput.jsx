import Label from "../atoms/Label";
import TextInput from "../atoms/TextInput";

const VerticalInput = ({
  name,
  label,
  value,
  handleChange,
  ...textInputProps
}) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        wrapperStyle="w-[272px] h-12"
        name={name}
        value={value}
        handleChange={handleChange}
        {...textInputProps}
      />
    </div>
  );
};

export default VerticalInput;
