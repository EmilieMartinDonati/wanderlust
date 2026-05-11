import React from "react";

/** for use with react-use-form (with control too) */

interface CostumInputProps {
  inputRef?: React.Ref<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  name?: string
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  type?: string
}

const CostumInput = ({ inputRef, onChange, name, onBlur, type }: CostumInputProps) => {
  return <input ref={inputRef} onChange={onChange} onBlur={onBlur} name={name} type={type} />
}

export default CostumInput;
