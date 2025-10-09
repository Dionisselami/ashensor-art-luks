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
    <section id="models" className="min-h-screen flex flex-col justify-center py-20 px-6">
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
              className="group overflow-hidden bg-card border-border hover:border-primary transition-all duration-500 animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={model.image}
                  alt={model.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-foreground">{model.name}</h3>
                <p className="text-muted-foreground">{model.description}</p>
                <ul className="space-y-2">
                  {model.features.map((feature) => (
                    <li key={feature} className="flex items-center text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mr-3" />
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
