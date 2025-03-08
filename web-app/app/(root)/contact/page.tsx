import ContactForm from '@/components/contact/contact-form';
import ContactInfo from '@/components/contact/contact-info';
import Faq from '@/components/contact/faq';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | BookWise',
  description:
    'Contact our library staff for assistance with books, borrowing, or technical support.',
};

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-2">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-light-100">Contact Us</h1>
        <p className="mt-2 text-light-200">
          We&apos;re here to help with any questions or issues you might have
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <ContactInfo />
        </div>
        <div className="lg:col-span-2">
          <div className="rounded-xl bg-dark-800 p-6 shadow-lg">
            <ContactForm />
          </div>
        </div>
      </div>

      <div className="mt-16">
        <Faq />
      </div>
    </div>
  );
}
