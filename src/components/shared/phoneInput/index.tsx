import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { FieldProps } from "formik";
import "./styles.scss";

interface PhoneInputFieldProps extends FieldProps {
  // Define any additional props specific to PhoneInputField
}

export const PhoneInputField: React.FC<PhoneInputFieldProps> = ({
  field,
  form: { setFieldValue },
  ...props
}) => {
  return (
    <PhoneInput
      {...field}
      {...props}
      onChange={(phone) => setFieldValue(field.name, phone)}
    />
  );
};
