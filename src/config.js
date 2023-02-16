const config = {
  env: process.env.NODE_ENV,
  baseURI: `${process.env.REACT_APP_BASE_URI}`,
  googleAnalytics: `${process.env.REACT_APP_GOOGLE_ANALYTICS}`,
  endpoints: {
    auth: 'pin/authenticate',
    checklist: '/checklist/response/:id',
    checklists: 'checklist',
    users: '/user',
    section: 'section',
    response: 'response',
    machine: 'machine',
    sku: 'sku',
    image: 'image'
  },
  backendUrl: 'https://staging.jaalx.com/altimate/',
  forgotPasswordUrl: 'https://staging.jaalx.com/altimate/auth/forgot-password'
};

export default config;
