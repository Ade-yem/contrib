import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function VerificationCodeEmail({
  code,
  expires,
}: {
  code: string;
  expires: Date;
}) {
  // Calculate the remaining time in hours
  const hoursRemaining = Math.max(
    Math.floor((+new Date(expires) - Date.now()) / (60 * 60 * 1000)),
    0
  );

  return (
    <Html>
      <Tailwind>
        <Head />
        <Container className="container px-20 font-sans bg-blue-50">
          <Heading className="text-2xl font-bold mb-4 text-blue-700">
            Verify your email address on Jekajodawo
          </Heading>
          <Text className="text-lg my-2 text-blue-600">
            Please enter the following code on the sign-in page.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue-700">Verification Code</Text>
            <Text className="font-bold text-4xl text-blue-700">{code}</Text>
            <Text className="text-lg my-2 text-blue-600">
              (This code is valid for {hoursRemaining} hours)
            </Text>
          </Section>
          <Text className="text-lg my-2 text-blue-600">
            If you have any questions or need assistance, feel free to reach out to our support team. We&apos;re here to help!
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            Best regards,
            <br />
            The Jekajodawo Team
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}