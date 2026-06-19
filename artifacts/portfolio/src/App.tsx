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
      sub: "I turn messy data into clear insights. Based in Mian Channu, Punjab, I help businesses make sense of their numbers through clean organization and powerful visualization.",
      cta: "Let's Work Together",
    },
    about: {
      heading: "About Me",
      body: "Hi, I'm Neha from Mian Channu, Punjab. I'm a beginner freelancer with strong skills in data entry, Excel reports, and Fiverr gig SEO. I may be new, but I'm detail-oriented, fast, and committed to giving 100% to every client. I'm excited to help your business grow.",
    },
    skills: {
      heading: "My Skills",
      sub: "What I bring to every project.",
      items: [
        { label: "Data Entry", pct: 90 },
        { label: "Excel Reports", pct: 85 },
        { label: "Fiverr Gig SEO", pct: 80 },
        { label: "Data Cleaning", pct: 85 },
      ],
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
    testimonials: {
      heading: "Clients Say",
      sub: "Kind words from people I have worked with.",
      items: [
        { quote: "Neha delivered my sales report in less than 12 hours. Everything was clean, clearly labeled, and exactly what I needed. Will definitely hire again.", name: "Ahmed R.", role: "Small Business Owner" },
        { quote: "She kept me updated at every step and made changes the same day I asked. Very easy to work with and the final chart was perfect.", name: "Sara K.", role: "Online Retailer" },
      ],
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
      fiverr: "View Fiverr Profile",
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
      responseTime: "Usually responds within 1 hour",
    },
    faq: {
      heading: "Frequently Asked Questions",
      sub: "Quick answers to common questions.",
      items: [
        { q: "How do I send you my data?", a: "Just share your Excel or CSV file via WhatsApp or email. I will take it from there." },
        { q: "Do you offer revisions?", a: "Yes. Basic and Standard packages include unlimited revisions. Premium includes 2 rounds of revisions." },
        { q: "How long does a project take?", a: "Most reports are delivered within 24 hours. Larger dashboards may take up to 48 hours." },
        { q: "What if I am not happy with the result?", a: "I will keep editing until you are 100% satisfied. Your happiness is my priority." },
      ],
    },
    hireBanner: {
      heading: "Ready to turn your data into results?",
      sub: "Let's work together — fast delivery, clear visuals, and 100% satisfaction guaranteed.",
      cta: "Hire Me Now",
    },
    footer: "Data Analyst based in Mian Channu, Punjab.",
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
      sub: "میں پیچیدہ ڈیٹا کو واضح نتائج میں بدلتی ہوں۔ میاں چنوں، پنجاب سے، میں کاروباروں کو ان کے اعداد و شمار سمجھنے میں مدد کرتی ہوں۔",
      cta: "مل کر کام کریں",
    },
    about: {
      heading: "میرے بارے میں",
      body: "ہیلو، میں نیہا ہوں، میاں چنوں، پنجاب سے۔ میں ایک ابتدائی فری لانسر ہوں جس کے پاس ڈیٹا انٹری، ایکسل رپورٹس، اور Fiverr گگ SEO میں مضبوط مہارتیں ہیں۔ میں نئی ہوں، لیکن میں تفصیل پر توجہ دیتی ہوں، تیز کام کرتی ہوں، اور ہر کلائنٹ کو 100٪ دینے کے لیے پرعزم ہوں۔ میں آپ کے کاروبار کو بڑھانے میں مدد کرنے کے لیے پرجوش ہوں۔",
    },
    skills: {
      heading: "میری مہارتیں",
      sub: "میں ہر پراجیکٹ میں یہ لاتی ہوں۔",
      items: [
        { label: "ڈیٹا انٹری", pct: 90 },
        { label: "ایکسل رپورٹس", pct: 85 },
        { label: "Fiverr گگ SEO", pct: 80 },
        { label: "ڈیٹا کلیننگ", pct: 85 },
      ],
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
    testimonials: {
      heading: "کلائنٹس کیا کہتے ہیں",
      sub: "جن لوگوں کے ساتھ میں نے کام کیا ان کے الفاظ۔",
      items: [
        { quote: "نیہا نے میری سیلز رپورٹ 12 گھنٹوں سے بھی کم وقت میں دی۔ سب کچھ صاف اور بالکل وہی تھا جو مجھے چاہیے تھا۔ ضرور دوبارہ کام کروں گا۔", name: "احمد ر۔", role: "چھوٹے کاروبار کے مالک" },
        { quote: "انہوں نے مجھے ہر قدم پر اپ ڈیٹ رکھا اور اسی دن تبدیلیاں کیں۔ کام کرنا بہت آسان تھا اور آخری چارٹ بالکل درست تھا۔", name: "سارہ ک۔", role: "آن لائن ریٹیلر" },
      ],
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
      fiverr: "Fiverr پروفائل دیکھیں",
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
      responseTime: "عام طور پر 1 گھنٹے میں جواب دیتی ہیں",
    },
    faq: {
      heading: "اکثر پوچھے جانے والے سوالات",
      sub: "عام سوالوں کے فوری جوابات۔",
      items: [
        { q: "میں آپ کو اپنا ڈیٹا کیسے بھیجوں؟", a: "بس اپنی ایکسل یا CSV فائل واٹس ایپ یا ای میل پر شیئر کریں۔ باقی کام میں کروں گی۔" },
        { q: "کیا آپ ترامیم کرتی ہیں؟", a: "ہاں۔ بنیادی اور معیاری پیکیج میں لامحدود ترامیم شامل ہیں۔ پریمیم میں 2 مرتبہ ترامیم ہیں۔" },
        { q: "ایک پراجیکٹ میں کتنا وقت لگتا ہے؟", a: "زیادہ تر رپورٹس 24 گھنٹوں میں فراہم کی جاتی ہیں۔ بڑے ڈیش بورڈز میں 48 گھنٹے لگ سکتے ہیں۔" },
        { q: "اگر میں نتیجے سے خوش نہ ہوں تو؟", a: "میں اس وقت تک ترمیم کرتی رہوں گی جب تک آپ 100٪ مطمئن نہ ہو جائیں۔ آپ کی خوشی میری ترجیح ہے۔" },
      ],
    },
    hireBanner: {
      heading: "کیا آپ اپنے ڈیٹا کو نتائج میں بدلنے کے لیے تیار ہیں؟",
      sub: "آئیں مل کر کام کریں — تیز ڈیلیوری، واضح ویژولز، اور 100٪ اطمینان کی ضمانت۔",
      cta: "مجھے ابھی ہائر کریں",
    },
    footer: "ڈیٹا انالسٹ، میاں چنوں، پنجاب۔",
  },
};

type Lang = keyof typeof translations;

function FaqItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-5" data-testid={`faq-item-${index}`}>
      <button
        className="flex w-full items-center justify-between gap-4 text-left"
        onClick={() => setOpen(!open)}
        data-testid={`faq-toggle-${index}`}
      >
        <span className="font-semibold text-foreground">{question}</span>
        <span className={`shrink-0 h-6 w-6 rounded-full bg-primary/10 text-primary flex items-center justify-center transition-transform duration-200 ${open ? "rotate-45" : ""}`}>
          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14" /></svg>
        </span>
      </button>
      {open && (
        <p className="mt-3 text-muted-foreground leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

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
    window.location.href = `mailto:fn68489@gmail.com?subject=${subject}&body=${body}`;
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

        {/* About Me Section */}
        <section className="py-16 md:py-24" id="about">
          <div className="mx-auto max-w-3xl">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 px-8 py-12 md:px-14 flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 flex items-center justify-center h-24 w-24 rounded-full bg-primary/10 text-primary text-4xl font-extrabold">
                N
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-4">{t.about.heading}</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">{t.about.body}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section className="py-16 md:py-24" id="skills">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.skills.heading}</h2>
              <p className="text-muted-foreground text-lg">{t.skills.sub}</p>
            </div>
            <div className="flex flex-col gap-6" data-testid="section-skills">
              {t.skills.items.map((skill) => (
                <div key={skill.label} data-testid={`skill-bar-${skill.pct}`}>
                  <div className="flex justify-between mb-1.5">
                    <span className="text-sm font-semibold text-foreground">{skill.label}</span>
                    <span className="text-sm font-semibold text-primary">{skill.pct}%</span>
                  </div>
                  <div className="h-3 w-full rounded-full bg-primary/10">
                    <div
                      className="h-3 rounded-full bg-primary transition-all"
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
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

        {/* Testimonials Section */}
        <section className="py-16 md:py-24" id="testimonials">
          <div className="mx-auto max-w-3xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.testimonials.heading}</h2>
            <p className="text-muted-foreground text-lg">{t.testimonials.sub}</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
            {t.testimonials.items.map((item, i) => (
              <div key={i} className="flex flex-col gap-4 rounded-2xl border border-border/50 bg-primary/5 p-8" data-testid={`card-testimonial-${i}`}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, s) => (
                    <svg key={s} className="h-4 w-4 fill-primary" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
                </div>
                <p className="text-muted-foreground leading-relaxed flex-1">"{item.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground text-sm">{item.name}</p>
                  <p className="text-xs text-primary">{item.role}</p>
                </div>
              </div>
            ))}
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

        {/* FAQ Section */}
        <section className="py-16 md:py-24" id="faq">
          <div className="mx-auto max-w-3xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.faq.heading}</h2>
              <p className="text-muted-foreground text-lg">{t.faq.sub}</p>
            </div>
            <div className="flex flex-col divide-y divide-border/50" data-testid="section-faq">
              {t.faq.items.map((item, i) => (
                <FaqItem key={i} question={item.q} answer={item.a} index={i} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32">
          <div className="mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-foreground">{t.contact.heading}</h2>
              <p className="text-lg text-muted-foreground mb-4">{t.contact.sub}</p>
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary" data-testid="badge-response-time">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse"></span>
                {t.contact.responseTime}
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{t.contact.directHeading}</h3>
                  <p className="text-sm text-muted-foreground">{t.contact.directSub}</p>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="gap-2 w-full" data-testid="link-email">
                    <a href="mailto:fn68489@gmail.com">
                      <Mail className="h-5 w-5" />
                      fn68489@gmail.com
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2 w-full border-primary/20 hover:bg-primary/10" data-testid="link-whatsapp">
                    <a href="https://wa.me/923154319633" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="h-5 w-5" />
                      {t.contact.whatsapp}
                    </a>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="gap-2 w-full border-[#1DBF73]/40 text-[#1DBF73] hover:bg-[#1DBF73]/10" data-testid="link-fiverr">
                    <a href="https://www.fiverr.com/neha_sial" target="_blank" rel="noopener noreferrer">
                      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.004 15.588a.995.995 0 1 0 .002-1.99.995.995 0 0 0-.002 1.99zm-.996-3.705h-.85c-.546 0-.84.41-.84 1.092v2.613h-1.618v-3.705h-.718v-1.337h.718v-.574c0-1.21.76-1.87 1.954-1.87.47 0 .908.07 1.354.14v1.29h-.84c-.547 0-.718.273-.718.615v.4h1.558l-.2 1.337-.8-.001zm-5.247 3.705H15.15v-3.705h-.718v-1.337h.718v-.738c0-1.21.76-1.87 1.954-1.87.47 0 .908.07 1.354.14v1.29h-.84c-.547 0-.718.273-.718.615v.563h1.558l-.2 1.337h-1.358v3.705h.862zm-4.74-5.042h-1.618v5.042H8.785v-5.042H8.07v-1.337h.718v-.492c0-1.21.76-1.87 1.954-1.87.334 0 .67.042 1.002.098v1.295h-.718c-.547 0-.718.273-.718.615v.354h1.618l-.204 1.337zm-4.81 5.042H5.593v-6.379h1.618v6.379zm-2.81-8.54c0 .546-.41.84-1.092.84-.682 0-1.092-.294-1.092-.84 0-.546.41-.84 1.092-.84.682 0 1.092.294 1.092.84zm-2.184 8.54H0V8.03h1.617v7.558z"/>
                      </svg>
                      {t.contact.fiverr}
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

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/923154319633"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center h-14 w-14 rounded-full shadow-lg bg-[#25D366] hover:bg-[#1ebe5d] transition-colors"
        aria-label="WhatsApp"
        data-testid="button-floating-whatsapp"
      >
        <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Hire Me Banner */}
      <section className="bg-primary py-16 md:py-20" data-testid="hire-banner">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
            {t.hireBanner.heading}
          </h2>
          <p className="text-primary-foreground/80 text-lg mb-8 max-w-xl mx-auto">
            {t.hireBanner.sub}
          </p>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 bg-white text-primary font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-white/90 transition-colors text-base"
          >
            {t.hireBanner.cta}
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </a>
        </div>
      </section>

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
