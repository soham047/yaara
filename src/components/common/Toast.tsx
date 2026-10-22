import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ToastProps {
  message: string;
  show: boolean;
  onClose: () => void;
}

export default function Toast({ message, show, onClose }: ToastProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: 20, x: '-50%' }}
          className="fixed bottom-24 left-1/2 z-[70] flex items-center gap-3 rounded-2xl bg-espresso px-5 py-3 text-pearl shadow-2xl"
        >
          <span className="text-sm">{message}</span>
          <button
            onClick={onClose}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-pearl/15 hover:bg-pearl/25"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
