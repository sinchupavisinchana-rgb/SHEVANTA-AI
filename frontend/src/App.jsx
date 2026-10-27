
import { useEffect, useState } from "react";
import {
  ShieldCheck, Siren, MapPin, Users, Clock3, Activity,
  Navigation, Heart, Bell, Search, Menu, X, ArrowUpRight,
  CheckCircle2, Phone, LockKeyhole, Sparkles, ChevronRight,
  Radio, CircleHelp, Settings, ShieldAlert
} from "lucide-react";
import "./App.css";

const contacts = [
  { name: "Amma", relation: "Family", initials: "AM", color: "pink" },
  { name: "Best Friend", relation: "Friend", initials: "BF", color: "violet" },
  { name: "Emergency Contact", relation: "Trusted contact", initials: "EC", color: "blue" },
];

const activities = [
  { icon: ShieldCheck, title: "Safety check completed", detail: "Your safety status is up to date", time: "Today, 9:15 AM", color: "green" },
  { icon: Navigation, title: "Safe journey started", detail: "Journey monitoring is in demo mode", time: "Yesterday", color: "purple" },
  { icon: Users, title: "Trusted contacts reviewed", detail: "Review your emergency contacts", time: "Yesterday", color: "blue" },
];

export default function App() {
  const [page, setPage] = useState("Overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [sosOpen, setSosOpen] = useState(false);
  const [notice, setNotice] = useState("");
  const [checkIn, setCheckIn] = useState(false);
  const [timer, setTimer] = useState("30 minutes");
  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [savedContacts, setSavedContacts] = useState(() => {
  try {
    const saved = localStorage.getItem("shevanta_contacts");
    return saved ? JSON.parse(saved) : contacts;
  } catch {
    return contacts;
  }
});

useEffect(() => {
  localStorage.setItem(
    "shevanta_contacts",
    JSON.stringify(savedContacts)
  );
}, [savedContacts]);
  const [report, setReport] = useState("");

  function notify(message) {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3500);
  }

  const nav = [
    { label: "Overview", icon: Activity },
    { label: "My Safety", icon: ShieldCheck },
    { label: "Safe Routes", icon: Navigation },
    { label: "Trusted Contacts", icon: Users },
    { label: "Check-in Timer", icon: Clock3 },
    { label: "Incident Reports", icon: ShieldAlert },
  ];

  function saveContact(e) {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) {
      notify("Enter a name and phone number.");
      return;
    }
    setSavedContacts([...savedContacts, {
      name: contactName.trim(),
      relation: "Trusted contact",
      initials: contactName.trim().slice(0, 2).toUpperCase(),
      color: "violet"
    }]);
    setContactName("");
    setContactPhone("");
    notify("Contact added for this demo session.");
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={24} /></div>
          <div><strong>SHEVANTA<span> AI</span></strong><small>SAFETY, REIMAGINED</small></div>
          <button className="icon-btn mobile-close" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></button>
        </div>

        <div className="workspace-label">YOUR WORKSPACE</div>
        <div className="profile-card">
          <div className="profile-avatar">S</div>
          <div className="profile-copy"><strong>My Safety Space</strong><small>Personal dashboard</small></div>
          <span className="online-dot" />
        </div>

        <div className="nav-label">MENU</div>
        <nav className="nav-list">
          {nav.map(({ label, icon: Icon }) => (
            <button key={label} className={`nav-item ${page === label ? "active" : ""}`} onClick={() => { setPage(label); setMenuOpen(false); }}>
              <Icon size={18} /><span>{label}</span>{label === "Incident Reports" && <span className="nav-new">NEW</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-tip"><Sparkles size={17} /><strong>A little reminder</strong><p>Your safety matters. Trust your instincts and reach out when you need help.</p></div>
          <button className="nav-item" onClick={() => notify("Settings will be available in a future version.")}><Settings size={18} />Settings</button>
          <div className="sidebar-footer"><span className="footer-dot" /> Your space, your pace.</div>
        </div>
      </aside>

      {menuOpen && <button className="mobile-overlay" onClick={() => setMenuOpen(false)} aria-label="Close navigation" />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-btn mobile-menu" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></button>
          <div className="breadcrumb">Workspace <ChevronRight size={14} /> <strong>{page}</strong></div>
          <div className="topbar-right">
            <span className="secure-badge"><LockKeyhole size={13} /> PRIVATE SPACE</span>
            <button className="icon-btn notification-btn" onClick={() => notify("You're all caught up.")} aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className="top-avatar">S</div>
          </div>
        </header>

        <div className="page-content">
          <div className="welcome-row">
            <div><div className="eyebrow"><span className="eyebrow-line" /> YOUR PERSONAL SAFETY COMPANION</div><h1>{page === "Overview" ? <>Your safety.<br /><span>Your superpower.</span></> : page}</h1><p className="welcome-subtitle">A calmer, more confident way to look after yourself.</p></div>
            <div className="date-pill"><span className="date-dot" /> Your safety space is ready</div>
          </div>

          <section className="hero-card">
            <div className="hero-orb orb-one" /><div className="hero-orb orb-two" />
            <div className="hero-content">
              <div className="hero-kicker"><Sparkles size={15} /> HERE FOR YOU, ALWAYS</div>
              <h2>Your safety.<br />Your strength. <span>Your freedom.</span></h2>
              <p>Your personal space to prepare, check in, and feel more in control of your everyday journeys.</p>
              <div className="hero-actions"><button className="primary-btn" onClick={() => setSosOpen(true)}><Siren size={17} /> Open SOS demo <ArrowUpRight size={16} /></button><button className="secondary-btn" onClick={() => { setPage("Trusted Contacts"); notify("Review your trusted contacts below."); }}><Users size={16} /> Trusted contacts</button></div>
              <div className="hero-note"><ShieldCheck size={14} /> Prototype mode · No emergency message will be sent</div>
            </div>
            <div className="hero-visual"><div className="visual-ring ring-outer" /><div className="visual-ring ring-inner" /><div className="visual-shield"><ShieldCheck size={54} strokeWidth={1.5} /></div><div className="floating-chip chip-top"><span className="chip-icon"><Heart size={15} /></span><span><strong>You matter</strong><small>Always remember</small></span></div><div className="floating-chip chip-bottom"><span className="pulse-icon"><Radio size={16} /></span><span><strong>Safety first</strong><small>Stay connected</small></span></div></div>
          </section>

          <div className="section-heading"><div><h3>Your safety toolkit</h3><p>Small steps that can make a difference.</p></div><button className="text-btn" onClick={() => setPage("My Safety")}>Explore tools <ArrowUpRight size={15} /></button></div>

          <section className="stats-grid">
            <button className="stat-card" onClick={() => setSosOpen(true)}><div className="stat-top"><span className="stat-icon icon-rose"><Siren size={20} /></span><span className="stat-arrow"><ArrowUpRight size={17} /></span></div><span className="stat-label">EMERGENCY SUPPORT</span><strong className="stat-value">SOS <span>demo</span></strong><p>Explore the emergency flow</p><div className="stat-foot"><span className="mini-dot rose-dot" /> Demonstration only</div></button>
            <button className="stat-card" onClick={() => setPage("Trusted Contacts")}><div className="stat-top"><span className="stat-icon icon-violet"><Users size={20} /></span><span className="stat-arrow"><ArrowUpRight size={17} /></span></div><span className="stat-label">YOUR PEOPLE</span><strong className="stat-value">{savedContacts.length} <span>contacts</span></strong><p>People you choose to trust</p><div className="stat-foot"><span className="mini-dot violet-dot" /> Review your list</div></button>
            <button className="stat-card" onClick={() => { setPage("Check-in Timer"); setCheckIn(!checkIn); }}><div className="stat-top"><span className="stat-icon icon-blue"><Clock3 size={20} /></span><span className="stat-arrow"><ArrowUpRight size={17} /></span></div><span className="stat-label">SAFETY CHECK-IN</span><strong className="stat-value">{checkIn ? "Active" : "Ready"} <span>status</span></strong><p>Set up a personal check-in</p><div className="stat-foot"><span className={`mini-dot ${checkIn ? "green-dot" : "blue-dot"}`} /> {checkIn ? "Demo timer enabled" : "Not started"}</div></button>
            <button className="stat-card" onClick={() => setPage("Safe Routes")}><div className="stat-top"><span className="stat-icon icon-green"><MapPin size={20} /></span><span className="stat-arrow"><ArrowUpRight size={17} /></span></div><span className="stat-label">JOURNEY PLANNING</span><strong className="stat-value">Safe <span>journeys</span></strong><p>Prepare before you head out</p><div className="stat-foot"><span className="mini-dot green-dot" /> Planning toolkit</div></button>
          </section>

          <div className="content-grid">
            <section className="panel toolkit-panel">
              <div className="panel-heading"><div><h3>Personal safety plan</h3><p>Build habits that help you feel prepared.</p></div><span className="panel-icon"><ShieldCheck size={19} /></span></div>
              <div className="progress-row"><div><strong>Your readiness checklist</strong><span>Example checklist · saved in this session</span></div><strong className="progress-number">2<span>/4</span></strong></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: "50%" }} /></div>
              <div className="checklist">
                {["Review trusted contacts", "Know your local emergency number", "Plan a journey check-in", "Review privacy settings"].map((item, i) => <label key={item} className="checklist-item"><input type="checkbox" defaultChecked={i < 2} /><span className="custom-check"><CheckCircle2 size={15} /></span><span>{item}</span></label>)}
              </div>
              <button className="panel-link" onClick={() => setPage("My Safety")}>Continue your safety plan <ChevronRight size={16} /></button>
            </section>

            <section className="panel contacts-panel">
              <div className="panel-heading"><div><h3>Your trusted circle</h3><p>People you may choose to contact.</p></div><button className="icon-btn" onClick={() => setPage("Trusted Contacts")} aria-label="View contacts"><ArrowUpRight size={17} /></button></div>
              <div className="contact-list">{savedContacts.slice(0, 4).map((c, i) => <div className="contact-row" key={`${c.name}-${i}`}><div className={`contact-avatar ${c.color}`}>{c.initials}</div><div className="contact-info"><strong>{c.name}</strong><span>{c.relation}</span></div><span className="contact-status"><span /> Added</span></div>)}</div>
              <button className="panel-link" onClick={() => setPage("Trusted Contacts")}>Manage trusted contacts <ChevronRight size={16} /></button>
            </section>
          </div>

          {page === "Trusted Contacts" && <section className="panel detail-panel"><div className="panel-heading"><div><h3>Manage your trusted circle</h3><p>This prototype stores entries only in the current page session.</p></div><Users size={22} /></div><form className="contact-form" onSubmit={saveContact}><label>Contact name<input value={contactName} onChange={e => setContactName(e.target.value)} placeholder="e.g. Sister" /></label><label>Phone number<input value={contactPhone} onChange={e => setContactPhone(e.target.value)} placeholder="e.g. +91 98xxxxxxx" /></label><button className="primary-btn" type="submit">Add trusted contact</button></form>{savedContacts.map((c,i)=><div className="contact-row" key={`${c.name}-${i}`}><div className="contact-avatar violet">{c.initials}</div><div className="contact-info"><strong>{c.name}</strong><span>{c.relation}</span></div></div>)}</section>}

          {page === "Check-in Timer" && <section className="panel detail-panel"><div className="panel-heading"><div><h3>Journey check-in</h3><p>A planning reminder demo. It does not send alerts or run a real countdown.</p></div><Clock3 size={22} /></div><label className="field-label">Choose a check-in duration<select value={timer} onChange={e => setTimer(e.target.value)}><option>15 minutes</option><option>30 minutes</option><option>45 minutes</option><option>60 minutes</option><option>90 minutes</option></select></label><button className="primary-btn" onClick={() => {setCheckIn(!checkIn); notify(checkIn ? "Demo check-in stopped." : `Demo check-in set for ${timer}. No alert will be sent.`);}}>{checkIn ? "Stop demo check-in" : "Start demo check-in"}</button><p className="muted-note">For a real emergency in India, call 112. This prototype cannot contact emergency services.</p></section>}

          {page === "Safe Routes" && <section className="panel detail-panel"><div className="panel-heading"><div><h3>Plan a journey</h3><p>Use this checklist before travelling. No live routing or location tracking is connected.</p></div><Navigation size={22} /></div><div className="route-steps"><div><span>01</span><strong>Choose a familiar route</strong><p>Prefer well-lit public roads and places with people around.</p></div><div><span>02</span><strong>Share your plan</strong><p>Tell a trusted person where you're going and your expected arrival.</p></div><div><span>03</span><strong>Keep your phone ready</strong><p>Charge your phone and know how to contact local help.</p></div></div><button className="primary-btn" onClick={() => notify("Journey checklist reviewed.")}>I've reviewed my plan <CheckCircle2 size={16} /></button></section>}

          {page === "My Safety" && <section className="panel detail-panel"><div className="panel-heading"><div><h3>My safety toolkit</h3><p>Quick actions for preparing and checking in.</p></div><ShieldCheck size={22} /></div><div className="tool-actions"><button onClick={() => setSosOpen(true)}><Siren /> Open SOS demo</button><button onClick={() => setPage("Trusted Contacts")}><Users /> Review trusted contacts</button><button onClick={() => setPage("Check-in Timer")}><Clock3 /> Journey check-in</button><button onClick={() => setPage("Incident Reports")}><ShieldAlert /> Incident report</button></div></section>}

          {page === "Incident Reports" && <section className="panel detail-panel"><div className="panel-heading"><div><h3>Incident notes</h3><p>Write a private draft for your own reference. It is not sent or permanently saved.</p></div><ShieldAlert size={22} /></div><textarea className="report-input" value={report} onChange={e => setReport(e.target.value)} placeholder="Describe what happened, when it occurred, and anything you want to remember..." /><button className="primary-btn" onClick={() => notify(report.trim() ? "Draft kept in this page session only." : "Write a few notes first.")}>Save draft locally</button></section>}

          <footer className="page-footer"><span><ShieldCheck size={15} /> SHEVANTA AI <span className="footer-separator">/</span> Designed with care.</span><span>Prototype · Not an emergency service</span></footer>
        </div>
      </main>

      {notice && <div className="toast"><CheckCircle2 size={18} /> {notice}</div>}

      {sosOpen && <div className="modal-backdrop" onClick={() => setSosOpen(false)}><section className="sos-modal" onClick={e => e.stopPropagation()}><button className="modal-close icon-btn" onClick={() => setSosOpen(false)} aria-label="Close"><X /></button><div className="modal-icon"><Siren size={28} /></div><span className="eyebrow">EMERGENCY SUPPORT DEMO</span><h2>You deserve to feel safe.</h2><p>This button is a demonstration. It will not send your location, contact anyone, or call emergency services.</p><div className="emergency-callout"><Phone size={18} /><div><strong>In India, emergency number: 112</strong><span>If you are in immediate danger, call directly when it is safe to do so.</span></div></div><button className="primary-btn modal-action" onClick={() => {setSosOpen(false); notify("SOS demo closed. No message was sent.");}}>I understand <CheckCircle2 size={16} /></button><button className="modal-secondary" onClick={() => setSosOpen(false)}>Close demo</button></section></div>}
    </div>
  );
}
