import React, { Fragment } from "react";

const TextInput = ({
  className,
  field,
  form: { touched, errors },
  variant,
  appendedComponent: AppendedComponent,
  errorStyles,
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];

  return (
    <Fragment>
      <input
        name={field.name}
        value={field.value}
        onChange={field.onChange}
        onBlur={field.onBlur}
        className={`${
          className || "form-control font-weight-normal text-base"
        }`}
        {...props}
      />

      {hasError && (
        <div className={`text-danger text-xs ${errorStyles}`}>
          {errors[field.name]}
        </div>
      )}
    </Fragment>
  );
};

export default TextInput;
