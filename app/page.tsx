"use client";

import Image from "next/image";
import React from "react";
import { motion, useAnimationFrame, useScroll, useTransform } from "framer-motion";

const keyframes = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes typing {
    from {
      width: 0;
      opacity: 0;
    }
    to {
      width: 100%;
      opacity: 1;
    }
  }

  @keyframes blink {
    0%, 49% {
      border-right: 2px solid #a78bfa;
    }
    50%, 100% {
      border-right: 2px solid transparent;
    }
  }

  @keyframes glow {
    0%, 100% {
      border-color: #1e1040;
    }
    50% {
      border-color: #a78bfa;
    }
  }

  @keyframes themeToggle {
    from {
      transform: rotate(0deg) scale(1);
      opacity: 1;
    }
    to {
      transform: rotate(360deg) scale(1);
      opacity: 1;
    }
  }

  @keyframes badgePulse {
    0% {
      box-shadow: 0 0 0 rgba(167, 139, 250, 0);
      transform: translateY(0);
    }
    50% {
      box-shadow: 0 0 12px rgba(167, 139, 250, 0.35);
      transform: translateY(-1px);
    }
    100% {
      box-shadow: 0 0 0 rgba(167, 139, 250, 0);
      transform: translateY(0);
    }
  }

  @keyframes underlineReveal {
    from {
      scaleX(0);
      transformOrigin: left;
    }
    to {
      scaleX(1);
      transformOrigin: left;
    }
  }

  @keyframes waveSlide {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes glowPulse {
    0%, 100% {
      box-shadow: 0 0 0 rgba(167, 139, 250, 0), inset 0 0 0 1px rgba(167, 139, 250, 0.2);
    }
    50% {
      box-shadow: 0 0 20px rgba(167, 139, 250, 0.4), inset 0 0 0 1px rgba(167,139,250,0.5);
    }
  }

  @keyframes featurePulse {
    0%, 100% {
      box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.4);
    }
    50% {
      box-shadow: 0 0 0 8px rgba(167, 139, 250, 0);
    }
  }

  @keyframes globeRotate {
    from {
      transform: rotateZ(0deg);
    }
    to {
      transform: rotateZ(360deg);
    }
  }

  @keyframes floatUp {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-8px);
    }
  }

  @keyframes pulseGlow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(167, 139, 250, 0.2);
    }
    50% {
      box-shadow: 0 0 40px rgba(167, 139, 250, 0.4);
    }
  }

  @keyframes atmospherePulse {
    0%, 100% { opacity: 0.6; transform: translate(-50%, -50%) scale(1); }
    50%       { opacity: 1;   transform: translate(-50%, -50%) scale(1.06); }
  }

  @keyframes ringShimmer {
    0%   { opacity: 0.25; }
    50%  { opacity: 0.55; }
    100% { opacity: 0.25; }
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const darkTheme = {
  bg: "#08060f",
  bgHero: "linear-gradient(180deg, rgba(30,16,64,0.5) 0%, transparent 100%)",
  text: "#ede9fe",
  textSecondary: "#7c6fa0",
  accentLight: "#a78bfa",
  accentDark: "#1e1040",
  cardBg: "#0f0c1e",
  btnBg: "#140f24",
};


const getThemeStyles = () => {
  const theme = darkTheme;
  return {
    page: { background: theme.bg, minHeight: "100vh", color: theme.text, fontFamily: "DM Sans, sans-serif", fontSize: "15px", lineHeight: "1.7", transition: "background 0.3s ease, color 0.3s ease" },
    wrap: { maxWidth: "900px", margin: "0 auto", padding: "0 28px 100px" },
    nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", marginBottom: "52px", position: "sticky" as const, top: 0, zIndex: 100, background: "rgba(8,6,15,0.88)", backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)", borderBottom: `1px solid ${"rgba(167,139,250,0.08)"}`, marginLeft: "-28px", marginRight: "-28px", transition: "background 0.3s ease" },
    navName: { fontFamily: "DM Serif Display, serif", fontSize: "16px", color: theme.text, letterSpacing: "0.01em" },
    navLinks: { display: "flex", gap: "24px", alignItems: "center" },
    navLink: { fontSize: "13px", color: theme.textSecondary, textDecoration: "none", letterSpacing: "0.04em", transition: "color 0.2s ease", cursor: "pointer" },
    navLinkHover: { color: theme.accentLight },
    themeToggle: { background: theme.btnBg, border: `1px solid ${theme.accentDark}`, borderRadius: "8px", padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s ease", width: "36px", height: "36px" },
    themeToggleHover: { borderColor: theme.accentLight },
    themeToggleIcon: { width: "20px", height: "20px", display: "flex", alignItems: "center", justifyContent: "center" },
    hero: { display: "flex", gap: "40px", alignItems: "center", marginBottom: "64px", animation: "fadeIn 0.8s ease-out", padding: "40px 36px", borderRadius: "20px", background: theme.bgHero, border: `1px solid ${"rgba(30,16,64,0.5)"}` },
    avatarRing: { width: "156px", height: "156px", borderRadius: "50%", flexShrink: 0, padding: "2px", background: "linear-gradient(135deg, #7c3aed 0%, #1e1040 100%)" },
    avatar: { width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden" as const, transition: "transform 0.3s ease" },
    avatarHover: { transform: "scale(1.04)" },
    h1: { fontFamily: "DM Serif Display, serif", fontSize: "38px", fontWeight: 400, marginBottom: "6px", lineHeight: "1.15", color: theme.text, letterSpacing: "-0.01em" },
    subtitle: { fontSize: "13px", color: theme.accentLight, marginBottom: "14px", letterSpacing: "0.01em" },
    bio: { color: theme.textSecondary, fontSize: "14px", maxWidth: "480px", marginBottom: "22px", lineHeight: "1.75", animation: "fadeIn 0.8s ease-out" },
    socialRow: { display: "flex", gap: "10px" },
    socialBtn: { fontSize: "12px", padding: "7px 16px", border: `1px solid ${theme.accentDark}`, borderRadius: "8px", color: theme.textSecondary, textDecoration: "none", background: "rgba(20,15,36,0.6)", transition: "all 0.2s ease", cursor: "pointer", fontWeight: 500 },
    socialBtnHover: { borderColor: theme.accentLight, color: theme.accentLight },
    sectionTitle: { fontFamily: "DM Serif Display, serif", fontSize: "24px", fontWeight: 400, color: theme.text, marginBottom: "28px", paddingBottom: "12px", borderBottom: `1px solid rgba(30,16,64,0.8)`, animation: "slideInLeft 0.7s ease-out", transition: "border-color 0.3s ease" },
    card: { background: theme.cardBg, border: `1px solid ${theme.accentDark}`, borderRadius: "14px", padding: "20px 22px", marginBottom: "14px", transition: "border-color 0.2s ease, transform 0.2s ease", animation: "fadeIn 0.6s ease-out" },
    cardHover: { borderColor: `${"rgba(167,139,250,0.4)"}`, transform: "translateY(-2px)" },
    cardHeader: { display: "flex", alignItems: "center", gap: "14px", marginBottom: "10px" },
    logo: { width: "38px", height: "38px", borderRadius: "10px", background: theme.btnBg, border: `1px solid ${theme.accentDark}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "10px", fontWeight: 600, color: theme.accentLight, flexShrink: 0, overflow: "hidden" as const },
    cardTitle: { fontSize: "15px", fontWeight: 600, color: theme.text },
    cardCompany: { fontSize: "13px", color: theme.accentLight },
    cardMeta: { fontSize: "12px", color: theme.textSecondary, marginBottom: "10px" },
    bullet: { fontSize: "13px", color: theme.textSecondary, marginBottom: "4px" },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "28px" },
    skillCard: { background: theme.cardBg, border: `1px solid ${theme.accentDark}`, borderRadius: "14px", padding: "24px 20px", textAlign: "center" as const, transition: "border-color 0.2s ease, transform 0.2s ease", animation: "fadeIn 0.6s ease-out" },
    skillCardHover: { borderColor: `${"rgba(167,139,250,0.4)"}`, transform: "translateY(-3px)" },
    skillIcon: { width: "60px", height: "60px", margin: "0 auto 14px", position: "relative" as const },
    skillTitle: { fontSize: "14px", fontWeight: 500, color: theme.text, marginBottom: "8px" },
    skillDesc: { fontSize: "12px", color: theme.textSecondary, lineHeight: "1.55" },
    projGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" },
    projCard: { background: theme.cardBg, border: `1px solid ${theme.accentDark}`, borderRadius: "14px", padding: "20px", transition: "border-color 0.2s ease, transform 0.2s ease", animation: "fadeIn 0.6s ease-out" },
    projCardHover: { borderColor: `${"rgba(167,139,250,0.4)"}`, transform: "translateY(-3px)" },
    projTitleRow: { display: "flex", alignItems: "center", gap: "8px" },
    projTitle: { fontSize: "14px", fontWeight: 600, color: theme.text, marginBottom: "5px" },
    featuredBadge: { fontSize: "10px", padding: "2px 8px", borderRadius: "999px", border: `1px solid ${theme.accentLight}`, color: theme.accentLight, letterSpacing: "0.06em", textTransform: "uppercase" as const, transition: "all 0.2s ease" },
    featuredBadgeHover: { animation: "badgePulse 0.8s ease-in-out" },
    projDesc: { fontSize: "13px", color: theme.textSecondary, marginBottom: "12px", lineHeight: "1.6" },
    tagsRow: { display: "flex", flexWrap: "wrap" as const, gap: "5px", marginBottom: "12px" },
    tag: { fontSize: "10px", padding: "3px 9px", background: `${"rgba(139,92,246,0.1)"}`, border: `1px solid ${"rgba(139,92,246,0.3)"}`, borderRadius: "6px", color: "#c4b5fd", transition: "all 0.2s ease", fontWeight: 500 },
    tagHover: { background: `${"rgba(124,58,237,0.15)"}`, borderColor: `${"rgba(167,139,250,0.5)"}` },
    linksRow: { display: "flex", gap: "8px" },
    linkBtn: { fontSize: "11px", color: theme.textSecondary, textDecoration: "none", padding: "5px 12px", border: `1px solid ${theme.accentDark}`, borderRadius: "8px", transition: "all 0.2s ease", fontWeight: 500 },
    linkBtnHover: { borderColor: theme.accentLight, color: theme.accentLight },
    stackGroup: { marginBottom: "20px", animation: "fadeIn 0.6s ease-out" },
    stackLabel: { fontSize: "11px", color: theme.textSecondary, letterSpacing: "0.08em", textTransform: "uppercase" as const, marginBottom: "10px", fontWeight: 600 },
    stackBadges: { display: "flex", flexWrap: "wrap" as const, gap: "7px" },
    badge: { fontSize: "12px", padding: "5px 13px", background: theme.cardBg, border: `1px solid ${theme.accentDark}`, borderRadius: "8px", color: theme.text, transition: "border-color 0.2s ease, color 0.2s ease", fontWeight: 500 },
    badgeHover: { borderColor: theme.accentLight, color: theme.accentLight },
    footer: { paddingTop: "48px", borderTop: `1px solid ${"rgba(167,139,250,0.08)"}`, transition: "border-color 0.3s ease" },
  };
};

const getSoftSkills = () => [
  { title: "Teamwork", desc: "Building together toward shared goals, across technical and non-technical teams.", icon: "team_9942529.png" },
  { title: "Motivation", desc: "Self-driven to keep learning and building, even outside the classroom.", icon: "self-motivation_17379187.png" },
  { title: "Adaptability", desc: "Comfortable switching between coding, leadership, and public-facing roles.", icon: "adaptation_18224723.png" },
  { title: "Public Relations", desc: "Representing organizations clearly and professionally to diverse audiences.", icon: "public-relation_17495092.png" },
  { title: "Strategic Thinking", desc: "Connecting day-to-day work to long-term impact and bigger picture goals.", icon: "game_14544309.png" },
  { title: "Cognitive Flexibility", desc: "Shifting fluidly between deep technical focus and high-level people work.", icon: "flexibility_18514241.png" },
];

// ============ ABOUT SECTION COMPONENTS ============

// Full dot-matrix planet for Location card
const Planet = ({ size = 190 }: { size?: number }) => {
  const cx = size / 2;
  const cy = size / 2;
  const planetR = size * 0.4;
  const latSteps = 20;
  const lonSteps = 32;

  const dots: Array<{ px: number; py: number; depth: number; land: boolean }> = [];

  // Rough continent masks [lat-norm 0-1, lon-norm 0-1, spread]
  const continents = [
    [0.55, 0.52, 0.16], [0.45, 0.42, 0.13], // Europe/Africa
    [0.52, 0.18, 0.18], [0.65, 0.22, 0.13], // Americas
    [0.58, 0.72, 0.20], [0.50, 0.82, 0.14], // Asia
    [0.30, 0.78, 0.10],                      // Australia
  ];

  for (let la = 0; la <= latSteps; la++) {
    const phi = (Math.PI * la) / latSteps - Math.PI / 2;
    const latN = la / latSteps;
    for (let lo = 0; lo < lonSteps; lo++) {
      const theta = (2 * Math.PI * lo) / lonSteps;
      const lonN = lo / lonSteps;
      const x = Math.cos(phi) * Math.cos(theta);
      const y = Math.cos(phi) * Math.sin(theta);
      const z = Math.sin(phi);
      const land = continents.some(([cla, clo, sp]) =>
        Math.hypot(latN - cla, lonN - clo) < (sp as number)
      );
      dots.push({ px: cx + x * planetR, py: cy - z * planetR, depth: y, land });
    }
  }
  dots.sort((a, b) => a.depth - b.depth);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <radialGradient id="planetBase" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#2563eb" />
          <stop offset="50%"  stopColor="#0f2560" />
          <stop offset="100%" stopColor="#020b1f" />
        </radialGradient>
        <radialGradient id="planetAtmo" cx="50%" cy="50%" r="50%">
          <stop offset="74%" stopColor="transparent" />
          <stop offset="88%" stopColor="rgba(96,165,250,0.28)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="specular" cx="36%" cy="30%" r="35%">
          <stop offset="0%"   stopColor="rgba(255,255,255,0.12)" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>
        <radialGradient id="nightSide" cx="70%" cy="60%" r="55%">
          <stop offset="0%"   stopColor="transparent" />
          <stop offset="100%" stopColor="rgba(0,0,20,0.55)" />
        </radialGradient>
      </defs>
      {/* Base sphere */}
      <circle cx={cx} cy={cy} r={planetR} fill="url(#planetBase)" />
      {/* Dot matrix */}
      {dots.map((d, i) => {
        const t = (d.depth + 1) / 2;
        const r  = d.land ? 1.5 + t * 0.9 : 0.8 + t * 0.6;
        const op = d.land ? 0.35 + t * 0.65 : 0.08 + t * 0.45;
        return (
          <circle key={i} cx={d.px} cy={d.py} r={r}
            fill={d.land ? "#86efac" : "#c4b5fd"} opacity={op} />
        );
      })}
      {/* Night-side shadow */}
      <circle cx={cx} cy={cy} r={planetR} fill="url(#nightSide)" />
      {/* Specular highlight */}
      <circle cx={cx} cy={cy} r={planetR} fill="url(#specular)" />
      {/* Atmosphere ring */}
      <circle cx={cx} cy={cy} r={size * 0.455} fill="url(#planetAtmo)" />
    </svg>
  );
};

// One orbiting moon icon — DOM-driven animation (no React re-renders)
const OrbitingMoon = ({ src, name, index, total }: {
  src: string; name: string; index: number; total: number;
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const a = 168;   // semi-major axis px — wider for full-width card
  const b = 58;    // semi-minor axis px  (gives ~70° tilt illusion)
  const period = 22000; // ms per orbit
  const phase = (index / total) * Math.PI * 2;

  useAnimationFrame((t) => {
    if (!ref.current) return;
    const angle = phase + (t / period) * Math.PI * 2;
    const depth = Math.sin(angle);       // -1=far, +1=close
    const px = Math.cos(angle) * a;
    const py = depth * b;
    const s  = 0.65 + 0.35 * ((depth + 1) / 2);
    const op = 0.4  + 0.6  * ((depth + 1) / 2);
    ref.current.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px)) scale(${s})`;
    ref.current.style.opacity   = String(op);
    ref.current.style.zIndex    = String(depth > 0 ? 10 : 3);
  });

  return (
    <div ref={ref} title={name} style={{
      position: "absolute", top: "50%", left: "50%",
      willChange: "transform, opacity",
    }}>
      <div style={{
        width: "38px", height: "38px", borderRadius: "10px",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.18)",
        display: "flex", alignItems: "center", justifyContent: "center",
        backdropFilter: "blur(6px)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.6)",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={name} style={{ width: "26px", height: "26px", objectFit: "contain" }} />
      </div>
    </div>
  );
};

// Photo Card - Large left card
const PhotoCard = ({ }: { }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, delay: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    style={{
      gridColumn: "1 / 2",
      gridRow: "1 / 3",
      borderRadius: "20px",
      overflow: "hidden",
      position: "relative",
      height: "100%",
      minHeight: "460px",
      backgroundImage: "url(/portfolio.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center 60%",
    }}
  >
    {/* Animated gradient border */}
    <motion.div
      animate={{ opacity: [0.4, 0.9, 0.4] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", inset: 0, borderRadius: "20px",
        boxShadow: "inset 0 0 0 1px rgba(167,139,250,0.25)",
        pointerEvents: "none", zIndex: 10,
      }}
    />

    {/* Scrim — heavier at bottom, subtle at top */}
    <div style={{
      position: "absolute", inset: 0,
      background: "linear-gradient(to top, rgba(5,3,14,0.98) 0%, rgba(5,3,14,0.6) 40%, rgba(5,3,14,0.15) 70%, rgba(5,3,14,0.0) 100%)",
    }} />

    {/* Available badge */}
    <div style={{
      position: "absolute", top: "20px", left: "20px", zIndex: 5,
      display: "flex", alignItems: "center", gap: "7px",
      padding: "6px 14px", borderRadius: "999px",
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.1)",
    }}>
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 2.2, repeat: Infinity }}
        style={{ width: "7px", height: "7px", borderRadius: "50%", background: "#22c55e", display: "inline-block", flexShrink: 0 }}
      />
      <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.88)", fontWeight: 600, letterSpacing: "0.04em" }}>
        Available for work
      </span>
    </div>

    {/* Bottom content */}
    <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 28px", zIndex: 5 }}>
      {/* Thin accent line */}
      <div style={{ width: "32px", height: "2px", background: "rgba(167,139,250,0.7)", borderRadius: "1px", marginBottom: "14px" }} />
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em", color: "rgba(167,139,250,0.75)", textTransform: "uppercase", marginBottom: "8px" }}>
        Software Engineer
      </p>
      <h2 style={{ fontSize: "34px", fontWeight: 700, marginBottom: "12px", fontFamily: "DM Serif Display, serif", color: "#fff", lineHeight: 1.05 }}>
        Stefan<br />Perovski
      </h2>
      <p style={{ fontSize: "13px", color: "rgba(148,163,184,0.85)", lineHeight: "1.7", maxWidth: "300px" }}>
        Software Engineering student at FINKI. Building impactful software and driving digital transformation.
      </p>
    </div>
  </motion.div>
);

// Expertise Card — editorial numbered list
const ExpertiseCard = ({ }: { }) => {
  const skills = [
    { name: "Full-Stack Development", category: "Engineering" },
    { name: "REST API Design",        category: "Backend"     },
    { name: "Spring Boot",            category: "Backend"     },
    { name: "React",                  category: "Frontend"    },
    { name: "DevOps & CI/CD",         category: "Ops"         },
    { name: "Database Design",        category: "Data"        },
  ];
  const cardBg = "#0c0918";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        gridColumn: "2 / 4",
        gridRow: "1 / 2",
        borderRadius: "20px",
        border: `1px solid ${"rgba(255,255,255,0.06)"}`,
        background: cardBg,
        position: "relative",
        overflow: "hidden",
        padding: "24px 28px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top accent bar */}
      <div style={{
        position: "absolute", top: 0, left: "28px", right: "28px", height: "1px",
        background: "linear-gradient(to right, rgba(167,139,250,0.5), transparent)",
      }} />

      {/* Header */}
      <p style={{
        fontSize: "10px", fontWeight: 700, letterSpacing: "0.14em",
        color: "#4a3878", textTransform: "uppercase",
        marginBottom: "18px",
      }}>
        Core Skills
      </p>

      {/* Numbered skill rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {skills.map((skill, idx) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.4, delay: 0.05 + idx * 0.06, ease: "easeOut" }}
            viewport={{ once: true }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 0",
              borderBottom: idx < skills.length - 1
                ? `1px solid ${"rgba(255,255,255,0.05)"}`
                : "none",
              cursor: "default",
            }}
          >
            {/* Left: number + name */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <span style={{
                fontSize: "11px", fontWeight: 700, fontFamily: "DM Serif Display, serif",
                color: "rgba(167,139,250,0.35)",
                letterSpacing: "0.04em", minWidth: "22px",
              }}>
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontSize: "15px", fontWeight: 600,
                color: "#c8d8f0",
                letterSpacing: "-0.01em",
                fontFamily: "DM Serif Display, serif",
              }}>
                {skill.name}
              </span>
            </div>

            {/* Right: category tag */}
            <span style={{
              fontSize: "10px", fontWeight: 700, letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(167,139,250,0.4)",
              padding: "3px 10px", borderRadius: "999px",
              border: `1px solid ${"rgba(167,139,250,0.12)"}`,
              whiteSpace: "nowrap",
            }}>
              {skill.category}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Location Card — full planet hero
const LocationCard = ({ }: { }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: 0.2 }}
    viewport={{ once: true, amount: 0.2 }}
    style={{
      gridColumn: "2 / 3",
      gridRow: "2 / 3",
      borderRadius: "20px",
      border: "1px solid rgba(167,139,250,0.12)",
      background: "#07040e",
      overflow: "hidden",
      position: "relative",
      minHeight: "220px",
      display: "flex",
      flexDirection: "column",
    }}
  >
    {/* Star field */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      backgroundImage: `
        radial-gradient(1px 1px at 8% 18%, rgba(255,255,255,0.7) 0%, transparent 100%),
        radial-gradient(1px 1px at 92% 10%, rgba(255,255,255,0.5) 0%, transparent 100%),
        radial-gradient(1.5px 1.5px at 50% 70%, rgba(255,255,255,0.4) 0%, transparent 100%),
        radial-gradient(1px 1px at 75% 85%, rgba(255,255,255,0.6) 0%, transparent 100%),
        radial-gradient(1px 1px at 20% 90%, rgba(255,255,255,0.35) 0%, transparent 100%),
        radial-gradient(1px 1px at 62% 30%, rgba(255,255,255,0.5) 0%, transparent 100%)
      `,
    }} />

    {/* Text overlay top-left */}
    <div style={{ position: "absolute", top: "22px", left: "24px", zIndex: 5 }}>
      <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#4a3878", textTransform: "uppercase", marginBottom: "8px" }}>
        Based in
      </p>
      <p style={{ fontSize: "20px", fontWeight: 700, color: "#e2e8f0", fontFamily: "DM Serif Display, serif", lineHeight: 1.1 }}>
        Skopje,<br />Macedonia
      </p>
    </div>

    {/* Open to remote badge — bottom left */}
    <div style={{
      position: "absolute", bottom: "18px", left: "24px", zIndex: 5,
      display: "flex", alignItems: "center", gap: "6px",
    }}>
      <motion.span
        animate={{ opacity: [1, 0.4, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#22c55e", display: "inline-block" }}
      />
      <span style={{ fontSize: "11px", color: "#6b6590", fontWeight: 500 }}>Open to remote worldwide</span>
    </div>

    {/* Planet — right side */}
    <div style={{
      position: "absolute", right: "-20px", top: "50%",
      transform: "translateY(-50%)",
      zIndex: 2,
      animation: "atmospherePulse 6s ease-in-out infinite",
    }}>
      <Planet size={160} />
    </div>

    {/* Scrim so text stays readable */}
    <div style={{
      position: "absolute", inset: 0, pointerEvents: "none",
      background: "linear-gradient(to right, rgba(7,4,14,0.85) 30%, rgba(7,4,14,0.1) 70%)",
    }} />
  </motion.div>
);

// Contact CTA Card
const ContactCard = ({ }: { }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("stefan.perovski20@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        gridColumn: "3 / 4",
        gridRow: "2 / 3",
        borderRadius: "20px",
        border: "1px solid rgba(124,58,237,0.25)",
        background: "linear-gradient(140deg, #5b21b6 0%, #7c3aed 40%, #a855f7 100%)",
        padding: "28px 26px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        minHeight: "220px",
      }}
    >
      {/* Decorative orb */}
      <div style={{
        position: "absolute", top: "-40px", right: "-40px",
        width: "180px", height: "180px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-60px", left: "-20px",
        width: "200px", height: "200px", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div style={{ zIndex: 1, marginBottom: "24px" }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", marginBottom: "10px" }}>
          Get in touch
        </p>
        <h3 style={{ fontSize: "26px", fontWeight: 700, fontFamily: "DM Serif Display, serif", color: "#fff", lineHeight: 1.15, marginBottom: "10px" }}>
          Let&apos;s work<br />together.
        </h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", lineHeight: "1.6" }}>
          Open to collaborations, freelance & full-time opportunities.
        </p>
      </div>

      <motion.button
        onClick={handleCopy}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.97 }}
        style={{
          zIndex: 1,
          padding: "11px 22px",
          borderRadius: "12px",
          background: "rgba(255,255,255,0.15)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.25)",
          color: "#fff",
          fontSize: "13px",
          fontWeight: 600,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          letterSpacing: "0.01em",
          transition: "background 0.2s ease",
        }}
      >
        {copied ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
            <span>Copied!</span>
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 4h11l5 5v11a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" /><polyline points="14 2 14 8 20 8" />
            </svg>
            <span>Copy Email</span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

// Tech Stack Card — Saturn ring system
const TechStackCard = ({ }: { }) => {
  const techStack = [
    { name: "TypeScript",  src: "/Icons/ts.jpeg" },
    { name: "JavaScript",  src: "/Icons/js.webp" },
    { name: "Python",      src: "/Icons/py.png" },
    { name: "Java",        src: "/Icons/java-logo-11609365784e4gmvr3iyr.png" },
    { name: "React",       src: "/Icons/png-clipart-react-javascript-angularjs-ionic-github-text-logo-thumbnail.png" },
    { name: "Spring Boot", src: "/Icons/Spring_Boot.svg.png" },
    { name: "Docker",      src: "/Icons/docker.png" },
    { name: "Azure",       src: "/Icons/northware-microsoft-azure-logo.png.webp" },
    { name: "PostgreSQL",  src: "/Icons/Postgresql_elephant.svg.png" },
    { name: "Git",         src: "/Icons/Git_icon.svg.png" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{
        gridColumn: "1 / 4",
        gridRow: "3 / 4",
        borderRadius: "20px",
        border: "1px solid rgba(167,139,250,0.1)",
        background: "#07040e",
        overflow: "hidden",
        position: "relative",
        minHeight: "360px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Star field */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          radial-gradient(1px 1px at 12% 22%, rgba(255,255,255,0.65) 0%, transparent 100%),
          radial-gradient(1px 1px at 80% 8%,  rgba(255,255,255,0.5)  0%, transparent 100%),
          radial-gradient(1.5px 1.5px at 35% 75%, rgba(255,255,255,0.4) 0%, transparent 100%),
          radial-gradient(1px 1px at 90% 60%, rgba(255,255,255,0.55) 0%, transparent 100%),
          radial-gradient(1px 1px at 55% 15%, rgba(255,255,255,0.45) 0%, transparent 100%),
          radial-gradient(1px 1px at 5%  85%, rgba(255,255,255,0.4)  0%, transparent 100%),
          radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.35) 0%, transparent 100%),
          radial-gradient(1px 1px at 25% 45%, rgba(255,255,255,0.3)  0%, transparent 100%)
        `,
      }} />

      {/* Label */}
      <div style={{ position: "absolute", top: "24px", left: "26px", zIndex: 10 }}>
        <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", color: "#4a3878", textTransform: "uppercase", marginBottom: "4px" }}>
          Tech Stack
        </p>
        <p style={{ fontSize: "16px", fontWeight: 700, color: "#e2e8f0", fontFamily: "DM Serif Display, serif" }}>
          Technologies
        </p>
      </div>

      {/* Orbit system — centered in card */}
      <div style={{ flex: 1, position: "relative", display: "flex", alignItems: "center", justifyContent: "center" }}>

        {/* Back-half ring — z-index 2 (behind planet) */}
        <svg style={{ position: "absolute", zIndex: 2, pointerEvents: "none" }} width="380" height="140" viewBox="0 0 380 140">
          <ellipse cx="190" cy="70" rx="180" ry="62"
            fill="none" stroke="rgba(96,165,250,0.28)" strokeWidth="1.5"
            strokeDasharray={`${Math.PI * 180} ${Math.PI * 180}`}
            strokeDashoffset={`${Math.PI * 180 / 2}`}
            style={{ animation: "ringShimmer 4s ease-in-out infinite" }}
          />
        </svg>

        {/* Planet — z-index 5 */}
        <div style={{ position: "absolute", zIndex: 5, pointerEvents: "none" }}>
          {/* Atmosphere pulse */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            width: "100px", height: "100px", borderRadius: "50%",
            marginLeft: "-50px", marginTop: "-50px",
            background: "radial-gradient(circle, transparent 38%, rgba(96,165,250,0.22) 60%, transparent 75%)",
            animation: "atmospherePulse 3s ease-in-out infinite",
          }} />
          {/* Sphere */}
          <div style={{
            width: "72px", height: "72px", borderRadius: "50%",
            background: "radial-gradient(circle at 35% 30%, #93c5fd 0%, #2563eb 35%, #1e3a8a 65%, #020b1f 100%)",
            boxShadow: "0 0 32px rgba(59,130,246,0.55), 0 0 64px rgba(139,92,246,0.2)",
            position: "relative",
          }} />
        </div>

        {/* Front-half ring — z-index 8 (in front of planet) */}
        <svg style={{ position: "absolute", zIndex: 8, pointerEvents: "none" }} width="380" height="140" viewBox="0 0 380 140">
          <ellipse cx="190" cy="70" rx="180" ry="62"
            fill="none" stroke="rgba(96,165,250,0.45)" strokeWidth="2"
            strokeDasharray={`${Math.PI * 180} ${Math.PI * 180}`}
            strokeDashoffset="0"
            style={{ animation: "ringShimmer 4s ease-in-out infinite" }}
          />
        </svg>

        {/* Orbiting moons */}
        {techStack.map((tech, idx) => (
          <OrbitingMoon
            key={tech.name}
            src={tech.src}
            name={tech.name}
            index={idx}
            total={techStack.length}
          />
        ))}
      </div>

      {/* Bottom label row */}
      <div style={{
        position: "absolute", bottom: "18px", left: 0, right: 0,
        display: "flex", justifyContent: "center",
        zIndex: 10, pointerEvents: "none",
      }}>
        <p style={{ fontSize: "10px", color: "#2d1f4a", letterSpacing: "0.08em" }}>
          Hover an icon to see the name
        </p>
      </div>
    </motion.div>
  );
};

// Animated Section Title Component
const AnimatedSectionTitle = ({ children, index }: { children: React.ReactNode; index?: string }) => {
  const theme = darkTheme;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ marginBottom: "36px", position: "relative" }}
    >
      {index && (
        <span style={{
          display: "block",
          fontSize: "11px", fontWeight: 700, letterSpacing: "0.14em",
          color: "rgba(167,139,250,0.5)",
          textTransform: "uppercase", marginBottom: "6px",
        }}>
          {index}
        </span>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <h2 style={{
          fontFamily: "DM Serif Display, serif",
          fontSize: "28px", fontWeight: 400,
          color: theme.text, lineHeight: 1.1,
        }}>
          {children}
        </h2>
        {/* Expanding accent line */}
        <motion.div
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          viewport={{ once: true }}
          style={{
            flex: 1, height: "1px",
            background: "linear-gradient(to right, rgba(167,139,250,0.5), transparent)",
            transformOrigin: "left",
          }}
        />
      </div>
    </motion.div>
  );
};

// Experience Card — timeline style
const ExperienceCard = ({
  id: _id,
  logo: _logo,
  title,
  company,
  meta,
  bullets,
  isLast,
}: {
  id: string; logo: string; title: string; company: string;
  meta: string; bullets: string[]; isLast?: boolean;
}) => {
  const theme = darkTheme;
  const [open, setOpen] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.15 }}
      style={{ display: "flex", gap: "24px", paddingBottom: isLast ? 0 : "36px", position: "relative" }}
    >
      {/* Timeline spine */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, width: "20px" }}>
        <div style={{
          width: "12px", height: "12px", borderRadius: "50%", flexShrink: 0, marginTop: "4px",
          background: "#7c3aed",
          boxShadow: "0 0 0 3px rgba(139,92,246,0.2), 0 0 12px rgba(139,92,246,0.4)",
        }} />
        {!isLast && (
          <div style={{
            flex: 1, width: "1px", marginTop: "6px",
            background: "linear-gradient(to bottom, rgba(124,58,237,0.35), transparent)",
          }} />
        )}
      </div>

      {/* Card content */}
      <motion.div
        whileHover={{ y: -1 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onClick={() => bullets.length > 0 && setOpen(!open)}
        style={{
          flex: 1,
          background: "rgba(10,18,40,0.7)",
          backdropFilter: "blur(12px)",
          border: `1px solid ${"rgba(167,139,250,0.1)"}`,
          borderRadius: "16px",
          padding: "20px 24px",
          cursor: bullets.length > 1 ? "pointer" : "default",
          transition: "border-color 0.2s ease, background 0.2s ease",
        }}
      >
        {/* Date chip */}
        <span style={{
          display: "inline-block", fontSize: "10px", fontWeight: 600,
          letterSpacing: "0.08em", color: "rgba(167,139,250,0.7)",
          background: "rgba(139,92,246,0.1)",
          border: `1px solid ${"rgba(167,139,250,0.15)"}`,
          borderRadius: "999px", padding: "3px 10px", marginBottom: "10px",
        }}>
          {meta}
        </span>

        <div style={{ fontSize: "16px", fontWeight: 600, color: theme.text, marginBottom: "3px", lineHeight: 1.3 }}>
          {title}
        </div>
        <div style={{ fontSize: "13px", color: theme.accentLight, marginBottom: bullets.length > 0 ? "14px" : 0, fontWeight: 400 }}>
          {company}
        </div>

        {/* Bullets — always show first, expand rest */}
        {bullets.length > 0 && (
          <div>
            {(open ? bullets : bullets.slice(0, 1)).map((b, i) => (
              <div key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", marginBottom: "6px" }}>
                <span style={{ color: "rgba(167,139,250,0.5)", marginTop: "2px", fontSize: "12px", flexShrink: 0 }}>→</span>
                <span style={{ fontSize: "13px", color: theme.textSecondary, lineHeight: "1.65" }}>{b}</span>
              </div>
            ))}
            {bullets.length > 1 && (
              <button onClick={(e) => { e.stopPropagation(); setOpen(!open); }} style={{
                marginTop: "6px", fontSize: "11px", fontWeight: 600,
                color: "rgba(167,139,250,0.7)",
                background: "none", border: "none", cursor: "pointer", padding: 0,
                letterSpacing: "0.04em",
              }}>
                {open ? "Show less ↑" : `+${bullets.length - 1} more ↓`}
              </button>
            )}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

// Project Card
const ProjectCard = ({
  id: _id,
  title,
  description,
  tags,
  featured,
  logo,
  links,
}: {
  id: string; title: string; description: string; tags: string[];
  featured?: boolean; logo?: string; links: { label: string; href: string }[];
}) => {
  const theme = darkTheme;
  const [rotateX, setRotateX] = React.useState(0);
  const [rotateY, setRotateY] = React.useState(0);
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setRotateY((e.clientX - rect.left - cx) * 0.1);
    setRotateX((cy - (e.clientY - rect.top)) * 0.1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => { setRotateX(0); setRotateY(0); setIsHovered(false); }}
      onMouseEnter={() => setIsHovered(true)}
      style={{
        background: "rgba(10,18,40,0.8)",
        border: `1px solid ${isHovered
          ? ("rgba(167,139,250,0.35)")
          : ("rgba(167,139,250,0.1)")}`,
        borderRadius: "18px",
        padding: "24px",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(${isHovered ? "-3px" : "0"})`,
        transition: "border-color 0.25s ease, box-shadow 0.25s ease",
        position: "relative",
        overflow: "hidden",
        boxShadow: isHovered
          ? ("0 12px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(167,139,250,0.1)")
          : "none",
      }}
    >
      {/* Featured top bar */}
      {featured && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: "2px",
          background: "linear-gradient(90deg, #7c3aed, #c084fc, #7c3aed)",
          backgroundSize: "200% 100%",
          animation: "ringShimmer 3s linear infinite",
        }} />
      )}

      {/* Hover glow */}
      {isHovered && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none", borderRadius: "18px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(167,139,250,0.08) 0%, transparent 65%)",
        }} />
      )}

      {/* Logo + title row */}
      {logo && (
        <div style={{ marginBottom: "14px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logo}
            alt={title + " logo"}
            style={{
              width: "52px", height: "52px", borderRadius: "14px",
              objectFit: "cover",
              boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
              border: "1px solid rgba(167,139,250,0.15)",
            }}
          />
        </div>
      )}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "10px" }}>
        <h3 style={{ fontSize: "15px", fontWeight: 700, color: theme.text, lineHeight: 1.3 }}>{title}</h3>
        {featured && (
          <span style={{
            fontSize: "9px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "3px 9px", borderRadius: "999px",
            background: "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(168,85,247,0.15))",
            border: "1px solid rgba(167,139,250,0.3)",
            color: "#c4b5fd",
            whiteSpace: "nowrap", marginLeft: "10px", flexShrink: 0,
          }}>
            Featured
          </span>
        )}
      </div>

      <p style={{ fontSize: "13px", color: theme.textSecondary, marginBottom: "16px", lineHeight: "1.65" }}>
        {description}
      </p>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            fontSize: "10px", fontWeight: 600, padding: "4px 10px",
            background: "rgba(167,139,250,0.08)",
            border: `1px solid ${"rgba(167,139,250,0.18)"}`,
            borderRadius: "999px", color: "#c4b5fd",
            letterSpacing: "0.02em",
          }}>
            {tag}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        {links.map((link) => (
          <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: "5px",
              fontSize: "12px", fontWeight: 600, color: "#c4b5fd",
              textDecoration: "none", padding: "6px 14px",
              border: `1px solid ${"rgba(167,139,250,0.2)"}`,
              borderRadius: "8px",
              background: "rgba(124,58,237,0.06)",
              transition: "all 0.2s ease",
            }}
          >
            {link.label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </a>
        ))}
      </div>
    </motion.div>
  );
};

// Soft Skills Grid Card
const SkillCard = ({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: string;
}) => {
  const theme = darkTheme;
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true, amount: 0.2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: `${"rgba(17, 32, 64, 0.5)"}`,
        backdropFilter: "blur(8px)",
        border: `0.5px solid ${theme.accentDark}`,
        borderRadius: "12px",
        padding: "24px 20px",
        textAlign: "center",
        transition: "all 0.3s ease",
        boxShadow: isHovered
          ? `0 0 20px rgba(96, 165, 250, 0.25), 0 8px 32px rgba(96, 165, 250, 0.1)`
          : "none",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          margin: "0 auto 14px",
          position: "relative",
          filter: "brightness(0) invert(1)",
        }}
      >
        <Image src={`/Icons/${icon}`} alt={title} width={60} height={60} style={{ width: "100%", height: "100%", objectFit: "contain" }} />
      </div>
      <h3 style={{ fontSize: "14px", fontWeight: 500, color: theme.text, marginBottom: "8px" }}>{title}</h3>
      <p style={{ fontSize: "12px", color: theme.textSecondary, lineHeight: "1.5" }}>{description}</p>
    </motion.div>
  );
};


// ============ VIDEO HERO SECTION ============
const VideoHeroSection = () => {
  const { scrollY } = useScroll();

  // As user scrolls: text fades, video slightly zooms
  const textOpacity   = useTransform(scrollY, [0, 420], [1, 0]);
  const textY         = useTransform(scrollY, [0, 420], ["0%", "-12%"]);
  const videoScale    = useTransform(scrollY, [0, 700], [1, 1.1]);
  const overlayOpacity = useTransform(scrollY, [0, 500], [0, 0.55]);

  return (
    <div style={{ position: "sticky", top: 0, height: "100vh", zIndex: 0, overflow: "hidden" }}>
      {/* Video — subtle parallax zoom */}
      <motion.div style={{ position: "absolute", inset: 0, scale: videoScale }}>
        <video
          autoPlay muted loop playsInline preload="metadata"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source src="/herosection.mp4" type="video/mp4" />
        </video>
      </motion.div>

      {/* Permanent dark overlay — keeps text readable */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(to bottom, rgba(8,6,15,0.35) 0%, rgba(8,6,15,0.15) 45%, rgba(8,6,15,0.65) 80%, #08060f 100%)",
      }} />

      {/* Scroll-driven extra darkening */}
      <motion.div style={{
        position: "absolute", inset: 0, background: "#08060f", opacity: overlayOpacity, pointerEvents: "none",
      }} />

      {/* Centered headline — fades + lifts as user scrolls */}
      <motion.div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        opacity: textOpacity, y: textY,
        pointerEvents: "none",
      }}>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9, ease: "easeOut" }}
          style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.22em", color: "rgba(167,139,250,0.75)", textTransform: "uppercase", marginBottom: "22px" }}
        >
          Portfolio · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "DM Serif Display, serif",
            fontSize: "clamp(58px, 9vw, 118px)",
            fontWeight: 400, color: "#fff",
            textAlign: "center", lineHeight: 1.0,
            marginBottom: "24px",
            textShadow: "0 4px 60px rgba(0,0,0,0.6)",
            letterSpacing: "-0.01em",
          }}
        >
          Stefan<br />Perovski
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.9 }}
          style={{ fontSize: "15px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.06em", fontWeight: 300 }}
        >
          Software Engineer · Software Engineering @ FINKI
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        style={{
          position: "absolute", bottom: "44px", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "10px",
          pointerEvents: "none",
        }}
      >
        <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase" }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 9, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
        >
          <svg width="18" height="28" viewBox="0 0 18 28" fill="none">
            <rect x="1" y="1" width="16" height="22" rx="8" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
            <motion.rect
              x="7.5" y="5" width="3" height="5" rx="1.5"
              fill="rgba(255,255,255,0.55)"
              animate={{ y: [5, 11, 5] }}
              transition={{ duration: 2.0, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default function Home() {

  const S = getThemeStyles();
  const softSkills = getSoftSkills();


  const experienceData = [
    {
      id: "exp1",
      logo: "USA",
      title: "Chair of the Digitalization Committee",
      company: "University Student Assembly · Ss. Cyril and Methodius University",
      meta: "Mar 2026 – Present · 2 mos · Skopje",
      bullets: [
        "Selected as Chair of the Digitalisation Committee at the University Student Assembly of Ss. Cyril and Methodius University in Skopje.",
        "Leading initiatives to modernize and digitize university student processes and services.",
      ],
    },
    {
      id: "exp2",
      logo: "LINK",
      title: "Lead Organizer — LINKER Hackathon",
      company: "FINKI / University Student Assembly",
      meta: "Apr 18–19, 2026 · Skopje",
      bullets: [
        "Identified a real market gap between students and employers and structured it into a concrete, solvable 48-hour challenge brief",
        "Defined clear deliverable requirements and a 6-dimension evaluation framework covering relevance, innovation, functionality, UX/UI, impact, and presentation",
        "Coordinated stakeholders across participants, mentors, judges, and companies throughout the event lifecycle",
        "Produced structured documentation including the challenge brief, judging criteria, and event materials",
      ],
    },
    {
      id: "exp3",
      logo: "USA",
      title: "Multimedia and Public Relations",
      company: "University Student Assembly · Part-time",
      meta: "Nov 2025 – Present · 6 mos · Skopje",
      bullets: ["Managing multimedia content and public relations for the University Student Assembly."],
    },
  ];

  const projectsData = [
    {
      id: "proj1",
      title: "MedTech App",
      description: "Full-stack medical administration and patient management system built with React, Java Spring Boot, and PostgreSQL.",
      tags: ["React", "Java", "Spring Boot", "PostgreSQL"],
      featured: true,
      logo: "/MedTech.png",
      links: [{ label: "GitHub", href: "https://github.com/steff221/MedTech2.0.git" }],
    },
    {
      id: "proj2",
      title: "WaterWatch",
      description: "Early warning platform for river water anomalies using Sentinel-1/2 imagery, z-score analysis, and citizen crowdsourcing.",
      tags: ["Python", "Flask", "React", "Copernicus API"],
      featured: false,
      logo: undefined,
      links: [
        { label: "Live", href: "https://water-watch-2t91.vercel.app" },
        { label: "GitHub", href: "https://github.com/steff221/WaterWatch" },
      ],
    },
  ];


  return (
    <>
      <style>{keyframes}</style>
      <link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      {/* Video hero is sticky — content panel slides over it */}
      <VideoHeroSection />

      <main style={{
        ...S.page,
        position: "relative",
        zIndex: 1,
        borderRadius: "28px 28px 0 0",
        boxShadow: "0 -24px 80px rgba(0,0,0,0.7)",
        marginTop: "-28px",
      }}>
        <div style={S.wrap}>

          {/* NAVBAR */}
          <nav style={S.nav}>
            <span style={S.navName}>Stefan Perovski</span>
            <div style={S.navLinks}>
              <a href="#about" style={S.navLink}>About</a>
              <a href="#experience" style={S.navLink}>Experience</a>
              <a href="#education" style={S.navLink}>Education</a>
              <a href="#projects" style={S.navLink}>Projects</a>

            </div>
          </nav>


          {/* ABOUT - BENTO GRID */}
          <section id="about-grid" style={{ marginBottom: "64px" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "3fr 2fr 2fr",
                gridTemplateRows: "auto auto auto",
                gap: "14px",
              }}
            >
              <PhotoCard />
              <ExpertiseCard />
              <LocationCard />
              <ContactCard />
              <TechStackCard />
            </div>
          </section>

          {/* EXPERIENCE */}
          <section id="experience" style={{ marginBottom: "80px" }}>
            <AnimatedSectionTitle index="01 — Experience">Experience</AnimatedSectionTitle>
            <div>
              {experienceData.map((exp, idx) => (
                <ExperienceCard
                  key={exp.id}
                  id={exp.id}
                  logo={exp.logo}
                  title={exp.title}
                  company={exp.company}
                  meta={exp.meta}
                  bullets={exp.bullets}
                 
                  isLast={idx === experienceData.length - 1}
                />
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section id="education" style={{ marginBottom: "80px" }}>
            <AnimatedSectionTitle index="02 — Education">Education</AnimatedSectionTitle>
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: `1px solid ${"rgba(167,139,250,0.1)"}`,
              borderRadius: "20px",
              padding: "32px",
              display: "flex",
              gap: "28px",
              alignItems: "flex-start",
            }}>
              {/* Left: logo column */}
              <div style={{
                width: "56px", height: "56px", borderRadius: "14px", flexShrink: 0,
                background: "#fff",
                border: `1px solid ${"rgba(167,139,250,0.15)"}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                overflow: "hidden",
                padding: "6px",
              }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/Finki logo.png" alt="FINKI logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </div>
              {/* Right: content */}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", flexWrap: "wrap", marginBottom: "6px" }}>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: "17px", color: "#e2e8f0", marginBottom: "3px" }}>
                      Faculty of Computer Science and Engineering
                    </p>
                    <p style={{ fontSize: "14px", color: "#94a3b8" }}>
                      Software Engineering · Ss. Cyril and Methodius University, Skopje
                    </p>
                  </div>
                  <span style={{
                    fontSize: "12px", fontWeight: 500, padding: "4px 12px", borderRadius: "999px", whiteSpace: "nowrap",
                    background: "rgba(167,139,250,0.1)",
                    color: "#a78bfa",
                    border: `1px solid ${"rgba(167,139,250,0.2)"}`,
                  }}>Sep 2023 – Present</span>
                </div>
                <div style={{ marginTop: "16px", display: "flex", flexWrap: "wrap", gap: "8px" }}>
                  {["JavaScript", "TypeScript", "Python", "Java", "React", "Spring Boot", "PostgreSQL", "Docker"].map((skill) => (
                    <span key={skill} style={{
                      fontSize: "12px", padding: "4px 12px", borderRadius: "999px",
                      background: "rgba(255,255,255,0.05)",
                      color: "#94a3b8",
                      border: `1px solid ${"rgba(255,255,255,0.08)"}`,
                    }}>{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="projects" style={{ marginBottom: "80px" }}>
            <AnimatedSectionTitle index="03 — Projects">Projects</AnimatedSectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              {projectsData.map((proj) => (
                <ProjectCard
                  key={proj.id}
                  id={proj.id}
                  title={proj.title}
                  description={proj.description}
                  tags={proj.tags}
                  featured={proj.featured}
                  logo={proj.logo}
                  links={proj.links}
                 
                />
              ))}
            </div>
          </section>

          {/* SOFT SKILLS */}
          <section id="skills" style={{ marginBottom: "80px" }}>
            <AnimatedSectionTitle index="04 — Soft Skills">Soft Skills</AnimatedSectionTitle>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "14px" }}>
              {softSkills.map((skill) => (
                <SkillCard
                  key={skill.title}
                  title={skill.title}
                  description={skill.desc}
                  icon={skill.icon}
                 
                />
              ))}
            </div>
          </section>

          {/* FOOTER */}
          <footer style={S.footer}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "24px", marginBottom: "32px" }}>
              <div>
                <p style={{ fontFamily: "DM Serif Display, serif", fontSize: "20px", color: "#e2e8f0", marginBottom: "6px" }}>Stefan Perovski</p>
                <p style={{ fontSize: "13px", color: "#475569" }}>Software Engineering Student · FINKI, Skopje</p>
              </div>
              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                {[
                  { label: "GitHub", href: "https://github.com/steff221" },
                  { label: "LinkedIn", href: "https://www.linkedin.com/in/stefan-perovski-a5b401294/" },
                  { label: "Email", href: "mailto:stefan.perovski20@gmail.com" },
                ].map((link) => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                    fontSize: "12px", fontWeight: 600,
                    color: "#475569",
                    textDecoration: "none", padding: "7px 16px",
                    border: `1px solid ${"rgba(167,139,250,0.1)"}`,
                    borderRadius: "999px",
                    background: "rgba(255,255,255,0.03)",
                    transition: "all 0.2s ease",
                  }}>
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <p style={{ fontSize: "11px", color: "#2d1f4a", letterSpacing: "0.04em" }}>
              © 2026 Stefan Perovski · Built with Next.js & Framer Motion
            </p>
          </footer>

        </div>
      </main>
    </>
  );
}
