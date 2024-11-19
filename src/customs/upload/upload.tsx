import { Field, FieldProps } from "formik";
import styles from "./upload.module.scss";
import classNames from "classnames";
import { Image } from "antd";
import DocIcon from "../../assets/document-upload.svg";

interface UploadProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  description?: JSX.Element | string;
  allowedFormats?: string[];
  icon?: React.ReactNode;
  fileName?: string;
  fileSize?: number;
}

const Upload: React.FC<UploadProps> = ({
  fileSize,
  fileName,
  label,
  description,
  allowedFormats,
  icon,
  className,
  name,
  value,
  ...rest
}) => {
  return (
    <Field name={name}>
      {({ field, meta }: FieldProps) => (
        <div className={classNames(styles.container, className)}>
          {label && <label className={styles.uploadLabel}>{label}</label>}
          {description && description}

          <label className={styles.upload}>
            <input type="file" hidden {...field} {...rest} value={undefined} />
            {icon || <Image src={DocIcon} alt="DocIcon" preview={false} />
        }

            <div>
              <h5 className={styles.fileTitle}>
                {fileName ? fileName : "Select a file to upload"}
              </h5>

              {/* <h5 className={styles.fileFormat}>xls,doc,docx,pdf</h5> */}
            </div>

            {allowedFormats && allowedFormats?.length > 0 && (
              <span>{allowedFormats?.join(", ")}</span>
            )}
          </label>

          {meta?.touched && !!meta?.error && (
            <div className={styles.error}>{`${meta?.error}`}</div>
          )}
        </div>
      )}
    </Field>
  );
};

export default Upload;
