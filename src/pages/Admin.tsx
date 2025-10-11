import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Mail, 
  Phone, 
  Calendar, 
  Building, 
  MessageSquare,
  Plus,
  Search,
  Filter,
  Download
} from "lucide-react";

// Mock data for demonstration
const mockContacts = [
  {
    id: 1,
    name: "Arben Hoxha",
    email: "arben@example.com",
    phone: "+355 69 123 4567",
    company: "Hoxha Construction",
    serviceType: "installation",
    message: "Nevojë për instalim ashensori në ndërtesë 5-katëshe",
    date: "2024-01-15",
    status: "new"
  },
  {
    id: 2,
    name: "Elena Gjoni",
    email: "elena@example.com",
    phone: "+355 68 987 6543",
    company: "Gjoni Group",
    serviceType: "maintenance",
    message: "Mirëmbajtje vjetore për ashensorët ekzistues",
    date: "2024-01-14",
    status: "in_progress"
  },
  {
    id: 3,
    name: "Marko Petrović",
    email: "marko@example.com",
    phone: "+355 67 555 1234",
    company: "Petrović Ltd",
    serviceType: "repair",
    message: "Ashensori nuk funksionon - nevojë për riparim urgjent",
    date: "2024-01-13",
    status: "completed"
  },
  {
    id: 4,
    name: "Ana Dervishi",
    email: "ana@example.com",
    phone: "+355 69 777 8888",
    company: "Dervishi Properties",
    serviceType: "quote",
    message: "Kërkesë për ofertë për modernizim ashensori në kompleks banesash",
    date: "2024-01-12",
    status: "new"
  }
];

const Admin = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      new: { variant: "default" as const, label: "I Ri" },
      in_progress: { variant: "secondary" as const, label: "Në Progres" },
      completed: { variant: "outline" as const, label: "Përfunduar" },
      pending: { variant: "destructive" as const, label: "Në Pritje" },
      approved: { variant: "default" as const, label: "Miratuar" }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getServiceTypeLabel = (serviceType: string) => {
    const serviceLabels = {
      installation: "Instalim i ri",
      maintenance: "Mirëmbajtje",
      repair: "Riparim",
      modernization: "Modernizim",
      consultation: "Konsultim",
      quote: "Kërkesë për ofertë"
    };
    return serviceLabels[serviceType as keyof typeof serviceLabels] || serviceType;
  };

  const filteredContacts = mockContacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const quoteRequests = mockContacts.filter(contact => contact.serviceType === "quote");

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-3xl font-bold">Paneli i Administratorit</h1>
          <p className="text-primary-foreground/80 mt-2">
            Menaxhoni kontaktet dhe kërkesat për oferta
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="contacts" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="contacts">Kontaktet</TabsTrigger>
            <TabsTrigger value="quotes">Kërkesat për Oferta</TabsTrigger>
            <TabsTrigger value="analytics">Analitika</TabsTrigger>
          </TabsList>

          {/* Contacts Tab */}
          <TabsContent value="contacts" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Të gjitha Kontaktet</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Shto Kontakt
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Kërko kontaktet..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-input bg-background rounded-md"
              >
                <option value="all">Të gjitha</option>
                <option value="new">I Ri</option>
                <option value="in_progress">Në Progres</option>
                <option value="completed">Përfunduar</option>
              </select>
            </div>

            {/* Contacts List */}
            <div className="grid gap-4">
              {filteredContacts.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{contact.name}</h3>
                          {getStatusBadge(contact.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {contact.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {contact.date}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm">
                            <strong>Shërbimi:</strong> {getServiceTypeLabel(contact.serviceType)}
                          </p>
                          <p className="text-sm mt-1">
                            <strong>Mesazhi:</strong> {contact.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Përgjigju
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-1" />
                          Eksporto
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quote Requests Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Kërkesat për Oferta</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Krijoni Ofertë
              </Button>
            </div>

            <div className="grid gap-4">
              {quoteRequests.map((contact) => (
                <Card key={contact.id}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-semibold">{contact.name}</h3>
                          {getStatusBadge(contact.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Mail className="w-4 h-4" />
                            {contact.email}
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {contact.phone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Building className="w-4 h-4" />
                            {contact.company}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {contact.date}
                          </div>
                        </div>
                        <div className="mt-3">
                          <p className="text-sm">
                            <strong>Projekti:</strong> {contact.message}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Shiko Detajet
                        </Button>
                        <Button variant="outline" size="sm">
                          Krijoni Ofertë
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <h2 className="text-2xl font-semibold">Analitika</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kontakte Totale</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockContacts.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +2 nga muaji i kaluar
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Kërkesa për Oferta</CardTitle>
                  <MessageSquare className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{quoteRequests.length}</div>
                  <p className="text-xs text-muted-foreground">
                    +1 nga muaji i kaluar
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Projekte Aktive</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-xs text-muted-foreground">
                    +0 nga muaji i kaluar
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
