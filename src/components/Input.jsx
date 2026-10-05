import { useId } from "react";

function Input({ label, type = "text", className = "", required = false, ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label className="mb-2 block text-sm font-bold text-slate-700" htmlFor={id}>
          {label}{required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        required={required}
        className={`${className} w-full rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 placeholder:text-slate-400 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100`}
        {...props}
        ref={ref}
        id={id}
      />
    </div>
  );
}

export default Input;
