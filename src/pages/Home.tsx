/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

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
  Network
} from "lucide-react";
import React, { useState, useEffect } from "react";

// مكون الخلفية التقنية المتحركة
const TechBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* شبكة تقنية خفيفة */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#00d2ff 1px, transparent 1px)', size: '40px 40px', backgroundSize: '40px 40px' }}>
      </div>
      
      {/* جسيمات متحركة توحي بالبيانات */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-brand-primary/10 rounded-full blur-xl"
          initial={{ 
            width: Math.random() * 200 + 100, 
            height: Math.random() * 200 + 100,
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0.1
          }}
          animate={{ 
            x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
            opacity: [0.1, 0.2, 0.1]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}

      {/* خطوط تقنية متقاطعة */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.08]">
        <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 100 0 L 0 0 0 100" fill="none" stroke="#00d2ff" strokeWidth="0.5" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
    </div>
  );
};

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch('/api/content')
      .then(res => res.json())
      .then(d => setData(d))
      .catch(console.error);
  }, []);

  if (!data) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-brand-primary"></div>
      </div>
    );
  }

  const iconMap: Record<string, React.ReactNode> = {
    "Smartphone": <Smartphone className="w-10 h-10 text-brand-accent" />,
    "Layout": <Layout className="w-10 h-10 text-brand-accent" />,
    "Settings": <Settings className="w-10 h-10 text-brand-accent" />,
    "Bot": <Bot className="w-10 h-10 text-brand-accent" />
  };

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans" dir="rtl">
      {/* Navigation */}
      <nav className="fixed w-full bg-bg-dark/80 backdrop-blur-md z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-2">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="flex items-center"
              >
                <img src="/logo.png" alt="ترقية Tarqia" className="h-20 w-auto object-contain scale-[1.5] md:scale-[1.8] origin-right" />
              </motion.div>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#home" className="text-text-muted hover:text-brand-accent font-medium transition-colors">الرئيسية</a>
              <a href="#services" className="text-text-muted hover:text-brand-accent font-medium transition-colors">خدماتنا</a>
              <a href={data.contact.whatsapp || "#"} target="_blank" rel="noreferrer" className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20">
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
            className="md:hidden bg-bg-dark border-b border-white/10 p-4 space-y-4 shadow-xl"
          >
            <a href="#home" className="block text-text-muted px-4 py-2 hover:bg-brand-primary/10 rounded-lg">الرئيسية</a>
            <a href="#services" className="block text-text-muted px-4 py-2 hover:bg-brand-primary/10 rounded-lg">خدماتنا</a>
            <a href={data.contact.whatsapp || "#"} target="_blank" rel="noreferrer" className="block text-center w-full bg-brand-primary text-white px-6 py-3 rounded-xl font-semibold">اتصل بنا</a>
          </motion.div>
        )}
      </nav>

      {/* Hero Section with Tech Background */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-screen flex items-center">
        <TechBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-sm font-bold mb-6 border border-brand-primary/20">
                <Zap className="w-4 h-4 fill-current" />
                {data.hero.badge}
              </div>
              <h1 className="text-5xl lg:text-7xl font-bold text-white leading-tight mb-6">
                {data.hero.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-primary via-brand-accent to-brand-secondary">{data.hero.highlight}</span>
              </h1>
              <p className="text-xl text-text-muted mb-10 leading-relaxed max-w-xl">
                {data.hero.description}
              </p>
              <div className="flex flex-wrap gap-4">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-brand-primary text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-brand-primary/90 transition-all flex items-center gap-2 group shadow-xl shadow-brand-primary/20"
                >
                  ابدأ الآن
                  <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform rotate-180" />
                </motion.button>
                <a href="#services" className="border-2 border-white/10 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-white/5 transition-all text-center">
                  عرض خدماتنا
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="relative"
            >
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-primary/10 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl opacity-50 animate-pulse"></div>
              
              {/* عنصر تقني عائم */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative z-10"
              >
                <img 
                  src="https://picsum.photos/seed/ai-tech-v2/800/600" 
                  alt="AI Technology" 
                  className="rounded-3xl shadow-2xl border border-white/10 object-cover w-full h-[400px] lg:h-[500px] brightness-90"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section - Redesigned to be larger with images */}
      <section id="services" className="py-24 bg-[#0d121f] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">خدماتنا المبتكرة</h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">نقدم حلولاً تقنية متكاملة مصممة لرفع كفاءة أعمالك وتحقيق أهدافك الرقمية.</p>
          </div>
          
          <div className="space-y-32">
            {data.services.map((service: any, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
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
                    <div className="absolute -inset-4 bg-brand-primary/5 rounded-[2.5rem] blur-2xl group-hover:bg-brand-primary/10 transition-all"></div>
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="relative rounded-[2rem] shadow-2xl w-full h-[300px] lg:h-[450px] object-cover border border-white/10 brightness-75 group-hover:brightness-100 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className="flex-1 text-right lg:text-right">
                  <div className="mb-6 bg-brand-primary/10 w-20 h-20 rounded-3xl flex items-center justify-center">
                    {iconMap[service.icon] || <Bot className="w-10 h-10 text-brand-accent" />}
                  </div>
                  <h3 className="text-3xl lg:text-4xl font-bold mb-6 text-white">{service.title}</h3>
                  <p className="text-xl text-text-muted leading-relaxed mb-8">
                    {service.description}
                  </p>
                  <button className="inline-flex items-center gap-2 text-brand-accent font-bold text-lg hover:gap-4 transition-all group">
                    تعرف على المزيد
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[#060910] -z-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold mb-8">هل أنت مستعد للتحول الرقمي؟</h2>
            <p className="text-xl text-gray-400 mb-12">
              انضم إلى مئات الشركات التي بدأت رحلتها نحو التميز مع ترقية. استشارتك الأولى مجانية تماماً.
            </p>
            <a href={data.contact.whatsapp || "#"} target="_blank" rel="noreferrer" className="inline-block bg-brand-primary text-white px-12 py-5 rounded-full text-xl font-bold hover:bg-brand-primary/90 transition-all shadow-2xl shadow-brand-primary/20 hover:shadow-brand-primary/30">
              احجز استشارتك المجانية الآن
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-bg-dark pt-20 pb-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <img src="/logo.png" alt="ترقية Tarqia" className="h-20 w-auto object-contain scale-[1.5] origin-right" />
              </div>
              <p className="text-text-muted max-sm leading-relaxed">
                نحن شركة رائدة في تقديم حلول الذكاء الاصطناعي المبتكرة للشركات في منطقة الشرق الأوسط، نهدف إلى جعل التكنولوجيا أداة لتمكين الإنسان مع ترقية (Tarqia).
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">روابط سريعة</h4>
              <ul className="space-y-4 text-text-muted">
                <li><a href="#" className="hover:text-brand-accent transition-colors">عن الشركة</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">المدونة</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">الوظائف</a></li>
                <li><a href="#" className="hover:text-brand-accent transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-white">تواصل معنا</h4>
              <ul className="space-y-4 text-text-muted">
                <li className="flex items-center gap-3"><Mail className="w-4 h-4" /> {data.contact.email}</li>
                <li className="flex items-center gap-3"><Phone className="w-4 h-4" /> <span dir="ltr">{data.contact.phone}</span></li>
                <li className="flex items-center gap-3"><Globe className="w-4 h-4" /> {data.contact.address}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-text-muted text-sm">
            <p>© 2026 Tarqia. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
