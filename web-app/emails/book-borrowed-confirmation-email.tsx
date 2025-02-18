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

type BookBorrowedConfirmationEmailProps = {
  studentName: string;
  borrowDate: string;
  dueDate: string;
  bookTitle: string;
};

export default function BookBorrowedConfirmationEmail({
  studentName = '[Student Name]',
  borrowDate = '[Borrowed Date]',
  dueDate = '[Due Date]',
  bookTitle = '[Book Title]',
}: Readonly<BookBorrowedConfirmationEmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>Book Borrowed Confirmation</title>
          <Font
            fontFamily="IBM Plex Sans"
            fallbackFontFamily="sans-serif"
            webFont={{
              url: 'https://lms-university.vercel.app/fonts/IBMPlexSans-Regular.woff2',
              format: 'woff2',
            }}
          />
        </Head>
        <Preview>You&apos;ve Borrowed a Book!</Preview>

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
              You&apos;ve Borrowed a Book!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              You&apos;ve successfully borrowed {bookTitle}. Here are the
              details:
              <li className="ml-[16px] text-lg">
                Borrowed On:{' '}
                <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                  {borrowDate}
                </CodeInline>
              </li>
              <li className="ml-[16px] text-lg">
                Due Date:{' '}
                <CodeInline className="text-lg font-semibold text-[#EED1AC]">
                  {dueDate}
                </CodeInline>
              </li>
            </Text>

            <Text className="mt-[24px] text-lg leading-relaxed">
              Enjoy your reading, and don&apos;t forget to return the book on
              time!
            </Text>

            <Button
              href="https://lms-university.vercel.app/my-profile"
              className="mt-[10px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              View Borrowed Books
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
