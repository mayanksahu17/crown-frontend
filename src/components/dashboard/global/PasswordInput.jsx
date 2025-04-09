import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function PasswordInput({
  value,
  onChange,
  name,
  label,
  onBlur,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <div className="w-full">
      <label className="block text-textwhite">
        {label ? label : "Password"}
      </label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent px-2.5 py-[7px] border rounded-md border-solid border-white mt-1 !ml-0"
          onBlur={onBlur}
        />
        <div
          className="absolute top-[54%] bottom-1/2 -translate-y-1/2 right-1 flex items-center pr-2 cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? (
            <FaEyeSlash color="#fff" size={18} />
          ) : (
            <FaEye color="#fff" size={18} />
          )}
        </div>
      </div>
    </div>
  );
}
