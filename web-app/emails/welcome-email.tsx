import config from '@/lib/config';
import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';
import Config from '../tailwind.config'

type WelcomeEmailProps = {
  studentName?: string;
};

export default function WelcomeEmail({
  studentName = '[Student Name]',
}: Readonly<WelcomeEmailProps>) {
  return (
    <Html>
      <Head>
        <title>Welcome to BookWise Library</title>
      </Head>
      <Preview>
        Welcome to the BookWise Library, Your Reading Companion!
      </Preview>
      <Tailwind config={Config}>
        <Body className="bg-dark-100 font-bebas-neue">
          <Container className="mx-auto my-10 max-w-2xl p-5">
            {/* Logo Section */}
            <Section className="flex items-center gap-2 text-white">
              <Img
                src="../public/icons/logo.svg"
                alt="BookWise Library"
                width={50}
                height={50}
              />
              <Text className="text-2xl font-bold">BookWise</Text>
            </Section>

            <Hr className="my-5 h-[1px] w-full shrink-0 rounded-full bg-border bg-dark-300" />

            {/* Main Content */}
            <Section className="mt-8">
              <Heading className="m-0 text-3xl font-bold leading-tight">
                Welcome to BookWise, Your Reading Companion!
              </Heading>

              <Text className="mt-6 text-xl leading-relaxed text-light-100">
                Hi {studentName},
              </Text>

              <Text className="mt-4 leading-relaxed text-light-100">
                Welcome to BookWise! We're excited to have you join our
                community of book enthusiasts. Explore a wide range of books,
                borrow with ease, and manage your reading journey seamlessly.
              </Text>

              <Text className="mt-6 text-light-300">
                Get started by logging in to your account:
              </Text>

              <Button
                href={`${config.env.prodApiEndpoint}/sign-in`}
                className="mt-6 rounded-md bg-primary px-8 py-4 text-center text-base font-bold text-dark-100"
              >
                Login to BookWise
              </Button>

              <Text className="mt-8 text-light-100">Happy reading,</Text>
              <Text className="mt-1 text-light-100">The Bookwise Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
