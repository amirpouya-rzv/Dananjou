import React from "react";

interface TooltipProps {
  content: string;
  color: "green" | "blue" | "red";
  children: React.ReactNode;
}

export default function Tooltip({ content, color, children }: TooltipProps) {
  const bgGradient =
    color === "green"
      ? "bg-gradient-to-r from-green-400 to-green-600"
      : color === "blue"
      ? "bg-gradient-to-r from-blue-400 to-blue-600"
      : "bg-gradient-to-r from-red-400 to-red-600";

  return (
    <div className="relative group inline-block">
      {children}
      <span
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-2 
          hidden group-hover:inline-block 
          px-3 py-1.5 text-xs font-medium text-white 
          rounded-lg shadow-lg 
          ${bgGradient} 
          opacity-0 group-hover:opacity-100 
          scale-90 group-hover:scale-100 
          transition-all duration-300
          whitespace-nowrap
        `}
      >
        {content}
      </span>
      {/* مثلث زیر Tooltip */}
      <span
        className={`
          absolute bottom-[calc(100%+0.25rem)] left-1/2 -translate-x-1/2 
          w-2 h-2 rotate-45
          ${bgGradient} 
          opacity-0 group-hover:opacity-100
          transition-all duration-300
        `}
      />
    </div>
  );
}
