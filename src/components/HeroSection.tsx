import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const scrollToModels = () => {
    document.getElementById("models")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 
          className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-4 opacity-0 animate-fade-in" 
          style={{ 
            animationDelay: "0.8s",
            animationFillMode: "forwards",
            animationDuration: "1s"
          }}
        >
          S.R.S Ashensorë
        </h1>
        <p 
          className="text-2xl md:text-3xl text-muted-foreground font-light tracking-wide opacity-0 animate-fade-in" 
          style={{ 
            animationDelay: "1.2s",
            animationFillMode: "forwards",
            animationDuration: "1s"
          }}
        >
          Duke Përcaktuar Artin e Lëvizjes Vertikale
        </p>
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center pt-8 opacity-0 animate-fade-in" 
          style={{ 
            animationDelay: "1.6s",
            animationFillMode: "forwards",
            animationDuration: "1s"
          }}
        >
          <Button 
            size="lg" 
            className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            Zgjidhni Modelin Tuaj
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="text-lg px-8 py-6 border-primary text-foreground hover:bg-primary/10 transition-all duration-300 hover:scale-105"
          >
            Kërkoni një Kuotë
          </Button>
        </div>
      </div>
      <button
        onClick={scrollToModels}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 cursor-pointer bg-transparent border-none opacity-0 animate-fade-in"
        aria-label="Scroll down"
        style={{ 
          animationDelay: "2s",
          animationFillMode: "forwards",
          animationDuration: "1s"
        }}
      >
        <ChevronDown className="w-10 h-10 text-primary animate-bounce" />
      </button>
    </section>
  );
};

export default HeroSection;
