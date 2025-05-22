import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdClose } from "react-icons/io";

const ModalWrapper = ({
  isOpen,
  onClose,
  children,
  title,
  showCloseIcon = true,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-[#121212] border border-white shadow-xl px-6 pb-6 pt-4 w-full max-w-3xl relative"
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()} // prevent modal close on content click
          >
            {showCloseIcon && (
              <button
                onClick={onClose}
                className="absolute top-5 right-5 text-gray-200 hover:text-white"
              >
                <IoMdClose size={20}/>
              </button>
            )}

            {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
