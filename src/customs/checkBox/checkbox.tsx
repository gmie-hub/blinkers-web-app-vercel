import { FieldHookConfig, useField } from "formik";
import styles from "./checkbox.module.scss";

interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  label: string;
  isChecked: boolean;
}

const Checkbox: React.FC<CheckboxProps & FieldHookConfig<string> & any> = ({
  label,
  isChecked,
  ...rest
}) => {
  const [field] = useField(rest);

  return (
    <div className={styles.checkAndLabel}>
      <input className={styles.check} {...field} checked={isChecked} type="checkbox" />
      <label htmlFor={rest.id || rest.name} className={styles.label}>{label}</label>
    </div>
  );
};

export default Checkbox;
