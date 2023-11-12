import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";

import FormFieldWrapper from "./FormFieldWrapper";
import StarFormField from "../traveller/ratingsOpinions/StarFormField";

import SwitchItem from "./forms/SwitchItem";

import {
  inputStyle,
  labelStyle,
  inputContainerStyle,
} from "./stylesheets/formfield.css";

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
  ref = null,
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
  ...rest
}) => {
  /** for use with formik */

  useEffect(() => {
    if (min || (max && type === "number")) {
      const elem = document.querySelector(`input[name="${name}"]`);
      if (elem) {
        min && elem.setAttribute("min", min);
        max && elem.setAttribute("max", max);
      }
    }
  }, [min, max]);

  let usedComponent;

  switch (type) {
    case "media":
      usedComponent = (
          <input
            type="file"
            accept="image/*, video/*, audio/*"
            className={inputClassName || inputStyle}
            onChange={onChange}
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
            onClick={onChange}
            className={inputClassName || inputStyle}
          />
      );
      break;
    case 'customCheckbox':
      usedComponent = (
        <SwitchItem
          type="checkbox"
          value={value}
          onComplete={onChange}
          name={name}
        />
    );
    break;
    case "select":
      const {multiple = false} = rest;
      usedComponent = (
          <select name={name} id={name} onChange={onChange}>
            {options &&
              options.map(({ id, label }) => (
                <option value={id}>{label}</option>
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
            onChange={onChange}
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
