import React from "react";

const Input = ({
  id,
  labelText,
  type,
  placeholder,
  value,
  onChange,
  error = "",
}) => {
  return (
    <div>
      <label htmlFor={id} lang="en">
        {labelText}
      </label>
      <input
        name={id}
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <p className="input_message">{error}</p>
    </div>
  );
};

export default Input;
