import React, { useState, useEffect } from "react";

/** for use with react-use-form (with control too) */

const CostumInput = (props) => {
  const { inputRef, onChange, name, onBlur, type } = props;
  return <input ref={inputRef} onChange={onChange} onBlur={onBlur} name={name} type={type} />
}

export default CostumInput;

