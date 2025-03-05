import 'server-only';

import { Resend } from 'resend';
import config from '../config';
import { getErrorMessage } from '../utils';
import React from 'react';
import BookReturnConfirmationEmail from '@/emails/book-return-confirmation-email';
import ApprovalEmail from '@/emails/approval-email';

const resend = new Resend(config.env.resendToken);

export const sendEmailReturnConfirmation = async ({
  studentName,
  bookTitle,
  studentEmail,
  isOverdue,
}: Readonly<{
  studentName: string;
  bookTitle: string;
  studentEmail: string;
  isOverdue: boolean;
}>) => {
  try {
    if (!studentName || !bookTitle || !studentEmail) {
      throw new Error('Missing required email parameters');
    }
    const response = await resend.emails.send({
      from: 'BookWise Library <contact@arthurkameni.com>',
      to: studentEmail,
      subject: '🔙 Book Return Confirmation',
      react: React.createElement(BookReturnConfirmationEmail, {
        studentName,
        bookTitle,
        isOverdue,
      }),
    });

    if (response.error) {
      console.log(response.error.message);
      throw new Error(getErrorMessage(response.error.message));
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error));
  }
};

export const sendEmailApprovalAccount = async ({
  studentName,
  studentEmail,
}: Readonly<{
  studentName: string;
  studentEmail: string;
}>) => {
  try {
    if (!studentName) {
      throw new Error('Missing required email parameters');
    }

    const response = await resend.emails.send({
      from: 'BookWise Library <contact@arthurkameni.com>',
      to: studentEmail,
      subject: '🆗 Account Approval',
      react: React.createElement(ApprovalEmail, {
        studentName,
      }),
    });

    if (response.error) {
      console.log(response.error.message);
      throw new Error(getErrorMessage(response.error.message));
    }

    return {
      success: true,
      data: response,
    };
  } catch (error) {
    console.log(error);
    throw new Error(getErrorMessage(error));
  }
};
