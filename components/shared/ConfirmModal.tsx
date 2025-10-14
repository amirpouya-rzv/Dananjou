import React from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function ConfirmModal({
  isOpen,
  title = "Confirmation",
  message = "",
  confirmText = "Yes",
  cancelText = "No",
  icon,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative bg-white/80 dark:bg-darkgray/90 dark:bg-stone-800 dark:text-white backdrop-blur-md border border-white/20 rounded-2xl w-11/12 max-w-lg shadow-2xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotate: 5 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            {/* header */}
            <div className="flex items-center justify-center gap-3 bg-gradient-to-r from-toblue to-cyan-500 text-white py-4 shadow-md">
              <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-red-500 to-red-700 shadow-lg">
                {icon && React.createElement(icon, { className: "w-6 h-6" })}
              </div>
              <h2 className="text-lg font-semibold">{title}</h2>
            </div>

            {/* message */}
            <p className="text-center text-gray-700 dark:text-gray-300 px-6 py-6 text-base">
              {message}
            </p>

            {/* buttons */}
            <div className="flex justify-center gap-6 pb-6">
              <button
                onClick={() => onCancel && onCancel()}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg font-medium rounded-lg text-sm px-10 py-2.5"
              >
                {cancelText}
              </button>
              <button
                onClick={() => onConfirm && onConfirm()}
                className="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg font-medium rounded-lg text-sm px-10 py-2.5"
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}