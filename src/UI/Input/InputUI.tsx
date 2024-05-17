import styles from './InputUI.module.scss';

type TextInputProps = {
  label?: string;
  type: string;
  name?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function InputUI({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
}: TextInputProps) {
  return (
    <label className={styles.customLabel}>
      {label}
      <input
        value={value}
        className={styles.customInput}
        type={type}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
      />
    </label>
  );
}
export default InputUI;
