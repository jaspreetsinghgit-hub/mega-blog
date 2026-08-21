import { useId } from "react";

function Input({ label, type = "text", className = "", ref, ...props }) {
  const id = useId();
  return (
    <>
      {label && (
        <label className="mb-2 inline-block pl-1 text-sm font-medium text-slate-700" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className} w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-200 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
        {...props}
        ref={ref}
        id={id}
      />
    </>
  );
}

export default Input;
