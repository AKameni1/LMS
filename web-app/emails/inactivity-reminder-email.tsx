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

export default function InactivityReminderEmail({
  studentName = '[Student Name]',
}: Readonly<EmailProps>) {
  return (
    <Tailwind>
      <Html lang="en">
        <Head>
          <title>We Miss You</title>
          <Font fontFamily="Trebuchet MS" fallbackFontFamily="sans-serif" />
        </Head>
        <Preview>We Miss You at BookWise!</Preview>

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
              We Miss You at BookWise!
            </Heading>

            <Text className="mt-[24px] text-xl leading-relaxed">
              Hi {studentName},
            </Text>

            <Text className="mt-[16px] text-lg leading-relaxed">
              It&apos;s been a while since we last saw you—over three days, to
              be exact! New books are waiting for you, and your next great read
              might just be a click away.
            </Text>

            <Text className="mt-[24px] text-lg leading-relaxed">
              Come back and explore now:
            </Text>

            <Button
              href="https://lms-university.vercel.app/library"
              className="mt-[10px] rounded-md bg-[#EED1AC] px-[32px] py-[16px] text-center text-base font-bold text-[#111624]"
            >
              Explore Books on BookWise
            </Button>

            <Text className="mt-[32px] text-lg">
              See you soon,
              <br />
              The Bookwise Team
            </Text>
          </Section>
        </Container>
      </Html>
    </Tailwind>
  );
}
