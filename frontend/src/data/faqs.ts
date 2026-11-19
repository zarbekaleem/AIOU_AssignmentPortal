export interface FAQ {
  id: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: '1',
    question: 'What is AIOU Assignment Studio?',
    answer: 'AIOU Assignment Studio is an independent educational platform that helps Allama Iqbal Open University students prepare and format their assignments using AI-assisted tools, document processing, and original AIOU-style cover designs. It is not affiliated with or endorsed by AIOU.',
  },
  {
    id: '2',
    question: 'How can I create an assignment?',
    answer: 'After creating an account, upload your assignment question paper as a PDF, DOCX, or image file. The platform extracts the questions for your review, then generates structured answers that you can edit before exporting as Word or PDF.',
  },
  {
    id: '3',
    question: 'Which file formats can I upload?',
    answer: 'You can upload assignment question papers in PDF, Microsoft Word (DOCX), JPG, and PNG formats. Scanned documents are supported through OCR text recognition.',
  },
  {
    id: '4',
    question: 'Can I download assignments in Word format?',
    answer: 'Yes. You can export your completed assignment as a Microsoft Word (DOCX) document, complete with your selected cover design and professional formatting.',
  },
  {
    id: '5',
    question: 'Can I export assignments as PDF?',
    answer: 'Yes. PDF export is supported alongside Word export. Both formats include the cover design and consistent academic formatting.',
  },
  {
    id: '6',
    question: 'Are AIOU-style cover designs available?',
    answer: 'Yes. The platform provides approximately 30 original cover page designs that follow general AIOU assignment style conventions. These are original designs and are not official university templates.',
  },
  {
    id: '7',
    question: 'What is Aaghi LMS quiz practice?',
    answer: 'The quiz practice module lets you upload MCQ question images from your study materials, extract questions using OCR, and practice them with timers and scoring. This is an independent practice tool and does not connect to or interact with the actual Aaghi LMS system.',
  },
  {
    id: '8',
    question: 'How many free credits do new users receive?',
    answer: 'New users receive 2 complimentary credits upon creating their account. These can be used to try the assignment generation feature. Additional credits are available for purchase.',
  },
  {
    id: '9',
    question: 'How can I purchase additional credits?',
    answer: 'Credit purchase options and pricing details will be announced. Please check the Pricing Packages section or contact us via WhatsApp for the most current information.',
  },
  {
    id: '10',
    question: 'How can I contact support?',
    answer: 'You can reach our support team via WhatsApp at +92 340 1071629. Click the WhatsApp contact link in the footer to open a conversation directly.',
  },
]
