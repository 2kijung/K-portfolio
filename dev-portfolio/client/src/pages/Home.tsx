/* ==========================================================
   DESIGN: Midnight Architecture — Main page composition
   Sections: Hero → About → Skills → Projects → Architecture → Contact
   ========================================================== */

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import BasicInfoSection from "@/components/sections/BasicInfoSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArchitectureSection from "@/components/sections/ArchitectureSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ background: "#060b18" }}>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <BasicInfoSection />
        <SkillsSection />
        <ProjectsSection />
        <ArchitectureSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
