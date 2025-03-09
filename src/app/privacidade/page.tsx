"use client";

import { useState } from "react";
import Image from "next/image";
import { Globe, ChevronRight } from "lucide-react";
import Link from 'next/link';

export default function Privacy() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Language Selector */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
          className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
        >
          <Globe className="h-3 w-3" />
          {language.toUpperCase()}
        </button>
      </div>

      {/* Header */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Área de Membros Link */}
          <div className="flex justify-end mb-4">
            <Link
              href="/"
              className="text-xs text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
            >
              {language === 'pt' ? 'Voltar ao Início' : 'Back to Home'}
              <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <Image
            src="/logo.jpg"
            alt="Futuros Tech"
            width={120}
            height={120}
            className="mx-auto mb-8"
          />
          
          <h1 className="text-3xl font-light mb-4 bg-gradient-to-r from-neutral-400 to-white bg-clip-text text-transparent">
            {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="max-w-3xl mx-auto prose prose-invert">
          <div className="space-y-8">
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '1. Informações Coletadas' : '1. Collected Information'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Coletamos informações como nome, e-mail, número de telefone e informações sobre investimento quando você se registra em nossa plataforma. Também podemos coletar dados sobre como você usa nosso site e serviços.'
                  : 'We collect information such as name, email, phone number, and investment information when you register on our platform. We may also collect data about how you use our website and services.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '2. Uso das Informações' : '2. Use of Information'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Utilizamos suas informações para fornecer nossos serviços, enviar atualizações importantes, melhorar nossa plataforma e personalizar sua experiência. Seus dados também nos ajudam a prevenir fraudes e manter a segurança.'
                  : 'We use your information to provide our services, send important updates, improve our platform, and personalize your experience. Your data also helps us prevent fraud and maintain security.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '3. Proteção de Dados' : '3. Data Protection'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações. Seus dados são armazenados em servidores seguros e acessados apenas por pessoal autorizado.'
                  : 'We implement technical and organizational security measures to protect your information. Your data is stored on secure servers and accessed only by authorized personnel.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '4. Seus Direitos' : '4. Your Rights'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Você tem direito a acessar, corrigir ou excluir seus dados pessoais. Também pode solicitar uma cópia de suas informações ou retirar seu consentimento para processamento.'
                  : 'You have the right to access, correct, or delete your personal data. You can also request a copy of your information or withdraw your consent for processing.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '5. Contato' : '5. Contact'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Para questões sobre privacidade ou exercer seus direitos, entre em contato conosco através do e-mail: privacy@futurostech.com'
                  : 'For privacy concerns or to exercise your rights, contact us at: privacy@futurostech.com'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-light mb-4 text-white/90">
                {language === 'pt' ? '6. Atualizações' : '6. Updates'}
              </h2>
              <p className="text-neutral-400 text-sm leading-relaxed">
                {language === 'pt'
                  ? 'Esta política pode ser atualizada periodicamente. Recomendamos que você revise regularmente para se manter informado sobre como protegemos suas informações.'
                  : 'This policy may be updated periodically. We recommend that you review it regularly to stay informed about how we protect your information.'}
              </p>
            </div>
          </div>

          <p className="text-sm text-neutral-400 mt-8 text-center">
            {language === 'pt'
              ? 'Última atualização: Janeiro 2024'
              : 'Last updated: January 2024'}
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 text-center bg-black">
        <p className="text-neutral-500 text-xs">
          Futuros Tech - Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
} 