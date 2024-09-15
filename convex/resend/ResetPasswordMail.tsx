import {
  Container,
  Head,
  Heading,
  Html,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import Image from "next/image";
export function PasswordResetEmail({
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
        <Head>
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
            @import url('https://fonts.googleapis.com/css2?family=Cabin&display=swap');

            body {
              font-family: 'Cabin', sans-serif;
              color: #000000;
            }

            h1, h2, h3, h4, h5, h6 {
              font-family: 'Inter', sans-serif;
              color: #0000FF;
            }

            .logo {
              text-align: center;
              margin-bottom: 20px;
            }

            .logo .img {
              width: 100px;
            }

            .container {
              padding: 20px;
              background-color: #FFFFFF;
            }

            .text-blue {
              color: #0000FF;
            }

            .text-center {
              text-align: center;
            }

            .text-bold {
              font-weight: bold;
            }

            .text-4xl {
              font-size: 2.25rem;
            }

            .text-lg {
              font-size: 1.125rem;
            }

            .my-2 {
              margin-top: 0.5rem;
              margin-bottom: 0.5rem;
            }

            .mb-4 {
              margin-bottom: 1rem;
            }
          `}</style>
        </Head>
        <Container className="container px-5">
          <div className="logo text-lg">
          <Image src="/public/JEKAJODAWO LOGO-BLACK.svg" className="img" alt="JEKAJODAWO" height={100} width={100} />
          </div>
          <Heading className="text-2xl font-bold mb-4">
            Password amnesia? We’ve got you covered.
          </Heading>
          <Text className="text-lg my-2">
            Please enter the following code on the password reset page.
          </Text>
          <Section className="text-center my-4">
            <Text className="font-semibold text-blue">Verification Code</Text>
            <Text className="font-bold text-4xl text-blue">{code}</Text>
            <Text className="text-lg my-2">
              (This code is valid for {hoursRemaining} hours)
            </Text>
          </Section>
          <Text className="text-lg my-2">
            If you have any questions or need assistance, feel free to reach out to our support team. We&apos;re here to help!
          </Text>
          <Text className="text-lg my-2">
            Best regards,
            <br />
            The Jekajodawo Team
          </Text>
        </Container>
      </Tailwind>
    </Html>
  );
}