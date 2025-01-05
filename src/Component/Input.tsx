import React from "react";

interface InputProps {
  label: string;
  type?: string;
  placeholder: string;
  width: string;
  register?: any; // This will be used for react-hook-form integration
  errorMessage?: string;
  autoComplete?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  type = "text",
  placeholder,
  width,
  register,
  errorMessage,
  autoComplete,
}) => {
  return (
    <div className={`${width} flex flex-col`}>
      <label className="text-[#c5c7d4]">{label}</label>
      <input
        className="p-2 rounded-lg bg-[#2c333f] text-[#c5c7d4] outline-none"
        type={type}
        placeholder={placeholder}
        {...register} // This connects to react-hook-form
        autoComplete={autoComplete}
      />
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

export default Input;
