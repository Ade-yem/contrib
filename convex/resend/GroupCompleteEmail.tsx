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
  
  export function GroupCompleteEmail({ groupName, date }: { groupName: string; date: string; }) {
    const newDate = new Date(date);
    const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const weekDay = week[newDate.getDay()];
    const day = newDate.getDate();
    const month = months[newDate.getMonth()];
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
              Group complete
            </Heading>
            <Text className="text-lg my-2 text-blue">
              Hey there, this is to inform you that the number of members in your group <strong>{groupName}</strong> is now complete.
            </Text>
            <Text className="text-lg my-2 text-blue">
              The group savings will start on {weekDay}, {day} - {month}.
            </Text>
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