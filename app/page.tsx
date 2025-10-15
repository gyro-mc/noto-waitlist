import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-mt-20" style={{ backgroundColor: '#EBECF1' }}>
      <Navbar />
      <div className="pt-20">

      <Hero />
      <Benefits />
      <FAQ />
      <Contact />
      <Footer />
      </div>
    </div>
  );
}
