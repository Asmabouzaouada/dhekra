import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MapPin, CalendarDays, Clock, Heart, Sparkles, Flower2, Shirt, ChevronDown } from 'lucide-react';
import './style.css';

// ⚠️ Modifiez ici la date : le calendrier et le jour de la semaine se calculent tout seuls.
const WEDDING = { year: 2027, month: 3, day: 5 }; // month : 1 = janvier … 3 = mars
const MOIS = ['جانفي','فيفري','مارس','أفريل','ماي','جوان','جويلية','أوت','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];
const JOURS = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const weekday = JOURS[new Date(WEDDING.year, WEDDING.month - 1, WEDDING.day).getDay()];

const PETALS = Array.from({ length: 20 }, (_, i) => ({ '--x': `${(i * 37 + 8) % 96}%`, '--d': `${0.5 + (i * 0.23) % 1.6}s`, '--t': `${3 + (i % 4) * 0.7}s`, '--s': `${(i % 2 ? 1 : -1) * (30 + i * 9)}px`, '--r': `${240 + i * 47}deg` }));

function Rose({ className = '' }) {
  return <svg className={`rose ${className}`} viewBox="0 0 140 180" aria-hidden="true">
    <defs><filter id="rs"><feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="#8e4c62" floodOpacity=".28"/></filter></defs>
    <g filter="url(#rs)" fill="none" stroke="#c47b91" strokeWidth="1.4" strokeLinecap="round">
      <path d="M70 174 C68 142 78 115 68 88 C64 76 56 68 48 63"/>
      <path d="M69 140 C49 136 35 121 36 105 C54 109 68 120 69 140Z" fill="#c8d4bb" stroke="#a8b99c"/>
      <path d="M73 120 C92 113 104 97 101 82 C84 89 74 102 73 120Z" fill="#c8d4bb" stroke="#a8b99c"/>
      <path d="M68 91 C49 78 44 59 56 45 C67 52 73 69 68 91Z" fill="#e8b6c4"/>
      <path d="M67 77 C47 71 38 54 48 39 C61 44 69 59 67 77Z" fill="#f1cbd5"/>
      <path d="M70 72 C61 53 69 36 86 33 C91 48 83 65 70 72Z" fill="#e8b6c4"/>
      <path d="M69 72 C81 52 100 51 109 65 C98 78 82 80 69 72Z" fill="#f1cbd5"/>
      <path d="M69 74 C50 87 32 78 34 62 C46 54 61 62 69 74Z" fill="#e8b6c4"/>
      <path d="M69 73 C53 57 57 38 73 31 C87 41 83 61 69 73Z" fill="#f7dce3"/>
      <path d="M69 74 C72 59 87 55 96 65 C92 79 79 83 69 74Z" fill="#d998ad"/>
      <path d="M69 74 C58 69 59 57 68 52 C78 57 78 68 69 74Z" fill="#c47b91"/>
    </g>
  </svg>;
}

function HeartShape() {
  return <svg className="heart3d" viewBox="0 0 48 44" aria-hidden="true">
    <defs>
      <radialGradient id="hg" cx="35%" cy="28%" r="80%"><stop offset="0" stopColor="#f3a9bd"/><stop offset=".55" stopColor="#c9647f"/><stop offset="1" stopColor="#8f3550"/></radialGradient>
    </defs>
    <path d="M24 41 C6 28 2 18 4 12 C7 3 19 3 24 12 C29 3 41 3 44 12 C46 18 42 28 24 41Z" fill="url(#hg)"/>
    <path d="M10 10 C13 6 18 6 21 10" stroke="#fff" strokeOpacity=".55" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
  </svg>;
}

function Calendar() {
  const { year, month, day } = WEDDING;
  const offset = (new Date(year, month - 1, 1).getDay() + 6) % 7; // semaine commençant le lundi
  const total = new Date(year, month, 0).getDate();
  const cells = [...Array(offset).fill(null), ...Array.from({ length: total }, (_, i) => i + 1)];
  return <div className="calendar" role="group" aria-label={`تقويم ${MOIS[month - 1]} ${year}`}>
    <div className="cal-rings" aria-hidden="true"><i/><i/><i/></div>
    <div className="cal-head"><span>{MOIS[month - 1]}</span><b>{year}</b></div>
    <div className="cal-grid">
      {['ن','ث','ر','خ','ج','س','ح'].map((d, i) => <div key={i} className="cal-dow">{d}</div>)}
      {cells.map((n, i) => n === day
        ? <div key={i} className="cal-day cal-jour-j" aria-label={`${weekday} ${day} ${MOIS[month - 1]}, يوم الزفاف`}><HeartShape/><span>{n}</span></div>
        : <div key={i} className="cal-day">{n}</div>)}
    </div>
    <p className="cal-foot"><Heart size={13}/> يوم الزفاف</p>
  </div>;
}

function App() {
  const [stage, setStage] = useState(0); // 0 fermée · 1 ouverture · 2 site
  useEffect(() => { document.documentElement.dir = 'rtl'; document.documentElement.lang = 'ar'; }, []);

  const openInvite = () => {
    if (stage) return;
    setStage(1);
    setTimeout(() => setStage(2), 3200);
    setTimeout(() => document.getElementById('invitation')?.scrollIntoView({ behavior: 'smooth' }), 3300);
  };


  return <main>
    {stage < 2 && <section className={`cover ${stage === 1 ? 'is-open' : ''}`} aria-label="ظرف الدعوة">
      <div className="cover-glow" /><div className="petals" aria-hidden="true">{PETALS.map((p, i) => <i key={i} style={p} />)}</div>
      <div className="cover-note">دعوة خاصة جدًا</div>
      <button className="envelope" onClick={openInvite} aria-label="افتح الدعوة">
        <div className="env-shadow" />
        <div className="env-back" />
        <div className="env-letter"><span>ياسين <i>&</i> ذكرى</span><small>{WEDDING.day} {MOIS[WEDDING.month - 1]} {WEDDING.year}</small></div>
        <div className="env-pocket"><div className="env-left" /><div className="env-right" /><div className="env-bottom" /></div>
        <div className="env-flap" />
        <div className="ribbon" />
        <div className="seal"><svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="9" y="9" width="22" height="22"/><rect x="9" y="9" width="22" height="22" transform="rotate(45 20 20)"/><circle cx="20" cy="20" r="3.5" fill="currentColor"/></g></svg></div>
        <span className="tap">اضغط لفتح الدعوة</span>
      </button>
      <div className="cover-names">ياسين <span>&</span> ذكرى</div>
      <p className="cover-sub">يومٌ، ووعدٌ، وأبدٌ.</p>
    </section>}

    {stage === 2 && <div className="site">
      <header className="hero" id="invitation">
        <Rose className="hero-rose left-rose"/><Rose className="hero-rose right-rose"/>
        <div className="eyebrow">يسعدنا دعوتكم لمشاركتنا فرحتنا</div>
        <h1>ياسين <em>&</em><br/>ذكرى</h1>
        <div className="ornament"><span></span><Flower2 size={20}/><span></span></div>
        <p className="hero-copy">قلبان وحكاية واحدة…<br/>ويسعدنا أن نتقاسمها معكم.</p>
        <div className="date-pill"><CalendarDays size={17}/> {WEDDING.day} {MOIS[WEDDING.month - 1]} · تونس</div>
        <a className="scroll-cue" href="#details">اكتشفوا التفاصيل <ChevronDown size={16}/></a>
      </header>

      <section className="intro section-pad">
        <div className="tiny-label">حكايتنا مستمرّة</div>
        <h2>أجمل فصول الحكاية<br/><i>يبدأ هنا.</i></h2>
        <p>حضوركم سيجعل هذا اليوم أغلى وأجمل. ننتظر بشوق أن نحتفل بحبّنا بين الأشخاص الأعزّاء على قلوبنا.</p>
        <div className="signature">بكل حبّنا <Heart size={16}/></div>
      </section>

      <section className="details section-pad" id="details">
        <div className="tiny-label">سجّلوا الموعد</div><h2>موعدنا <i>يوم العمر</i></h2>
        <Calendar/>
        <div className="detail-card">
          <div className="detail-icon"><CalendarDays/></div>
          <div><span className="detail-label">التاريخ</span><h3>{weekday} {WEDDING.day} {MOIS[WEDDING.month - 1]}</h3><p>يوم يبقى في الذاكرة</p></div>
        </div>
        <div className="detail-card">
          <div className="detail-icon"><Clock/></div>
          <div><span className="detail-label">التوقيت</span><h3>ابتداءً من [الساعة]</h3><p>ننتظركم بكل سرور</p></div>
        </div>
        <div className="detail-card">
          <div className="detail-icon"><MapPin/></div>
          <div><span className="detail-label">مكان الحفل</span><h3>[اسم القاعة]</h3><p>تونس العاصمة، تونس</p></div>
        </div>
        <a className="button button-solid" href="https://www.google.com/maps/search/?api=1&query=Tunis%2C%20Tunisie" target="_blank" rel="noreferrer"><MapPin size={17}/> افتح في خرائط Google</a>
        <p className="micro-note">سيتم تحديث رابط الموقع فور تأكيد القاعة.</p>
      </section>

      <section className="dress section-pad">
        <div className="dress-flower"><Rose/></div>
        <div className="tiny-label">لمسة أناقة</div>
        <h2>لباس <i>المناسبة</i></h2>
        <div className="dress-icon"><Shirt size={27}/></div>
        <p className="dress-title">أنيق ورومانسي</p>
        <p>اختاروا أزياء أنيقة تشعركم بالجمال. الألوان الباستيل والبيج والشامبانيا والدرجات الهادئة مرحّب بها.</p>
        <div className="swatches">{['#e8c4cd','#f5e9df','#c9b9a6','#a8b69d','#b98491'].map(c => <span key={c} style={{background:c}}/>)}</div>
        <small>الألوان المقترحة</small>
      </section>

      <section className="moments section-pad">
        <div className="tiny-label">من القلب</div><h2>حضوركم هو<br/><i>أجمل هدية لنا.</i></h2>
        <div className="moment-quote">« الحبّ لا يُقاس باللحظات، بل بالذكريات التي نصنعها معًا. »</div>
        <Heart className="heart-large" size={26} strokeWidth={1.2}/>
      </section>


      <footer className="footer">
        <Sparkles size={18}/><p>يسعدنا أن نحتفل معكم</p>
        <div className="footer-names">ياسين <i>&</i> ذكرى</div>
        <small>{WEDDING.day} {MOIS[WEDDING.month - 1]} · تونس</small>
        <div className="footer-flower">❀</div>
      </footer>
    </div>}
  </main>;
}

createRoot(document.getElementById('root')).render(<App />);