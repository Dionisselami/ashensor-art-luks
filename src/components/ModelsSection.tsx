import { Card, CardContent } from "@/components/ui/card";
import skyluxPro from "@/assets/skylux-pro.jpg";
import homeglide from "@/assets/homeglide.jpg";
import titanflow from "@/assets/titanflow.jpg";

const models = [
  {
    name: "SkyLux Pro",
    description: "Ashensor premium me pamje panoramike dhe teknologji të avancuar",
    image: skyluxPro,
    features: ["Kapacitet: 8-10 persona", "Shpejtësi: 2.5 m/s", "Dizajn panoramik"]
  },
  {
    name: "HomeGlide",
    description: "Zgjidhje kompakte banesore me dizajn elegant",
    image: homeglide,
    features: ["Kapacitet: 3-4 persona", "Shpejtësi: 0.63 m/s", "Dizajn kompakt"]
  },
  {
    name: "TitanFlow",
    description: "Ashensor komercial me kapacitet të lartë",
    image: titanflow,
    features: ["Kapacitet: 15-20 persona", "Shpejtësi: 4 m/s", "Përdorim industrial"]
  }
];

const ModelsSection = () => {
  return (
    <section id="models" className="min-h-screen flex flex-col justify-center py-20 px-6 bg-background/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold text-foreground">
            Koleksioni Ynë Signature
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Projektuar për performancë, dizenjuar për elegancë dhe ndërtuar për një jetë
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {models.map((model, index) => (
            <Card
              key={model.name}
              className="group overflow-hidden bg-card border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-700 animate-fade-in transform hover:-translate-y-2"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-700" />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{model.name}</h3>
                <p className="text-muted-foreground">{model.description}</p>
                <ul className="space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3 group-hover:scale-150 transition-transform duration-300" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ModelsSection;
