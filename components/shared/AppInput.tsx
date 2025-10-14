"use client";
import React, { ComponentProps } from "react";

type AppInputProps = ComponentProps<"input"> & {
    title: string;
    id?: string;
    error?: string; // متن خطا
    required?: boolean;
};

export default function AppInput({
    title,
    id,
    className = "",
    error,
    required = false,
    ...rest
}: AppInputProps) {
    return (
        <div className="mb-4">
            <label
                htmlFor={id}
                className="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
                {title}
                {required && <span className="text-red-500 ml-1">*</span>}
            </label>

            <input
                id={id}
                required={required}
                className={`bg-gray-50 border ${error ? "border-red-500" : "border-gray-300"
                    } text-gray-900 text-sm rounded-lg focus:ring-2 ${error ? "focus:ring-red-400 focus:border-red-500" : "focus:ring-blue-500 focus:border-blue-500"
                    } block w-full p-2.5 ${className}`}
                {...rest}
            />

            {error && (
                <p className="mt-1 text-sm text-red-600">
                    {error}
                </p>
            )}
        </div>
    );
}
