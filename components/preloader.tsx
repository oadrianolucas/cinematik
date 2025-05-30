"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"

interface PreloaderProps {
  onComplete?: () => void
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    // Simular progresso de carregamento
    const interval = setInterval(() => {
      setProgress((prev) => {
        // Acelerar o progresso à medida que se aproxima de 100
        const increment = Math.max(1, Math.floor((100 - prev) / 10))
        const newProgress = Math.min(100, prev + increment)

        if (newProgress === 100) {
          clearInterval(interval)
          // Aguardar um momento antes de completar a animação
          setTimeout(() => {
            setIsComplete(true)
            if (onComplete) onComplete()
          }, 500)
        }

        return newProgress
      })
    }, 100)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 relative w-64 h-16 md:w-80 md:h-20"
          >
            <Image
              src="/Logo-Cinematik-Branco.png"
              alt="Cinematik Studios"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <div className="w-64 md:w-80 h-[2px] bg-gray-800 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 h-full bg-red-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-white/60 text-sm"
          >
            {progress === 100 ? "Pronto" : `${progress}%`}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
