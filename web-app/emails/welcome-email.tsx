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
      <Tailwind>
        <Body tw="bg-[#16191E] font-['IBM Plex Sans']">
          <Container tw="mx-auto my-[40px] w-[465px] p-[20px]">
            {/* Logo Section */}
            <Section tw="flex items-center gap-2 text-white">
              <Img
                src="https://lms-university.vercel.app/icons/logo.svg"
                alt="BookWise Library"
                width={50}
                height={50}
              />
              <Text tw="text-2xl font-bold">BookWise</Text>
            </Section>

            <Hr tw="my-[20px] h-[1px] w-[100%] shrink-0 rounded-full bg-[#232839] bg-border" />

            {/* Main Content */}
            <Section tw="mt-[32px]">
              <Heading tw="m-[0px] text-3xl font-bold leading-tight">
                Welcome to BookWise, Your Reading Companion!
              </Heading>

              <Text tw="mt-[24px] text-xl leading-relaxed text-[#d6e0ff]">
                Hi {studentName},
              </Text>

              <Text tw="mt-[16px] leading-relaxed text-[#d6e0ff]">
                Welcome to BookWise! We're excited to have you join our
                community of book enthusiasts. Explore a wide range of books,
                borrow with ease, and manage your reading journey seamlessly.
              </Text>

              <Text tw="mt-[24px] text-[#f8f8ff]">
                Get started by logging in to your account:
              </Text>

              <Button
                href="https://lms-university.vercel.app/sign-in"
                tw="mt-[24px] rounded-md bg-[#e7c9a5] px-[32px] py-[16px] text-center text-base font-bold text-[#16191e]"
              >
                Login to BookWise
              </Button>

              <Text tw="mt-[32px] text-[#d6e0ff]">Happy reading,</Text>
              <Text tw="mt-[4px] text-[#d6e0ff]">The Bookwise Team</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
