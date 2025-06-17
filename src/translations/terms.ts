type Translation = {
  title: string;
  legalDisclaimer: string;
  intro: string;
  serviceTitle: string;
  servicePoints: string[];
  riskAcknowledgment: string;
  userDiscretion: string;
  finalDisclaimer: string;
  footerLink: string;
  accessSignals: string;
  redirectingText: string;
  clickText: string;
  accessButton: string;
};

type Translations = {
  en: Translation;
  pt: Translation;
};

export const translations: Translations = {
  en: {
    title: 'Terms of Use',
    legalDisclaimer: '⚠️ Important Legal Disclaimer',
    intro: 'The information made available through this service is based on technical analysis, the interpretation of chart patterns, and behavioral studies of the cryptocurrency market. Our objective is to highlight potentially strategic entry points, which does not imply that such trades are being executed by us personally.',
    serviceTitle: 'This service:',
    servicePoints: [
      'Does not constitute personalized investment advice;',
      'Does not provide any assurance or guarantee of financial returns;',
      'Does not substitute professional financial consulting or planning;',
      'Is intended solely for individuals seeking to monitor the cryptocurrency market for educational purposes, based on publicly available data and analytical techniques.'
    ],
    riskAcknowledgment: 'By accessing and using this service, the user expressly acknowledges and agrees that the cryptocurrency market is inherently volatile and may result in substantial financial losses.',
    userDiscretion: 'Any action taken based on the analyses provided is done voluntarily and entirely at the user\'s own discretion and risk.',
    finalDisclaimer: 'This service is strictly informational and educational in nature, and should not be interpreted as a financial recommendation or endorsement of any specific investment strategy.',
    footerLink: 'Terms of Use',
    accessSignals: 'Access Crypto Signals',
    redirectingText: 'Redirecting to WhatsApp in:',
    clickText: 'If not redirected automatically, click the button below:',
    accessButton: 'ACCESS THE 6 NEW CRYPTO SIGNALS TODAY →'
  },
  pt: {
    title: 'Termos de Uso',
    legalDisclaimer: '⚠️ Aviso Legal Importante',
    intro: 'As informações disponibilizadas através deste serviço são baseadas em análise técnica, interpretação de padrões gráficos e estudos comportamentais do mercado de criptomoedas. Nosso objetivo é destacar pontos de entrada potencialmente estratégicos, o que não implica que tais operações estejam sendo executadas por nós pessoalmente.',
    serviceTitle: 'Este serviço:',
    servicePoints: [
      'Não constitui aconselhamento personalizado de investimento;',
      'Não fornece qualquer garantia ou segurança de retornos financeiros;',
      'Não substitui consultoria ou planejamento financeiro profissional;',
      'Destina-se exclusivamente a indivíduos que buscam monitorar o mercado de criptomoedas para fins educacionais, com base em dados públicos e técnicas analíticas.'
    ],
    riskAcknowledgment: 'Ao acessar e utilizar este serviço, o usuário reconhece e concorda expressamente que o mercado de criptomoedas é inerentemente volátil e pode resultar em perdas financeiras substanciais.',
    userDiscretion: 'Qualquer ação tomada com base nas análises fornecidas é feita voluntariamente e inteiramente por conta e risco do usuário.',
    finalDisclaimer: 'Este serviço é estritamente informativo e educacional por natureza, e não deve ser interpretado como uma recomendação financeira ou endosso de qualquer estratégia específica de investimento.',
    footerLink: 'Termos de Uso',
    accessSignals: 'Acessar Sinais de Cripto',
    redirectingText: 'Redirecionando para WhatsApp em:',
    clickText: 'Se não for redirecionado automaticamente, clique no botão abaixo:',
    accessButton: 'ACESSAR OS 6 NOVOS SINAIS DE CRIPTO HOJE →'
  }
}; 