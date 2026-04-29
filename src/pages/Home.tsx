import { motion, useScroll, useTransform } from "motion/react";
import { 
  Brain, 
  Smartphone,
  Layout,
  Settings,
  Bot,
  ArrowRight, 
  Mail, 
  Phone, 
  Globe,
  Menu,
  X,
  Zap,
  TrendingUp,
  Network,
  Shield,
  Camera,
  Users,
  Code,
  LineChart,
  Video,
  Eye,
  Cpu,
  Link2,
  ChevronDown
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { supabase } from "../supabaseClient";

/* ═══════════════════════════════════════════════
   مكون الخلفية التقنية المتحركة
   ═══════════════════════════════════════════════ */
const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(#00d2ff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-brand-primary/10 rounded-full blur-xl"
          initial={{ 
            width: Math.random() * 300 + 100, 
            height: Math.random() * 300 + 100,
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.05
          }}
          animate={{ 
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0.05, 0.15, 0.05]
          }}
          transition={{ 
            duration: Math.random() * 25 + 15, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════════
   الصفحة الرئيسية
   ═══════════════════════════════════════════════ */
function HomeContent({ contentRows }: { contentRows: any[] }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Parallax refs - will now correctly attach because this component only mounts after loading
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImageY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const heroRow = contentRows.find(c => c.section_name === 'hero') || {};
  const contactRow = contentRows.find(c => c.section_name === 'contact') || {};
  const serviceRows = contentRows.filter(c => c.section_name === 'service');

  const iconMap: Record<string, React.ReactNode> = {
    "Smartphone": <Smartphone className="w-10 h-10 text-brand-accent" />,
    "Layout": <Layout className="w-10 h-10 text-brand-accent" />,
    "Settings": <Settings className="w-10 h-10 text-brand-accent" />,
    "Bot": <Bot className="w-10 h-10 text-brand-accent" />,
    "Shield": <Shield className="w-10 h-10 text-brand-accent" />,
    "Camera": <Camera className="w-10 h-10 text-brand-accent" />,
    "Users": <Users className="w-10 h-10 text-brand-accent" />,
    "Code": <Code className="w-10 h-10 text-brand-accent" />,
    "LineChart": <LineChart className="w-10 h-10 text-brand-accent" />,
    "Video": <Video className="w-10 h-10 text-brand-accent" />
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans" dir="rtl">

      {/* ══════════ Navigation ══════════ */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-bg-dark/95 backdrop-blur-xl shadow-2xl shadow-black/30 border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <motion.div whileHover={{ scale: 1.05 }} className="flex items-center">
                <img src="/logo.png" alt="ترقية Tarqia" className="h-20 w-auto object-contain scale-[1.5] md:scale-[1.8] origin-right" />
              </motion.div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-white/70 hover:text-brand-accent font-medium transition-colors">الرئيسية</a>
              <a href="#about" className="text-white/70 hover:text-brand-accent font-medium transition-colors">من نحن</a>
              <a href="#services" className="text-white/70 hover:text-brand-accent font-medium transition-colors">خدماتنا</a>
              <a href={contactRow.image_url || "#"} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20 hover:shadow-brand-primary/40">
                اتصل بنا
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-white">
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-bg-dark/95 backdrop-blur-xl border-b border-white/10 p-4 space-y-4 shadow-xl"
          >
            <a href="#home" onClick={() => setIsMenuOpen(false)} className="block text-white/70 px-4 py-2 hover:bg-brand-primary/10 rounded-lg">الرئيسية</a>
            <a href="#about" onClick={() => setIsMenuOpen(false)} className="block text-white/70 px-4 py-2 hover:bg-brand-primary/10 rounded-lg">من نحن</a>
            <a href="#services" onClick={() => setIsMenuOpen(false)} className="block text-white/70 px-4 py-2 hover:bg-brand-primary/10 rounded-lg">خدماتنا</a>
            <a href={contactRow.image_url || "#"} target="_blank" rel="noreferrer" className="block text-center w-full bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold">اتصل بنا</a>
          </motion.div>
        )}
      </nav>

      {/* ══════════ HERO — Full-Screen Parallax ══════════ */}
      <section id="home" ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* صورة خلفية كاملة مع Parallax */}
        <motion.div 
          style={{ y: heroImageY }} 
          className="absolute inset-0 z-0"
        >
          {/* صورة سطح المكتب */}
          <img 
            src={heroRow.image_url || "https://picsum.photos/seed/ai-tech-v2/1920/1080"} 
            alt={heroRow.title || "ترقية"} 
            className="hidden md:block w-full h-[120%] object-cover"
            referrerPolicy="no-referrer"
          />
          {/* صورة الجوال */}
          <img 
            src={heroRow.icon_name || heroRow.image_url || "https://picsum.photos/seed/ai-tech-v2/1080/1920"} 
            alt={heroRow.title || "ترقية"} 
            className="block md:hidden w-full h-[120%] object-cover"
            referrerPolicy="no-referrer"
          />
          {/* تدرج غامق فوق الصورة */}
          <div className="absolute inset-0 bg-gradient-to-b from-bg-dark/80 via-bg-dark/60 to-bg-dark"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg-dark/50 via-transparent to-bg-dark/50"></div>
        </motion.div>
        
        <TechBackground />

        {/* المحتوى النصي */}
        <motion.div 
          style={{ y: heroTextY, opacity: heroOpacity }}
          className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-8 border border-brand-primary/20 backdrop-blur-sm">
              <Zap className="w-4 h-4 fill-current" />
              رائدون في حلول الذكاء الاصطناعي
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white leading-tight mb-8"
          >
            {heroRow.title} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-primary via-brand-accent to-brand-secondary">مع ترقية</span>
          </motion.h1>

          {/* الشعار اللفظي */}
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-brand-accent/80 mb-6 tracking-wide"
          >
            " تكاملٌ داخلي، تواصلٌ ذكي "
          </motion.p>

          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-lg sm:text-xl text-white/80 mb-12 leading-[1.8] max-w-3xl mx-auto whitespace-pre-line"
          >
            {heroRow.description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a href={contactRow.image_url || "#"} target="_blank" rel="noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(0, 210, 255, 0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-3 group shadow-xl shadow-brand-primary/20"
              >
                ابدأ الآن
                <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
              </motion.button>
            </a>
            <a href="#services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/20 text-white px-10 py-4 rounded-full text-lg font-bold hover:bg-white/5 transition-all backdrop-blur-sm"
              >
                عرض خدماتنا
              </motion.button>
            </a>
          </motion.div>
        </motion.div>

        {/* سهم متحرك للأسفل */}
        <motion.div 
          animate={{ y: [0, 12, 0] }} 
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <ChevronDown className="w-8 h-8 text-white/30" />
        </motion.div>
      </section>

      {/* ══════════ ABOUT TARQIA — من نحن ══════════ */}
      <section id="about" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-bg-dark via-[#060e1f] to-[#0d121f]"></div>
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* عنوان القسم */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-accent/10 text-brand-accent rounded-full text-sm font-bold mb-6 border border-brand-accent/20">
              <Brain className="w-4 h-4" />
              تعرّف علينا
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">من نحن</h2>
          </motion.div>

          {/* نص الوصف الرئيسي */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl mx-auto mb-20"
          >
            <div className="relative">
              <div className="absolute -right-4 top-0 bottom-0 w-1 bg-gradient-to-b from-brand-primary via-brand-accent to-transparent rounded-full"></div>
              <p className="text-xl sm:text-2xl text-white/80 leading-[1.9] pr-8">
                في <span className="text-brand-accent font-bold">ترقية</span>، نؤمن أن القوة تكمن في الاتصال. نحن لا نكتفي ببناء الأنظمة، بل نقوم بهندسة الربط المتكامل بين وحدات عملك الداخلية وبين عملائك.
              </p>
            </div>
          </motion.div>

          {/* بطاقتان: الرؤية — التكامل */}
          <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
            {/* بطاقة الرؤية */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">الرؤية</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                الانتقال بالأنظمة التقليدية إلى أنظمة ذكية ذاتية الإدارة.
              </p>
            </motion.div>

            {/* بطاقة التكامل */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-4">التكامل</h3>
              <p className="text-white/60 text-lg leading-relaxed">
                ربط متكامل بين وحدات عملك الداخلية وبين عملائك — في منظومة واحدة.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════ SERVICES — الخدمات ══════════ */}
      <section id="services" className="py-24 lg:py-32 bg-[#0d121f] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-6 border border-brand-primary/20">
              <Settings className="w-4 h-4" />
              ماذا نقدم
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6">خدماتنا المبتكرة</h2>
            <p className="text-xl text-white/50 max-w-2xl mx-auto">نقدم حلولاً تقنية متكاملة مصممة لرفع كفاءة أعمالك وتحقيق أهدافك الرقمية.</p>
          </motion.div>
          
          <div className="space-y-32">
            {serviceRows.map((service: any, index: number) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-center`}
              >
                {/* Image Side */}
                <div className="flex-1 w-full">
                  <motion.div 
                    whileHover={{ scale: 1.02 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-4 bg-brand-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-brand-primary/10 transition-all duration-500"></div>
                    <img 
                      src={service.image_url || "https://picsum.photos/seed/default/800/600"} 
                      alt={service.title} 
                      className="relative rounded-[2rem] shadow-2xl w-full h-[300px] lg:h-[450px] object-cover border border-white/10 brightness-75 group-hover:brightness-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-right lg:text-right">
                  <div className="mb-6 bg-brand-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center overflow-hidden">
                    {service.icon_name?.startsWith('data:image') || service.icon_name?.startsWith('http') ? (
                      <img src={service.icon_name} alt="icon" className="w-10 h-10 object-contain" />
                    ) : (
                      iconMap[service.icon_name] || <Bot className="w-10 h-10 text-brand-accent" />
                    )}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">{service.title}</h3>
                  <p className="text-xl text-white/50 leading-relaxed mb-8">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ CTA Section ══════════ */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0d121f] via-[#060910] to-bg-dark"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[200px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center text-white relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-8">مستعد للتحول الرقمي؟</h2>
            <p className="text-xl text-white/40 mb-12 max-w-2xl mx-auto leading-relaxed">
              انضم إلى الشركات التي بدأت رحلتها نحو التميز مع ترقية. استشارتك مجانية.
            </p>
            <a href={contactRow.image_url || "#"} target="_blank" rel="noreferrer">
              <motion.button 
                whileHover={{ scale: 1.05, boxShadow: "0 0 60px rgba(0, 210, 255, 0.25)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-brand-primary text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-brand-primary/90 transition-all shadow-2xl shadow-brand-primary/20"
              >
                احجز استشارتك المجانية الآن
              </motion.button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════ Footer ══════════ */}
      <footer className="bg-bg-dark pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="ترقية Tarqia" className="h-20 w-auto object-contain scale-[1.5] origin-right" />
              </div>
              <p className="text-white/50 leading-relaxed mb-4">
                نحن شركة رائدة في تقديم حلول الذكاء الاصطناعي المبتكرة للشركات في منطقة الشرق الأوسط، نهدف إلى جعل التكنولوجيا أداة لتمكين الإنسان مع ترقية.
              </p>
              <p className="text-brand-accent/60 font-bold text-sm">" تكاملٌ داخلي، تواصلٌ ذكي "</p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">روابط سريعة</h4>
              <ul className="space-y-4 text-white/50">
                <li><a href="#home" className="hover:text-brand-accent transition-colors">الرئيسية</a></li>
                <li><a href="#about" className="hover:text-brand-accent transition-colors">من نحن</a></li>
                <li><a href="#services" className="hover:text-brand-accent transition-colors">خدماتنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">تواصل معنا</h4>
              <ul className="space-y-4 text-white/50">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4 flex-shrink-0" /> info@tarqia.com</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4 flex-shrink-0" /> <span dir="ltr">{contactRow.title}</span></li>
                <li className="flex items-center gap-3"><Globe className="w-4 h-4 flex-shrink-0" /> {contactRow.description}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-white/30 text-sm">
            <p>© 2026 Tarqia. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  const [contentRows, setContentRows] = useState<any[]>([]);

  useEffect(() => {
    supabase.from('site_content').select('*').order('id')
      .then(({data, error}) => {
        if (data && !error) setContentRows(data);
      });
  }, []);

  if (contentRows.length === 0) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary"></div>
      </div>
    );
  }

  return <HomeContent contentRows={contentRows} />;
}
