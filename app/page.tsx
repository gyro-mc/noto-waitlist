import Navbar from "@/components/Navbar";
import MobileNavbar from "@/components/MobileNavbar";
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Integrations from "@/components/Integrations";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen scroll-mt-20" style={{ backgroundColor: '#EBECF1' }}>
      <Navbar />
      <MobileNavbar />
      <div className="">

      <Hero />
      <Benefits />
      <Integrations />
      <FAQ />
      <Contact />
      <Footer />
      </div>
    </div>
  );
}
