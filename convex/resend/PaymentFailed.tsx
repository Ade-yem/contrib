import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export function PaymentFailedEmail({ groupName }: { groupName: string }) {
  return (
    <Html>
      <Tailwind>
        <Head />
        <Container className="container px-20 font-sans bg-blue-50">
          <Heading className="text-2xl font-bold mb-4 text-blue-700">
            Oops! Payment Failed
          </Heading>
          <Text className="text-lg my-2 text-blue-600">
            Hey there, it looks like your payment for <strong>{groupName}</strong> did not go through. 
            Don&apos;t worry, it happens to the best of us!
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            We noticed there&apos;s no money in your account. Maybe your wallet is feeling a bit light?
          </Text>
          <Text className="text-lg my-2 text-blue-600">
            But don&apos;t fret! We&apos;ll try again in a few hours. In the meantime, you might want to check your account and make sure it&apos;s ready for the next attempt.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue-700">Friendly Reminder</Text>
            <Text className="font-bold text-4xl text-blue-700">💸</Text>
            <Text className="text-lg my-2 text-blue-600">
              Please fund your account before our next attempt. We believe in you!
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