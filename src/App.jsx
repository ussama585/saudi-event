import { useRef } from "react";
import Hero from "./components/Hero";
import Stats from "./components/Stats";
import About from "./components/About";
import Pillars from "./components/Pillars";
import Speakers from "./components/Speakers";
import Agenda from "./components/Agenda";
import Partners from "./components/Partners";
import Portfolio from "./components/Portfolio";
import FAQ from "./components/FAQ";
import CTA from "./components/CTA";
import Registration from "./components/Registration";
import Footer from "./components/Footer";
import useReveal from "./hooks/useReveal";

export default function App() {
  const pageRef = useRef(null);
  useReveal(pageRef);

  return (
    <main ref={pageRef}>
      <Hero />
      <Stats />
      <About />
      <Pillars />
      <Speakers />
      <Agenda />
      <Partners />
      <Portfolio />
      <FAQ />
      <CTA />
      <Registration />
      <Footer />
    </main>
  );
}
