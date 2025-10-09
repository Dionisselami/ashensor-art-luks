import ElevatorDoors from "@/components/ElevatorDoors";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import SafetySection from "@/components/SafetySection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="relative bg-background overflow-x-hidden">
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
