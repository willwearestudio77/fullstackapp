// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import sgMail from '@sendgrid/mail'
const {ADMIN_EMAIL,SENDGRID_API_KEY}=process.env;
sgMail.setApiKey(SENDGRID_API_KEY);
const msg = {
  to: 'test@example.com',
  from: 'test@example.com', // Use the email address or domain you verified above
  subject: 'Sending with Twilio SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

type Data = {
  name: string
}

const handler = async(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const {from,subject,message}=req.body
  const msg = {
    to:from,
    cc:ADMIN_EMAIL, // Use the email address or domain you verified above
    from:ADMIN_EMAIL,
    subject,
    text: message,
    html: `<p>${message}</p>`,
  };
  console.log(req.body);
  console.log(msg);
  
  try {
    await sgMail.send(msg);
    res.status(200).end()
  } catch (error) {
    console.error(error);

    if (error.response) {
      console.error(error.response.body)
    }
  res.status(500).json(error);
}
}
export default handler;
