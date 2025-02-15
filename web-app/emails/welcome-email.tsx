import {
  Button,
  CodeInline,
  Container,
  Font,
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

export default function WelcomeEmail({
  studentName = '[Student Name]',
}: Readonly<EmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>Welcome to the BookWise Library</title>
          <Font
            fontFamily="IBM Plex Sans"
            fallbackFontFamily="sans-serif"
            webFont={{
              url: 'https://lms-university.vercel.app/fonts/IBMPlexSans-Regular.woff2',
              format: 'woff2',
            }}
          />
        </Head>
        <Preview>
          Welcome to the BookWise Library, Your Reading Companion!
        </Preview>

        <Container className="mx-auto my-[40px] h-[640px] w-[649px] rounded-[12px] bg-[#111624] px-[40px] py-[20px] font-sans text-[#d6e0ff]">
          {/* Logo Section */}
          <Section className="flex flex-row text-white">
            <Img
              src="https://lms-university.vercel.app/images/logo.png"
              alt="bookwise logo"
              className="inline size-auto"
              width="40"
              height="32"
            />
            <CodeInline className="m-[4px] text-2xl font-semibold">
              BookWise
            </CodeInline>
          </Section>

          <Hr
            color="#232839"
            className="my-[20px] h-[3px] w-[100%] shrink-0 rounded-[9999px] border-none outline-none"
            style={{ borderTop: '0px' }}
          />

          {/* Main Content */}
          <Section className="mt-[32px]">
            <Heading className="m-[0px] text-2xl font-bold leading-tight text-white">
              Welcome to BookWise, Your Reading Companion!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              Welcome to BookWise! We're excited to have you join our community
              of book enthusiasts. Explore a wide range of books, borrow with
              ease, and manage your reading journey seamlessly.
            </Text>

            <Text className="mt-[24px] text-lg leading-relaxed">
              Get started by logging in to your account:
            </Text>

            <Button
              href="https://lms-university.vercel.app/sign-in"
              className="mt-[10px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              Login to BookWise
            </Button>

            <Text className="mt-[32px] text-lg">
              Happy reading,
              <br />
              The Bookwise Team
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
