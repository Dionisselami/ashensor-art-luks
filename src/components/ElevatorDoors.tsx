import { useEffect, useState } from "react";

const ElevatorDoors = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);

  useEffect(() => {
    // Open doors on mount with delay
    const timer = setTimeout(() => setIsOpen(true), 500);

    // Handle scroll for darkening effect
    const handleScroll = () => {
      const scrollPercentage = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
      setScrollOpacity(scrollPercentage * 0.7);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Left Door */}
      <div
        className={`absolute top-0 left-0 h-full w-1/2 will-change-transform ${
          isOpen ? "-translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(var(--door-bronze)) 0%, hsl(var(--door-gold)) 50%, hsl(var(--door-bronze)) 100%)",
          transition: 'transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
          boxShadow: isOpen ? 'none' : 'inset -10px 0 30px rgba(0,0,0,0.4)'
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
        className={`absolute top-0 right-0 h-full w-1/2 will-change-transform ${
          isOpen ? "translate-x-full" : "translate-x-0"
        }`}
        style={{
          background: "linear-gradient(135deg, hsl(var(--door-bronze)) 0%, hsl(var(--door-gold)) 50%, hsl(var(--door-bronze)) 100%)",
          transition: 'transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1)',
          boxShadow: isOpen ? 'none' : 'inset 10px 0 30px rgba(0,0,0,0.4)'
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
        className="absolute inset-0 bg-overlay-dark will-change-[opacity]"
        style={{ 
          opacity: scrollOpacity,
          transition: 'opacity 0.2s ease-out'
        }}
      />
    </div>
  );
};

export default ElevatorDoors;
