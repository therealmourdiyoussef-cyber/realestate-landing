"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("sending");
    await new Promise((r) => setTimeout(r, 1500));
    setFormStatus("sent");
  };

  const services = [
    {
      icon: "◈",
      title: "Marketing Digital",
      desc: "Campagnes Meta & Google Ads ciblées sur les acheteurs qualifiés. ROI mesurable à chaque étape.",
    },
    {
      icon: "◉",
      title: "Génération de Leads",
      desc: "Systèmes d'acquisition automatisés qui livrent des prospects chauds directement dans votre CRM.",
    },
    {
      icon: "◫",
      title: "Production Vidéo",
      desc: "Cinématique de propriété, drone, visites virtuelles. Vendez l'expérience avant la visite.",
    },
    {
      icon: "◌",
      title: "Photographie Premium",
      desc: "Shooting lifestyle haut de gamme. Chaque image raconte l'histoire du bien et séduit l'acheteur.",
    },
    {
      icon: "◎",
      title: "Stratégie de Marque",
      desc: "Positionnement, identité visuelle, personal branding. Devenez la référence dans votre marché.",
    },
    {
      icon: "◷",
      title: "Analyse & Reporting",
      desc: "Tableaux de bord en temps réel. Décisions basées sur les données, pas sur l'intuition.",
    },
  ];

  const stats = [
    { number: "200+", label: "Biens Vendus" },
    { number: "95%", label: "Taux de Satisfaction" },
    { number: "3×", label: "Plus de Leads" },
    { number: "48h", label: "Délai de Réponse" },
  ];

  const steps = [
    {
      num: "01",
      title: "Consultation Gratuite",
      desc: "Analyse de votre portefeuille, de votre positionnement et de vos objectifs commerciaux.",
    },
    {
      num: "02",
      title: "Stratégie Sur-Mesure",
      desc: "Un plan d'action personnalisé avec des KPIs clairs, un budget optimisé et un calendrier précis.",
    },
    {
      num: "03",
      title: "Exécution & Résultats",
      desc: "Déploiement des campagnes, suivi hebdomadaire et ajustements continus pour maximiser le ROI.",
    },
  ];

  const testimonials = [
    {
      name: "Karim Benali",
      role: "Promoteur Immobilier, Tanger",
      quote:
        "E-Solution Realty a transformé notre approche commerciale. En 3 mois, nos leads ont triplé et nous avons vendu des unités difficiles à écouler depuis 6 mois.",
      rating: 5,
    },
    {
      name: "Sophia Moreira",
      role: "Agent Indépendant, Tanger Marina",
      quote:
        "Un niveau de professionnalisme rarissime au Maroc. La qualité des visuels et la précision du ciblage publicitaire ont complètement changé la perception de mes clients.",
      rating: 5,
    },
    {
      name: "Mehdi Fassi",
      role: "Directeur, Groupe Atlas Realty",
      quote:
        "Nous avons travaillé avec plusieurs agences marketing. E-Solution Realty est dans une autre catégorie. Résultats, réactivité, et une vraie compréhension du marché.",
      rating: 5,
    },
  ];

  const faqs = [
    {
      q: "Combien coûte une collaboration avec E-Solution Realty ?",
      a: "Nos formules démarrent à partir de 3 500 MAD/mois pour les agents individuels. Pour les promoteurs et agences, nous proposons des plans sur-mesure. Contactez-nous pour un devis personnalisé.",
    },
    {
      q: "En combien de temps puis-je voir des résultats ?",
      a: "Les premières leads arrivent généralement dans les 7 à 14 jours suivant le lancement. Des résultats significatifs sont visibles dès le premier mois.",
    },
    {
      q: "Travaillez-vous avec des agents individuels ou seulement des agences ?",
      a: "Nous accompagnons aussi bien les agents indépendants que les grandes agences et promoteurs immobiliers. Chaque client bénéficie d'une stratégie adaptée.",
    },
    {
      q: "Proposez-vous des services en dehors de Tanger ?",
      a: "Oui. Bien que basés à Tanger, nous opérons sur tout le Maroc — Casablanca, Rabat, Marrakech, Agadir — et accompagnons des projets à l'international.",
    },
    {
      q: "Comment fonctionne le reporting ?",
      a: "Vous recevez un rapport hebdomadaire détaillé avec toutes les métriques clés : impressions, leads, coût par acquisition, et recommandations d'optimisation.",
    },
  ];

  return (
    <main className="min-h-screen">
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#1f1f1f]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
          <a href="#" className="flex items-center gap-3">
            <span className="font-heading text-2xl font-light tracking-widest text-white">
              E<span className="gold">-</span>SOLUTION
            </span>
            <span className="text-xs tracking-[0.3em] text-[#6b6b6b] uppercase font-light">
              Realty
            </span>
          </a>

          <div className="hidden md:flex items-center gap-10">
            {["Services", "Processus", "Témoignages", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-widest uppercase text-[#6b6b6b] hover:text-[#c9a84c] transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:block btn-gold px-6 py-3 text-xs tracking-widest"
          >
            Consultation Gratuite
          </a>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <div className="w-6 space-y-1.5">
              <span
                className={`block h-px bg-[#c9a84c] transition-all duration-300 ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block h-px bg-[#c9a84c] transition-all duration-300 ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px bg-[#c9a84c] transition-all duration-300 ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-[#0a0a0a] border-t border-[#1f1f1f] px-6 py-6 space-y-4">
            {["Services", "Processus", "Témoignages", "FAQ", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="block text-xs tracking-widest uppercase text-[#6b6b6b] hover:text-[#c9a84c] transition-colors py-2"
              >
                {item}
              </a>
            ))}
            <a
              href="#contact"
              className="block btn-gold px-6 py-3 text-center text-xs tracking-widest mt-4"
            >
              Consultation Gratuite
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
          <div className="max-w-3xl">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-8 font-light">
              Agence Immobilière Premium — Tanger, Maroc
            </p>

            <h1 className="font-heading text-6xl md:text-8xl font-light leading-[1.05] mb-8 text-white">
              L&apos;Immobilier
              <br />
              <span className="gold-gradient italic">Réinventé</span>
              <br />
              à Tanger.
            </h1>

            <p className="text-[#6b6b6b] text-lg font-light leading-relaxed mb-12 max-w-xl">
              Nous aidons les agents et promoteurs immobiliers à vendre plus
              vite, plus cher, et à construire une marque qui inspire confiance.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contact"
                className="btn-gold px-10 py-4 text-xs tracking-[0.15em] inline-block text-center"
              >
                Démarrer Maintenant
              </a>
              <a
                href="#services"
                className="btn-outline-gold px-10 py-4 text-xs tracking-[0.15em] inline-block text-center"
              >
                Découvrir Nos Services
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-[#6b6b6b]">
            Défiler
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#c9a84c] to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <section className="border-y border-[#1f1f1f] bg-[#111111]">
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-heading text-5xl md:text-6xl font-light gold-gradient mb-2">
                {s.number}
              </p>
              <p className="text-xs tracking-[0.2em] uppercase text-[#6b6b6b]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4">
              Ce Que Nous Faisons
            </p>
            <div className="section-divider mb-6" />
            <h2 className="font-heading text-5xl md:text-6xl font-light text-white">
              Des Services Conçus
              <br />
              pour la <span className="italic gold">Performance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1f1f1f]">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-[#0a0a0a] p-10 group hover:bg-[#111111] transition-colors duration-300"
              >
                <span className="text-3xl gold block mb-6 group-hover:scale-110 transition-transform duration-300 inline-block">
                  {s.icon}
                </span>
                <h3 className="font-heading text-2xl font-light text-white mb-3">
                  {s.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed font-light">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSUS */}
      <section
        id="processus"
        className="py-32 px-6 bg-[#111111] border-y border-[#1f1f1f]"
      >
        <div className="max-w-7xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4">
              Notre Approche
            </p>
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-heading text-5xl md:text-6xl font-light text-white">
              Simple. Structuré.
              <br />
              <span className="italic gold">Efficace.</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#c9a84c]/30 to-transparent" />
            {steps.map((step) => (
              <div key={step.num} className="relative text-center">
                <div className="w-16 h-16 border border-[#c9a84c]/30 flex items-center justify-center mx-auto mb-8">
                  <span className="font-heading text-2xl font-light gold">
                    {step.num}
                  </span>
                </div>
                <h3 className="font-heading text-2xl font-light text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-sm text-[#6b6b6b] leading-relaxed font-light">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section
        className="relative py-32 px-6 overflow-hidden"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&q=80')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]/85" />
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-6">
            Prêt à Passer au Niveau Supérieur ?
          </p>
          <h2 className="font-heading text-5xl md:text-7xl font-light text-white mb-8">
            Votre Marché Vous Attend.
            <br />
            <span className="italic gold">Soyez le Premier.</span>
          </h2>
          <a
            href="#contact"
            className="btn-gold px-12 py-4 text-xs tracking-[0.15em] inline-block"
          >
            Consultation Gratuite
          </a>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section id="témoignages" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4">
              Ce Qu&apos;ils Disent
            </p>
            <div className="section-divider mb-6" />
            <h2 className="font-heading text-5xl md:text-6xl font-light text-white">
              Ils Nous Font
              <br />
              <span className="italic gold">Confiance</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="card-dark p-10 flex flex-col justify-between hover:border-[#c9a84c]/30 transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-8">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <span key={i} className="text-[#c9a84c] text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="font-heading text-xl font-light text-white leading-relaxed italic mb-8">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                </div>
                <div className="border-t border-[#1f1f1f] pt-6">
                  <p className="text-white text-sm font-medium">{t.name}</p>
                  <p className="text-[#6b6b6b] text-xs mt-1">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-32 px-6 bg-[#111111] border-y border-[#1f1f1f]"
      >
        <div className="max-w-3xl mx-auto">
          <div className="mb-20 text-center">
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4">
              Questions Fréquentes
            </p>
            <div className="section-divider mx-auto mb-6" />
            <h2 className="font-heading text-5xl font-light text-white">
              Tout Ce Que Vous
              <br />
              <span className="italic gold">Voulez Savoir</span>
            </h2>
          </div>

          <div className="space-y-px">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-[#0a0a0a] border border-[#1f1f1f]">
                <button
                  className="w-full flex items-center justify-between px-8 py-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-heading text-lg font-light text-white pr-8">
                    {faq.q}
                  </span>
                  <span
                    className={`gold text-xl transition-transform duration-300 flex-shrink-0 ${
                      openFaq === i ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-8 pb-6">
                    <p className="text-[#6b6b6b] text-sm leading-relaxed font-light">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-32 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-start">
          <div>
            <p className="text-xs tracking-[0.4em] uppercase text-[#c9a84c] mb-4">
              Parlons-Nous
            </p>
            <div className="section-divider mb-6" />
            <h2 className="font-heading text-5xl md:text-6xl font-light text-white mb-8">
              Votre Prochaine
              <br />
              <span className="italic gold">Grande Vente</span>
              <br />
              Commence Ici.
            </h2>
            <p className="text-[#6b6b6b] text-sm leading-relaxed mb-12 font-light">
              Réservez une consultation gratuite de 30 minutes. Nous analysons
              votre situation et vous proposons une stratégie concrète — sans
              engagement.
            </p>

            <div className="space-y-6">
              {[
                { label: "Tanger, Maroc", icon: "◎" },
                { label: "+212 6XX XXX XXX", icon: "◈" },
                { label: "contact@esolution-realty.ma", icon: "◉" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <span className="gold text-lg">{c.icon}</span>
                  <span className="text-[#6b6b6b] text-sm font-light">
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="card-dark p-10">
            {formStatus === "sent" ? (
              <div className="text-center py-12">
                <span className="text-5xl gold block mb-6">◈</span>
                <h3 className="font-heading text-3xl font-light text-white mb-4">
                  Message Envoyé
                </h3>
                <p className="text-[#6b6b6b] text-sm font-light">
                  Nous vous répondrons dans les 24 heures.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {[
                  {
                    id: "name",
                    label: "Nom Complet",
                    type: "text",
                    placeholder: "Votre nom",
                  },
                  {
                    id: "email",
                    label: "Email",
                    type: "email",
                    placeholder: "votre@email.com",
                  },
                  {
                    id: "phone",
                    label: "Téléphone",
                    type: "tel",
                    placeholder: "+212 6XX XXX XXX",
                  },
                ].map((field) => (
                  <div key={field.id}>
                    <label className="block text-xs tracking-[0.2em] uppercase text-[#6b6b6b] mb-3">
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id as keyof typeof formData]}
                      onChange={(e) =>
                        setFormData({ ...formData, [field.id]: e.target.value })
                      }
                      className="w-full bg-[#0a0a0a] border border-[#1f1f1f] px-4 py-3 text-sm text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c] transition-colors font-light"
                      required
                    />
                  </div>
                ))}

                <div>
                  <label className="block text-xs tracking-[0.2em] uppercase text-[#6b6b6b] mb-3">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Décrivez votre projet..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-[#0a0a0a] border border-[#1f1f1f] px-4 py-3 text-sm text-white placeholder-[#3a3a3a] focus:outline-none focus:border-[#c9a84c] transition-colors resize-none font-light"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="w-full btn-gold px-8 py-4 text-xs tracking-[0.15em] disabled:opacity-50"
                >
                  {formStatus === "sending"
                    ? "Envoi en cours..."
                    : "Envoyer le Message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1f1f1f] py-12 px-6 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl font-light tracking-widest text-white">
              E<span className="gold">-</span>SOLUTION
            </span>
            <span className="text-xs tracking-[0.3em] text-[#6b6b6b] uppercase font-light">
              Realty
            </span>
          </div>

          <p className="text-[#3a3a3a] text-xs tracking-wider">
            © {new Date().getFullYear()} E-Solution Realty. Tanger, Maroc. Tous droits réservés.
          </p>

          <div className="flex gap-8">
            {["Services", "Processus", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-xs tracking-widest uppercase text-[#3a3a3a] hover:text-[#c9a84c] transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </main>
  );
}
