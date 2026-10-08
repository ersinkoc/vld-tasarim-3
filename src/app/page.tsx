import { Hero } from "@/components/hero";
import { Benchmarks } from "@/components/benchmarks";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { DropIn } from "@/components/dropin";
import { ApiExplorer } from "@/components/api-explorer";
import { I18nShowcase } from "@/components/i18n-showcase";
import { QuickStart } from "@/components/quick-start";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <Benchmarks />
      <Features />
      <HowItWorks />
      <DropIn />
      <QuickStart />
      <ApiExplorer />
      <I18nShowcase />
      <Footer />
    </>
  );
}