import { useEffect, useState } from "react";
import ElevatorDoors from "@/components/ElevatorDoors";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import SafetySection from "@/components/SafetySection";
import ContactSection from "@/components/ContactSection";
import elevatorBg from "@/assets/elevator-behind-doors.jpg";

const Index = () => {
  const [bgOpacity, setBgOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = Math.min(window.scrollY / window.innerHeight, 1);
      setBgOpacity(1 - scrollPercentage);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Background Elevator Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-300"
        style={{ 
          backgroundImage: `url(${elevatorBg})`,
          opacity: bgOpacity
        }}
      />
      
      <ElevatorDoors />
      <main className="relative z-10">
        <HeroSection />
        <ModelsSection />
        <SafetySection />
        <ContactSection />
      </main>
    </div>
  );
};

export default Index;
