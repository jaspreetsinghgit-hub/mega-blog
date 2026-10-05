import { useId } from "react";

function Select({ options, label, classname = "", required = false, ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 block text-sm font-bold text-slate-700">
          {label}{required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        {...props}
        required={required}
        className={`${classname} w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition duration-200 hover:border-slate-300 hover:bg-white focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100`}
        id={id}
        ref={ref}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
