import ReactSelect from "react-select";
import { useTheme } from "../theme-provider"; // or your theme provider hook

export default function Select({
  options,
  placeHolder = "Select...",
  customStyles,
  onChange,
  value,
  defaultValue,
  defaultInputValue,
  onBlur,
  className,
  isSearchable = true,
  isClearable = false,
}) {
  const { theme } = useTheme(); // Get current theme (remove if not using next-themes)

  // Base styles that work for both themes
  const baseStyles = {
    control: (provided, state) => ({
      ...provided,
      minHeight: '42px',
      borderRadius: '8px',
      borderWidth: '1px',
      borderColor: state.isFocused 
        ? '#3b82f6' 
        : theme === 'dark' 
          ? '#4b5563' 
          : '#d1d5db',
      boxShadow: state.isFocused 
        ? `0 0 0 1px ${theme === 'dark' ? '#3b82f6' : '#3b82f6'}` 
        : 'none',
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      '&:hover': {
        borderColor: theme === 'dark' ? '#6b7280' : '#9ca3af',
      },
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? '#3b82f6'
        : state.isFocused
        ? theme === 'dark' ? '#374151' : '#f3f4f6'
        : 'transparent',
      color: state.isSelected
        ? 'white'
        : theme === 'dark' ? '#f3f4f6' : '#111827',
      '&:active': {
        backgroundColor: theme === 'dark' ? '#4b5563' : '#e5e7eb',
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
      borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
      borderWidth: '1px',
      borderRadius: '8px',
      boxShadow: theme === 'dark' 
        ? '0 4px 6px -1px rgba(0, 0, 0, 0.5)' 
        : '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#f3f4f6' : '#111827',
    }),
    input: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#f3f4f6' : '#111827',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      '&:hover': {
        color: theme === 'dark' ? '#d1d5db' : '#4b5563',
      },
    }),
    clearIndicator: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      '&:hover': {
        color: theme === 'dark' ? '#d1d5db' : '#4b5563',
      },
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: theme === 'dark' ? '#374151' : '#e5e7eb',
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#f3f4f6' : '#111827',
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: theme === 'dark' ? '#9ca3af' : '#6b7280',
      '&:hover': {
        backgroundColor: theme === 'dark' ? '#6b7280' : '#d1d5db',
        color: theme === 'dark' ? '#ffffff' : '#111827',
      },
    }),
  };

  // Merge custom styles with base styles
  const mergedStyles = customStyles 
    ? { ...baseStyles, ...customStyles } 
    : baseStyles;

  return (
    <ReactSelect
      options={options}
      styles={mergedStyles}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      defaultInputValue={defaultInputValue}
      onBlur={onBlur}
      className={className}
      isSearchable={isSearchable}
      isClearable={isClearable}
      classNamePrefix="react-select"
      theme={(selectTheme) => ({
        ...selectTheme,
        colors: {
          ...selectTheme.colors,
          primary: '#3b82f6', // Primary color (blue-500)
          primary25: theme === 'dark' ? '#374151' : '#f3f4f6', // Option hover
          primary50: theme === 'dark' ? '#4b5563' : '#e5e7eb', // Option active
          neutral0: theme === 'dark' ? '#1f2937' : '#ffffff', // Control background
          neutral5: theme === 'dark' ? '#374151' : '#f3f4f6',
          neutral10: theme === 'dark' ? '#4b5563' : '#e5e7eb',
          neutral20: theme === 'dark' ? '#6b7280' : '#d1d5db', // Border, divider
          neutral30: theme === 'dark' ? '#9ca3af' : '#9ca3af',
          neutral40: theme === 'dark' ? '#d1d5db' : '#6b7280',
          neutral50: theme === 'dark' ? '#9ca3af' : '#6b7280', // Placeholder
          neutral60: theme === 'dark' ? '#d1d5db' : '#4b5563',
          neutral70: theme === 'dark' ? '#e5e7eb' : '#374151',
          neutral80: theme === 'dark' ? '#f3f4f6' : '#1f2937', // Text
          neutral90: theme === 'dark' ? '#f9fafb' : '#111827',
        },
      })}
    />
  );
}