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

type BookOverdueEmailProps = {
  bookTitle: string;
  bookId: string;
  overdueDays: number;
  studentName?: string;
};

export default function BookOverdueEmail({
  bookId,
  studentName = '[Student Name]',
  bookTitle = '[Book Title]',
  overdueDays = 1,
}: Readonly<BookOverdueEmailProps>) {
  const penaltyFee = overdueDays * 20;

  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>Overdue Book Notice</title>
          <Font fontFamily="Trebuchet MS" fallbackFontFamily="sans-serif" />
        </Head>
        <Preview>Overdue Book Notice</Preview>

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
              Urgent: {bookTitle} is Overdue!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              The book{' '}
              <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                {bookTitle}
              </CodeInline>{' '}
              is now overdue by{' '}
              <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                {overdueDays} {overdueDays > 1 ? 'days' : 'day'}
              </CodeInline>
              . Please return it as soon as possible to avoid additional penalties.
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              A penalty of{' '}
              <CodeInline className="text-lg font-semibold text-red-500">
                ${penaltyFee}
              </CodeInline>{' '}
              has been applied to your account, and will increase daily at a rate of{' '}
              <CodeInline className="text-lg font-semibold text-red-500">
                $20 per day
              </CodeInline>
              .
            </Text>

            <Button
              href={`https://lms-university.vercel.app/books/${bookId}`}
              className="mt-[10px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              Return Book Now
            </Button>

            <Text className="mt-[32px] text-lg">
              Please act quickly to minimize your penalty.
              <br />
              The Bookwise Team
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
