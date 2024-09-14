import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function TransferMadeEmail({ accountNumber, groupName, type }: { accountNumber: string; groupName: string; type: "group" | "savings";}) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Container className="container px-20 font-sans bg-blue-50">
          <Heading className="text-2xl font-bold mb-4 text-blue-700">
            Congratulations! 🎉
          </Heading>
          <Text className="text-lg my-2 text-blue-600">
            We are excited to inform you that a transfer has been made to your account.
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            <strong>Account Number:</strong> {accountNumber}
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            {
              type === "group"
              ? "This payment is made as your turn to receive money from the pool of the <strong>{groupName}</strong> that you are in."
              : "This payment is made as a savings payment to your account as requested."
            }
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            However, please note that this is a test payment. No actual money has been sent to your account.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue-700">Friendly Reminder</Text>
            <Text className="font-bold text-4xl text-blue-700">💰</Text>
            <Text className="text-lg my-2 text-blue-600">
              This is just a test. Please do not expect any real funds.
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