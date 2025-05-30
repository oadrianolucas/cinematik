"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

interface HeaderProps {
  scrolled?: boolean
}

export default function Header({ scrolled = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(scrolled)

  // Detectar scroll para páginas que precisam dessa funcionalidade
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center px-6 md:px-12 py-6 md:py-8 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : ""
      }`}
    >
      <Link href="/" className="text-white relative h-8 w-32 md:h-10 md:w-40">
        <Image
          src="/Logo-Cinematik-Branco.png"
          alt="Cinematik Studios"
          fill
          className="object-contain"
        />
      </Link>
    </header>
  )
}
