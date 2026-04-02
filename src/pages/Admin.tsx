import React, { useState, useEffect } from 'react';

export default function Admin() {
  const [data, setData] = useState<any>(null);
  const [status, setStatus] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetch('/api/content')
        .then(res => res.json())
        .then(d => setData(d))
        .catch(err => setStatus('خطأ في جلب البيانات'));
    }
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      const auth = await res.json();
      if (auth.success) {
        setIsAuthenticated(true);
      } else {
        setStatus('كلمة المرور غير صحيحة');
      }
    } catch (error) {
      setStatus('خطأ في تسجيل الدخول');
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('جاري الحفظ...');
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setStatus('تم الحفظ بنجاح!');
        setTimeout(() => setStatus(''), 3000);
      }
    } catch (err) {
      setStatus('فشل الحفظ');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4 font-sans" dir="rtl">
        <form onSubmit={handleLogin} className="bg-white/5 p-8 rounded-2xl border border-white/10 max-w-sm w-full">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">لوحة التحكم</h2>
          <input 
            type="password" 
            placeholder="كلمة المرور (اكتب: admin123)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full bg-black/20 text-white px-4 py-3 rounded-lg mb-4 border border-white/10"
          />
          <button type="submit" className="w-full bg-brand-primary text-white py-3 rounded-lg font-bold hover:bg-brand-primary/90 transition-all">
            دخول
          </button>
          {status && <p className="text-red-400 mt-4 text-center">{status}</p>}
        </form>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-bg-dark flex items-center justify-center text-white">جاري التحميل...</div>;

  return (
    <div className="min-h-screen bg-bg-dark text-text-light font-sans" dir="rtl">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">إدارة المحتوى</h1>
          <a href="/" className="text-brand-accent hover:underline">زيارة الموقع</a>
        </div>
        
        {status && (
          <div className="bg-brand-primary/20 text-brand-primary px-4 py-3 rounded-lg mb-6 border border-brand-primary/30 font-bold">
            {status}
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-12">
          {/* Contact Section */}
          <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">بيانات التواصل</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">رقم الهاتف</label>
                <input 
                  type="text" 
                  value={data.contact.phone}
                  onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  value={data.contact.email}
                  onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                  dir="ltr"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">العنوان</label>
                <input 
                  type="text" 
                  value={data.contact.address}
                  onChange={e => setData({...data, contact: {...data.contact, address: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">رابط الواتساب لزر (اتصل بنا)</label>
                <input 
                  type="text" 
                  value={data.contact.whatsapp || ''}
                  onChange={e => setData({...data, contact: {...data.contact, whatsapp: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 focus:border-brand-primary outline-none transition-all"
                  dir="ltr"
                  placeholder="https://wa.me/966..."
                />
              </div>
            </div>
          </section>

          {/* Hero Section */}
          <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">قسم الرئيسية (Hero)</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">النص التعريفي (Badge)</label>
                <input 
                  type="text" 
                  value={data.hero.badge}
                  onChange={e => setData({...data, hero: {...data.hero, badge: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">العنوان الرئيسي</label>
                <input 
                  type="text" 
                  value={data.hero.title}
                  onChange={e => setData({...data, hero: {...data.hero, title: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">النص الملون المكمل</label>
                <input 
                  type="text" 
                  value={data.hero.highlight}
                  onChange={e => setData({...data, hero: {...data.hero, highlight: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-2">الوصف</label>
                <textarea 
                  value={data.hero.description}
                  onChange={e => setData({...data, hero: {...data.hero, description: e.target.value}})}
                  className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 h-24"
                />
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="bg-white/5 p-6 rounded-2xl border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">الخدمات</h2>
            {data.services.map((service: any, index: number) => (
              <div key={service.id} className="mb-8 p-4 bg-black/30 rounded-xl border border-white/5">
                <h3 className="text-xl font-bold text-white mb-4">خدمة {index + 1}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">عنوان الخدمة</label>
                    <input 
                      type="text" 
                      value={service.title}
                      onChange={e => {
                        const newServices = [...data.services];
                        newServices[index].title = e.target.value;
                        setData({...data, services: newServices});
                      }}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">رابط الصورة</label>
                    <input 
                      type="text" 
                      value={service.image}
                      onChange={e => {
                        const newServices = [...data.services];
                        newServices[index].image = e.target.value;
                        setData({...data, services: newServices});
                      }}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10"
                      dir="ltr"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-muted mb-2">الوصف</label>
                    <textarea 
                      value={service.description}
                      onChange={e => {
                        const newServices = [...data.services];
                        newServices[index].description = e.target.value;
                        setData({...data, services: newServices});
                      }}
                      className="w-full bg-black/20 text-white px-4 py-3 rounded-lg border border-white/10 h-24"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          <button type="submit" className="w-full bg-brand-primary text-white py-4 rounded-xl text-xl font-bold hover:bg-brand-primary/90 transition-all shadow-lg hover:shadow-brand-primary/20 sticky bottom-4">
            حفظ جميع التغييرات
          </button>
        </form>
      </div>
    </div>
  );
}
