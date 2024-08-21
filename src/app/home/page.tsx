import { DownloadApp } from "@/components/home/downloadApp";
import { GrowYourSavings } from "@/components/home/growYourSavings";
import { Homebanner } from "@/components/home/homebanner";
import { OustandingGroup } from "@/components/home/outstandingGroup";
import { ChooseUs } from "@/components/home/whyChooseUs";

export default function Home() {
  return (
    <main className="">
      <Homebanner />
      <GrowYourSavings />
      <ChooseUs />
      <OustandingGroup />
      <DownloadApp />
    </main>
  );
}
