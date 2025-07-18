'use client';

import { useState } from 'react';

export default function Checkbox({
  id,
  value,
  checked,
  onChange,
  label,
}: Readonly<{
  id: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label?: string;
}>) {
  const [isChecked, setIsChecked] = useState(checked);
  const handleChange = () => {
    setIsChecked(!isChecked);
    onChange(value);
  };
  return (
    <div className="flex w-full items-center p-2 rounded-sm hover:bg-gray-100 dark:hover:bg-gray-600" onClick={() => handleChange()}>
      <input
        id={id}
        type="checkbox"
        value={value}
        checked={isChecked}
        onChange={() => handleChange()}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
      />
      {label && (
        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      )}
    </div>
  );
}