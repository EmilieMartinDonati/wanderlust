import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import FormFieldWrapper from "./FormFieldWrapper";
import StarFormField from "../traveller/ratingsOpinions/StarFormField";

import SwitchItem from "./forms/SwitchItem";

import {
  inputStyle,
  labelStyle,
  inputContainerStyle,
} from "./stylesheets/formfield.css";

type SelectOption = { id: string | number; label: string }

type FieldType = 'media' | 'stars' | 'checkbox' | 'customCheckbox' | 'select' | 'number' | 'text' | 'textArea'

interface WrappedFormFieldProps {
  inputClassName?: string
  value?: string | number
  type?: FieldType
  name?: string
  label?: string
  id?: string
  options?: SelectOption[]
  min?: number
  max?: number
  labelEnabled?: boolean
  labelClassName?: string
  defaultValue?: string | number | null
  defaultOption?: string | null
  placeholder?: string | null
  icon?: React.ReactNode | null
  autoComplete?: boolean
  readOnly?: boolean
  field?: React.InputHTMLAttributes<HTMLInputElement>
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  onBlur?: React.FocusEventHandler<HTMLInputElement>
  errorMessage?: string
  multiple?: boolean
}

const WrappedFormField = ({
  inputClassName,
  value,
  type,
  name,
  label,
  id,
  options = [],
  min,
  max,
  labelEnabled = true,
  labelClassName = "",
  defaultValue = null,
  defaultOption = null,
  placeholder = null,
  icon = null,
  autoComplete = true,
  readOnly = false,
  field = {},
  onChange = () => {},
  onBlur,
  errorMessage,
  multiple = false,
  ...rest
}: WrappedFormFieldProps) => {
  /** for use with formik */

  useEffect(() => {
    if (min || (max && type === "number")) {
      const elem = document.querySelector(`input[name="${name}"]`);
      if (elem) {
        min && elem.setAttribute("min", String(min));
        max && elem.setAttribute("max", String(max));
      }
    }
  }, [min, max]);

  let usedComponent: React.ReactNode;

  switch (type) {
    case "media":
      usedComponent = (
          <input
            type="file"
            accept="image/*, video/*, audio/*"
            className={inputClassName || inputStyle}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            name={name}
          />
      );
      break;
    case "stars":
      usedComponent = (
          <StarFormField
            name={name}
            value={value}
            mainClassName={inputClassName || inputStyle}
            onChange={onChange}
            onBlur={onBlur}
            defaultValue={defaultValue}
          />
      );
      break;
    case "checkbox":
      usedComponent = (
          <input
            type="checkbox"
            value={value}
            name={name}
            onClick={onChange as unknown as React.MouseEventHandler<HTMLInputElement>}
            className={inputClassName || inputStyle}
          />
      );
      break;
    case 'customCheckbox':
      usedComponent = (
        <SwitchItem
          type="checkbox"
          value={!!value}
          onComplete={() => onChange && (onChange as () => void)()}
          name={name}
        />
    );
    break;
    case "select":
      usedComponent = (
          <select name={name} id={name} onChange={onChange as React.ChangeEventHandler<HTMLSelectElement>}>
            {options &&
              options.map(({ id, label }) => (
                <option key={id} value={id}>{label}</option>
              ))}
          </select>
      );
      break;
    case "number":
      usedComponent = (
          <input
            type="number"
            className={inputClassName || inputStyle}
            name={name}
            value={value}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
          />
      );
      break;
    case "text":
      usedComponent = (
          <input
            type="text"
            className={inputClassName || inputStyle}
            value={value}
            {...field}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            name={name}
          />
      );
      break;
    case "textArea":
      usedComponent = (
          <textarea
            className={inputClassName || inputStyle}
            value={value}
            name={name}
            onChange={onChange as React.ChangeEventHandler<HTMLTextAreaElement>}
            rows={16}
            cols={32}
          />
      );
      break;
    default:
      usedComponent = (
          <input
            type="text"
            className={inputClassName || inputStyle}
            name={name}
            onChange={onChange as React.ChangeEventHandler<HTMLInputElement>}
            value={value}/>
      );
      break;
  }

  return (
    <div className={inputContainerStyle}>
      {labelEnabled && label && (
        <div className={labelClassName || labelStyle}>{label}</div>
      )}
      {usedComponent}
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default WrappedFormField;
