import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Quote } from "@/components/sections/Quote";
import { Methodology } from "@/components/sections/Methodology";
import { Principles } from "@/components/sections/Principles";
import { Testimonials } from "@/components/sections/Testimonials";
import { Stats } from "@/components/sections/Stats";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Quote />
      <Methodology />
      <Principles />
      <Testimonials />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
