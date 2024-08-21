import { DownloadApp } from "@/components/home/downloadApp";
import Faqs from "@/components/home/faqs";
import { GrowYourSavings } from "@/components/home/growYourSavings";
import { Homebanner } from "@/components/home/homebanner";
import { OustandingGroup } from "@/components/home/outstandingGroup";
import { ChooseUs } from "@/components/home/whyChooseUs";
import { OurTeam } from "@/components/shared/ourTeam";

export default function Home() {
  return (
    <main className="">
      <Homebanner />
      <GrowYourSavings />
      <ChooseUs />
      <OustandingGroup />
      <DownloadApp />
      <Faqs />
      <OurTeam />
    </main>
  );
}
