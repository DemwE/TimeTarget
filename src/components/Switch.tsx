import React, { useState, useEffect } from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  label: string;
}

const Switch: React.FC<SwitchProps> = ({ checked, onChange, label }) => {
  const [isChecked, setIsChecked] = useState(checked);

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    onChange();
  };

  return (
    <label className="inline-flex items-center cursor-pointer">
      <input type="checkbox" checked={isChecked} onChange={handleChange} className="sr-only" />
      <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out ${isChecked ? 'bg-blue-600' : 'bg-gray-300'}`}>
        <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${isChecked ? 'translate-x-5' : ''}`}></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">{label}</span>
    </label>
  );
};

export default Switch;