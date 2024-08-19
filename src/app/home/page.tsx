import { GrowYourSavings } from "@/components/growYourSavings";
import { Homebanner } from "@/components/home/homebanner";
import { ChooseUs } from "@/components/whyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="">
      <Homebanner />
      <GrowYourSavings />
      <ChooseUs />
    </main>
  );
}
