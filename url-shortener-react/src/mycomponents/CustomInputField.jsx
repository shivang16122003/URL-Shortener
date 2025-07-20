import React from 'react';

const CustomInputField = ({
  name,
  label,
  type = 'text',
  placeholder = '',
  register,
  errors = {},
  required = false,
  minLength,
  validation = {},
  className = '',
  defaultValue,
  ...rest
}) => {
  const error = errors?.[name];

  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}

      <input
        id={name}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...register(name, {
          required: required
            ? { value: true, message: `${label || name} is required` }
            : false,
          minLength:
            type === 'text' && minLength
              ? {
                  value: minLength,
                  message: `${label || name} must be at least ${minLength} characters`,
                }
              : undefined,
          pattern:
            type === 'email'
              ? {
                  value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/i,
                  message: 'Invalid email address',
                }
              : type === 'url'
              ? {
                  value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i,
                  message: 'Invalid URL',
                }
              : undefined,
          ...validation,
        })}
        className={`rounded-md border bg-white/90 p-3 shadow-sm backdrop-blur-sm focus:border-blue-500 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-slate-300'
        } ${className}`}
        {...rest}
      />

      {error && <p className="text-xs text-red-600">{error?.message}</p>}
    </div>
  );
};

export default CustomInputField;
