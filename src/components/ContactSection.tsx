import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-6">
      <div className="max-w-4xl mx-auto w-full text-center space-y-12">
        <div className="space-y-6">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Filloni Ngjitjen Tuaj
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Gati për të ngritur në nivel projektin tuaj? Kontaktoni ekipin tonë për një konsultim
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 py-8">
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border border-border">
            <Phone className="w-8 h-8 text-primary" />
            <div className="text-sm text-muted-foreground">Telefon</div>
            <div className="text-lg font-semibold text-foreground">+355 69 XXX XXXX</div>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border border-border">
            <Mail className="w-8 h-8 text-primary" />
            <div className="text-sm text-muted-foreground">Email</div>
            <div className="text-lg font-semibold text-foreground">info@srs-ashensore.al</div>
          </div>
          <div className="flex flex-col items-center space-y-3 p-6 rounded-lg bg-card border border-border">
            <MapPin className="w-8 h-8 text-primary" />
            <div className="text-sm text-muted-foreground">Adresë</div>
            <div className="text-lg font-semibold text-foreground">Tiranë, Shqipëri</div>
          </div>
        </div>

        <Button size="lg" className="text-lg px-12 py-6 bg-primary hover:bg-primary/90 text-primary-foreground">
          Kontaktoni Tani
        </Button>
      </div>
    </section>
  );
};

export default ContactSection;
