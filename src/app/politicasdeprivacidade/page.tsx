"use client";

import { useState } from "react";
import { Globe, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              href="/termosdeuso"
              className="text-xs text-neutral-400 hover:text-white transition-colors"
            >
              {language === 'pt' ? 'Termos de Uso' : 'Terms of Use'}
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 pt-32 pb-16">
        <h1 className="text-4xl font-light mb-8 text-center bg-gradient-to-r from-white via-green-400 to-white bg-clip-text text-transparent">
          {language === 'pt' ? 'Política de Privacidade' : 'Privacy Policy'}
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          {language === 'pt' ? (
            <>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm text-neutral-400">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                <p className="mt-4">
                  A Futuros Tech está comprometida com a proteção da sua privacidade. Esta política descreve como coletamos, 
                  usamos e protegemos suas informações pessoais quando você utiliza nosso site e serviços.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-light text-green-400">1. Informações que Coletamos</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">1.1. Informações fornecidas por você</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Nome completo</li>
                    <li>Endereço de e-mail</li>
                    <li>Número do WhatsApp</li>
                    <li>Informações sobre capital de investimento</li>
                    <li>Dados de perfil e preferências</li>
                    <li>Histórico de interações com nossa plataforma</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">1.2. Informações coletadas automaticamente</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Endereço IP</li>
                    <li>Tipo de navegador e dispositivo</li>
                    <li>Páginas visitadas e tempo de permanência</li>
                    <li>Localização geográfica aproximada</li>
                    <li>Dados de uso e interação com o conteúdo</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">2. Como Usamos Suas Informações</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">2.1. Finalidades principais</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Fornecer acesso aos nossos cursos e conteúdos</li>
                    <li>Personalizar sua experiência de aprendizado</li>
                    <li>Enviar atualizações e materiais educacionais</li>
                    <li>Processar transações e pagamentos</li>
                    <li>Fornecer suporte técnico e atendimento</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">2.2. Finalidades secundárias</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Melhorar nossos serviços e conteúdos</li>
                    <li>Realizar análises e pesquisas de mercado</li>
                    <li>Prevenir fraudes e atividades ilegais</li>
                    <li>Cumprir obrigações legais e regulatórias</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">3. Base Legal para Processamento</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Processamos seus dados pessoais com base em:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Execução de contrato quando você se inscreve em nossos serviços</li>
                    <li>Consentimento para envio de comunicações de marketing</li>
                    <li>Interesses legítimos para melhorar nossos serviços</li>
                    <li>Obrigações legais quando exigido por lei</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">4. Compartilhamento de Dados</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">4.1. Parceiros e Prestadores de Serviço</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Processadores de pagamento</li>
                    <li>Serviços de hospedagem e armazenamento</li>
                    <li>Ferramentas de análise e marketing</li>
                    <li>Provedores de suporte ao cliente</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">4.2. Outras Situações</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Quando exigido por lei ou ordem judicial</li>
                    <li>Para proteger nossos direitos legais</li>
                    <li>Em caso de reorganização empresarial</li>
                    <li>Com seu consentimento expresso</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">5. Cookies e Tecnologias de Rastreamento</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">5.1. Tipos de Cookies</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Cookies essenciais para funcionamento do site</li>
                    <li>Cookies de preferências e personalização</li>
                    <li>Cookies analíticos e de desempenho</li>
                    <li>Cookies de publicidade e marketing</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">5.2. Controle de Cookies</h3>
                  <p>
                    Você pode gerenciar suas preferências de cookies através das configurações do seu navegador. 
                    Note que desabilitar certos cookies pode afetar a funcionalidade do site.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">6. Seus Direitos</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Você tem os seguintes direitos em relação aos seus dados pessoais:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Acessar seus dados pessoais</li>
                    <li>Corrigir dados incorretos ou desatualizados</li>
                    <li>Solicitar a exclusão de seus dados</li>
                    <li>Retirar seu consentimento a qualquer momento</li>
                    <li>Solicitar a portabilidade dos dados</li>
                    <li>Opor-se ao processamento em certas circunstâncias</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">7. Segurança dos Dados</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Criptografia de dados em trânsito e em repouso</li>
                    <li>Controles de acesso rigorosos</li>
                    <li>Monitoramento de segurança contínuo</li>
                    <li>Backups regulares e planos de recuperação</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">8. Retenção de Dados</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p>
                    Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades 
                    descritas nesta política ou conforme exigido por lei. Quando os dados não forem mais 
                    necessários, serão excluídos de forma segura.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">9. Contato</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">Para questões sobre privacidade ou exercício de seus direitos:</p>
                  <ul className="list-none space-y-2">
                    <li>Email: privacy@futurostech.com</li>
                    <li>WhatsApp: [Número de Contato]</li>
                    <li>Endereço: [Endereço Físico]</li>
                  </ul>
                </div>
              </section>

              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-lg p-6">
                <p className="text-sm text-neutral-400">
                  Esta política de privacidade pode ser atualizada periodicamente. Recomendamos que você 
                  revise esta página regularmente para se manter informado sobre nossas práticas de privacidade.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="bg-white/5 border border-white/10 rounded-lg p-6">
                <p className="text-sm text-neutral-400">Last updated: {new Date().toLocaleDateString('en-US')}</p>
                <p className="mt-4">
                  Futuros Tech is committed to protecting your privacy. This policy describes how we collect, 
                  use, and protect your personal information when you use our website and services.
                </p>
              </div>

              <section>
                <h2 className="text-2xl font-light text-green-400">1. Information We Collect</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">1.1. Information you provide</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>WhatsApp number</li>
                    <li>Investment capital information</li>
                    <li>Profile data and preferences</li>
                    <li>Platform interaction history</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">1.2. Automatically collected information</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>IP address</li>
                    <li>Browser and device type</li>
                    <li>Pages visited and time spent</li>
                    <li>Approximate geographic location</li>
                    <li>Usage data and content interaction</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">2. How We Use Your Information</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">2.1. Primary purposes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Provide access to our courses and content</li>
                    <li>Personalize your learning experience</li>
                    <li>Send updates and educational materials</li>
                    <li>Process transactions and payments</li>
                    <li>Provide technical support and assistance</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">2.2. Secondary purposes</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Improve our services and content</li>
                    <li>Conduct market analysis and research</li>
                    <li>Prevent fraud and illegal activities</li>
                    <li>Comply with legal and regulatory obligations</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">3. Legal Basis for Processing</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">We process your personal data based on:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Contract execution when you sign up for our services</li>
                    <li>Consent for marketing communications</li>
                    <li>Legitimate interests to improve our services</li>
                    <li>Legal obligations when required by law</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">4. Data Sharing</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">4.1. Partners and Service Providers</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Payment processors</li>
                    <li>Hosting and storage services</li>
                    <li>Analytics and marketing tools</li>
                    <li>Customer support providers</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">4.2. Other Situations</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>When required by law or court order</li>
                    <li>To protect our legal rights</li>
                    <li>In case of business reorganization</li>
                    <li>With your express consent</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">5. Cookies and Tracking Technologies</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <h3 className="text-lg mb-4">5.1. Types of Cookies</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Essential cookies for site functionality</li>
                    <li>Preference and personalization cookies</li>
                    <li>Analytics and performance cookies</li>
                    <li>Advertising and marketing cookies</li>
                  </ul>

                  <h3 className="text-lg mt-6 mb-4">5.2. Cookie Control</h3>
                  <p>
                    You can manage your cookie preferences through your browser settings. 
                    Note that disabling certain cookies may affect site functionality.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">6. Your Rights</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">You have the following rights regarding your personal data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Access your personal data</li>
                    <li>Correct incorrect or outdated data</li>
                    <li>Request deletion of your data</li>
                    <li>Withdraw your consent at any time</li>
                    <li>Request data portability</li>
                    <li>Object to processing in certain circumstances</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">7. Data Security</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">We implement technical and organizational security measures to protect your data:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Data encryption in transit and at rest</li>
                    <li>Strict access controls</li>
                    <li>Continuous security monitoring</li>
                    <li>Regular backups and recovery plans</li>
                  </ul>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">8. Data Retention</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p>
                    We retain your personal data only for as long as necessary to fulfill the purposes 
                    described in this policy or as required by law. When data is no longer needed, 
                    it will be securely deleted.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-light text-green-400">9. Contact</h2>
                <div className="bg-white/5 border border-white/10 rounded-lg p-6 mt-4">
                  <p className="mb-4">For privacy concerns or to exercise your rights:</p>
                  <ul className="list-none space-y-2">
                    <li>Email: privacy@futurostech.com</li>
                    <li>WhatsApp: [Contact Number]</li>
                    <li>Address: [Physical Address]</li>
                  </ul>
                </div>
              </section>

              <div className="bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-500/10 border border-green-500/20 rounded-lg p-6">
                <p className="text-sm text-neutral-400">
                  This privacy policy may be updated periodically. We recommend that you 
                  review this page regularly to stay informed about our privacy practices.
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