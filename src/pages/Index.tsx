import ElevatorDoors from "@/components/ElevatorDoors";
import HeroSection from "@/components/HeroSection";
import ModelsSection from "@/components/ModelsSection";
import SafetySection from "@/components/SafetySection";
import ContactSection from "@/components/ContactSection";
import elevatorBg from "@/assets/elevator-behind-doors.jpg";

const Index = () => {
  return (
    <div className="relative overflow-x-hidden">
      {/* Fixed Background Elevator Image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${elevatorBg})` }}
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
