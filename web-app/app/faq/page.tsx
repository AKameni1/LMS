"use client";
import React from "react";
import Image from 'next/image';

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  return (
    <div className="faq-item p-6 bg-dark-600 text-white rounded-lg shadow-md">
      <h3 className="text-xl font-bold">{question}</h3>
      <p className="mt-2 text-light-100">{answer}</p>
    </div>
  );
};

const FAQ = () => {
  const faqs = [
    {
      question: "How to borrow a book?",
      answer: "Log in to your account, search for the desired book, and click on 'Borrow'. Your book will appear on your user dashboard.",
    },
    {
      question: "What to do if my account is not verified?",
      answer: "Contact an ADMINISTRATOR using the phone number on the back of your student ID card.",
    },
    {
      question: "How to print a receipt?",
      answer: "Go to your borrowing history, select the transaction, and click on the paper icon located below the title of the borrowed book.",
    },
    {
      question: "My account is blocked, what should I do?",
      answer: "Contact an administrator.",
    },
  ];

  return (
    <div className="library bg-cover  min-h-screen py-8 px-5" style={{ backgroundImage: 'url("/images/pattern.webp")'}}>
      <h1 className="text-3xl font-bold text-center text-light-100 mb-20">FAQ - Questions Fréquentes</h1>
      <div className="faq-list space-y-6">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

export default FAQ;
