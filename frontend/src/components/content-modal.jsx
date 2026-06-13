"use client"

import { motion } from "framer-motion"
import { X } from "lucide-react"

export default function ContentModal({ open, onClose, children }) {
  if (!open) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="bg-background/70 fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-card relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-white/10 p-6 shadow-lg"
      >
        <button
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg border border-white/10 p-1.5 transition-colors hover:border-amber-500/50 hover:text-amber-500"
        >
          <X className="h-4 w-4" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  )
}
