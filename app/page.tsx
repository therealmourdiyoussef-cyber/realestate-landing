"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

const T = {
  ink:      "#111111",
  gold:     "#C99A2E",
  bronze:   "#9F7622",
  off:      "#F7F4EF",
  sand:     "#D8C7A3",
  stone:    "#A9A39A",
  graphite: "#252525",
  green:    "#2F8F5B",
};

function Caption({ children, style = {} }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ fontFamily: "var(--font-body)", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: T.stone, fontWeight: 500, ...style }}>
      {children}
    </div>
  );
}

function Btn({ kind = "primary", children, onClick }: { kind?: "primary" | "secondary" | "dark"; children: React.ReactNode; onClick?: () => void }) {
  const base: React.CSSProperties = { display: "inline-flex", alignItems: "center", gap: 10, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, letterSpacing: "0.02em", padding: "14px 22px", border: "none", cursor: "pointer", transition: "all 0.2s ease" };
  const styles: Record<string, React.CSSProperties> = {
    primary:   { ...base, background: T.gold, color: T.ink },
    secondary: { ...base, background: "transparent", color: T.ink, border: `1px solid ${T.ink}` },
    dark:      { ...base, background: T.ink, color: T.gold },
  };
  return <button style={styles[kind]} onClick={onClick}>{children}{kind !== "secondary" && <span>→</span>}</button>;
}

function StatBlock({ value, suffix, label }: { value: string; suffix: string; label: string }) {
  return (
    <div style={{ borderTop: `1px solid ${T.gold}`, paddingTop: 14 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 44, lineHeight: 1, letterSpacing: "-0.02em" }}>
        {value}<span style={{ color: T.gold, fontSize: 28 }}>{suffix}</span>
      </div>
      <div style={{ marginTop: 8, fontSize: 11, color: T.stone, letterSpacing: "0.15em", textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [form, setForm] = useState({ name: "", phone: "", city: "", project: "" });

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise(r => setTimeout(r, 1500));
    setFormStatus("sent");
  };

  const services = [
    ["01", "Branding immobilier", "Identité, logo, charte, supports commerciaux."],
    ["02", "Shooting & Reels", "Photo et vidéo qui font vendre."],
    ["03", "Meta Ads & leads", "Campagnes orientées performance."],
    ["04", "Sites & landings", "Pages dédiées par projet."],
    ["05", "Community management", "Présence Instagram cohérente et active."],
    ["06", "Présentation commerciale", "Brochures, dossiers, deck investisseurs."],
    ["07", "Stratégie digitale", "Plan complet sur 3, 6 ou 12 mois."],
    ["08", "Lancement de projet", "Campagne 360 pour ouverture commerciale."],
  ];

  const steps = [
    ["Audit", "On analyse marché, biens, présence."],
    ["Stratégie", "Plan, KPIs, budget, calendrier."],
    ["Production", "Shooting, branding, sites, contenus."],
    ["Performance", "Ads, leads, optimisation continue."],
  ];

  const stats = [
    { value: "120", suffix: "+", label: "projets accompagnés" },
    { value: "9.8", suffix: "K", label: "leads générés / an" },
    { value: "180", suffix: "%", label: "ROAS moyen" },
    { value: "6", suffix: "", label: "villes — Maroc" },
  ];

  const testimonials = [
    { name: "Karim Benali", role: "Promoteur immobilier, Tanger", quote: "En 3 mois, nos leads ont triplé. E-Solution a complètement transformé notre présence digitale." },
    { name: "Sophia Moreira", role: "Agent indépendant, Marina", quote: "La qualité des visuels et la précision du ciblage ont changé la perception de mes clients." },
    { name: "Mehdi Fassi", role: "Directeur, Atlas Realty", quote: "Résultats, réactivité, et une vraie compréhension du marché immobilier marocain." },
  ];

  const faqs = [
    { q: "Quels types de clients accompagnez-vous ?", a: "Promoteurs immobiliers, agences, agents indépendants et investisseurs au Maroc et à l'international." },
    { q: "En combien de temps les premiers leads arrivent-ils ?", a: "Les premières demandes arrivent généralement dans les 7 à 14 jours après le lancement des campagnes." },
    { q: "Proposez-vous des forfaits ou du sur-mesure ?", a: "Les deux. Nous avons des forfaits mensuels à partir de 3 500 MAD et des stratégies entièrement personnalisées pour les grands projets." },
    { q: "Intervenez-vous en dehors de Tanger ?", a: "Oui — Casablanca, Rabat, Marrakech, Agadir et à l'international pour les projets marocains en diaspora." },
    { q: "Comment fonctionne l'audit gratuit ?", a: "Un appel de 30 minutes où on analyse votre présence actuelle, vos objectifs et on vous propose un plan d'action concret — sans engagement." },
  ];

  return (
    <div style={{ fontFamily: "var(--font-body)", color: T.ink, background: T.off }}>

      {/* ── NAVBAR ── */}
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        background: scrolled ? `rgba(247,244,239,0.95)` : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${T.sand}` : "1px solid transparent",
        transition: "all 0.35s ease",
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68 }}>
          <a href="#" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Image src="/logo-transparent.png" alt="E-Solution" width={40} height={40} style={{ objectFit: "contain" }} />
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16, letterSpacing: "-0.01em", lineHeight: 1 }}>E-Solution</div>
              <div style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: T.stone, marginTop: 2 }}>Marketing Immobilier</div>
            </div>
          </a>

          <nav style={{ display: "flex", gap: 32 }} className="hidden-mobile">
            {["Services", "Méthode", "Réalisations", "À propos", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase().replace(" ", "-")}`} style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500, color: T.graphite, transition: "color 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.color = T.gold)}
                onMouseLeave={e => (e.currentTarget.style.color = T.graphite)}>
                {l}
              </a>
            ))}
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <a href="https://wa.me/212600000000" style={{ fontFamily: "var(--font-display)", fontSize: 12, color: T.graphite, letterSpacing: "0.04em", border: `1px solid ${T.sand}`, padding: "8px 14px" }}>
              WhatsApp ↗
            </a>
            <a href="#contact"><Btn kind="dark">Audit gratuit</Btn></a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ paddingTop: 148, paddingBottom: 100, paddingLeft: 64, paddingRight: 64, maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 48, alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
              <span style={{ width: 8, height: 8, background: T.green, borderRadius: 2, display: "inline-block" }} />
              <Caption>Marketing immobilier · Maroc</Caption>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(52px, 6vw, 84px)", lineHeight: 0.98, letterSpacing: "-0.03em", margin: 0 }}>
              Le marketing<br />
              immobilier{" "}
              <span style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: T.bronze, fontWeight: 400 }}>pensé</span>
              <br />pour vendre.
            </h1>
            <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.6, color: T.graphite, maxWidth: 540 }}>
              Branding, contenu, publicité digitale et sites web pour promoteurs, agences et investisseurs au Maroc. On transforme l&apos;attention en demandes concrètes.
            </p>
            <div style={{ marginTop: 36, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="#contact"><Btn kind="primary">Demander un audit gratuit</Btn></a>
              <a href="#réalisations"><Btn kind="secondary">Voir nos réalisations</Btn></a>
            </div>
            <div style={{ marginTop: 56, display: "flex", gap: 36, alignItems: "center", flexWrap: "wrap" }}>
              <Caption>Ils nous font confiance</Caption>
              <div style={{ display: "flex", gap: 24, opacity: 0.45, flexWrap: "wrap" }}>
                {["ATLAS RÉSIDENCES", "PRESTIGE BAY", "CASA NEUVE", "ALAMI GROUP"].map(l => (
                  <span key={l} style={{ fontFamily: "var(--font-display)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em" }}>{l}</span>
                ))}
              </div>
            </div>
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ aspectRatio: "3/4", background: `repeating-linear-gradient(135deg, ${T.sand}, ${T.sand} 8px, #cab895 8px, #cab895 16px)`, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "monospace", fontSize: 11, color: T.graphite, background: "rgba(247,244,239,0.85)", padding: "4px 10px", border: "1px solid rgba(0,0,0,0.08)" }}>
                hero · résidence Tanger
              </span>
            </div>
            <div style={{ position: "absolute", bottom: -20, left: -20, background: T.ink, color: T.off, padding: "18px 22px", minWidth: 220 }}>
              <Caption style={{ color: T.gold }}>Live · campagne en cours</Caption>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, marginTop: 8 }}>+47 leads</div>
              <div style={{ fontSize: 11, color: T.stone, marginTop: 4 }}>Atlas Résidences · 7 derniers jours</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ background: T.ink, color: T.off, padding: "80px 64px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 40, flexWrap: "wrap", gap: 24 }}>
            <div>
              <Caption style={{ color: T.gold }}>02 · Services</Caption>
              <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, margin: "14px 0 0" }}>
                Tout ce qu&apos;il faut<br />pour vendre un projet.
              </h2>
            </div>
            <a href="#contact"><Btn kind="primary">Voir tous les services</Btn></a>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", border: `1px solid ${T.graphite}` }}>
            {services.map(([n, t, d]) => (
              <div key={n} style={{ padding: 28, borderRight: `1px solid ${T.graphite}`, borderBottom: `1px solid ${T.graphite}`, minHeight: 200, transition: "background 0.2s" }}
                onMouseEnter={e => (e.currentTarget.style.background = T.graphite)}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <div style={{ color: T.gold, fontFamily: "monospace", fontSize: 12 }}>{n}</div>
                <div style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 600 }}>{t}</div>
                <div style={{ marginTop: 10, fontSize: 13, color: T.stone, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MÉTHODE ── */}
      <section id="méthode" style={{ padding: "80px 64px", background: T.off }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Caption style={{ color: T.bronze }}>03 · Méthode</Caption>
          <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, maxWidth: 800 }}>
            De l&apos;audit à la première vente, en quatre étapes claires.
          </h2>
          <div style={{ marginTop: 56, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 0, position: "relative" }}>
            <div style={{ position: "absolute", top: 12, left: 60, right: 60, height: 1, background: T.gold, opacity: 0.3 }} />
            {steps.map(([t, d], i) => (
              <div key={t} style={{ paddingRight: 24 }}>
                <div style={{ width: 24, height: 24, background: T.gold, color: T.ink, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1 }}>
                  0{i + 1}
                </div>
                <div style={{ marginTop: 24, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 600 }}>{t}</div>
                <div style={{ marginTop: 8, fontSize: 13, color: T.graphite, lineHeight: 1.55 }}>{d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ padding: "60px 64px", background: T.sand }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          {stats.map(s => <StatBlock key={s.label} {...s} />)}
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section id="réalisations" style={{ padding: "80px 64px", background: T.off }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <Caption style={{ color: T.bronze }}>04 · Témoignages</Caption>
          <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 40 }}>
            Ils nous font confiance.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 0, border: `1px solid ${T.sand}` }}>
            {testimonials.map((t, i) => (
              <div key={t.name} style={{ padding: 36, borderRight: i < 2 ? `1px solid ${T.sand}` : "none", display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", gap: 2 }}>
                  {Array.from({ length: 5 }).map((_, i) => <span key={i} style={{ color: T.gold }}>★</span>)}
                </div>
                <p style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", fontSize: 18, lineHeight: 1.55, color: T.graphite }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ borderTop: `1px solid ${T.sand}`, paddingTop: 16 }}>
                  <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 14 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.stone, marginTop: 2 }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 64px", background: T.ink, color: T.off }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Caption style={{ color: T.gold }}>05 · FAQ</Caption>
          <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(32px, 3.5vw, 48px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05, marginBottom: 40 }}>
            Questions fréquentes.
          </h2>
          <div>
            {faqs.map((faq, i) => (
              <div key={i} style={{ borderBottom: `1px solid ${T.graphite}` }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "22px 0", background: "none", border: "none", cursor: "pointer", color: T.off, textAlign: "left", gap: 16 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 16, fontWeight: 500 }}>{faq.q}</span>
                  <span style={{ color: T.gold, fontSize: 20, flexShrink: 0, transform: openFaq === i ? "rotate(45deg)" : "none", transition: "transform 0.25s" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: 22, fontSize: 14, color: T.stone, lineHeight: 1.65 }}>{faq.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: "80px 64px", background: T.off }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
          <div>
            <Caption style={{ color: T.bronze }}>06 · Contact</Caption>
            <h2 style={{ marginTop: 14, fontFamily: "var(--font-display)", fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.05 }}>
              Audit gratuit<br />
              <span style={{ fontFamily: "var(--font-editorial)", fontStyle: "italic", color: T.bronze }}>en 48h.</span>
            </h2>
            <p style={{ marginTop: 24, fontSize: 15, lineHeight: 1.65, color: T.graphite, maxWidth: 440 }}>
              On analyse votre présence actuelle et on vous propose un plan d&apos;action concret — sans engagement, livré en 48h.
            </p>
            <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                ["Tanger, Maroc", "◎"],
                ["+212 6·· ·· ·· ··", "◈"],
                ["hello@e-solution.ma", "◉"],
              ].map(([v, icon]) => (
                <div key={v} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ color: T.gold }}>{icon}</span>
                  <span style={{ fontSize: 14, color: T.graphite }}>{v}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: T.ink, color: T.off, padding: 36 }}>
            {formStatus === "sent" ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ color: T.gold, fontSize: 32, marginBottom: 16 }}>◈</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>Demande envoyée</div>
                <div style={{ marginTop: 8, fontSize: 13, color: T.stone }}>On vous recontacte dans les 24h.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <Caption style={{ color: T.gold }}>Formulaire — lead capture</Caption>
                <div style={{ marginTop: 16, fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500 }}>Audit gratuit en 48h.</div>
                <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { id: "name", label: "Nom complet", placeholder: "Votre nom" },
                    { id: "phone", label: "Téléphone", placeholder: "+212 6·· ··" },
                    { id: "city", label: "Ville", placeholder: "Tanger, Casablanca..." },
                    { id: "project", label: "Type de projet", placeholder: "Résidentiel, commercial..." },
                  ].map(f => (
                    <div key={f.id}>
                      <div style={{ fontSize: 10, color: T.stone, letterSpacing: "0.18em", textTransform: "uppercase" }}>{f.label}</div>
                      <input
                        type="text"
                        placeholder={f.placeholder}
                        value={form[f.id as keyof typeof form]}
                        onChange={e => setForm({ ...form, [f.id]: e.target.value })}
                        required
                        style={{ marginTop: 4, width: "100%", padding: "10px 0", background: "transparent", color: T.off, fontSize: 14, border: "none", borderBottom: `1px solid ${T.graphite}`, outline: "none" }}
                      />
                    </div>
                  ))}
                  <button type="submit" disabled={formStatus === "sending"}
                    style={{ marginTop: 8, display: "flex", alignItems: "center", justifyContent: "center", gap: 10, background: T.gold, color: T.ink, fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 13, padding: "14px 22px", border: "none", cursor: "pointer", opacity: formStatus === "sending" ? 0.6 : 1 }}>
                    {formStatus === "sending" ? "Envoi..." : "Envoyer la demande"} {formStatus !== "sending" && <span>→</span>}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: T.ink, color: T.off, padding: "60px 64px 28px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr 1fr", gap: 40, flexWrap: "wrap" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Image src="/logo-light.png" alt="E-Solution" width={36} height={36} style={{ objectFit: "contain" }} />
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 16 }}>E-Solution</div>
              </div>
              <p style={{ marginTop: 18, fontSize: 13, color: T.stone, lineHeight: 1.6, maxWidth: 320 }}>
                Agence de marketing immobilier basée au Maroc. On accompagne promoteurs, agences et investisseurs sur la performance digitale.
              </p>
            </div>
            {[
              ["Services", ["Branding", "Shooting", "Meta Ads", "Sites web", "Stratégie"]],
              ["Agence", ["Méthode", "Réalisations", "Blog", "Équipe", "Carrières"]],
              ["Contact", ["+212 6·· ·· ·· ··", "hello@e-solution.ma", "Casablanca · Tanger", "WhatsApp ↗", "Instagram ↗"]],
            ].map(([t, items]) => (
              <div key={t as string}>
                <Caption style={{ color: T.gold }}>{t as string}</Caption>
                <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                  {(items as string[]).map(i => <span key={i} style={{ color: T.off, opacity: 0.7 }}>{i}</span>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 56, paddingTop: 20, borderTop: `1px solid ${T.graphite}`, display: "flex", justifyContent: "space-between", fontSize: 11, color: T.stone, fontFamily: "monospace", flexWrap: "wrap", gap: 8 }}>
            <span>© 2026 E-solution · Tous droits réservés</span>
            <span>Casablanca → Tanger → Marrakech → Rabat → Agadir</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
