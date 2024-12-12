// import { FieldHookConfig, useField } from "formik";
// import styles from "./checkbox.module.scss";

// interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
//   label: string;
//   isChecked: boolean;
// }

// const Checkbox: React.FC<CheckboxProps & FieldHookConfig<string> & any> = ({
//   label,
//   isChecked,
//   ...rest
// }) => {
//   const [field] = useField(rest);

//   return (
//     <div className={styles.checkAndLabel}>
//       <input className={styles.check} {...field} checked={isChecked} type="checkbox" />
//       <label htmlFor={rest.id || rest.name} className={styles.label}>{label}</label>
//     </div>
//   );
// };

// export default Checkbox;



import { Field, useField } from "formik";
import styles from "./checkbox.module.scss";

interface CheckboxProps {
  label: string;
  name: string;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, name, isChecked, ...props }) => {
  const [field, meta] = useField({ name, type: "checkbox" });

  return (
    <div className={styles.checkAndLabel}>
      <input
        type="checkbox"
        id={name}
        {...field}
        {...props}
        checked={isChecked || field.value} // Ensure proper binding
        className={styles.check}
      />
      <label htmlFor={name} className={styles.label}>
        {label}
      </label>
      {meta.touched && meta.error && (
        <div className={styles.error}>{meta.error}</div> // Display error message if any
      )}
    </div>
  );
};

export default Checkbox;
