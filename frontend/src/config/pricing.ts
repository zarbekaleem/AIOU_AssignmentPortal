export const pricingConfig = {
  payAsYouGo: {
    pricePerCredit: 25,
    currency: 'Rs.',
  },
  vip: {
    price: 40000,
    credits: 2000,
    durationDays: 365,
  },
  paymentMethods: {
    easypaisa: {
      name: 'EasyPaisa',
      accountHolder: null,
      paymentNumber: '03401071629',
    },
    jazzcash: {
      name: 'JazzCash',
      accountHolder: 'Muhammad Kaleem',
      paymentNumber: '03096855100',
    },
  },
  creditRules: {
    assignmentCredits: 1,
    quizCredits: 1,
    quizMcqs: 30,
    quizMinutes: 45,
  },
} as const
