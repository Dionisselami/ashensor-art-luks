import { useEffect, useState } from "react";

const ElevatorDoors = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrollOpacity, setScrollOpacity] = useState(0);
    const [forceOpen, setForceOpen] = useState(false);

    useEffect(() => {
        // Open doors on mount
        const timer = setTimeout(() => setIsOpen(true), 300);

        // Force open after 3 seconds as fallback to ensure content is visible
        const forceOpenTimer = setTimeout(() => {
            setForceOpen(true);
            setIsOpen(true);
        }, 3000);

        // Handle scroll for darkening effect
        const handleScroll = () => {
            const scrollPercentage = Math.min(window.scrollY / (document.documentElement.scrollHeight - window.innerHeight), 1);
            setScrollOpacity(scrollPercentage * 0.7);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            clearTimeout(timer);
            clearTimeout(forceOpenTimer);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const doorColor1 = "hsl(30, 40%, 35%)";
    const doorColor2 = "hsl(35, 45%, 40%)";

    return (
        <div className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-1000 ${isOpen || forceOpen ? "opacity-0" : "opacity-100"}`}> {/* Left Door */}
            <div className={`absolute top-0 left-0 h-full w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${isOpen ? "-translate-x-full" : "translate-x-0"}`} style={{ background: `linear-gradient(135deg, ${doorColor1} 0%, ${doorColor2} 50%, ${doorColor1} 100%)` }} >
                <div className="h-full w-full opacity-40" style={{ backgroundImage: `repeating-linear-gradient( 90deg, transparent, transparent 8px, rgba(0, 0, 0, 0.3) 8px, rgba(0, 0, 0, 0.3) 10px )` }} />
            </div> {/* Right Door */}
            <div className={`absolute top-0 right-0 h-full w-1/2 transition-transform duration-[1200ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${isOpen ? "translate-x-full" : "translate-x-0"}`} style={{ background: `linear-gradient(135deg, ${doorColor1} 0%, ${doorColor2} 50%, ${doorColor1} 100%)` }} >
                <div className="h-full w-full opacity-40" style={{ backgroundImage: `repeating-linear-gradient( 90deg, transparent, transparent 8px, rgba(0, 0, 0, 0.3) 8px, rgba(0, 0, 0, 0.3) 10px )` }} />
            </div> {/* Scroll Overlay */}
            <div className="absolute inset-0 transition-opacity duration-300" style={{ opacity: scrollOpacity, backgroundColor: "hsl(20, 15%, 5%)" }} />
        </div>
    );
};

export default ElevatorDoors;