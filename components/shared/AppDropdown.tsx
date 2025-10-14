"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppDropdownProps {
  title?: string;          // عنوان بالای منو
  placeholder?: string;    // متنی که وقتی چیزی انتخاب نشده نمایش داده میشه
  label?: string;          // متن دکمه
  options?: string[];      // لیست گزینه‌ها
  defaultValue?: string;   // مقدار پیش‌فرض
  onChange?: (value: string) => void; // callback وقتی گزینه تغییر کرد
  className?: string;      // کلاس Tailwind برای Content
}

const AppDropdown: React.FC<AppDropdownProps> = ({
  title = "Select an option",
  placeholder = "انتخاب نشده",
  label = "Open",
  options = ["Top", "Bottom", "Right"],
  defaultValue = "",
  onChange,
  className = "w-full",
}) => {
  const [selected, setSelected] = React.useState(defaultValue);

  const handleChange = (value: string) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">
          {selected || label}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`${className} min-w-full`}>
        {/* Title */}
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={selected} onValueChange={handleChange}>
          {options.length > 0 ? (
            options.map((option) => (
              <DropdownMenuRadioItem
                key={option}
                value={option.toLowerCase()}
                className="w-[450px]"
              >
                {option}
              </DropdownMenuRadioItem>
            ))
          ) : (
            <span className="text-gray-500 px-4 py-2">{placeholder}</span>
          )}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppDropdown;
