export const siteConfig = {
  name: 'AIOU Assignment Studio',
  tagline: 'AI-Powered Assignment & LMS Practice Platform',
  description: 'Create assignments more efficiently with AI assistance. Upload PDF, DOCX, or photos of your questions, prepare editable answers, and export your work into Word or PDF with 30 AIOU-style cover designs.',
  whatsapp: {
    number: '923401071629',
    display: '+92 340 1071629',
    url: 'https://wa.me/923401071629',
  },
  routes: {
    studentApp: '/app',
    home: '/',
    pricing: '/pricing',
    guides: '/#faqs',
    blogs: '/#blogs',
    contact: '/#contact',
  },
  api: {
    baseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || '',
  },
  easypaisa: {
    available: false as const,
    accountNumber: null as null,
    accountHolder: null as null,
    note: 'Payment details will be announced soon. Please contact us via WhatsApp for current payment options.',
  },
  credits: {
    freeOnSignup: 2,
    promotionalMessage: 'Create your account and get 2 free credits to try the platform.',
  },
  social: {
    whatsapp: 'https://wa.me/923401071629',
  },
  legal: {
    privacyPolicy: '/privacy-policy',
    termsAndConditions: '/terms-and-conditions',
  },
} as const
