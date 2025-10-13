import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { login, logout, isAuthenticated as checkAuth } from "@/lib/auth";
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
  Download,
  Lock,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Save,
  X
} from "lucide-react";

// Types
interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  serviceType: string;
  message: string;
  date: string;
  status: string;
}

// Default data
const defaultContacts: Contact[] = [
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
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Data state
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  // Form state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    serviceType: "",
    message: "",
    status: "new"
  });

  const { toast } = useToast();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedContacts = localStorage.getItem('admin-contacts');
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    } else {
      setContacts(defaultContacts);
      localStorage.setItem('admin-contacts', JSON.stringify(defaultContacts));
    }

    // Check if already authenticated
    setIsAuthenticated(checkAuth());
  }, []);

  // Save contacts to localStorage whenever contacts change
  useEffect(() => {
    if (contacts.length > 0) {
      localStorage.setItem('admin-contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  // Authentication functions
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setIsAuthenticated(true);
      setLoginError("");
      toast({
        title: "Mirëseerdhët!",
        description: "Jeni kyçur me sukses në panelin e administratorit.",
      });
    } else {
      setLoginError("Kredencialet janë të gabuara. Përdorni: admin / shpetimi1234");
      toast({
        title: "Gabim në kyçje",
        description: "Kredencialet janë të gabuara.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    logout();
    setIsAuthenticated(false);
    setUsername("");
    setPassword("");
    toast({
      title: "U shkyçët",
      description: "Jeni shkyçur me sukses.",
    });
  };

  // CRUD functions
  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const newContact: Contact = {
      id: Math.max(...contacts.map(c => c.id), 0) + 1,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      serviceType: formData.serviceType,
      message: formData.message,
      date: new Date().toISOString().split('T')[0],
      status: formData.status
    };
    
    setContacts([...contacts, newContact]);
    setIsAddDialogOpen(false);
    resetForm();
    toast({
      title: "Kontakt u shtua",
      description: "Kontakti u shtua me sukses.",
    });
  };

  const handleEditContact = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      company: contact.company,
      serviceType: contact.serviceType,
      message: contact.message,
      status: contact.status
    });
    setIsEditDialogOpen(true);
  };

  const handleUpdateContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingContact) return;

    const updatedContacts = contacts.map(contact =>
      contact.id === editingContact.id
        ? { ...contact, ...formData }
        : contact
    );
    
    setContacts(updatedContacts);
    setIsEditDialogOpen(false);
    setEditingContact(null);
    resetForm();
    toast({
      title: "Kontakt u përditësua",
      description: "Kontakti u përditësua me sukses.",
    });
  };

  const handleDeleteContact = (id: number) => {
    setContacts(contacts.filter(contact => contact.id !== id));
    toast({
      title: "Kontakt u fshi",
      description: "Kontakti u fshi me sukses.",
    });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      serviceType: "",
      message: "",
      status: "new"
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const exportContacts = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "ID,Name,Email,Phone,Company,Service Type,Message,Date,Status\n" +
      contacts.map(contact => 
        `${contact.id},"${contact.name}","${contact.email}","${contact.phone}","${contact.company}","${contact.serviceType}","${contact.message}","${contact.date}","${contact.status}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "contacts.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Eksportimi u përfundua",
      description: "Kontaktet u eksportuan në CSV.",
    });
  };

  // Utility functions
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

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || contact.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const quoteRequests = contacts.filter(contact => contact.serviceType === "quote");

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <Lock className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl">Kyçja në Admin</CardTitle>
            <CardDescription>
              Shkruani kredencialet për të hyrë në panelin e administratorit
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium mb-2">
                  Përdoruesi
                </label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Fjalëkalimi
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="shpetimi1234"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {loginError && (
                <p className="text-sm text-destructive">{loginError}</p>
              )}
              <Button type="submit" className="w-full">
                Kyçu
              </Button>
            </form>
            <div className="mt-4 p-3 bg-muted rounded-md">
              <p className="text-sm text-muted-foreground">
                <strong>Kredencialet:</strong><br />
                Përdoruesi: <code>admin</code><br />
                Fjalëkalimi: <code>shpetimi1234</code>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Paneli i Administratorit</h1>
              <p className="text-primary-foreground/80 mt-2">
                Menaxhoni kontaktet dhe kërkesat për oferta
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout} className="text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Shkyçu
            </Button>
          </div>
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
              <h2 className="text-2xl font-semibold">Të gjitha Kontaktet ({filteredContacts.length})</h2>
              <div className="flex gap-2">
                <Button onClick={exportContacts}>
                  <Download className="w-4 h-4 mr-2" />
                  Eksporto CSV
                </Button>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button>
                      <Plus className="w-4 h-4 mr-2" />
                      Shto Kontakt
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Shto Kontakt të Ri</DialogTitle>
                      <DialogDescription>
                        Plotësoni informacionet për kontaktin e ri
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAddContact} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="add-name" className="block text-sm font-medium mb-2">
                            Emri i Plotë *
                          </label>
                          <Input
                            id="add-name"
                            name="name"
                            value={formData.name}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="add-email" className="block text-sm font-medium mb-2">
                            Email *
                          </label>
                          <Input
                            id="add-email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleFormChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="add-phone" className="block text-sm font-medium mb-2">
                            Telefoni
                          </label>
                          <Input
                            id="add-phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleFormChange}
                          />
                        </div>
                        <div>
                          <label htmlFor="add-company" className="block text-sm font-medium mb-2">
                            Kompania
                          </label>
                          <Input
                            id="add-company"
                            name="company"
                            value={formData.company}
                            onChange={handleFormChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="add-serviceType" className="block text-sm font-medium mb-2">
                            Lloji i Shërbimit
                          </label>
                          <select
                            id="add-serviceType"
                            name="serviceType"
                            value={formData.serviceType}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="">Zgjidhni shërbimin</option>
                            <option value="installation">Instalim i ri</option>
                            <option value="maintenance">Mirëmbajtje</option>
                            <option value="repair">Riparim</option>
                            <option value="modernization">Modernizim</option>
                            <option value="consultation">Konsultim</option>
                            <option value="quote">Kërkesë për ofertë</option>
                          </select>
                        </div>
                        <div>
                          <label htmlFor="add-status" className="block text-sm font-medium mb-2">
                            Statusi
                          </label>
                          <select
                            id="add-status"
                            name="status"
                            value={formData.status}
                            onChange={handleFormChange}
                            className="w-full px-3 py-2 border border-input bg-background rounded-md"
                          >
                            <option value="new">I Ri</option>
                            <option value="in_progress">Në Progres</option>
                            <option value="completed">Përfunduar</option>
                            <option value="pending">Në Pritje</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="add-message" className="block text-sm font-medium mb-2">
                          Mesazhi
                        </label>
                        <Textarea
                          id="add-message"
                          name="message"
                          value={formData.message}
                          onChange={handleFormChange}
                          rows={3}
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                          Anulo
                        </Button>
                        <Button type="submit">
                          <Save className="w-4 h-4 mr-2" />
                          Ruaj
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditContact(contact)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Modifiko
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Fshi
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Contact Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Modifiko Kontaktin</DialogTitle>
                  <DialogDescription>
                    Përditësoni informacionet e kontaktit
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleUpdateContact} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-name" className="block text-sm font-medium mb-2">
                        Emri i Plotë *
                      </label>
                      <Input
                        id="edit-name"
                        name="name"
                        value={formData.name}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="edit-email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-phone" className="block text-sm font-medium mb-2">
                        Telefoni
                      </label>
                      <Input
                        id="edit-phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleFormChange}
                      />
                    </div>
                    <div>
                      <label htmlFor="edit-company" className="block text-sm font-medium mb-2">
                        Kompania
                      </label>
                      <Input
                        id="edit-company"
                        name="company"
                        value={formData.company}
                        onChange={handleFormChange}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="edit-serviceType" className="block text-sm font-medium mb-2">
                        Lloji i Shërbimit
                      </label>
                      <select
                        id="edit-serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="">Zgjidhni shërbimin</option>
                        <option value="installation">Instalim i ri</option>
                        <option value="maintenance">Mirëmbajtje</option>
                        <option value="repair">Riparim</option>
                        <option value="modernization">Modernizim</option>
                        <option value="consultation">Konsultim</option>
                        <option value="quote">Kërkesë për ofertë</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="edit-status" className="block text-sm font-medium mb-2">
                        Statusi
                      </label>
                      <select
                        id="edit-status"
                        name="status"
                        value={formData.status}
                        onChange={handleFormChange}
                        className="w-full px-3 py-2 border border-input bg-background rounded-md"
                      >
                        <option value="new">I Ri</option>
                        <option value="in_progress">Në Progres</option>
                        <option value="completed">Përfunduar</option>
                        <option value="pending">Në Pritje</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="edit-message" className="block text-sm font-medium mb-2">
                      Mesazhi
                    </label>
                    <Textarea
                      id="edit-message"
                      name="message"
                      value={formData.message}
                      onChange={handleFormChange}
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                      <X className="w-4 h-4 mr-2" />
                      Anulo
                    </Button>
                    <Button type="submit">
                      <Save className="w-4 h-4 mr-2" />
                      Ruaj Ndryshimet
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </TabsContent>

          {/* Quote Requests Tab */}
          <TabsContent value="quotes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Kërkesat për Oferta ({quoteRequests.length})</h2>
              <Button onClick={exportContacts}>
                <Download className="w-4 h-4 mr-2" />
                Eksporto CSV
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
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleEditContact(contact)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Modifiko
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => {
                            // Mark as in progress when creating quote
                            const updatedContact = { ...contact, status: 'in_progress' };
                            handleEditContact(updatedContact);
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Krijoni Ofertë
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteContact(contact.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Fshi
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
                  <div className="text-2xl font-bold">{contacts.length}</div>
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
