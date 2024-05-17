import { useState } from 'react';
import styless from './select.module.scss';

type SelectProps = {
  name?: string;
  value?: string;
  options: { value: string; label: string }[];
  onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

function SelectUI({ name, options, value, onChange }: SelectProps) {
  const [_value, _setValue] = useState<string>(
    value ? value : options[0].value
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    _setValue(event.target.value);
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <select
      name={name}
      value={_value}
      onChange={handleChange}
      className={styless.custonSelect}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SelectUI;
