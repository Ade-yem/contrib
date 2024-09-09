import ReactSelect from "react-select";

interface selectProps {
  field: any;
  form: { touched: any; errors: any; setFieldValue: any };
  size: "base" | "lg";
  allowSelectAll: boolean;
  allOption?: { label: any; value: any };
  options: any[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  ctrlStyles?: { [key: string]: string };
}

const ThemedSelect = (props: selectProps) => {
  const {
    field,
    form: { touched, errors, setFieldValue },
    size,
    label,
    required,
    ctrlStyles,
  } = props;

  const valueContainerPadding = {
    base: "0.6rem 0.25rem",
    lg: "0.9rem 0.25rem",
  };

  const styles = {
    singleValue: (provided: any) => ({
      ...provided,
      color: "#495057",
      fontWeight: 400,
      fontSize: "1.2rem",
    }),
    option: (provided: any, state: { isSelected: any }) => ({
      ...provided,
      fontSize: "1.4rem",
      fontWeight: 400,
      color: state.isSelected ? "#4b4b4b" : "#4b4b4b",
      backgroundColor: state.isSelected ? "#f4f4f4" : "#ffffff",
      borderRadius: 5,
      boxSizing: "border-box",
      margin: "2px 6px",
      padding: "10px",
      width: "calc(100% - 12px)",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#f4f4f4",
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: "#6c757d",
      fontWeight: 400,
    }),
    menu: (provided: any) => ({
      ...provided,
      fontSize: "1.5rem",
      border: "1px solid rgba(33,33,33,.14)",
      borderBottomRightRadius: 2,
      borderBottomLeftRadius: 2,
      paddingTop: 5,
      boxShadow: "0 0.5px 0.2px rgba(0, 0, 0, .15)",
      boxSizing: "border-box",
      zIndex: 9999,
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      display: "none",
    }),
    dropdownIndicator: (provided: any) => ({
      ...provided,
      padding: 0,
    }),
    valueContainer: (provided: any) => ({
      ...provided,
      padding: valueContainerPadding[size] || valueContainerPadding.base,
      margin: 0,
    }),
    control: (provided: any, state: { isFocused: any }) => ({
      ...provided,
      border: `solid 1px ${
        ctrlStyles?.borderColor
          ? ctrlStyles.borderColor
          : state.isFocused
            ? "#245177"
            : "#ced4da"
      };`,
      // border: `solid 1px ${state.isFocused ? "#245177" : "#ced4da"};`,
      padding: ".045rem 0.45rem",
      fontSize: "1.5rem",
      borderRadius: "0.8rem",
      fontWeight: 500,
      color: "#245177",
      boxShadow: "none",
      minHeight: "auto",
      cursor: "pointer",
      "&:hover": {
        border: "solid 1px #e4e4e7",
      },
      ...ctrlStyles,
    }),
  };

  const hasError = errors[field.name];

  const handleBlur = (e: { target: { name: any } }) => {
    e.target.name = field.name;
    field.onBlur(e);
  };

  return (
    <div className="custom-select-group">
      {label && (
        <label className="text-xs text-grey-300 mt-3 mb-2">
          {label}
          {required && <span>*</span>}
        </label>
      )}
      {props.allowSelectAll ? (
        <>
          <ReactSelect
            // {...props}
            name={field.name}
            required={required}
            value={field.value}
            onBlur={handleBlur}
            styles={styles}
            options={[props.allOption, ...props.options]}
            onChange={(value: any) => {
              if (
                value !== null &&
                value.length > 0 &&
                value[value.length - 1].value === props.allOption?.value
              ) {
                return setFieldValue(field.name, props.options);
              }
              return setFieldValue(field.name, value);
            }}
            placeholder={props.placeholder || "Select..."}
          />
        </>
      ) : (
        <>
          <ReactSelect
            name={field.name}
            options={props.options}
            onChange={(value) => setFieldValue(field.name, value)}
            value={field.value}
            onBlur={handleBlur}
            styles={styles}
            placeholder={props.placeholder || "Select..."}
            // {...props}
          />
        </>
      )}
      {touched[field.name] && hasError && (
        <div className="text-danger text-sm font-weight-normal pt-1">
          {errors[field.name]}
        </div>
      )}
    </div>
  );
};

export default ThemedSelect;
