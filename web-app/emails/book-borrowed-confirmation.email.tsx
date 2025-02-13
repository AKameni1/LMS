import {
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

type BookBorrowedConfirmationEmailProps = {
  studentName: string;
  borrowDate: string;
  dueDate: string;
};

export default function BookBorrowedConfirmationEmail({
  studentName = '[Student Name]',
  borrowDate = '[Borrowed Date]',
  dueDate = '[Due Date]',
}: Readonly<BookBorrowedConfirmationEmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head title="Welcome to the BookWise Library" />
        <Preview>You&apos;ve Borrowed a Book!</Preview>

        <Container className="mx-auto my-[40px] h-[640px] w-[649px] rounded-[12px] bg-[#111624] px-[40px] py-[20px] font-sans text-[#d6e0ff]">
          {/* Logo Section */}
          <Section className="flex items-center text-white">
            <svg
              width="40"
              height="26"
              viewBox="0 0 40 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                opacity="0.5"
                d="M20 9.99982V31.8888C29.8889 26.4443 38.2223 29.9998 40 31.9998V9.99981C33 5.9998 21.8148 6.62945 20 9.99982Z"
                fill="#DBE5FF"
              />
              <path
                d="M20 10.0002V31.8891C26.3333 23.6668 34.3334 25.6668 36.8889 26.1113V4.33349C31 2.44459 21.8148 6.62979 20 10.0002Z"
                fill="#F0F4FF"
              />
              <path
                d="M20 9.74947V31.5556C23.4089 23.6965 32.4261 22.9217 34.2222 23.0324V0.00865083C29.9996 -0.257008 20.8797 5.65389 20 9.74947Z"
                fill="url(#paint0_linear_1_29493)"
              />
              <path
                opacity="0.5"
                d="M20 9.99982V31.8888C10.1111 26.4443 1.77775 29.9998 -3.43323e-05 31.9998V9.99981C6.99998 5.9998 18.1852 6.62945 20 9.99982Z"
                fill="#DBE5FF"
              />
              <path
                d="M20 10.0002V31.8891C13.6667 23.6668 5.66664 25.6668 3.11108 26.1113V4.33349C8.99998 2.44459 18.1852 6.62979 20 10.0002Z"
                fill="#F0F4FF"
              />
              <path
                d="M20 9.74947V31.5556C16.5911 23.6965 7.57386 22.9217 5.77775 23.0324V0.00865083C10.0004 -0.257008 19.1203 5.65389 20 9.74947Z"
                fill="url(#paint1_linear_1_29493)"
              />
              <defs>
                <linearGradient
                  id="paint0_linear_1_29493"
                  x1="20"
                  y1="18.7778"
                  x2="34.2222"
                  y2="18.7778"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FAFBFF" stopOpacity="0.49" />
                  <stop offset="1" stopColor="#FAFBFF" />
                </linearGradient>
                <linearGradient
                  id="paint1_linear_1_29493"
                  x1="20"
                  y1="18.7778"
                  x2="5.77775"
                  y2="18.7778"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#FAFBFF" stopOpacity="0.49" />
                  <stop offset="1" stopColor="#FAFBFF" />
                </linearGradient>
              </defs>
            </svg>
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
              You&apos;ve Borrowed a Book!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              You&apos;ve successfully borrowed [Book Title]. Here are the
              details:
              <li className="ml-[16px] text-lg">
                Borrowed On:{' '}
                <Text className="inline text-lg font-semibold text-[#EED1AC]">
                  {borrowDate}
                </Text>
              </li>
              <li className="ml-[16px] text-lg">
                Due Date:{' '}
                <Text className="inline text-lg font-semibold text-[#EED1AC]">
                  {dueDate}
                </Text>
              </li>
            </Text>

            <Text className="mt-[24px] text-lg leading-relaxed">
              Enjoy your reading, and don&apos;t forget to return the book on
              time!
            </Text>

            <Button
              href="https://lms-university.vercel.app/my-profile"
              className="mt-[24px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              View Borrowed Books
            </Button>

            <Text className="mt-[32px] text-lg">Happy reading,</Text>
            <Text className="mt-[4px] text-lg">The Bookwise Team</Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
