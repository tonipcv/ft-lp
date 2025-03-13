"use client";

import { useState } from "react";
import { Globe } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TermsOfUse() {
  const [language, setLanguage] = useState<'pt' | 'en'>('pt');

  return (
    <div className="font-montserrat bg-black text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.jpg"
              alt="Futuros Tech"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="text-sm font-light">Futuros Tech</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <button
              onClick={() => setLanguage(language === 'pt' ? 'en' : 'pt')}
              className="flex items-center gap-1 text-xs text-neutral-400 hover:text-white transition-colors"
            >
              <Globe className="h-3 w-3" />
              {language.toUpperCase()}
            </button>
            <Link 
              href="/politicasdeprivacidade"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-light mb-8 text-center bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          {language === 'pt' ? (
            <>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm text-neutral-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                <p className="mt-4">
                  Bem-vindo à Futuros Tech. Ao acessar e usar nosso site e serviços, você concorda com estes termos de uso. 
                  Por favor, leia-os atentamente antes de utilizar nossa plataforma.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-light text-green-400">1. Definições</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>"Plataforma" refere-se ao site e serviços da Futuros Tech</li>
                    <li>"Usuário" refere-se a qualquer pessoa que acesse ou use nossa plataforma</li>
                    <li>"Conteúdo" inclui textos, imagens, vídeos, cursos e materiais disponibilizados</li>
                    <li>"Serviços" refere-se a todos os produtos e serviços oferecidos pela Futuros Tech</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">2. Aceitação dos Termos</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Ao usar nossa plataforma, você concorda com:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Todos os termos e condições aqui estabelecidos</li>
                    <li>Nossa Política de Privacidade</li>
                    <li>Quaisquer termos adicionais específicos de serviços</li>
                    <li>Todas as leis e regulamentos aplicáveis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">3. Elegibilidade</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Para usar nossos serviços, você deve:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Ter pelo menos 18 anos de idade</li>
                    <li>Ter capacidade legal para contratar</li>
                    <li>Fornecer informações verdadeiras e precisas</li>
                    <li>Manter suas informações de conta atualizadas</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">4. Conta e Registro</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">4.1. Criação de Conta</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer informações precisas e completas</li>
                    <li>Manter a confidencialidade de suas credenciais</li>
                    <li>Não compartilhar sua conta com terceiros</li>
                    <li>Notificar imediatamente sobre uso não autorizado</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">4.2. Responsabilidades</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Você é responsável por todas as atividades em sua conta</li>
                    <li>Manter a segurança de suas credenciais</li>
                    <li>Atualizar suas informações quando necessário</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">5. Serviços e Pagamentos</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">5.1. Descrição dos Serviços</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cursos e materiais educacionais</li>
                    <li>Conteúdo informativo sobre mercado financeiro</li>
                    <li>Ferramentas e recursos de aprendizado</li>
                    <li>Suporte e assistência técnica</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">5.2. Pagamentos</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Preços e condições claramente informados</li>
                    <li>Processamento seguro de pagamentos</li>
                    <li>Política de reembolso específica por serviço</li>
                    <li>Taxas e impostos aplicáveis</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">6. Propriedade Intelectual</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">6.1. Nossos Direitos</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Todo o conteúdo é protegido por direitos autorais</li>
                    <li>Marcas registradas e propriedade intelectual</li>
                    <li>Proibição de uso não autorizado</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">6.2. Restrições</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Não copiar ou distribuir o conteúdo</li>
                    <li>Não modificar ou criar trabalhos derivados</li>
                    <li>Não usar para fins comerciais sem autorização</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">7. Conduta do Usuário</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">7.1. Comportamento Proibido</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violar leis ou regulamentos</li>
                    <li>Interferir no funcionamento da plataforma</li>
                    <li>Enviar conteúdo prejudicial ou ofensivo</li>
                    <li>Tentar acessar áreas restritas</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">7.2. Consequências</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Suspensão ou encerramento da conta</li>
                    <li>Ações legais quando necessário</li>
                    <li>Responsabilidade por danos causados</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">8. Isenção de Responsabilidade</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Não nos responsabilizamos por:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Decisões de investimento dos usuários</li>
                    <li>Perdas financeiras</li>
                    <li>Interpretação incorreta do conteúdo</li>
                    <li>Problemas técnicos ou interrupções</li>
                    <li>Ações de terceiros</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">9. Modificações dos Termos</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Direito de modificar os termos a qualquer momento</li>
                    <li>Notificação sobre alterações significativas</li>
                    <li>Continuidade de uso implica aceitação</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">10. Lei Aplicável</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Termos regidos pelas leis brasileiras</li>
                    <li>Foro específico para resolução de disputas</li>
                    <li>Arbitragem quando aplicável</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">11. Contato</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Para dúvidas sobre os termos de uso:</p>
                  <ul className="list-none space-y-2">
                    <li>Email: terms@futurostech.com</li>
                    <li>WhatsApp: [Número de Contato]</li>
                    <li>Endereço: [Endereço Físico]</li>
                  </ul>
                </div>
              </section>

              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-lg p-6">
                <p className="text-sm text-neutral-400">
                  Estes termos de uso podem ser atualizados periodicamente. Recomendamos que você 
                  revise esta página regularmente para se manter informado sobre nossos termos e condições.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <p className="mt-4">
                  Welcome to Futuros Tech. By accessing and using our website and services, you agree to these terms of use. 
                  Please read them carefully before using our platform.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-light text-green-400">1. Definitions</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>"Platform" refers to Futuros Tech's website and services</li>
                    <li>"User" refers to any person accessing or using our platform</li>
                    <li>"Content" includes texts, images, videos, courses, and materials provided</li>
                    <li>"Services" refers to all products and services offered by Futuros Tech</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">2. Acceptance of Terms</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">By using our platform, you agree to:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All terms and conditions established herein</li>
                    <li>Our Privacy Policy</li>
                    <li>Any additional service-specific terms</li>
                    <li>All applicable laws and regulations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">3. Eligibility</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">To use our services, you must:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Be at least 18 years old</li>
                    <li>Have legal capacity to contract</li>
                    <li>Provide true and accurate information</li>
                    <li>Keep your account information updated</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">4. Account and Registration</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">4.1. Account Creation</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide accurate and complete information</li>
                    <li>Maintain credential confidentiality</li>
                    <li>Do not share your account with others</li>
                    <li>Notify immediately of unauthorized use</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">4.2. Responsibilities</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>You are responsible for all account activities</li>
                    <li>Maintain credential security</li>
                    <li>Update your information when necessary</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">5. Services and Payments</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">5.1. Service Description</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Courses and educational materials</li>
                    <li>Financial market informative content</li>
                    <li>Learning tools and resources</li>
                    <li>Technical support and assistance</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">5.2. Payments</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Clearly informed prices and conditions</li>
                    <li>Secure payment processing</li>
                    <li>Service-specific refund policy</li>
                    <li>Applicable fees and taxes</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">6. Intellectual Property</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">6.1. Our Rights</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>All content is protected by copyright</li>
                    <li>Trademarks and intellectual property</li>
                    <li>Prohibition of unauthorized use</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">6.2. Restrictions</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Do not copy or distribute content</li>
                    <li>Do not modify or create derivative works</li>
                    <li>Do not use for commercial purposes without authorization</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">7. User Conduct</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">7.1. Prohibited Behavior</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Violate laws or regulations</li>
                    <li>Interfere with platform operation</li>
                    <li>Submit harmful or offensive content</li>
                    <li>Attempt to access restricted areas</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">7.2. Consequences</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Account suspension or termination</li>
                    <li>Legal action when necessary</li>
                    <li>Liability for caused damages</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">8. Disclaimer</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">We are not responsible for:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Users' investment decisions</li>
                    <li>Financial losses</li>
                    <li>Incorrect content interpretation</li>
                    <li>Technical issues or interruptions</li>
                    <li>Third-party actions</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">9. Terms Modifications</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Right to modify terms at any time</li>
                    <li>Notification of significant changes</li>
                    <li>Continued use implies acceptance</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">10. Applicable Law</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Terms governed by Brazilian law</li>
                    <li>Specific jurisdiction for dispute resolution</li>
                    <li>Arbitration when applicable</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">11. Contact</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">For questions about terms of use:</p>
                  <ul className="list-none space-y-2">
                    <li>Email: terms@futurostech.com</li>
                    <li>WhatsApp: [Contact Number]</li>
                    <li>Address: [Physical Address]</li>
                  </ul>
                </div>
              </section>

              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-lg p-6">
                <p className="text-sm text-neutral-400">
                  These terms of use may be updated periodically. We recommend that you 
                  review this page regularly to stay informed about our terms and conditions.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Futuros Tech. {language === 'pt' ? 'Todos os direitos reservados.' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
} 