import { CgSpinner } from "react-icons/cg";
import clsx from "clsx";

export default function Button({
  children,
  className,
  loading,
  onClick,
  type,
  disabled,
}) {
  return (
    <button
      className={clsx(
        "w-full bg-textred h-12 rounded-lg font-normal text-white hover:bg-[#c7b483] relative cursor-pointer disabled:bg-[#c7b483]  disabled:cursor-not-allowed",
        className
      )}
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
    >
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <CgSpinner className="animate-spin" size={20} />
        </span>
      )}
      {!loading && children}
    </button>
  );
}
