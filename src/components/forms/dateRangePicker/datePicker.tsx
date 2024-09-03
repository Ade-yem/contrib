import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./styles.scss";

const CalendarContainer = ({
  className,
  children,
}: {
  // className: string;
  // // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // children: any;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="date-picker-wrapper">
      <div className={className}>
        <div>{children}</div>
      </div>
    </div>
  );
};

export const CustomDatePicker = ({
  dateValue,
  setDateValue,
  placeholder,
  className,
  minDate,
  ...props
}: {
  dateValue: any;
  setDateValue: (date: Date | null) => void;
  placeholder: string;
  className?: string;
  minDate?: Date;
  // ...other props
}) => {
  return (
    <div className="custom-date-picker">
      <DatePicker
        selected={dateValue}
        onChange={(date) => setDateValue(date)}
        className={` w-100 ${className}`}
        placeholderText={placeholder}
        dateFormat="MMM d, yyyy"
        dropdownMode="select"
        minDate={minDate}
        showMonthDropdown={true}
        showYearDropdown={true}
        calendarContainer={({ className, children }) =>
          CalendarContainer({ className, children })
        }
        {...props}
      />
    </div>
  );
};
