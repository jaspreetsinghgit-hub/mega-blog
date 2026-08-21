import { useId } from "react";

function Select({ options, label, classname = "", required = false, ref, ...props }) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-2 inline-block pl-1 text-sm font-medium text-slate-700">
          {label}{required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <select
        {...props}
        required={required}
        className={`${classname} w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-slate-900 outline-none transition duration-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100`}
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
