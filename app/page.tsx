"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

const T = {
  ink:      "#141210",
  gold:     "#C99A2E",
  bronze:   "#9F7622",
  off:      "#F8F5F0",
  sand:     "#D6C5A4",
  stone:    "#9C9490",
  graphite: "#252220",
};

/* ── Scroll reveal hook ── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal, .reveal-scale");
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);
}

function Caption({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, fontWeight: 500, ...style }}>
      {children}
    </div>
  );
}

function Btn({ kind = "primary", children, onClick, type = "button", disabled }: {
  kind?: "primary" | "secondary" | "dark";
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
}) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 10,
    fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13,
    letterSpacing: "0.02em", padding: "14px 22px", border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.2s ease", opacity: disabled ? 0.6 : 1,
  };
  const styles: Record<string, React.CSSProperties> = {
    primary:   { ...base, background: T.gold,    color: T.ink },
    secondary: { ...base, background: "transparent", color: T.ink, border: `1px solid ${T.ink}` },
    dark:      { ...base, background: T.ink,     color: T.gold },
  };
  return (
    <button type={type} className="btn" style={styles[kind]} onClick={onClick} disabled={disabled}>
      {children}
      {kind !== "secondary" && <span aria-hidden="true">→</span>}
    </button>
  );
}

function StatBlock({ value, suffix, label, sub }: { value: string; suffix: string; label: string; sub: string }) {
  return (
    <div style={{ borderTop: `1px solid ${T.gold}`, paddingTop: 14 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 44, lineHeight: 1, letterSpacing: "-0.03em" }}>
        {value}<span style={{ color: T.gold, fontSize: 26 }} aria-hidden="true">{suffix}</span>
        <span className="sr-only">{suffix}</span>
      </div>
      <div style={{ marginTop: 6, fontSize: 13, color: T.ink, fontWeight: 500 }}>{label}</div>
      <div style={{ marginTop: 3, fontSize: 11, color: T.stone, letterSpacing: "0.1em", textTransform: "uppercase" }}>{sub}</div>
    </div>
  );
}

const FIELDS = [
  { id: "name",    label: "Nom complet",    placeholder: "Votre nom",                type: "text", autoComplete: "name" },
  { id: "phone",   label: "Téléphone",      placeholder: "+212 6·· ·· ·· ··",       type: "tel",  autoComplete: "tel" },
  { id: "city",    label: "Ville",          placeholder: "Tanger, Casablanca…",     type: "text", autoComplete: "address-level2" },
  { id: "project", label: "Type de projet", placeholder: "Villa, résidence, local…", type: "text", autoComplete: "off" },
];

function validateField(id: string, value: string): string {
  if (!value.trim()) return "Ce champ est requis.";
  if (id === "phone") {
    const clean = value.replace(/[\s\-().]/g, "");
    if (!/^(\+212|00212|0)[5-7]\d{8}$/.test(clean))
      return "Numéro marocain requis — ex : +212 6·· ·· ·· ··";
  }
  return "";
}

export default function Home() {
  const [scrolled, setScrolled]     = useState(false);
  const [menuOpen, setMenuOpen]     = useState(false);
  const [openFaq, setOpenFaq]       = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm]             = useState({ name: "", phone: "", city: "", project: "" });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const faqRefs                     = useRef<(HTMLDivElement | null)[]>([]);

  useReveal();

  const handleScroll = useCallback(() => setScrolled(window.scrollY > 30), []);
  useEffect(() => {
    let raf: number;
    const t = () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(handleScroll); };
    window.addEventListener("scroll", t, { passive: true });
    return () => { window.removeEventListener("scroll", t); cancelAnimationFrame(raf); };
  }, [handleScroll]);

  useEffect(() => {
    if (!menuOpen) return;
    const close = () => setMenuOpen(false);
    window.addEventListener("scroll", close, { once: true });
    return () => window.removeEventListener("scroll", close);
  }, [menuOpen]);

  const handleBlur = (id: string) => {
    const err = validateField(id, form[id as keyof typeof form]);
    setFormErrors(prev => ({ ...prev, [id]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};
    FIELDS.forEach(f => { const err = validateField(f.id, form[f.id as keyof typeof form]); if (err) errors[f.id] = err; });
    if (Object.keys(errors).length) { setFormErrors(errors); return; }
    setFormStatus("sending");
    await new Promise(r => setTimeout(r, 1500));
    setFormStatus("sent");
  };

  const services = [
    ["01", "Identité de projet",       "Logo, charte visuelle, supports commerciaux — pour que votre résidence inspire confiance dès le premier regard."],
    ["02", "Shooting & Reels",         "Photos et vidéos qui font vouloir visiter. Tournages sur site, montage livré sous 72h."],
    ["03", "Campagnes Meta & leads",   "Publicités ciblées qui génèrent des demandes concrètes — pas juste des impressions."],
    ["04", "Sites & pages de projet",  "Page dédiée à votre résidence, en ligne en 5 jours. Formulaire lead + WhatsApp intégré."],
    ["05", "Community management",     "Présence Instagram régulière qui entretient la confiance des acheteurs potentiels."],
    ["06", "Brochures & dossiers",     "Supports de vente qui convainquent les investisseurs et les acheteurs en visite."],
    ["07", "Stratégie digitale",       "Plan de vente sur 3, 6 ou 12 mois — avec KPIs, budget et calendrier."],
    ["08", "Lancement de projet",      "Campagne complète pour vendre dès le jour 1 : visuels, ads, site, réseaux."],
  ];

  const steps = [
    ["Audit",       "On analyse votre projet, votre marché et vos concurrents."],
    ["Stratégie",   "Plan de vente digital avec KPIs, budget et calendrier."],
    ["Production",  "Shooting, visuels, site web — tout ce qui fait vouloir acheter."],
    ["Performance", "Ads Meta, leads qualifiés, rapports et optimisation continue."],
  ];

  const stats = [
    { value: "120",   suffix: "+",  label: "projets accompagnés",  sub: "depuis 2021" },
    { value: "9 800", suffix: "+",  label: "leads qualifiés / an", sub: "demandes concrètes" },
    { value: "×2.8",  suffix: "",   label: "ROAS moyen Meta Ads",  sub: "retour sur dépense pub" },
    { value: "6",     suffix: "",   label: "villes actives",       sub: "Tanger · Casa · Marrakech…" },
  ];

  const testimonials = [
    { name: "Karim Benali",   role: "Promoteur immobilier, Tanger",  quote: "En 3 mois, nos leads ont triplé. E-Solution a complètement transformé notre présence digitale." },
    { name: "Sophia Moreira", role: "Agente indépendante, Marina",   quote: "La qualité des visuels et la précision du ciblage ont changé la perception de mes clients." },
    { name: "Mehdi Fassi",    role: "Directeur, Atlas Realty",       quote: "Résultats, réactivité, et une vraie compréhension du marché immobilier marocain." },
  ];

  const faqs = [
    { q: "Quels types de clients accompagnez-vous ?",            a: "Promoteurs immobiliers, agences, agents indépendants et investisseurs au Maroc et à l'international." },
    { q: "En combien de temps les premiers leads arrivent-ils ?", a: "Les premières demandes arrivent généralement dans les 7 à 14 jours après le lancement des campagnes." },
    { q: "Proposez-vous des forfaits ou du sur-mesure ?",         a: "Les deux. Forfaits mensuels à partir de 3 500 MAD, et stratégies personnalisées pour les grands projets." },
    { q: "Intervenez-vous en dehors de Tanger ?",                a: "Oui — Casablanca, Rabat, Marrakech, Agadir et à l'international pour les projets marocains en diaspora." },
    { q: "Comment fonctionne l'audit gratuit ?",                 a: "Un échange de 30 minutes : on analyse votre présence, vos objectifs, et on vous remet un plan d'action concret — sans engagement." },
  ];

  const systeme360 = [
    { num: "01", title: "Branding du projet",    sub: "Nom, positionnement, identité.",                       checks: ["Nom & signature", "Positionnement unique", "Identité visuelle premium", "Univers de marque"] },
    { num: "02", title: "Shooting premium",       sub: "Photos, vidéos, visite immersive.",                   checks: ["Photos professionnelles", "Vidéo cinématique", "Drone & plans aériens", "Visite virtuelle 360°"] },
    { num: "03", title: "Contenu social media",   sub: "Feed, reels, storytelling.",                          checks: ["Calendrier éditorial", "Design haut de gamme", "Reels & séquences courtes", "Storytelling & émotions"] },
    { num: "04", title: "Landing page",           sub: "Présentation claire, appel à l'action.",              checks: ["Design sur-mesure", "Informations clés", "Formulaire intelligent", "Conversion optimisée"] },
    { num: "05", title: "Meta Ads ciblées",       sub: "Campagnes, retargeting, optimisation.",               checks: ["Audience qualifiée", "Campagnes performantes", "Retargeting intelligent", "Optimisation continue"] },
    { num: "06", title: "Suivi des leads",        sub: "WhatsApp, CRM, relance commerciale.",                 checks: ["Collecte multicanale", "CRM & qualification", "Relances automatisées", "Suivi & closing"] },
  ];

  const funnelSteps = [
    { num: "01", title: "Attraction",     sub: "contenu premium + Meta Ads",                    items: ["Contenu haut de gamme", "Campagnes ciblées", "Visibilité maximale"] },
    { num: "02", title: "Engagement",     sub: "visuels, vidéo, copywriting",                   items: ["Visuels impactants", "Vidéo immersive", "Copywriting persuasif"] },
    { num: "03", title: "Conversion",     sub: "landing page + formulaire + WhatsApp",           items: ["Landing page optimisée", "Formulaire simple", "WhatsApp instantané"] },
    { num: "04", title: "Qualification",  sub: "tri des demandes, budget, besoin",               items: ["Analyse des critères", "Scoring intelligent", "Leads qualifiés"] },
    { num: "05", title: "Relance",        sub: "suivi commercial et conversion en visite",       items: ["Suivi personnalisé", "Relances automatiques", "Conversion en visite"] },
  ];

  const navLinks = ["Services", "Méthode", "Réalisations", "À propos", "Contact"];

  return (
    <div style={{ fontFamily: "var(--font-body)", color: T.ink, background: T.off }}>

      {/* ── Skip link ── */}
      <a href="#main-content"
        style={{ position: "absolute", left: -9999, top: 8, background: T.gold, color: T.ink, padding: "8px 16px", fontWeight: 600, zIndex: 9999 }}
        onFocus={e => { e.currentTarget.style.left = "8px"; }}
        onBlur={e => { e.currentTarget.style.left = "-9999px"; }}>
        Aller au contenu
      </a>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? "rgba(248,245,240,0.96)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.sand}` : "1px solid transparent",
        transition: "background 0.35s ease, border-color 0.35s ease, backdrop-filter 0.35s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" aria-label="E-Solution — retour en haut" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/logo-transparent.png" alt="" width={40} height={40} style={{ objectFit: "contain" }} aria-hidden="true" />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", lineHeight: 1 }}>E-Solution</div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, marginTop: 2 }}>Marketing Immobilier</div>
            </div>
          </a>

          <nav className="nav-desktop" style={{ gap: 32 }} aria-label="Navigation principale">
            {navLinks.map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-").replace("à", "a")}`}
                style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500, color: T.graphite, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = T.graphite)}>
                {l}
              </a>
            ))}
          </nav>

          <div className="nav-actions-desktop" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="https://wa.me/212600000000?text=Bonjour%2C+je+suis+int%C3%A9ress%C3%A9+par+vos+services+pour+mon+projet+immobilier."
              aria-label="Contactez-nous sur WhatsApp"
              style={{ fontFamily: "var(--font-display)", fontSize: 12, color: T.graphite, letterSpacing: "0.04em", border: `1px solid ${T.sand}`, padding: "8px 14px", transition: "border-color 0.2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = T.gold)}
              onMouseLeave={e => (e.currentTarget.style.borderColor = T.sand)}>
              WhatsApp ↗
            </a>
            <a href="#contact"><Btn kind="dark">Audit gratuit</Btn></a>
          </div>

          <button className="nav-hamburger"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
            style={{ color: T.ink, width: 44, height: 44 }}>
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              {menuOpen ? (
                <><line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
              ) : (
                <><line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></>
              )}
            </svg>
          </button>
        </div>

        <nav className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Menu mobile" aria-hidden={!menuOpen}>
          {navLinks.map(l => (
            <a key={l} href={`#${l.toLowerCase().replace(/\s+/g, "-").replace("à", "a")}`}
              style={{ fontFamily: "var(--font-display)" }}
              onClick={() => setMenuOpen(false)}>{l}</a>
          ))}
          <div className="mobile-cta">
            <a href="#contact" onClick={() => setMenuOpen(false)}><Btn kind="dark">Audit gratuit</Btn></a>
          </div>
        </nav>
      </header>

      <main id="main-content">

        {/* ── HERO ── */}
        <section style={{ paddingTop: 148, paddingBottom: 100 }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="layout-hero">

              {/* Left column — staggered entrance */}
              <div>
                <div className="hero-item" style={{ animationDelay: "0ms", display: "flex", alignItems: "center", gap: 12, marginBottom: 32 }}>
                  <span style={{ width: 8, height: 8, background: T.gold, borderRadius: 2, display: "inline-block" }} aria-hidden="true" />
                  <Caption>Marketing immobilier · Tanger, Maroc</Caption>
                </div>

                <h1 className="hero-item" style={{ animationDelay: "90ms", fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(52px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }}>
                  Le marketing<br />
                  immobilier{" "}
                  <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: T.bronze, fontWeight: 400 }}>pensé</span>
                  <br />pour vendre.
                </h1>

                <p className="hero-item" style={{ animationDelay: "210ms", marginTop: 32, fontSize: 17, lineHeight: 1.65, color: T.graphite, maxWidth: 520 }}>
                  Campagnes Meta, visuels et sites web conçus pour vendre votre projet immobilier au Maroc. Du premier clic à la première visite.
                </p>

                <div className="hero-item" style={{ animationDelay: "320ms", marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
                  <a href="#contact"><Btn kind="primary">Demander un audit gratuit</Btn></a>
                  <a href="https://wa.me/212600000000?text=Bonjour%2C+je+suis+int%C3%A9ress%C3%A9+par+vos+services+pour+mon+projet+immobilier.">
                    <Btn kind="secondary">Écrire sur WhatsApp</Btn>
                  </a>
                </div>

                <div className="hero-item" style={{ animationDelay: "430ms", marginTop: 56, display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
                  <Caption>Ils nous font confiance</Caption>
                  <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
                    {["ATLAS RÉSIDENCES", "PRESTIGE BAY", "CASA NEUVE", "ALAMI GROUP"].map(l => (
                      <span key={l} style={{ fontFamily: "var(--font-display)", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: T.stone }}>{l}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column — slides in from right */}
              <div className="hero-image" style={{ animationDelay: "150ms", position: "relative" }}>
                <div style={{ aspectRatio: "3/4", position: "relative", overflow: "hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=900&q=80"
                    alt="Résidence de standing — projet client E-Solution"
                    fill
                    style={{ objectFit: "cover", transition: "transform 0.6s var(--ease-quart)" }}
                    sizes="(max-width: 860px) 100vw, 45vw"
                    priority
                    onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.03)")}
                    onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ position: "absolute", bottom: -20, left: -20, background: T.ink, color: T.off, padding: "18px 22px", minWidth: 220 }}
                  aria-label="Résultat live : +47 leads pour Atlas Résidences ces 7 derniers jours">
                  <Caption style={{ color: T.gold }}>Live · campagne en cours</Caption>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 700, marginTop: 8, letterSpacing: "-0.03em" }} aria-hidden="true">+47 leads</div>
                  <div style={{ fontSize: 11, color: T.stone, marginTop: 4 }}>Atlas Résidences · 7 derniers jours</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" style={{ background: T.ink, color: T.off, paddingTop: 80, paddingBottom: 80 }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
              <div>
                <Caption style={{ color: T.gold }}>02 · Services</Caption>
                <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, margin: "14px 0 0" }}>
                  Tout ce qu&apos;il faut<br />pour vendre un projet.
                </h2>
              </div>
              <a href="#contact"><Btn kind="primary">Discuter de votre projet</Btn></a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", border: `1px solid ${T.graphite}` }}>
              {services.map(([n, t, d], i) => (
                <div key={n}
                  className={`reveal-scale stagger-${(i % 4) + 1}`}
                  style={{ padding: 28, borderRight: `1px solid ${T.graphite}`, borderBottom: `1px solid ${T.graphite}`, minHeight: 200, transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 60}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${(i % 4) * 60}ms, background 0.2s ease` }}
                  onMouseEnter={e => (e.currentTarget.style.background = T.graphite)}
                  onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                  <div style={{ color: T.gold, fontFamily: "monospace", fontSize: 12 }} aria-hidden="true">{n}</div>
                  <h3 style={{ marginTop: 20, fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 600, lineHeight: 1.2 }}>{t}</h3>
                  <p style={{ marginTop: 10, fontSize: 13, color: T.stone, lineHeight: 1.6 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SYSTÈME 360° ── */}
        <section style={{ paddingTop: 88, paddingBottom: 88, background: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
              <div style={{ color: T.gold, fontSize: 28, marginBottom: 16 }} aria-hidden="true">✦</div>
              <Caption style={{ color: T.bronze, marginBottom: 14, display: "block" }}>03 · Système</Caption>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(36px, 5vw, 68px)", letterSpacing: "-0.03em", lineHeight: 1, margin: "0 0 20px" }}>
                SYSTÈME DE VISIBILITÉ 360°
              </h2>
              <p style={{ fontSize: 16, color: T.graphite, lineHeight: 1.65, maxWidth: 540, margin: "0 auto" }}>
                Comment <span style={{ color: T.gold, fontWeight: 600 }}>E-Solution</span> construit la présence digitale d&apos;un promoteur.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
              {systeme360.map((s, i) => (
                <div key={s.num}
                  className={`reveal stagger-${(i % 3) + 1}`}
                  style={{ background: T.off, border: `1px solid ${T.sand}`, padding: "32px 28px", transition: "border-color 0.2s ease, box-shadow 0.2s ease" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = T.gold; e.currentTarget.style.boxShadow = `0 8px 32px rgba(201,154,46,0.1)`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = T.sand; e.currentTarget.style.boxShadow = "none"; }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{ width: 44, height: 44, background: T.gold, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span style={{ color: T.ink, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11 }}>{s.num}</span>
                    </div>
                    <div>
                      <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 18, lineHeight: 1.15 }}>{s.title}</div>
                      <div style={{ fontSize: 12, color: T.stone, marginTop: 3 }}>{s.sub}</div>
                    </div>
                  </div>
                  <div style={{ height: 1, background: T.sand, marginBottom: 20 }} aria-hidden="true" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {s.checks.map(c => (
                      <div key={c} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <span style={{ color: T.gold, fontSize: 13, flexShrink: 0 }} aria-hidden="true">✓</span>
                        <span style={{ fontSize: 13, color: T.graphite }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ── LEADS IMMOBILIERS ── */}
        <section style={{ paddingTop: 88, paddingBottom: 88, background: T.ink, color: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(52px, 8vw, 108px)", letterSpacing: "-0.04em", lineHeight: 0.93, margin: "0 0 24px" }}>
                LEADS<br />IMMOBILIERS
              </h2>
              <p style={{ fontSize: 16, color: T.stone, lineHeight: 1.65, fontStyle: "italic", fontFamily: "var(--font-body)" }}>
                Le système qui transforme l&apos;attention en{" "}
                <span style={{ color: T.gold, fontStyle: "normal", fontWeight: 600 }}>demandes qualifiées.</span>
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))" }}>
              {funnelSteps.map((s, i) => (
                <div key={s.num}
                  className={`reveal stagger-${i + 1}`}
                  style={{ border: `1px solid ${T.graphite}`, borderRight: i < funnelSteps.length - 1 ? "none" : `1px solid ${T.graphite}`, padding: "28px 22px", position: "relative" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <span style={{ color: T.gold, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.1em" }}>{s.num}</span>
                    {i < funnelSteps.length - 1 && (
                      <span style={{ color: T.graphite, fontSize: 18, lineHeight: 1 }} aria-hidden="true">→</span>
                    )}
                  </div>
                  <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 20, marginTop: 14, color: T.gold, lineHeight: 1.1 }}>{s.title}</h3>
                  <p style={{ fontSize: 11, color: T.stone, marginTop: 6, lineHeight: 1.5, marginBottom: 20 }}>{s.sub}</p>
                  <div style={{ height: 1, background: T.graphite, marginBottom: 16 }} aria-hidden="true" />
                  <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
                    {s.items.map(item => (
                      <div key={item} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={{ color: T.gold, fontSize: 8, flexShrink: 0 }} aria-hidden="true">◆</span>
                        <span style={{ fontSize: 12, color: T.stone }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal" style={{ marginTop: 48, textAlign: "center" }}>
              <p style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 18, color: T.stone, lineHeight: 1.6 }}>
                Une <span style={{ color: T.gold, fontStyle: "normal" }}>visibilité</span> structurée.{" "}
                Un <span style={{ color: T.gold, fontStyle: "normal" }}>parcours</span> fluide.{" "}
                Des <span style={{ color: T.gold, fontStyle: "normal" }}>résultats</span> mesurables.
              </p>
            </div>
          </div>
        </section>

        {/* ── MÉTHODE ── */}
        <section id="méthode" style={{ paddingTop: 80, paddingBottom: 80, background: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal">
              <Caption style={{ color: T.bronze }}>03 · Méthode</Caption>
              <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, maxWidth: 800 }}>
                De l&apos;audit à la première vente, en quatre étapes.
              </h2>
            </div>
            <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", position: "relative" }}>
              <div style={{ position: "absolute", top: 12, left: 60, right: 60, height: 1, background: T.gold, opacity: 0.25 }} aria-hidden="true" />
              {steps.map(([t, d], i) => (
                <div key={t}
                  className={`reveal stagger-${i + 1}`}
                  style={{ paddingRight: 24, paddingBottom: 24 }}>
                  <div style={{ width: 24, height: 24, background: T.gold, color: T.ink, fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }} aria-hidden="true">
                    0{i + 1}
                  </div>
                  <h3 style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>{t}</h3>
                  <p style={{ marginTop: 8, fontSize: 13, color: T.graphite, lineHeight: 1.6 }}>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <section aria-label="Chiffres clés" style={{ paddingTop: 60, paddingBottom: 60, background: T.sand }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32 }}>
            {stats.map((s, i) => (
              <div key={s.label} className={`reveal stagger-${i + 1}`}>
                <StatBlock {...s} />
              </div>
            ))}
          </div>
        </section>

        {/* ── AVANT / APRÈS ── */}
        <section style={{ paddingTop: 88, paddingBottom: 88, background: T.ink, color: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal" style={{ textAlign: "center", marginBottom: 64 }}>
              <Caption style={{ color: T.gold, marginBottom: 16, display: "block" }}>Notre expertise</Caption>
              <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "clamp(32px, 4.5vw, 60px)", letterSpacing: "-0.03em", lineHeight: 1.1, margin: 0 }}>
                Nous rendons votre projet<br />
                <span style={{ fontFamily: "var(--font-body)", fontStyle: "italic", color: T.gold, fontWeight: 400 }}>plus visible en ligne.</span>
              </h2>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>

              {/* AVANT */}
              <div className="reveal stagger-1" style={{ border: `1px solid ${T.graphite}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 24px", background: T.graphite }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", color: T.stone }}>AVANT</span>
                </div>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=700&q=60"
                    fill style={{ objectFit: "cover", filter: "grayscale(100%) brightness(0.55)" }}
                    alt="Avant intervention E-Solution" />
                </div>
                <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
                  {["Présence digitale faible", "Photos simples", "Annonce peu claire", "Peu de demandes"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ color: T.stone, fontSize: 15, flexShrink: 0 }} aria-hidden="true">✕</span>
                      <span style={{ fontSize: 14, color: T.stone, lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* APRÈS */}
              <div className="reveal stagger-2" style={{ border: `2px solid ${T.gold}`, overflow: "hidden" }}>
                <div style={{ padding: "14px 24px", background: T.gold }}>
                  <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 12, letterSpacing: "0.15em", color: T.ink }}>APRÈS</span>
                </div>
                <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
                  <Image
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"
                    fill style={{ objectFit: "cover" }}
                    alt="Après intervention E-Solution — résidence premium" />
                </div>
                <div style={{ padding: "28px 28px 32px", display: "flex", flexDirection: "column", gap: 18 }}>
                  {["Visibilité structurée", "Branding du projet", "Contenu premium", "Meta Ads ciblées", "Leads qualifiés"].map(item => (
                    <div key={item} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                      <span style={{ color: T.gold, fontSize: 15, flexShrink: 0 }} aria-hidden="true">✓</span>
                      <span style={{ fontSize: 14, color: T.off, lineHeight: 1.3 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ── TÉMOIGNAGES ── */}
        <section id="réalisations" style={{ paddingTop: 80, paddingBottom: 80, background: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }}>
            <div className="reveal">
              <Caption style={{ color: T.bronze }}>04 · Témoignages</Caption>
              <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 40 }}>
                Ils nous font confiance.
              </h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", border: `1px solid ${T.sand}` }}>
              {testimonials.map((t, i) => (
                <article key={t.name}
                  className={`reveal stagger-${i + 1}`}
                  style={{ padding: 36, borderRight: i < 2 ? `1px solid ${T.sand}` : "none", borderBottom: `1px solid ${T.sand}`, display: "flex", flexDirection: "column", gap: 24 }}>
                  <div aria-label="5 étoiles sur 5" style={{ display: "flex", gap: 2 }}>
                    {Array.from({ length: 5 }).map((_, j) => <span key={j} style={{ color: T.gold }} aria-hidden="true">★</span>)}
                  </div>
                  <blockquote style={{ fontFamily: "var(--font-body)", fontStyle: "italic", fontSize: 17, lineHeight: 1.6, color: T.graphite, margin: 0 }}>
                    &ldquo;{t.quote}&rdquo;
                  </blockquote>
                  <footer style={{ borderTop: `1px solid ${T.sand}`, paddingTop: 16 }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: T.stone, marginTop: 2 }}>{t.role}</div>
                  </footer>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ paddingTop: 80, paddingBottom: 80, background: T.ink, color: T.off }} className="section-px">
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div className="reveal">
              <Caption style={{ color: T.gold }}>05 · FAQ</Caption>
              <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: 40 }}>
                Questions fréquentes.
              </h2>
            </div>
            <div>
              {faqs.map((faq, i) => (
                <div key={i} className="reveal" style={{ borderBottom: `1px solid ${T.graphite}` }}>
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    aria-controls={`faq-answer-${i}`}
                    id={`faq-question-${i}`}
                    style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", color: T.off, textAlign: "left", gap: 16 }}>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500 }}>{faq.q}</span>
                    <span style={{
                      color: T.gold, fontSize: 20, flexShrink: 0,
                      transform: openFaq === i ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 0.3s cubic-bezier(0.16,1,0.3,1)",
                      display: "inline-block",
                    }} aria-hidden="true">+</span>
                  </button>
                  {/* Animated accordion — max-height instead of hidden */}
                  <div
                    id={`faq-answer-${i}`}
                    role="region"
                    aria-labelledby={`faq-question-${i}`}
                    style={{
                      overflow: "hidden",
                      maxHeight: openFaq === i ? 200 : 0,
                      opacity: openFaq === i ? 1 : 0,
                      transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.3s ease",
                    }}>
                    <div style={{ paddingBottom: 22, fontSize: 14, color: T.stone, lineHeight: 1.7 }}>
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" style={{ paddingTop: 80, paddingBottom: 80, background: T.off }} className="section-px">
          <div style={{ maxWidth: 1280, margin: "0 auto" }} className="layout-2col">
            <div className="reveal">
              <Caption style={{ color: T.bronze }}>06 · Contact</Caption>
              <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
                Audit gratuit<br />
                <span style={{ color: T.gold }}>en 48h.</span>
              </h2>
              <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.7, color: T.graphite, maxWidth: 440 }}>
                On analyse votre présence actuelle et on vous remet un plan d&apos;action concret — sans engagement, livré en 48h.
              </p>
              <address style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16, fontStyle: "normal" }}>
                {([
                  ["Tanger, Maroc",       "◎"],
                  ["+212 6·· ·· ·· ··",  "◈"],
                  ["hello@e-solution.ma", "◉"],
                ] as [string, string][]).map(([v, icon]) => (
                  <div key={v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ color: T.gold }} aria-hidden="true">{icon}</span>
                    <span style={{ fontSize: 14, color: T.graphite }}>{v}</span>
                  </div>
                ))}
              </address>
            </div>

            <div className="reveal stagger-2" style={{ background: T.ink, color: T.off, padding: 36 }}>
              {formStatus === "sent" ? (
                <div style={{ textAlign: "center", padding: "48px 0" }} role="status" aria-live="polite">
                  <div style={{ color: T.gold, fontSize: 32, marginBottom: 16 }} aria-hidden="true">◈</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 700 }}>Demande envoyée</div>
                  <div style={{ marginTop: 8, fontSize: 13, color: T.stone }}>On vous recontacte dans les 24h.</div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <Caption style={{ color: T.gold }}>Formulaire — lead capture</Caption>
                  <p style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 700 }}>Audit gratuit en 48h.</p>
                  <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 20 }}>
                    {FIELDS.map(f => (
                      <div key={f.id}>
                        <label htmlFor={f.id} style={{ display: "block", fontSize: 10, color: T.stone, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 6 }}>
                          {f.label} <span style={{ color: T.gold }} aria-label="champ obligatoire">*</span>
                        </label>
                        {/* Animated focus underline */}
                        <div className="input-wrap">
                          <input
                            id={f.id} name={f.id} type={f.type}
                            placeholder={f.placeholder} autoComplete={f.autoComplete}
                            value={form[f.id as keyof typeof form]}
                            onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                            onBlur={() => handleBlur(f.id)}
                            required
                            aria-invalid={!!formErrors[f.id]}
                            aria-describedby={formErrors[f.id] ? `${f.id}-error` : undefined}
                            style={{
                              width: "100%", padding: "10px 0", background: "transparent",
                              color: T.off, fontSize: 14, border: "none", outline: "none",
                              borderBottom: `1px solid ${formErrors[f.id] ? "#e05252" : T.graphite}`,
                              transition: "border-color 0.2s",
                            }}
                          />
                          <div className="input-line" />
                        </div>
                        {formErrors[f.id] && (
                          <div id={`${f.id}-error`} role="alert" style={{ marginTop: 4, fontSize: 11, color: "#e07070", letterSpacing: "0.05em" }}>
                            {formErrors[f.id]}
                          </div>
                        )}
                      </div>
                    ))}
                    <Btn type="submit" kind="primary" disabled={formStatus === "sending"}>
                      {formStatus === "sending" ? "Envoi en cours…" : "Envoyer la demande"}
                    </Btn>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.ink, color: T.off, paddingTop: 60, paddingBottom: 28 }} className="section-px">
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="layout-footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image src="/logo-light.png" alt="" width={36} height={36} style={{ objectFit: "contain" }} aria-hidden="true" />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.01em" }}>E-Solution</div>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: T.stone, lineHeight: 1.6, maxWidth: 320 }}>
                Agence de marketing immobilier basée à Tanger. On accompagne promoteurs, agences et investisseurs sur la performance digitale.
              </p>
            </div>
            {([
              ["Services", ["Identité de projet", "Shooting & Reels", "Campagnes Meta", "Sites web", "Stratégie digitale"]],
              ["Agence",   ["Méthode", "Réalisations", "Blog", "Équipe", "Carrières"]],
              ["Contact",  ["+212 6·· ·· ·· ··", "hello@e-solution.ma", "Casablanca · Tanger", "WhatsApp ↗", "Instagram ↗"]],
            ] as [string, string[]][]).map(([t, items]) => (
              <div key={t}>
                <Caption style={{ color: T.gold }}>{t}</Caption>
                <nav aria-label={`Footer — ${t}`}>
                  <ul style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 13, listStyle: "none", padding: 0, margin: "16px 0 0" }}>
                    {items.map(item => <li key={item}><span style={{ color: T.off, opacity: 0.65 }}>{item}</span></li>)}
                  </ul>
                </nav>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, paddingTop: 20, borderTop: `1px solid ${T.graphite}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: T.stone, fontFamily: "monospace", flexWrap: "wrap", gap: 8 }}>
            <span>© 2026 E-Solution · Tous droits réservés</span>
            <span>Casablanca · Tanger · Marrakech · Rabat · Agadir</span>
          </div>
        </div>
      </footer>

      {/* ── Floating WhatsApp ── */}
      <a href="https://wa.me/212600000000?text=Bonjour%2C+je+suis+int%C3%A9ress%C3%A9+par+vos+services+pour+mon+projet+immobilier."
        aria-label="Nous contacter sur WhatsApp"
        target="_blank" rel="noopener noreferrer"
        className="wa-float"
        style={{ position: "fixed", bottom: 28, right: 28, zIndex: 100, width: 56, height: 56, borderRadius: "50%", background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s ease" }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
          <path d="M11.996 2C6.478 2 2 6.477 2 11.995c0 1.742.455 3.376 1.252 4.798L2 22l5.377-1.228A9.993 9.993 0 0011.996 22C17.514 22 22 17.523 22 12.005 22 6.479 17.514 2 11.996 2zm0 18.356a8.32 8.32 0 01-4.24-1.157l-.305-.181-3.194.73.762-3.093-.198-.317A8.313 8.313 0 013.644 12c0-4.604 3.747-8.353 8.352-8.353 4.605 0 8.352 3.749 8.352 8.353 0 4.605-3.747 8.356-8.352 8.356z"/>
        </svg>
      </a>

    </div>
  );
}
