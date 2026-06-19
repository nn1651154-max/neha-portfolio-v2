import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { BarChart3, Table, FileSpreadsheet, Database, Mail, MessageCircle, ArrowRight, Clock, LineChart, RefreshCw, PieChart, Check, Send } from "lucide-react";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

const translations = {
  en: {
    dir: "ltr" as const,
    nav: {
      services: "Services",
      projects: "Projects",
      pricing: "Pricing",
      contact: "Contact",
      contactBtn: "Contact Me",
      toggleLang: "اردو",
    },
    hero: {
      badge: "Freelance Data Analyst",
      heading: "Hi, I'm Neha",
      sub: "I turn messy data into clear insights. Based in Multan, Pakistan, I help businesses make sense of their numbers through clean organization and powerful visualization.",
      cta: "Let's Work Together",
    },
    services: {
      heading: "How I Can Help",
      sub: "Professional data services tailored to bring clarity to your business.",
      excel: { title: "Excel Reporting", desc: "Custom, automated Excel reports that track exactly what matters to your business without the clutter." },
      pivot: { title: "Pivot Table Analysis", desc: "Transform massive spreadsheets into summary tables that reveal trends and patterns instantly." },
      viz: { title: "Data Visualization", desc: "Clear, beautiful charts and dashboards that make complex data easy for anyone to understand." },
      cleaning: { title: "Data Cleaning", desc: "Fixing errors, removing duplicates, and organizing messy data sets so they are ready for analysis." },
    },
    why: {
      heading: "Why Work With Me",
      sub: "Here is what you can expect every single time.",
      delivery: { title: "Fast Delivery", desc: "I deliver clean Excel reports within 24 hours." },
      charts: { title: "Clear Charts", desc: "I turn messy data into simple charts you can understand." },
      revisions: { title: "Unlimited Revisions", desc: "I will keep editing until you are 100% happy." },
    },
    projects: {
      heading: "Sample Projects",
      sub: "A look at the kind of work I do for clients.",
      sales: { title: "Sales Report", desc: "Bar chart showing monthly product sales broken down by category — easy to read, ready to share." },
      inventory: { title: "Inventory Tracker", desc: "Table and chart combo for tracking stock levels — see what is running low at a glance.", cols: ["Item", "Stock", "Status"] },
      expense: { title: "Expense Dashboard", desc: "Pie chart breaking down monthly expenses by category — know exactly where your money goes." },
    },
    pricing: {
      heading: "Simple Pricing",
      sub: "Clear packages with no hidden fees. Pick what fits your needs.",
      popular: "Most Popular",
      getStarted: "Get Started",
      basic: { name: "Basic", features: ["1 simple Excel report", "Clean & organized layout", "Delivered in 24 hours"] },
      standard: { name: "Standard", features: ["2 Excel reports", "1 professional chart", "Clean & organized layout", "Delivered in 24 hours"] },
      premium: { name: "Premium", features: ["Full Excel dashboard", "Charts & pivot tables", "2 rounds of revisions", "Delivered in 24 hours"] },
    },
    contact: {
      heading: "Let's Work Together",
      sub: "Ready to make your data work for you? Fill in the form or reach out directly.",
      directHeading: "Contact directly",
      directSub: "Prefer to reach out yourself? Email or WhatsApp works too.",
      whatsapp: "WhatsApp Me",
      formHeading: "Send a message",
      namePlaceholder: "Your name",
      emailPlaceholder: "your@email.com",
      messagePlaceholder: "Tell me about your project...",
      nameLabel: "Name",
      emailLabel: "Email",
      messageLabel: "Message",
      submit: "Send Message",
      sentHeading: "Message ready to send!",
      sentSub: "Your email app opened with the message pre-filled. Just hit send.",
      sendAnother: "Send another",
    },
    footer: "Data Analyst based in Multan, Pakistan.",
  },
  ur: {
    dir: "rtl" as const,
    nav: {
      services: "خدمات",
      projects: "پراجیکٹس",
      pricing: "قیمتیں",
      contact: "رابطہ",
      contactBtn: "رابطہ کریں",
      toggleLang: "English",
    },
    hero: {
      badge: "فری لانس ڈیٹا انالسٹ",
      heading: "ہیلو، میں نیہا ہوں",
      sub: "میں پیچیدہ ڈیٹا کو واضح نتائج میں بدلتی ہوں۔ ملتان، پاکستان سے، میں کاروباروں کو ان کے اعداد و شمار سمجھنے میں مدد کرتی ہوں۔",
      cta: "مل کر کام کریں",
    },
    services: {
      heading: "میں کیسے مدد کر سکتی ہوں",
      sub: "آپ کے کاروبار کو واضح بنانے کے لیے پیشہ ورانہ ڈیٹا خدمات۔",
      excel: { title: "ایکسل رپورٹنگ", desc: "آپ کے کاروبار کے لیے کسٹم ایکسل رپورٹس جو صرف ضروری معلومات دکھائیں۔" },
      pivot: { title: "پیوٹ ٹیبل تجزیہ", desc: "بڑی اسپریڈشیٹس کو خلاصہ جدولوں میں بدلیں جو رجحانات فوری ظاہر کریں۔" },
      viz: { title: "ڈیٹا ویژوالائزیشن", desc: "واضح اور خوبصورت چارٹس جو پیچیدہ ڈیٹا کو سمجھنا آسان بنائیں۔" },
      cleaning: { title: "ڈیٹا کلیننگ", desc: "غلطیاں ٹھیک کریں، ڈپلیکیٹس ہٹائیں، اور ڈیٹا کو تجزیے کے لیے تیار کریں۔" },
    },
    why: {
      heading: "میرے ساتھ کیوں کام کریں",
      sub: "ہر بار یہی توقع رکھیں۔",
      delivery: { title: "تیز ڈیلیوری", desc: "میں 24 گھنٹوں میں صاف ایکسل رپورٹس فراہم کرتی ہوں۔" },
      charts: { title: "واضح چارٹس", desc: "میں پیچیدہ ڈیٹا کو سادہ چارٹس میں بدلتی ہوں جو آپ سمجھ سکیں۔" },
      revisions: { title: "لامحدود ترامیم", desc: "میں اس وقت تک ترمیم کرتی رہوں گی جب تک آپ 100٪ خوش نہ ہوں۔" },
    },
    projects: {
      heading: "نمونہ پراجیکٹس",
      sub: "میں کلائنٹس کے لیے جس طرح کا کام کرتی ہوں اس کی ایک جھلک۔",
      sales: { title: "سیلز رپورٹ", desc: "ماہانہ پروڈکٹ سیلز کو زمرے کے مطابق بار چارٹ میں دکھایا — پڑھنے میں آسان۔" },
      inventory: { title: "انوینٹری ٹریکر", desc: "اسٹاک لیولز ٹریک کرنے کے لیے ٹیبل اور چارٹ کا مجموعہ۔", cols: ["آئٹم", "اسٹاک", "اسٹیٹس"] },
      expense: { title: "اخراجات ڈیش بورڈ", desc: "ماہانہ اخراجات کو زمرے کے مطابق پائی چارٹ میں دکھایا۔" },
    },
    pricing: {
      heading: "سادہ قیمتیں",
      sub: "کوئی پوشیدہ فیس نہیں۔ اپنی ضرورت کا پیکیج چنیں۔",
      popular: "سب سے مقبول",
      getStarted: "شروع کریں",
      basic: { name: "بنیادی", features: ["1 سادہ ایکسل رپورٹ", "صاف اور منظم لے آؤٹ", "24 گھنٹوں میں ڈیلیوری"] },
      standard: { name: "معیاری", features: ["2 ایکسل رپورٹس", "1 پیشہ ورانہ چارٹ", "صاف اور منظم لے آؤٹ", "24 گھنٹوں میں ڈیلیوری"] },
      premium: { name: "پریمیم", features: ["مکمل ایکسل ڈیش بورڈ", "چارٹس اور پیوٹ ٹیبلز", "2 مرتبہ ترامیم", "24 گھنٹوں میں ڈیلیوری"] },
    },
    contact: {
      heading: "مل کر کام کریں",
      sub: "اپنے ڈیٹا کو کام میں لانے کے لیے تیار ہیں؟ فارم بھریں یا براہ راست رابطہ کریں۔",
      directHeading: "براہ راست رابطہ",
      directSub: "خود رابطہ کرنا پسند ہے؟ ای میل یا واٹس ایپ بھی کام کرتا ہے۔",
      whatsapp: "واٹس ایپ کریں",
      formHeading: "پیغام بھیجیں",
      namePlaceholder: "آپ کا نام",
      emailPlaceholder: "آپ کی ای میل",
      messagePlaceholder: "اپنے پراجیکٹ کے بارے میں بتائیں...",
      nameLabel: "نام",
      emailLabel: "ای میل",
      messageLabel: "پیغام",
      submit: "پیغام بھیجیں",
      sentHeading: "پیغام بھیجنے کے لیے تیار!",
      sentSub: "آپ کی ای میل ایپ کھل گئی ہے اور پیغام پہلے سے بھرا ہوا ہے۔ بس بھیجیں۔",
      sendAnother: "ایک اور بھیجیں",
    },
    footer: "ڈیٹا انالسٹ، ملتان، پاکستان۔",
  },
};

type Lang = keyof typeof translations;

function Portfolio() {
  const [lang, setLang] = useState<Lang>("en");
  const t = translations[lang];

  const scrollToContact = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Message from ${form.name}`);
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
    window.location.href = `mailto:neha.data@gmail.com?subject=${subject}&body=${body}`;
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary/20" dir={t.dir}>
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="text-xl font-bold tracking-tight text-primary">Neha</div>
          <div className="hidden sm:flex items-center gap-1">
            {(["services", "projects", "pricing", "contact"] as const).map((id) => (
              <button
                key={id}
                onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })}
                className="px-3 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-md hover:bg-primary/5"
                data-testid={`link-nav-${id}`}
              >
                {t.nav[id]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ur" : "en")}
              className="px-3 py-1.5 text-sm font-semibold text-primary border border-primary/30 rounded-md hover:bg-primary/5 transition-colors"
              data-testid="button-toggle-lang"
            >
              {t.nav.toggleLang}
            </button>
            <Button variant="outline" onClick={scrollToContact} className="font-medium" data-testid="button-nav-contact">
              {t.nav.contactBtn}
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center py-24 text-center md:py-32 lg:py-40">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
            <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
            {t.hero.badge}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground">
            {t.hero.heading}
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button size="lg" onClick={scrollToContact} className="gap-2" data-testid="button-hero-contact">
              {t.hero.cta} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24" id="services">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.services.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.services.sub}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:gap-8 max-w-5xl mx-auto">
            {([
              { key: "excel", icon: <FileSpreadsheet className="h-6 w-6" />, testId: "card-service-excel" },
              { key: "pivot", icon: <Table className="h-6 w-6" />, testId: "card-service-pivot" },
              { key: "viz", icon: <BarChart3 className="h-6 w-6" />, testId: "card-service-viz" },
              { key: "cleaning", icon: <Database className="h-6 w-6" />, testId: "card-service-cleaning" },
            ] as const).map(({ key, icon, testId }) => (
              <Card key={key} className="border-border/50 shadow-sm transition-all hover:shadow-md hover:border-primary/20" data-testid={testId}>
                <CardHeader>
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {icon}
                  </div>
                  <CardTitle className="text-xl">{t.services[key].title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground">
                    {t.services[key].desc}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Why Work With Me Section */}
        <section className="py-16 md:py-24" id="why-me">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.why.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.why.sub}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto">
            {([
              { key: "delivery", icon: <Clock className="h-7 w-7" />, testId: "card-why-delivery" },
              { key: "charts", icon: <LineChart className="h-7 w-7" />, testId: "card-why-charts" },
              { key: "revisions", icon: <RefreshCw className="h-7 w-7" />, testId: "card-why-revisions" },
            ] as const).map(({ key, icon, testId }) => (
              <div key={key} className="flex flex-col items-center text-center p-8 rounded-2xl border border-border/50 bg-primary/5 hover:border-primary/20 transition-all" data-testid={testId}>
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-5">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">{t.why[key].title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.why[key].desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section className="py-16 md:py-24" id="projects">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.projects.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.projects.sub}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-5xl mx-auto">
            <Card className="border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden" data-testid="card-project-sales">
              <div className="h-36 bg-primary/10 flex items-center justify-center">
                <div className="flex items-end gap-2">
                  {[40, 65, 50, 80, 60, 90].map((h, i) => (
                    <div key={i} className="w-6 rounded-t-sm bg-primary/60" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <BarChart3 className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">{t.projects.sales.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{t.projects.sales.desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden" data-testid="card-project-inventory">
              <div className="h-36 bg-primary/10 flex items-center justify-center gap-4">
                <div className="w-24 rounded-md border border-primary/30 overflow-hidden text-xs">
                  {t.projects.inventory.cols.map((col, i) => (
                    <div key={i} className={`px-2 py-1 ${i === 0 ? "bg-primary/20 font-semibold text-primary" : "bg-white/60 text-muted-foreground"} border-b border-primary/10 last:border-0`}>
                      {col}
                    </div>
                  ))}
                </div>
                <div className="flex items-end gap-1">
                  {[55, 80, 35, 70].map((h, i) => (
                    <div key={i} className="w-4 rounded-t-sm bg-primary/50" style={{ height: `${h}px` }} />
                  ))}
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <Table className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">{t.projects.inventory.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{t.projects.inventory.desc}</CardDescription>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm hover:shadow-md hover:border-primary/20 transition-all overflow-hidden" data-testid="card-project-expense">
              <div className="h-36 bg-primary/10 flex items-center justify-center">
                <div className="relative h-24 w-24">
                  <svg viewBox="0 0 36 36" className="h-24 w-24 -rotate-90">
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="3.2" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary))" strokeWidth="3.2" strokeDasharray="40 60" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary) / 0.5)" strokeWidth="3.2" strokeDasharray="25 75" strokeDashoffset="-40" />
                    <circle cx="18" cy="18" r="15.9" fill="none" stroke="hsl(var(--primary) / 0.3)" strokeWidth="3.2" strokeDasharray="35 65" strokeDashoffset="-65" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <PieChart className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
                    <PieChart className="h-4 w-4" />
                  </div>
                  <CardTitle className="text-lg">{t.projects.expense.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm text-muted-foreground">{t.projects.expense.desc}</CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 md:py-24" id="pricing">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.pricing.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.pricing.sub}</p>
          </div>

          <div className="grid gap-6 sm:grid-cols-3 max-w-4xl mx-auto items-stretch">
            <Card className="border-border/50 shadow-sm flex flex-col" data-testid="card-pricing-basic">
              <CardHeader className="pb-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">{t.pricing.basic.name}</p>
                <span className="text-4xl font-extrabold text-foreground">$10</span>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <ul className="space-y-3 flex-1">
                  {t.pricing.basic.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10" onClick={scrollToContact} data-testid="button-pricing-basic">
                  {t.pricing.getStarted}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-primary/40 shadow-md bg-primary/5 flex flex-col relative" data-testid="card-pricing-standard">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">{t.pricing.popular}</span>
              </div>
              <CardHeader className="pb-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">{t.pricing.standard.name}</p>
                <span className="text-4xl font-extrabold text-foreground">$25</span>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <ul className="space-y-3 flex-1">
                  {t.pricing.standard.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button className="w-full" onClick={scrollToContact} data-testid="button-pricing-standard">
                  {t.pricing.getStarted}
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/50 shadow-sm flex flex-col" data-testid="card-pricing-premium">
              <CardHeader className="pb-4">
                <p className="text-sm font-semibold uppercase tracking-widest text-primary mb-2">{t.pricing.premium.name}</p>
                <span className="text-4xl font-extrabold text-foreground">$45</span>
              </CardHeader>
              <CardContent className="flex flex-col flex-1 gap-4">
                <ul className="space-y-3 flex-1">
                  {t.pricing.premium.features.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 mt-0.5 shrink-0 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10" onClick={scrollToContact} data-testid="button-pricing-premium">
                  {t.pricing.getStarted}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.contact.heading}</h2>
              <p className="text-lg text-muted-foreground">{t.contact.sub}</p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{t.contact.directHeading}</h3>
                  <p className="text-sm text-muted-foreground">{t.contact.directSub}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="gap-2 w-full" data-testid="link-email">
                    <a href="mailto:neha.data@gmail.com">
                      <Mail className="h-5 w-5" />
                      neha.data@gmail.com
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2 w-full border-primary/20 hover:bg-primary/10" data-testid="link-whatsapp">
                    <a href="https://wa.me/923000000000" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      {t.contact.whatsapp}
                    </a>
                  </Button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/50 p-8 shadow-sm">
                {sent ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-8">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Check className="h-7 w-7" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">{t.contact.sentHeading}</h3>
                    <p className="text-sm text-muted-foreground">{t.contact.sentSub}</p>
                    <Button variant="outline" className="mt-2 border-primary/20 hover:bg-primary/10" onClick={() => setSent(false)} data-testid="button-send-another">
                      {t.contact.sendAnother}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5" data-testid="form-contact">
                    <h3 className="text-lg font-semibold text-foreground">{t.contact.formHeading}</h3>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="name">{t.contact.nameLabel}</Label>
                      <Input
                        id="name"
                        placeholder={t.contact.namePlaceholder}
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        required
                        data-testid="input-name"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="email">{t.contact.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder={t.contact.emailPlaceholder}
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        required
                        data-testid="input-email"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label htmlFor="message">{t.contact.messageLabel}</Label>
                      <Textarea
                        id="message"
                        placeholder={t.contact.messagePlaceholder}
                        rows={4}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        required
                        data-testid="input-message"
                      />
                    </div>
                    <Button type="submit" className="gap-2 w-full" data-testid="button-submit-form">
                      <Send className="h-4 w-4" />
                      {t.contact.submit}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/40 py-8 md:py-12 mt-12">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Neha. {t.footer}
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
