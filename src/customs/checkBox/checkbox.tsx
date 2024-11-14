
import { Field, FieldProps } from 'formik';
import React from 'react';
import styles from './checkBox.module.scss';

interface CustomCheckboxProps {
  label: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void; // Optional onChange prop
}

const Checkbox: React.FC<CustomCheckboxProps> = ({ label, name, onChange }) => {
  return (
    <Field name={name}>
      {({ field }: FieldProps) => (
        <label className={styles.container} htmlFor={name}>
          <input
            type="checkbox"
            {...field}
            checked={field.value}
            id={name}
            onChange={(e) => {
              field.onChange(e); // Call Formik's onChange
              if (onChange) {
                onChange(e); // Call any additional logic passed via the onChange prop
              }
            }}
            // onChange={onChange}
          />
          <span className={styles.customCheckbox} />
          <span className={styles.checkBoxLabel}>{label}</span>
        </label>
      )}
    </Field>
  );
};

export default Checkbox;
