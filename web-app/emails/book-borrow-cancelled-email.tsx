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

type BookBorrowCancelledEmailProps = {
  studentName: string;
  bookTitle: string;
  overdueDays: number;
  totalFee: number;
};

export default function BookBorrowCancelledEmail({
  studentName = '[Student Name]',
  bookTitle = '[Book Title]',
  overdueDays = 0,
  totalFee = 20,
}: Readonly<BookBorrowCancelledEmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>Borrow Request Cancelled</title>
          <Font fontFamily="Trebuchet MS" fallbackFontFamily="sans-serif" />
        </Head>
        <Preview>Borrow Request Cancelled - Overdue Fees</Preview>

        <Container className="mx-auto my-[40px] h-auto w-[649px] rounded-[12px] bg-[#111624] px-[40px] py-[20px] font-sans text-[#d6e0ff]">
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
              Borrow Request Cancelled Due to Overdue
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              Since you did not return{' '}
              <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                {bookTitle}
              </CodeInline>{' '}
              on time, your borrow request has been <strong>cancelled</strong>.
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              Your book was overdue for <strong>{overdueDays} days</strong>, and
              a penalty fee of{' '}
              <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                ${totalFee}
              </CodeInline>{' '}
              has been applied to your account.
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              <strong>
                You will not be able to borrow books until your overdue fees are
                fully paid.
              </strong>{' '}
              Please visit the library to settle your balance.
            </Text>

            <Button
              href="https://lms-university.vercel.app/payments"
              className="mt-[20px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              Pay Overdue Fees
            </Button>

            <Text className="mt-[32px] text-lg">
              Regards,
              <br />
              The BookWise Team
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
