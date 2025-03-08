'use client';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How do I renew my borrowed books?',
    answer:
      "You can renew your books up to 2 times if no one else has reserved them. Simply log in to your account, go to 'My Loans', and click the 'Renew' button next to the book you wish to extend. Alternatively, you can visit the circulation desk or call us during operating hours.",
  },
  {
    question: 'What happens if I return a book late?',
    answer:
      "Late returns incur a fine of $0.50 per day per item, up to a maximum of $25 per item. If you have outstanding fines exceeding $10, you won't be able to borrow additional materials until the fine is paid. You can pay fines online through your account or at the circulation desk.",
  },
  {
    question: "How can I request a book that's not in the library collection?",
    answer:
      "You can request new acquisitions through the 'Book Request' form in your account or by contacting the acquisitions department directly. For books available at other libraries, you can use our Interlibrary Loan service. Please note that processing these requests typically takes 1-3 weeks.",
  },
  {
    question: "Can I access the library's electronic resources off-campus?",
    answer:
      "Yes, all electronic resources can be accessed off-campus. Simply use your university credentials to log in through our proxy server when prompted. If you're having trouble accessing resources remotely, please contact our technical support team.",
  },
  {
    question: 'How do I reserve a study room?',
    answer:
      "Study rooms can be reserved up to 2 weeks in advance through the 'Room Reservation' system on our website. Undergraduate students can reserve rooms for up to 3 hours per day, while graduate students and faculty can reserve for up to 6 hours. Rooms not claimed within 15 minutes of the reservation start time may be reassigned.",
  },
  {
    question: 'What should I do if I lost a library book?',
    answer:
      "If you've lost a library book, please report it immediately to the circulation desk. You'll be charged the replacement cost of the book plus a $15 processing fee. If you find the book within 30 days of paying the replacement cost, you can return it for a refund (excluding the processing fee).",
  },
] as const;

export default function Faq() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  return (
    <div className="rounded-xl bg-dark-800 p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold text-light-100">
        Frequently Asked Questions
      </h2>

      <Accordion
        type="multiple"
        value={openItems}
        onValueChange={setOpenItems}
        className="w-full"
      >
        {faqs.map((faq, index) => (
          <AccordionItem
            key={index + 1}
            value={`item-${index}`}
            className="border-b border-dark-600"
          >
            <AccordionTrigger className="text-left font-medium text-light-100 hover:text-primary">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-light-200">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-6 text-center">
        <p className="text-light-200">
          Don&apos;t see your question here? Please contact us using the form above.
        </p>
      </div>
    </div>
  );
}
