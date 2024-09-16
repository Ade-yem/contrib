import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

import Logo from "./logo";

export function PaymentFailedEmail({ groupName }: { groupName: string }) {
  return (
    <Html>
      <Tailwind>
        <Head>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

            body {
              font-family: 'Cabin', sans-serif;
              color: #000;
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: 'Inter', sans-serif;
              color: #000;
            }

            .container {
              max-width: 600px;
              margin: 0 auto;
              padding: 5px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }

            .logo {
              text-align: center;
              margin-bottom: 20px;
            }

            .logo .img {
              max-width: 200px;
            }

            .text-blue {
              color: #007bff;
            }

            .text-center {
              text-align: center;
            }

            .my-2 {
              margin-top: 8px;
              margin-bottom: 8px;
            }

            .my-4 {
              margin-top: 16px;
              margin-bottom: 16px;
            }

            .font-semibold {
              font-weight: 600;
            }

            .font-bold {
              font-weight: 700;
            }
          `}</style>
        </Head>
        <Container className="container px-5">
        <div className="logo divide-b divide-slate-200 w-16 h-16">
            <Logo/>
            </div>
          <Heading className="text-2xl font-bold mb-4 text-blue">
            Oops! Payment Failed
          </Heading>
          <Text className="text-lg my-2 text-blue">
            Hey there, it looks like your payment for <strong>{groupName}</strong> did not go through. 
            Don&apos;t worry, it happens to the best of us!
          </Text>
          <Text className="text-lg my-2 text-blue">
            We noticed there&apos;s no money in your account. Maybe your wallet is feeling a bit light?
          </Text>
          <Text className="text-lg my-2 text-blue">
            But don&apos;t fret! We&apos;ll try again in a few hours. In the meantime, you might want to check your account and make sure it&apos;s ready for the next attempt.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue">Friendly Reminder</Text>
            <Text className="font-bold text-4xl text-blue">💸</Text>
            <Text className="text-lg my-2 text-blue">
              Please fund your account before our next attempt. We believe in you!
            </Text>
          </Section>
          <Text className="text-lg my-2 text-blue">
            If you have any questions or need assistance, feel free to reach out to our support team. We&apos;re here to help!
          </Text>
          <Text className="text-lg my-2 text-blue">
            Best regards,
            <br />
            The Jekajodawo Team
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}