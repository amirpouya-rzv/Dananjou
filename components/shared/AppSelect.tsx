"use client";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AppSelectProps {
  label?: string;
  placeholder?: string;
  options?: { label: string; value: string }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const AppSelect: React.FC<AppSelectProps> = ({
  label,
  placeholder = "انتخاب کنید",
  options = [],
  defaultValue,
  onChange,
  className = "w-full",
}) => {
  const [selected, setSelected] = React.useState(defaultValue);

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <Select value={selected} onValueChange={handleChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.length > 0 ? (
            options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))
          ) : (
            <SelectItem value="no-options" disabled>
              گزینه‌ای موجود نیست
            </SelectItem>
          )}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppSelect;
