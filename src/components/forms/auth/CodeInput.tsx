"use client";

import React, { useRef, useState } from "react";

export const CodeInput: React.FC = () => {
  const [values, setValues] = useState<string[]>(Array(8).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
    if (event.target.value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  }
  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Backspace" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  }
  return(
    <div className="d-flex justify-content-center mb-2">
      {
        values.map((value, index) => (
          <input type="text" key={index}
                  maxLength={1} value={value}
                  onChange={event => handleChange(index, event)}
                  className="form-control mx-1 text-center" style={{width: "40px"}}
                  onKeyDown={e => handleKeyDown(index, e)}
                  ref={(el: HTMLInputElement | null) => { inputRefs.current[index] = el; }}
                  />
          )
        )
      }
    </div>
  )
}