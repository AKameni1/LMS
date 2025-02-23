import { Client as WorkflowClient } from '@upstash/workflow';
import { Client as QStashClient, resend } from '@upstash/qstash';

import config from './config';

export const workflowClient = new WorkflowClient({
  baseUrl: config.env.upstash.qstashUrl,
  token: config.env.upstash.qstashToken,
});

const qstashClient = new QStashClient({
  token: config.env.upstash.qstashToken,
});

export const sendEmail = async ({
  email,
  subject,
  message,
}: {
  email: string;
  subject: string;
  message: string;
}) => {
  try {
    if (!email || !subject || !message) {
      throw new Error('Missing required email parameters');
    }

    const response = await qstashClient.publishJSON({
      api: {
        name: 'email',
        provider: resend({ token: config.env.resendToken }),
      },
      body: {
        from: 'Arthur <contact@arthurkameni.com>',
        to: [email],
        subject: subject,
        html: typeof message === 'string' ? message : JSON.stringify(message),
      },
    });    
    return { success: true, data: response };
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
