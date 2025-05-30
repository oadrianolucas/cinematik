"use client"

import type React from "react"

import Image from "next/image"
import { ArrowLeft, X, Mail } from "lucide-react"
import { useState, useEffect } from "react"
import { useMediaQuery } from "@/hooks/use-mobile"
import Preloader from "@/components/preloader"
import Header from "@/components/header"
import { motion, useScroll, useTransform } from "framer-motion"

// Categorias de vídeos
const categories = [
  {
    id: "publicidade",
    name: "Publicidade",
    videos: [
      {
        id: "dbYctjeNUFo",
        title: "#DesafioLinea",
        source: "youtube",
        thumbnail: "/thumbnails/pol01.jpg",
      },
      {
        id: "A8gAAAavJH8",
        title: "#DesafioLinea",
        source: "youtube",
        thumbnail: "/thumbnails/pol05.jpg",
      },
      {
        id: "TVtXn8O3tNM",
        title: "DeMillus - 'Encante, Surpreenda, Aconteça'",
        source: "youtube",
        thumbnail: "/thumbnails/pol03.jpg",
      },
      {
        id: "7gq7S6BO_94",
        title: "51 - ShotShotShot",
        source: "youtube",
        thumbnail: "/thumbnails/pol02.jpg",
      },
      {
        id: "ajNx4Os9mdk",
        title: "Tic Tac",
        source: "youtube",
        thumbnail: "/thumbnails/pol04.jpg",
      },
    ],
  },
  {
    id: "entretenimento",
    name: "Entretenimento",
    videos: [
      {
        id: "NkJBOCu1mWc",
        title: "Haikaiss feat CortesiaDaCasa e Rincon Sapiência - Pimenta",
        source: "youtube",
        thumbnail: "/thumbnails/pol07.jpg",
      },
      {
        id: "x1Xq-OXyP8M",
        title: "Matheus Queiroz - Tão Bem part. Amanda Coronha",
        source: "youtube",
        thumbnail: "/thumbnails/pol08.jpg",
      },
      {
        id: "kVZjGnrDqMg",
        title: "Bia Ferreira - Dois Dedim",
        source: "youtube",
        thumbnail: "/thumbnails/pol10.jpg",
      },
      {
        id: "UkX3xVdefB4",
        title: "BASTIDORES LOLLAPALOOZA",
        source: "youtube",
        thumbnail: "/thumbnails/pol09.jpg",
      },
    ],
  },
  {
    id: "institucional",
    name: "Institucional",
    videos: [
      {
        id: "4accTmLrjZc",
        title: "ADOBE | A COR DO MEU ORGULHO",
        source: "youtube",
        thumbnail: "/thumbnails/pol11.jpg",
      },
      {
        id: "DDwvOMZUHwA",
        title: "Candowell - Qual a sua causa",
        source: "youtube",
        thumbnail: "/thumbnails/pol12.jpg",
      },
    ],
  },
]

// Vídeo principal para o hero
const heroVideo = {
  id: "11clSgHKPME",
  source: "youtube",
  title: "Cinematik Studios",
  thumbnail: "/thumbnails/slide1.jpg",
}

export default function Home() {
  const [videoModal, setVideoModal] = useState({ show: false, url: "", source: "youtube" })
  const [contactModal, setContactModal] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCategory, setActiveCategory] = useState("publicidade")
  const [showAllProjects, setShowAllProjects] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    whatsapp: "",
    assunto: "",
    mensagem: "",
  })

  // Check if mobile using custom hook
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Scroll animations
  const { scrollY } = useScroll()
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0])
  const heroScale = useTransform(scrollY, [0, 300], [1, 1.1])

  const openVideoModal = (id: string, source: string) => {
    // URL para o modal com controles habilitados e sem logo do YouTube
    const url =
    source === "youtube"
      ? `https://www.youtube.com/embed/${id}?autoplay=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&color=white&controls=1&vq=hd1080`
      : `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`

      
    setVideoModal({ show: true, url, source })
    document.body.style.overflow = "hidden"
  }

  const closeVideoModal = () => {
    setVideoModal({ show: false, url: "", source: "youtube" })
    document.body.style.overflow = "auto"
  }

  const openContactModal = (e: React.MouseEvent) => {
    e.preventDefault()
    setContactModal(true)
    document.body.style.overflow = "hidden"
  }

  const closeContactModal = () => {
    setContactModal(false)
    document.body.style.overflow = "auto"
    // Reset form
    setFormData({
      nome: "",
      email: "",
      whatsapp: "",
      assunto: "",
      mensagem: "",
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Criar o corpo do email
    const emailBody = `
Nome: ${formData.nome}
Email: ${formData.email}
WhatsApp: ${formData.whatsapp}
Assunto: ${formData.assunto}

Mensagem:
${formData.mensagem}
    `.trim()

    // Criar o link mailto
    const mailtoLink = `mailto:contato@cinematikstudios.com?subject=${encodeURIComponent(formData.assunto || "Contato do Site")}&body=${encodeURIComponent(emailBody)}`

    // Abrir o cliente de email
    window.location.href = mailtoLink

    // Fechar o modal
    closeContactModal()
  }

  // Get current category videos
  const currentCategory = categories.find((cat) => cat.id === activeCategory) || categories[0]

  // Determine which projects to display
  const visibleProjects = showAllProjects ? currentCategory.videos : currentCategory.videos.slice(0, 4)

  const hasMoreProjects = currentCategory.videos.length > 4

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Reset showAllProjects when changing category
  useEffect(() => {
    setShowAllProjects(false)
  }, [activeCategory])

  // Close mobile menu when changing screen size
  useEffect(() => {
    if (!isMobile) {
      document.body.style.overflow = "auto"
    }
  }, [isMobile])

  // Construir URL do YouTube com parâmetros para remover completamente a interface
  const getYouTubeEmbedUrl = (videoId: string) => {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&fs=0&color=white&disablekb=1&playsinline=1&loop=1&playlist=${videoId}&enablejsapi=1&origin=${typeof window !== "undefined" ? window.location.origin : ""}&vq=hd1080`
  }

  // Função para lidar com a conclusão do preloader
  const handlePreloaderComplete = () => {
    setIsLoading(false)
    // Permitir rolagem após o preloader
    document.body.style.overflow = "auto"
  }

  // Impedir rolagem durante o carregamento
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = "hidden"
    }
  }, [isLoading])

  return (
    <>
      {/* Preloader */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* Conteúdo principal - visível após o carregamento */}
      <div
        className={`min-h-screen bg-black transition-opacity duration-1000 ${isLoading ? "opacity-0" : "opacity-100"}`}
      >
        {/* Hero Section - Elegant & Fluid */}
        <section className="relative h-screen w-full overflow-hidden">
          {/* Background Video with Parallax */}
          <motion.div className="absolute inset-0 z-0 bg-black" style={{ scale: heroScale }}>
            <div className="relative w-full h-full overflow-hidden">
              {/* Thumbnail como fallback enquanto o vídeo carrega */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={heroVideo.thumbnail || "/placeholder.svg"}
                  alt={heroVideo.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Iframe com vídeo - sem interface do YouTube */}
              <div className="absolute inset-0 z-10 overflow-hidden">
                <iframe
                  src={
                    heroVideo.source === "youtube"
                      ? getYouTubeEmbedUrl(heroVideo.id)
                      : `https://player.vimeo.com/video/${heroVideo.id}?autoplay=1&muted=1&background=1&loop=1&title=0&byline=0&portrait=0`
                  }
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  title={heroVideo.title}
                  style={{
                    pointerEvents: "none",
                    width: isMobile ? "250%" : "100%",
                    height: "100%",
                    left: isMobile ? "-75%" : "0",
                    transform: isMobile ? "scale(1.2)" : "none",
                    transformOrigin: "center center",
                    border: "none",
                  }}
                  frameBorder="0"
                ></iframe>
              </div>

              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 z-20 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60"></div>
                <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/40"></div>
              </div>
            </div>
          </motion.div>

          {/* Header */}
          <Header scrolled={scrolled} />

          {/* Elegant Content with Smooth Animation */}
          <motion.div
            className="absolute inset-0 z-30 flex items-center justify-center"
            style={{ opacity: heroOpacity }}
          >
            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
            >
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                className="w-px h-12 bg-gradient-to-b from-transparent via-white/40 to-transparent"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Category Navigation - Enhanced */}
        <motion.section
          id="portfolio"
          className="bg-black pt-24 md:pt-32 px-6 md:px-12 relative"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          <motion.div
            className="flex justify-start md:justify-center mb-16 md:mb-20 overflow-x-auto pb-2 -mx-6 px-6 md:mx-0 md:px-0 md:overflow-visible"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex gap-12 md:gap-16 whitespace-nowrap">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  id={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`text-sm uppercase tracking-[0.25em] font-extralight transition-all duration-500 relative group ${
                    activeCategory === category.id ? "text-white" : "text-white/30 hover:text-white/70"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category.name}
                  <motion.div
                    className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white to-transparent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeCategory === category.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>
        </motion.section>

        {/* Projects Grid Section - Enhanced */}
        <section className="bg-black pb-24 md:pb-32 px-6 md:px-12">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {visibleProjects.map((video, index) => (
              <motion.div
                key={index}
                className="relative overflow-hidden group cursor-pointer"
                onClick={() => openVideoModal(video.id, video.source)}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="aspect-[4/3] relative rounded-sm overflow-hidden">
                  {/* Thumbnail */}
                  <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
                    <Image
                      src={video.thumbnail || "/placeholder.svg?height=400&width=600&query=video+thumbnail"}
                      alt={video.title}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent group-hover:from-black/80 transition-all duration-500"></div>
                  </div>

                  {/* Elegant Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                <motion.div
                  className="absolute bottom-6 left-6 z-10"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                >
                  <div className="text-white/90 text-sm uppercase tracking-[0.2em] font-extralight backdrop-blur-sm bg-black/20 px-3 py-1 rounded-sm">
                    {video.title}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>

          {/* Enhanced Read More Button */}
          {hasMoreProjects && (
            <motion.div
              className="flex justify-center mt-20 md:mt-24"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                onClick={() => setShowAllProjects(!showAllProjects)}
                className="text-white/50 hover:text-white text-sm uppercase tracking-[0.3em] font-extralight transition-all duration-500 relative group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {showAllProjects ? "Mostrar menos" : "Ver mais"}
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>
            </motion.div>
          )}
        </section>

        {/* Manifesto Section - Enhanced Elegance */}
        <section className="bg-black py-32 md:py-40 border-t border-white/5 relative overflow-hidden">
          {/* Subtle Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              className="max-w-4xl mx-auto"
            >
              <motion.h2
                className="text-white/80 text-2xl md:text-3xl uppercase tracking-[0.3em] mb-24 text-center font-medium"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                O manifesto
              </motion.h2>

              <div className="space-y-24">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <p className="text-white/50 text-base leading-relaxed text-center max-w-2xl mx-auto mb-8 uppercase tracking-[0.2em] font-extralight">
                    O novo jeito de contar histórias
                  </p>

                  <motion.p
                    className="text-white/60 text-lg leading-relaxed text-center max-w-3xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.4 }}
                  >
                    A Cinematik Studios é uma produtora inovadora especializada em filmes e conteúdos de marca, que
                    redefine o mercado audiovisual com a integração estratégica de inteligência artificial e automação
                    avançada. Entregamos soluções integradas, rápidas, altamente eficazes e econômicas, com foco
                    absoluto em performance e resultados.
                  </motion.p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  <p className="text-white/50 text-base leading-relaxed text-center max-w-2xl mx-auto mb-8 uppercase tracking-[0.2em] font-extralight">
                    Humans + AI Machines
                  </p>

                  <motion.p
                    className="text-white/60 text-lg leading-relaxed text-center max-w-3xl mx-auto font-light"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    Combinamos o poder transformador da inteligência artificial com estratégias criativas e humanas de
                    comunicação. Nosso propósito é transcender limites convencionais, elevando não apenas a eficiência
                    da sua produção de conteúdo, mas também seu potencial em inspirar, conectar e impactar profundamente
                    o público.
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section - Refined Elegance */}
        <section className="bg-black py-24 md:py-32 px-6 md:px-12 border-t border-white/5 relative">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h3
                className="text-white/70 text-lg leading-relaxed mb-12 max-w-2xl mx-auto font-light"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Quer conhecer mais sobre como esse modelo disruptivo pode te ajudar? Entre em contato com nosso time.
              </motion.h3>

              <motion.button
                onClick={openContactModal}
                className="inline-flex items-center justify-center text-white/50 hover:text-white text-sm uppercase tracking-[0.3em] font-extralight transition-all duration-500 relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={16} className="mr-4 transition-transform duration-300 group-hover:scale-110" />
                contato@cinematikstudios.com
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.button>

              <motion.div
                className="mt-16 text-white/30 text-xs uppercase tracking-[0.3em] font-extralight"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                © 2023 Cinematik Studios
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Contact Modal - Larger & Elegant */}
        {contactModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="relative w-full max-w-md bg-black/60 backdrop-blur-md border border-white/10 rounded-sm p-10"
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={closeContactModal}
                className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
                aria-label="Fechar"
              >
                <X size={18} />
              </button>

              {/* Header */}
              <motion.div
                className="mb-10 text-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <h3 className="text-white/80 text-lg uppercase tracking-[0.3em] font-light mb-2">
                  Vamos
                  <br />
                  Conversar
                </h3>
                <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent w-16 mx-auto"></div>
              </motion.div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-8">
                <motion.input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Nome"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors font-extralight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                />

                <motion.input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors font-extralight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                />

                <motion.input
                  type="tel"
                  name="whatsapp"
                  value={formData.whatsapp}
                  onChange={handleInputChange}
                  placeholder="WhatsApp"
                  className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors font-extralight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                />

                <motion.input
                  type="text"
                  name="assunto"
                  value={formData.assunto}
                  onChange={handleInputChange}
                  placeholder="Assunto"
                  required
                  className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors font-extralight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                />

                <motion.textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Mensagem"
                  required
                  rows={4}
                  className="w-full bg-transparent border-0 border-b border-white/10 pb-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-white/30 transition-colors resize-none font-extralight"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                />

                <motion.button
                  type="submit"
                  className="w-full text-white/50 hover:text-white py-4 text-sm uppercase tracking-[0.3em] font-extralight transition-all duration-500 relative group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                >
                  Enviar mensagem
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}

        {/* Enhanced Video Modal */}
        {videoModal.show && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col md:flex-row items-center justify-center bg-black/95 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Enhanced Close Button */}
            <div className="absolute top-4 w-full flex justify-center z-10">
              <motion.button
                onClick={closeVideoModal}
                className="bg-red-500/90 hover:bg-red-500 text-white rounded-full p-3 transition-all duration-300 shadow-2xl backdrop-blur-sm"
                aria-label="Close video"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Enhanced Back button for mobile */}
            <motion.button
              onClick={closeVideoModal}
              className="md:hidden absolute top-4 left-4 text-white/80 hover:text-white transition-colors flex items-center gap-2 backdrop-blur-sm bg-black/20 px-3 py-2 rounded-full"
              aria-label="Back"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <ArrowLeft size={20} />
              <span className="text-sm">Voltar</span>
            </motion.button>

            <motion.div
              className="relative w-full max-w-5xl mt-16 md:mt-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <div className="relative pb-[56.25%] h-0 rounded-lg overflow-hidden shadow-2xl">
                <iframe
                  src={videoModal.url}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="Video"
                  frameBorder="0"
                  style={{ border: "none" }}
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </>
  )
}
