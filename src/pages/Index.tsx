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
      const scrollPercentage = Math.min(window.scrollY / (window.innerHeight * 0.8), 1);
      const easedOpacity = 1 - Math.pow(scrollPercentage, 1.5);
      setBgOpacity(easedOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="relative overflow-x-hidden bg-background">
      {/* Fixed Background Elevator Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat will-change-[opacity]"
        style={{ 
          backgroundImage: `url(${elevatorBg})`,
          opacity: bgOpacity,
          transition: 'opacity 0.1s ease-out'
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
