import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();
  
  const scrollToModels = () => {
    document.getElementById("models")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleQuoteClick = () => {
    navigate('/contact');
  };

  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 relative animate-fade-in">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-foreground mb-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
          S.R.S Ashensorë
        </h1>
        <p className="text-2xl md:text-3xl text-muted-foreground font-light tracking-wide animate-fade-in" style={{ animationDelay: "0.5s" }}>
          Duke Përcaktuar Artin e Lëvizjes Vertikale
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8 animate-fade-in" style={{ animationDelay: "0.7s" }}>
          <Button size="lg" className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground" onClick={scrollToModels}>
            Zgjidhni Modelin Tuaj
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-primary text-foreground hover:bg-primary/10" onClick={handleQuoteClick}>
            Kërkoni një Kuotë
          </Button>
        </div>
      </div>
      <button
        onClick={scrollToModels}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer bg-transparent border-none"
        aria-label="Scroll down"
      >
        <ChevronDown className="w-10 h-10 text-primary" />
      </button>
    </section>
  );
};

export default HeroSection;
