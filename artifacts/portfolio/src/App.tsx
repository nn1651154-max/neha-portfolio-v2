import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Table, FileSpreadsheet, Database, Mail, MessageCircle, ArrowRight, Clock, LineChart, RefreshCw } from "lucide-react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Portfolio() {
  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="text-xl font-bold tracking-tight text-primary">Neha</div>
          <Button variant="outline" onClick={scrollToContact} className="font-medium" data-testid="button-nav-contact">
            Contact Me
          </Button>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-24 text-center md:py-32 lg:py-40">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            Freelance Data Analyst
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            Hi, I'm Neha
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            I turn messy data into clear insights. Based in Multan, Pakistan, I help businesses make sense of their numbers through clean organization and powerful visualization.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={scrollToContact} className="gap-2" data-testid="button-hero-contact">
              Let's Work Together <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24" id="services">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">How I Can Help</h2>
            <p className="text-muted-foreground text-lg">
              Professional data services tailored to bring clarity to your business.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
            <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20" data-testid="card-service-excel">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <FileSpreadsheet className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Excel Reporting</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Custom, automated Excel reports that track exactly what matters to your business without the clutter.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20" data-testid="card-service-pivot">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Table className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Pivot Table Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Transform massive spreadsheets into summary tables that reveal trends and patterns instantly.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20" data-testid="card-service-viz">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BarChart3 className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Data Visualization</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Clear, beautiful charts and dashboards that make complex data easy for anyone to understand.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20" data-testid="card-service-cleaning">
              <CardHeader>
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">Data Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-muted-foreground">
                  Fixing errors, removing duplicates, and organizing messy data sets so they are ready for analysis.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section className="py-16 md:py-24" id="why-me">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">Why Work With Me</h2>
            <p className="text-muted-foreground text-lg">
              Here is what you can expect every single time.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-primary/5 hover:border-primary/20 transition-all" data-testid="card-why-delivery">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                <Clock className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Fast Delivery</h3>
              <p className="text-muted-foreground leading-relaxed">
                I deliver clean Excel reports within 24 hours.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-primary/5 hover:border-primary/20 transition-all" data-testid="card-why-charts">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                <LineChart className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Clear Charts</h3>
              <p className="text-muted-foreground leading-relaxed">
                I turn messy data into simple charts you can understand.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-primary/5 hover:border-primary/20 transition-all" data-testid="card-why-revisions">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                <RefreshCw className="h-7 w-7" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-3">Unlimited Revisions</h3>
              <p className="text-muted-foreground leading-relaxed">
                I will keep editing until you are 100% happy.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="mx-auto max-w-2xl rounded-2xl bg-primary/5 px-6 py-12 sm:py-16 md:px-12 text-center border border-primary/10">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">Let's Work Together</h2>
            <p className="mx-auto max-w-xl text-lg text-muted-foreground mb-8">
              Ready to make your data work for you? Send me an email or a message on WhatsApp to discuss your project.
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="gap-2" data-testid="link-email">
                <a href="mailto:neha.data@gmail.com">
                  <Mail className="h-5 w-5" />
                  neha.data@gmail.com
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 border-primary/20 hover:bg-primary/10" data-testid="link-whatsapp">
                <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp Me
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8 md:py-12 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neha. Data Analyst based in Multan, Pakistan.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Portfolio} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;