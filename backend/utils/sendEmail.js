const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY, EMAIL_FROM } = require('../config');

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (to, subject, text) => {
  try {
    await sgMail.send({ to, from: EMAIL_FROM, subject, text });
  } catch (error) {
    console.error('Error sending email', error);
  }
};

module.exports = { sendEmail };
