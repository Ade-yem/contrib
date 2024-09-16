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

export function TransferMadeEmail({ accountNumber, amount, groupName, type }: { accountNumber: string; groupName: string; type: "group" | "savings"; amount: number}) {
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
              padding: 5px; /* Updated padding value */
              background-color: #fff;
              border: 1px solid #000;
            }

            .logo {
              text-align: center;
              margin-bottom: 20px;
            }

            .logo .img {
              width: 100px;
              height: 100px;
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
            Congratulations! 🎉
          </Heading>
          <Text className="text-lg my-2 text-blue">
            We are excited to inform you that a transfer of &#8358; {amount/100} has been made to your account.
          </Text>
          <Text className="text-lg my-2 text-blue">
            <strong>Account Number:</strong> {accountNumber}
          </Text>
          <Text className="text-lg my-2 text-blue">
            {
              type === "group"
              ? `This payment is made as your turn to receive money from the pool of the ${groupName} that you are in.`
              : "This payment is made as a savings payment to your account as requested."
            }
          </Text>
          <Text className="text-lg my-2 text-blue">
            However, please note that this is a test payment. No actual money has been sent to your account.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue">Friendly Reminder</Text>
            <Text className="font-bold text-4xl text-blue">💰</Text>
            <Text className="text-lg my-2 text-blue">
              This is just a test. Please do not expect any real funds.
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