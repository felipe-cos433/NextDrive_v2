import React from 'react';

export default function Input({ 
  label, 
  error, 
  className = '', 
  ...props 
}) {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold tracking-wider text-gray-300 uppercase">
          {label}
        </label>
      )}
      <input
        className={`w-full bg-zinc-950 border text-white px-4 py-3 rounded-xl focus:outline-none transition shadow-inner placeholder-gray-600 ${
          error 
            ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
            : 'border-zinc-800 focus:border-amber-400 focus:ring-1 focus:ring-amber-400'
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-400 font-medium tracking-wide mt-0.5">{error}</span>
      )}
    </div>
  );
}