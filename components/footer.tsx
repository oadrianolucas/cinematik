import Image from "next/image"
import { Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12 md:py-16">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8">
          {/* Logo e informações */}
          <div className="flex flex-col items-start">
            <div className="relative h-10 w-40 mb-6">
              <Image
                src="/Logo-Cinematik-Branco.png"
                alt="Cinematik Studios"
                fill
                className="object-contain"
              />
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6 max-w-xs">
              Produtora especializada em conteúdo audiovisual para publicidade, entretenimento e projetos
              institucionais.
            </p>
          </div>

          {/* Contato */}
          <div className="flex flex-col">
            <h3 className="text-white text-lg font-medium mb-6">Contato</h3>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-red-500" />
                <span className="text-white/70 text-sm">contato@cinematikstudios.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone size={16} className="text-red-500" />
                <span className="text-white/70 text-sm">(11) 9999-9999</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-red-500 mt-1" />
                <span className="text-white/70 text-sm">
                  Av. Paulista, 1000
                  <br />
                  São Paulo, SP
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Linha divisória */}
        <div className="border-t border-white/10 my-8"></div>

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/50 text-xs mb-4 md:mb-0">
            © 2023 Cinematik Studios. Todos os direitos reservados.
          </div>
          <div className="text-white/50 text-xs">
            Desenvolvido com <span className="text-red-500">♥</span> por Cinematik Studios
          </div>
        </div>
      </div>
    </footer>
  )
}
