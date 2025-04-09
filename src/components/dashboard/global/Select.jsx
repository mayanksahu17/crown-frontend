import ReactSelect from "react-select";

export default function Select({
  options,
  placeHolder,
  customStyles,
  onChange,
  value,
  defaultValue,
  defaultInputValue,
  onBlur,
}) {
  return (
    <ReactSelect
      options={options}
      styles={customStyles}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      onBlur={onBlur}
    />
  );
}
