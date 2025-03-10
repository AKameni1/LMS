"use client";
import React from "react";

const FAQ = () => {
  const faqs = [
    {
      question: "How to borrow a book? ",
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
    {
      question: "",
      answer: "",
    },
  ];

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-semibold text-center mb-6">FAQ - Questions Fréquentes</h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="p-4 border rounded-lg bg-white shadow">
            <h2 className="text-lg font-bold">{faq.question}</h2>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
