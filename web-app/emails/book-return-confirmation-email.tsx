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

type BookReturnConfirmationEmailProps = {
  studentName: string;
  bookTitle: string;
};

export default function BookReturnConfirmationEmail({
  studentName = '[Student Name]',
  bookTitle = '[Book Title]',
}: Readonly<BookReturnConfirmationEmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>Book Return Confirmation</title>
          <Font
            fontFamily="IBM Plex Sans"
            fallbackFontFamily="sans-serif"
            webFont={{
              url: 'https://lms-university.vercel.app/fonts/IBMPlexSans-Regular.woff2',
              format: 'woff2',
            }}
          />
        </Head>
        <Preview>Book Return Confirmation</Preview>

        <Container className="mx-auto my-[40px] h-[640px] w-[649px] rounded-[12px] bg-[#111624] px-[40px] py-[20px] font-sans text-[#d6e0ff]">
          {/* Logo Section */}
          <Section className="flex items-center text-white">
            <Img
              src="https://lms-university.vercel.app/images/logo.png"
              alt="bookwise logo"
              className="inline"
              width="40"
              height="32"
            />
            <Text className="m-[4px] inline text-2xl font-semibold">
              BookWise
            </Text>
          </Section>

          <Hr
            color="#232839"
            className="my-[20px] h-[3px] w-[100%] shrink-0 rounded-[9999px] border-none outline-none"
          />

          {/* Main Content */}
          <Section className="mt-[32px]">
            <Heading className="m-[0px] text-2xl font-bold leading-tight text-white">
              Thank You for Returning {bookTitle}!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              We&apos;ve successfully received your return of{' '}
              <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                {bookTitle}
              </CodeInline>
              . Thank you for returning it on time.
            </Text>

            <Text className="mt-[24px] text-lg leading-relaxed">
              Looking for your next read? Browse our collection and borrow your
              next favorite book!
            </Text>

            <Button
              href={`https://lms-university.vercel.app/library?filter=newest`}
              className="mt-[10px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              Explore New Books
            </Button>

            <Text className="mt-[32px] text-lg">
              Happy exploring,
              <br />
              The Bookwise Team
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
