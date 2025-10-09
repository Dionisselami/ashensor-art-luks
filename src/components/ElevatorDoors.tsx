import { useEffect, useState } from "react";
import elevatorImage from "@/assets/elevator-behind-doors.jpg";

const ElevatorDoors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    // Open doors on mount
    const timer = setTimeout(() => setIsOpen(true), 300);

    // Handle scroll for darkening effect
    const handleScroll = () => {
      const scrollPercentage = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
      setScrollOpacity(scrollPercentage * 0.7);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Elevator Image Behind Doors */}
      <div className="absolute inset-0 flex items-center justify-center bg-background">
        <img 
          src={elevatorImage} 
          alt="Luxury Elevator" 
          className="w-full h-full object-cover"
        />
      </div>
      {/* Left Door */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(var(--door-bronze)) 0%, hsl(var(--door-gold)) 50%, hsl(var(--door-bronze)) 100%)",
        }}
      >
        <div className="h-full w-full opacity-40" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 8px,
            rgba(0, 0, 0, 0.3) 8px,
            rgba(0, 0, 0, 0.3) 10px
          )`
        }} />
      </div>

      {/* Right Door */}
      <div
        className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(var(--door-bronze)) 0%, hsl(var(--door-gold)) 50%, hsl(var(--door-bronze)) 100%)",
        }}
      >
        <div className="h-full w-full opacity-40" style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent,
            transparent 8px,
            rgba(0, 0, 0, 0.3) 8px,
            rgba(0, 0, 0, 0.3) 10px
          )`
        }} />
      </div>

      {/* Scroll Overlay */}
      <div
        className="absolute inset-0 bg-overlay-dark transition-opacity duration-300"
        style={{ opacity: scrollOpacity }}
      />
    </div>
  );
};

export default ElevatorDoors;
