import { Shield, Radio, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const safetyFeatures = [
  {
    icon: Shield,
    title: "Frenim Rezervë",
    description: "Sistem frenash elektromagnetike emergjente që aktivizohen automatikisht"
  },
  {
    icon: Radio,
    title: "Monitorim në Distancë 24/7",
    description: "Kontroll dhe diagnostikim në kohë reale nga qendra jonë teknike"
  },
  {
    icon: Zap,
    title: "Furnizim Emergjence",
    description: "Bateri rezervë që siguron ulje të sigurt në rast ndërprerjeje energjie"
  }
];

const SafetySection = () => {
  return (
    <section className="min-h-screen flex flex-col justify-center py-20 px-6 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground mb-4">
            Projektuar për Siguri pa Kompromis
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {safetyFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="bg-card border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 group animate-fade-in transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500 mb-4">
                    <Icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SafetySection;
