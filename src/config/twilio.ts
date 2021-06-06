export default {
  twilio: {
    accountSid: process.env.TWILLO_ACCOUNT_SID || '*',
    authToken: process.env.TWILLO_AUTH_TOKEN || '*',
    servicesSid: process.env.TWILLO_SERVICES_SID || '*',
  },
};
