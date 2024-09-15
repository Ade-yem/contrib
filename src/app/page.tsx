import { DownloadApp } from "@/components/home/downloadApp";
import Faqs from "@/components/home/faqs";
import { GrowYourSavings } from "@/components/home/growYourSavings";
import { Homebanner } from "@/components/home/homebanner";
import { OustandingGroup } from "@/components/home/outstandingGroup";
import { ChooseUs } from "@/components/home/whyChooseUs";
import { Footer } from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
import { OurTeam } from "@/components/shared/ourTeam";

export default function Home() {
  return (
    <section className="layout-wrapper">
      <div>
        <Navbar />
        <div>
          <Homebanner />
          <GrowYourSavings />
          <ChooseUs />
          <OustandingGroup />
          <DownloadApp />
          <Faqs />
          <OurTeam />
        </div>
      </div>
      <Footer />
    </section>
  );
}
