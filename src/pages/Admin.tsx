import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Bot, Smartphone, Layout, Settings, Shield, Camera, Users, Code, LineChart, Video } from "lucide-react";

export default function Admin() {
  const [contentRows, setContentRows] = useState<any[]>([]);
  const [status, setStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    // Check initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsAuthenticated(true);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const fetchData = async () => {
    const { data, error } = await supabase.from('site_content').select('*').order('id');
    if (data && !error) {
      setContentRows(data);
    } else {
      setStatus('خطأ في جلب البيانات من قاعدة البيانات');
    }
  };

  const iconMap: Record<string, React.ReactNode> = {
    "Smartphone": <Smartphone />,
    "Layout": <Layout />,
    "Settings": <Settings />,
    "Bot": <Bot />,
    "Shield": <Shield />,
    "Camera": <Camera />,
    "Users": <Users />,
    "Code": <Code />,
    "LineChart": <LineChart />,
    "Video": <Video />
  };

  const renderIconPreview = (iconName: string) => {
    if (!iconName) return <Bot className="w-8 h-8 text-brand-accent" />;
    if (iconName.startsWith('data:image') || iconName.startsWith('http')) {
      return <img src={iconName} alt="icon" className="w-8 h-8 object-contain" />;
    }
    const IconComponent = iconMap[iconName];
    return IconComponent 
      ? React.cloneElement(IconComponent as React.ReactElement, { className: "w-8 h-8 text-brand-accent" })
      : <Bot className="w-8 h-8 text-brand-accent" />;
  };

  const handleIconUpload = (id: number, file: File | null) => {
    if (file) {
      if (file.size > 500000) {
         alert("حجم الأيقونة كبير جداً! الرجاء اختيار صورة أقل من 500 كيلوبايت.");
         return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64 = e.target?.result as string;
        handleChange(id, 'icon_name', base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (id: number, field: string, value: string) => {
    setContentRows(rows => rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('جاري التحقق...');
    
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      setStatus('بيانات الدخول غير صحيحة');
    } else {
      setIsAuthenticated(true);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('جاري الحفظ...');
    const { error } = await supabase.from('site_content').upsert(contentRows);
    if (!error) {
      setStatus('تم الحفظ بنجاح!');
      setTimeout(() => setStatus(''), 3000);
    } else {
      setStatus('فشل الحفظ: ' + error.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 font-sans" dir="rtl">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">تسجيل الدخول الآمن (Supabase)</h2>
          <input 
            type="email" 
            placeholder="البريد الإلكتروني"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full bg-black/20 text-white px-4 py-3 rounded-lg mb-4 border border-white/10"
            dir="ltr"
            required
          />
          <input 
            type="password" 
            placeholder="كلمة المرور"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black/20 text-white px-4 py-3 rounded-lg mb-4 border border-white/10"
            dir="ltr"
            required
          />
          <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-primary/90 transition-all">
            دخول
          </button>
          {status && <p className="text-red-400 mt-4 text-center">{status}</p>}
        </form>
      </div>
    );
  }

  if (contentRows.length === 0) {
    const handleSeed = async () => {
      setStatus('جاري إضافة المحتوى...');
      const defaultData = [
        { id: 1, section_name: 'hero', title: 'نصنع مستقبل أعمالك', description: 'حلول أعمال مبتكرة مصممة خصيصاً لتمكين الشركات من التفوق في عصر البيانات. نحن لا نبني تقنيات فحسب، بل نصنع شركاء للنجاح مع ترقية.', image_url: '' },
        { id: 2, section_name: 'contact', title: '+966590952288', description: 'القصيم، المملكة العربية السعودية', image_url: 'https://wa.me/966590952288' },
        { id: 3, section_name: 'service', title: 'بناء تطبيقات الجوال', description: 'نحن متخصصون في تحويل أفكارك إلى تطبيقات جوال متكاملة لنظامي iOS و Android. نركز على تقديم تجربة مستخدم سلسة وتصميمات عصرية تضمن تفاعل العملاء، مع إدارة كاملة لعملية النشر على App Store و Google Play.', image_url: 'https://picsum.photos/seed/mobile-app-v3/800/600' },
        { id: 4, section_name: 'service', title: 'بناء مواقع خاصة', description: 'نصمم ونطور مواقع إلكترونية مخصصة تعكس هوية علامتك التجارية وتلبي احتياجات عملك الفريدة. نستخدم أحدث التقنيات لضمان السرعة، الأمان، والتوافق التام مع محركات البحث وكافة الأجهزة.', image_url: 'https://picsum.photos/seed/web-dev-v3/800/600' },
        { id: 5, section_name: 'service', title: 'خدمات الأتمتة', description: 'وداعاً للمهام اليدوية المتكررة. نقوم بتطوير أنظمة أتمتة ذكية تربط بين أدواتك المختلفة وتدير سير العمل بذكاء، مما يقلل التكاليف التشغيلية ويزيد من إنتاجية فريقك بشكل ملحوظ.', image_url: 'https://picsum.photos/seed/automation-v3/800/600' },
        { id: 6, section_name: 'service', title: 'خدمة العملاء بالذكاء الاصطناعي', description: 'ارفع مستوى رضا عملائك من خلال أنظمة الدردشة الآلية (Chatbots) المتقدمة. تعتمد أنظمتنا على معالجة اللغات الطبيعية لفهم استفسارات العملاء بدقة وتقديم حلول فورية على مدار الساعة.', image_url: 'https://picsum.photos/seed/ai-chatbot-v3/800/600' }
      ];
      const { error } = await supabase.from('site_content').insert(defaultData);
      if (!error) {
        setStatus('تم رفع البيانات بنجاح!');
        fetchData();
      } else {
        setStatus('حدث خطأ: ' + error.message);
      }
    };
    return (
      <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center text-white space-y-6" dir="rtl">
        {status && <p className="text-xl text-yellow-400 font-bold mb-4">{status}</p>}
        <p className="text-xl text-gray-400">جاري التحميل... أو أن قاعدة البيانات فارغة تماماً.</p>
        <button onClick={handleSeed} className="bg-brand-primary px-8 py-4 rounded-xl font-bold hover:bg-brand-primary/90 transition shadow-lg mt-4">
          نقر هنا لوضع المحتوى الأساسي الافتراضي للبدء
        </button>
      </div>
    );
  }

  const heroRow = contentRows.find(c => c.section_name === 'hero');
  const contactRow = contentRows.find(c => c.section_name === 'contact');
  const serviceRows = contentRows.filter(c => c.section_name === 'service');

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">إدارة المحتوى</h1>
          <div className="flex gap-4">
            <button 
              onClick={() => supabase.auth.signOut()} 
              className="text-text-muted hover:text-red-400 transition"
            >
              تسجيل خروج
            </button>
            <a href="/" className="text-brand-accent hover:underline">زيارة الموقع</a>
          </div>
        </div>
        
        {status && (
          <div className="bg-brand-primary/20 text-brand-primary px-4 py-3 rounded-lg mb-6 border border-brand-primary/30 font-bold">
            {status}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-12">
          {/* Contact Section */}
          {contactRow && (
            <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">بيانات التواصل</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">رقم الهاتف</label>
                  <input 
                    type="text" 
                    value={contactRow.title || ''}
                    onChange={e => handleChange(contactRow.id, 'title', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                    dir="ltr"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">رابط الواتساب لزر (اتصل بنا)</label>
                  <input 
                    type="text" 
                    value={contactRow.image_url || ''}
                    onChange={e => handleChange(contactRow.id, 'image_url', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                    dir="ltr"
                    placeholder="https://wa.me/..."
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-text-muted mb-2">العنوان</label>
                  <input 
                    type="text" 
                    value={contactRow.description || ''}
                    onChange={e => handleChange(contactRow.id, 'description', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Hero Section */}
          {heroRow && (
            <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">قسم الرئيسية (Hero)</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">العنوان الرئيسي</label>
                  <input 
                    type="text" 
                    value={heroRow.title || ''}
                    onChange={e => handleChange(heroRow.id, 'title', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">رابط الصورة الرئيسية</label>
                  <input 
                    type="text" 
                    value={heroRow.image_url || ''}
                    onChange={e => handleChange(heroRow.id, 'image_url', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                    dir="ltr"
                    placeholder="https://..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-muted mb-2">الوصف</label>
                  <textarea 
                    value={heroRow.description || ''}
                    onChange={e => handleChange(heroRow.id, 'description', e.target.value)}
                    className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 h-24"
                  />
                </div>
              </div>
            </section>
          )}

          {/* Services Section */}
          <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">الخدمات</h2>
            {serviceRows.map((service, index) => (
              <div key={service.id} className="mb-8 p-4 bg-black/30 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">خدمة {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">عنوان الخدمة</label>
                    <input 
                      type="text" 
                      value={service.title || ''}
                      onChange={e => handleChange(service.id, 'title', e.target.value)}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">أيقونة الخدمة</label>
                    <div className="flex items-center gap-4 bg-black/20 p-3 rounded-lg border border-white/10">
                      <div className="bg-brand-primary/10 w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0">
                        {renderIconPreview(service.icon_name)}
                      </div>
                      <div className="flex-1 space-y-3">
                        <select 
                          value={service.icon_name?.startsWith('data:image') ? 'custom' : (service.icon_name || 'Bot')}
                          onChange={e => handleChange(service.id, 'icon_name', e.target.value)}
                          className="w-full bg-black/40 text-white px-3 py-2 rounded-lg border border-white/10"
                          dir="ltr"
                        >
                          <option value="Bot">Bot (روبوت الذكاء الاصطناعي)</option>
                          <option value="Smartphone">Smartphone (هاتف)</option>
                          <option value="Layout">Layout (موقع إلكتروني)</option>
                          <option value="Settings">Settings (تروس / إعدادات)</option>
                          <option value="Shield">Shield (درع / حماية)</option>
                          <option value="Camera">Camera (كاميرا)</option>
                          <option value="Users">Users (أشخاص / فريق)</option>
                          <option value="Code">Code (أكواد / برمجة)</option>
                          <option value="LineChart">LineChart (تحليل بيانات)</option>
                          <option value="Video">Video (تصوير وتسجيل)</option>
                          {service.icon_name?.startsWith('data:image') && <option value="custom">أيقونة مخصصة (مرفوعة)</option>}
                        </select>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-text-muted">أو ارفع من جهازك:</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleIconUpload(service.id, e.target.files?.[0] || null)}
                            className="text-xs text-white file:mr-2 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-brand-primary file:text-white hover:file:bg-brand-primary/80"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">رابط الصورة</label>
                    <input 
                      type="text" 
                      value={service.image_url || ''}
                      onChange={e => handleChange(service.id, 'image_url', e.target.value)}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">الوصف</label>
                    <textarea 
                      value={service.description || ''}
                      onChange={e => handleChange(service.id, 'description', e.target.value)}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 h-24"
                    />
                  </div>
                </div>
              </div>
            ))}
            
            {/* Adding new service function (if needed) */}
            <button 
              type="button"
              onClick={() => {
                const newId = Math.max(...contentRows.map(r => r.id), 0) + 1;
                setContentRows([...contentRows, { id: newId, section_name: 'service', title: '', description: '', image_url: '' }]);
              }}
              className="bg-white/10 text-white px-6 py-3 rounded-xl border border-white/20 mt-4 hover:bg-white/20 transition"
            >
              + إضافة خدمة جديدة
            </button>
          </section>

          <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl text-xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-brand-primary/20 sticky bottom-4">
            حفظ جميع التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
