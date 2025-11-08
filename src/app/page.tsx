import Hero from "./(home)/_hero";
import { Header } from "@/common/layout/header";
import Features from "./(home)/_features";
import AIHealthcare from "./(home)/_aiPoweredHealthcare";
import { Footer } from "@/common/layout/footer";
import Pricing from "./(home)/_pricing";
import { loadHomeContent } from "../lib/home-content";
import { Faq } from "./(home)/_faq";
import { CTA } from "./(home)/_cta";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { hero, faq, cta, features, pricing, ai } = await loadHomeContent();

  return (
    <>
      <Header />
      <main>
        <Hero content={hero} />
        <Features content={features} />
        <AIHealthcare content={ai} />
        <Pricing content={pricing} />
        <Faq content={faq} />
        <CTA content={cta} />
      </main>
      <Footer />
    </>
  );
}
