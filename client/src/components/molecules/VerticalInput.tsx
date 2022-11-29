import React from "react";
import Label from "../atoms/Label";
import TextInput, { TextInputProps } from "../atoms/TextInput";

interface VerticalInputProps extends TextInputProps {
  label: string;
}

const VerticalInput: React.FC<VerticalInputProps> = (props) => {
  const { label, ...textInputProps } = props;
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={props.name}>{props.label}</Label>
      <TextInput wrapperStyle="w-[272px] h-12" {...textInputProps} />
    </div>
  );
};

export default VerticalInput;
