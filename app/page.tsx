import Image from "next/image";
import { education, experience, featured, habits, languages, links, projects, toolbox, type Project } from "./data";
import { ContactForm, CopyEmail, RevealObserver, Tilt } from "./interactive";

const nav = [
  { href: "#work", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

export default function Home() {
  return (
    <>
      <RevealObserver />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Experience />
        <About />
      </main>
      <Contact />
    </>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-20 border-b-2 border-ink bg-cream/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="group flex items-center gap-2.5 font-display text-lg whitespace-nowrap">
          <span className="size-2.5 shrink-0 rotate-45 bg-cinnamon transition-transform duration-300 group-hover:rotate-[135deg]" aria-hidden />
          Stefan Perovski
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="hidden rounded-full px-3 py-1.5 text-sm font-medium transition-colors hover:bg-paper sm:inline-block"
            >
              {item.label}
            </a>
          ))}
          <a href={links.cv} download className="btn bg-card px-3.5 py-1.5 text-sm whitespace-nowrap">
            <DownloadIcon /> CV
          </a>
          <a href="#contact" className="btn hidden bg-caramel px-4 py-1.5 text-sm whitespace-nowrap min-[420px]:inline-flex">
            Say hi
          </a>
        </nav>
      </div>
    </header>
  );
}

/** Splits text into individually animated words, starting at `from` in the stagger order. */
function Words({ text, from = 0 }: { text: string; from?: number }) {
  return text.split(" ").map((w, i) => (
    <span key={i} className="word" style={{ animationDelay: `${(from + i) * 70}ms` }}>
      {w}
      {" "}
    </span>
  ));
}

function Hero() {
  return (
    <div className="relative">
    <section id="top" className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pt-14 pb-20 sm:px-6 lg:grid-cols-[1.25fr_1fr] lg:pt-20 lg:pb-28">
      <div>
        <h1 className="font-display text-[2.6rem] leading-[1.1] tracking-tight sm:text-6xl lg:text-[3.2rem]">
          <Words text="Hi, I'm Stefan." />
          <span className="word" style={{ animationDelay: "210ms" }}>
            <HandWave />
          </span>
          <br />
          <Words text="I build software for the" from={3} />
          <span className="relative isolate inline-block">
            <span className="marker" aria-hidden />
            <Words text="people around me." from={8} />
          </span>
        </h1>
        <p className="rise mt-7 max-w-xl text-lg leading-relaxed text-ink/80" style={{ animationDelay: "700ms" }}>
          I&apos;m a fourth-year software engineering student at FINKI in Skopje, working full-stack with Java
          and Spring Boot. I&apos;ve shipped several complete systems, including an internship
          platform now in production at my university. Most of them start as a problem someone
          nearby actually has, and testing and security are part of how I build them, not
          something I add later.
        </p>
        <div className="rise mt-8 flex flex-wrap gap-3" style={{ animationDelay: "850ms" }}>
          <a href="#work" className="btn bg-mocha text-cream">
            See my work <Arrow />
          </a>
          {/* Docs → download reveal adapted from Uiverse.io by barisdogansutcu */}
          <a href={links.cv} download className="uv-cv" aria-label="Download my CV as a PDF">
            <span className="docs">
              <DocIcon /> My CV <small>PDF</small>
            </span>
            <span className="download" aria-hidden>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download
            </span>
          </a>
        </div>
      </div>

      <div className="rise relative mx-auto w-full max-w-md lg:max-w-none" style={{ animationDelay: "200ms" }}>
        <Tilt className="relative">
          <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] bg-cinnamon" aria-hidden />
          <div className="relative overflow-hidden rounded-[2rem] border-[3px] border-ink bg-[#f6ebcd]">
            <Image
              src="/stefan.png"
              alt="Illustration of Stefan smiling at his desk with a laptop"
              width={1400}
              height={1285}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 1024px) 520px, 90vw"
              className="h-auto w-full"
            />
          </div>
        </Tilt>
        <SpinBadge />
        <div className="bob absolute -bottom-5 -left-3 rounded-xl border-2 border-ink bg-caramel px-4 py-2 text-sm font-semibold shadow-block sm:-left-6">
          📍 Skopje, Macedonia
        </div>
      </div>
    </section>
    </div>
  );
}

/** Rotating circular text badge adapted from Uiverse.io by Creatlydev */
function SpinBadge() {
  const text = "OPEN TO WORK • SAY HI • ";
  const chars = [...text];
  return (
    <a
      href="#contact"
      className="uv-spin absolute -top-9 -right-2 z-10 sm:-right-6"
      style={{ "--step": `${360 / chars.length}deg` } as React.CSSProperties}
      aria-label="Open to work, say hi"
    >
      <span className="ring" aria-hidden>
        {chars.map((c, i) => (
          <span key={i} style={{ "--i": i } as React.CSSProperties}>
            {c}
          </span>
        ))}
      </span>
      <span className="core" aria-hidden>
        <ArrowUpRight />
        <ArrowUpRight />
      </span>
    </a>
  );
}

function Marquee() {
  const items = toolbox[0].items;
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((t) => (
        <li key={t} className="flex items-center gap-6 pr-6 font-display text-2xl whitespace-nowrap sm:text-3xl">
          {t}
          <span className="size-2.5 shrink-0 rotate-45 bg-caramel" aria-hidden />
        </li>
      ))}
    </ul>
  );
  return (
    <div className="marquee overflow-hidden border-t-2 border-ink bg-ink py-4 text-cream" aria-label="Technologies I use">
      <div className="marquee-track flex w-max">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div data-reveal className="mb-10 max-w-2xl">
      <p className="mb-2 text-sm font-semibold tracking-[0.14em] text-cocoa uppercase">{eyebrow}</p>
      <h2 className="font-display text-4xl tracking-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-lg leading-relaxed text-ink/75">{children}</p>}
    </div>
  );
}

function Work() {
  return (
    <section id="work" className="border-y-2 border-ink bg-paper">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
        <SectionHeading eyebrow="Work" title="Things I've built">
          Apps for students, a clinic, a river and a café. Mostly Java and TypeScript, with a soft spot for mobile.
        </SectionHeading>

        <div data-reveal>
          <article className="block-card group grid overflow-hidden lg:grid-cols-[1fr_400px]">
            <div className="flex flex-col p-6 sm:p-8">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream">Featured</span>
                {featured.badge && <Badge>{featured.badge}</Badge>}
                <span className="text-sm font-medium text-ink/65">{featured.kind}</span>
              </div>
              <h3 className="font-display text-3xl sm:text-4xl">{featured.title}</h3>
              <p className="mt-3 leading-relaxed text-ink/80">{featured.description}</p>
              <ul className="mt-5 space-y-2 text-sm">
                {featured.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-1.5 size-2 shrink-0 rotate-45 bg-cinnamon" aria-hidden />
                    {h}
                  </li>
                ))}
              </ul>
              <Tags tags={featured.tags} className="mt-6" />
              <ProjectLinks links={featured.links} className="mt-auto pt-6" />
            </div>
            <div className="uv-chevron relative flex items-center justify-center border-t-2 border-ink px-6 py-10 sm:px-10 lg:border-t-0 lg:border-l-2">
              <div className="relative w-full max-w-[280px] -rotate-2 transition-transform duration-500 group-hover:rotate-0">
                <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[2.2rem] bg-cinnamon" aria-hidden />
                <Image
                  src={featured.image!}
                  alt="The FINKI Scheduler app home screen: today's classes, tasks and this week's timetable"
                  width={708}
                  height={1551}
                  sizes="280px"
                  className="relative h-auto w-full rounded-[2.2rem] border-[3px] border-ink"
                />
              </div>
            </div>
          </article>
        </div>

        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {projects.map((p, i) => (
            <div key={p.title} data-reveal style={{ "--d": `${(i % 2) * 120}ms` } as React.CSSProperties}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project: p }: { project: Project }) {
  return (
    <article className="block-card group flex h-full flex-col p-6 sm:p-7">
      <div className="mb-5 flex items-center gap-4">
        <div
          className={`wiggle grid h-16 shrink-0 place-items-center overflow-hidden rounded-2xl border-2 border-ink ${p.logoWide ? "w-36" : "w-16"}`}
          style={{ background: p.imageBg ?? "var(--color-caramel)" }}
        >
          {p.image ? (
            <Image
              src={p.image}
              alt=""
              width={p.logoWide ? 144 : 64}
              height={64}
              className={`size-full object-contain ${p.logoWide ? "px-2.5 py-2" : "p-1"}`}
            />
          ) : (
            <WaveMark />
          )}
        </div>
        <div>
          <h3 className="font-display text-2xl">{p.title}</h3>
          <p className="text-sm font-medium text-ink/65">{p.kind}</p>
        </div>
      </div>
      {p.badge && <Badge className="mb-4 self-start">{p.badge}</Badge>}
      <p className="leading-relaxed text-ink/80">{p.description}</p>
      <Tags tags={p.tags} className="mt-5" />
      <ProjectLinks links={p.links} className="mt-auto pt-6" />
    </article>
  );
}

function Badge({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border-2 border-ink bg-caramel px-2.5 py-0.5 text-xs font-semibold ${className}`}
    >
      <span className="size-1.5 rounded-full bg-ink" aria-hidden />
      {children}
    </span>
  );
}

function Tags({ tags, className = "" }: { tags: string[]; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {tags.map((t) => (
        <li key={t} className="rounded-full border-[1.5px] border-ink/25 bg-cream px-2.5 py-0.5 text-xs font-medium">
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ links: l, className = "" }: { links: Project["links"]; className?: string }) {
  return (
    <div className={`flex flex-wrap gap-5 ${className}`}>
      {l.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-underline inline-flex items-center gap-1.5 font-semibold"
        >
          {link.label} <Arrow />
        </a>
      ))}
    </div>
  );
}

function Experience() {
  return (
    <section id="experience" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:py-28">
      <SectionHeading eyebrow="Experience" title="Outside the editor">
        When I&apos;m not writing code, I&apos;m usually organizing the people who will use it.
      </SectionHeading>
      <ol data-reveal className="relative">
        <span className="grow-y absolute top-0 bottom-0 left-0 w-0.5 bg-ink" aria-hidden />
        {experience.map((e, i) => (
          <li key={e.title} className="relative pb-12 pl-8 last:pb-0 sm:pl-10">
            <span
              className="pop absolute top-1.5 -left-[7px] size-4 rounded-full border-2 border-ink bg-caramel"
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden
            />
            <div className="grid gap-2 md:grid-cols-[1fr_auto] md:gap-8">
              <div>
                <h3 className="font-display text-2xl">{e.title}</h3>
                <p className="mt-1 font-medium text-cocoa">{e.org}</p>
              </div>
              <p className="text-sm font-semibold whitespace-nowrap text-cocoa md:pt-2">{e.when}</p>
            </div>
            <ul className="mt-4 max-w-3xl space-y-2 leading-relaxed text-ink/80">
              {e.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="border-t-2 border-ink bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:py-28">
        <div>
          <SectionHeading eyebrow="About" title="School, skills & languages" />
          <div data-reveal>
            <div className="block-card group flex gap-5 p-6">
              <div className="wiggle grid size-16 shrink-0 place-items-center rounded-2xl border-2 border-ink bg-white p-1.5">
                <Image src="/Finki logo.png" alt="FINKI" width={56} height={56} className="size-full object-contain" />
              </div>
              <div>
                <p className="text-sm font-semibold text-cocoa">{education.when}</p>
                <h3 className="font-display text-xl">{education.degree}</h3>
                <p className="mt-1 text-ink/75">{education.school}</p>
                <p className="mt-4 mb-2 text-xs font-semibold tracking-[0.14em] text-cocoa uppercase">Coursework</p>
                <Tags tags={education.coursework} />
              </div>
            </div>
          </div>
          <div data-reveal style={{ "--d": "100ms" } as React.CSSProperties}>
            <h3 className="mt-10 mb-4 font-display text-xl">Languages I speak</h3>
            <ul className="mb-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {languages.map((l) => (
                <li key={l.name} className="rounded-2xl border-2 border-ink bg-card px-4 py-3">
                  <p className="font-semibold">{l.name}</p>
                  <p className="text-sm text-cocoa">{l.level}</p>
                </li>
              ))}
            </ul>
            <h3 className="mb-4 font-display text-xl">How I like to work</h3>
            <ul className="flex flex-wrap gap-2.5">
              {habits.map((h) => (
                <li
                  key={h}
                  className="rounded-full border-2 border-ink bg-card px-4 py-1.5 text-sm font-medium transition-transform hover:-rotate-2 hover:bg-caramel"
                >
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div data-reveal className="lg:pt-[7.5rem]" style={{ "--d": "150ms" } as React.CSSProperties}>
          <div className="block-card p-6 sm:p-8">
            <h3 className="font-display text-2xl">Toolbox</h3>
            <p className="mt-1 text-sm text-ink/70">Core is what I use every day; familiar is what I&apos;ve shipped with.</p>
            <dl className="mt-6 space-y-6">
              {toolbox.map((g) => (
                <div key={g.group}>
                  <dt className="mb-2.5 text-xs font-semibold tracking-[0.14em] text-cocoa uppercase">{g.group}</dt>
                  <dd>
                    <Tags tags={g.items} />
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const rows = [
    { icon: <MailIcon />, label: "Email", value: links.email, href: `mailto:${links.email}`, copy: true },
    { icon: <LinkedInIcon />, label: "LinkedIn", value: "Stefan Perovski", href: links.linkedin },
    { icon: <GitHubIcon />, label: "GitHub", value: links.github.replace("https://github.com/", "@"), href: links.github },
    { icon: <DownloadIcon />, label: "Résumé", value: "Download my CV (PDF)", href: links.cv, download: true },
    { icon: <PinIcon />, label: "Based in", value: "Skopje, Macedonia · open to remote" },
  ];

  return (
    <footer id="contact" className="border-t-2 border-ink bg-ink text-cream">
      <div className="mx-auto max-w-6xl px-4 pt-20 pb-10 sm:px-6 lg:pt-28">
        <div data-reveal className="mb-12 flex flex-wrap items-end justify-between gap-x-10 gap-y-12">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold tracking-[0.14em] text-caramel uppercase">Contact</p>
            <h2 className="font-display text-5xl tracking-tight sm:text-6xl">Pull up a chair.</h2>
            <p className="mt-5 text-lg leading-relaxed text-cream/80">
              Internship, side project, or you just want to talk student tech in Skopje. Write me.
            </p>
          </div>
          {/* Layered 3D icons adapted from Uiverse.io by vikas7754 */}
          <ul className="flex gap-7 pb-8 pl-1">
            {[
              { label: "LinkedIn", href: links.linkedin, icon: <LinkedInIcon /> },
              { label: "GitHub", href: links.github, icon: <GitHubIcon /> },
              { label: "Email", href: `mailto:${links.email}`, icon: <MailIcon /> },
              { label: "CV", href: links.cv, icon: <DocIcon />, download: true },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  className="uv-layer"
                  aria-label={s.label}
                  download={s.download || undefined}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                >
                  <span className="layer" aria-hidden>
                    <span />
                    <span />
                    <span />
                    <span />
                    <span>{s.icon}</span>
                  </span>
                  <span className="label" aria-hidden>
                    {s.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal style={{ "--d": "120ms" } as React.CSSProperties}>
          <div className="grid grid-cols-1 overflow-hidden rounded-[1.75rem] border-2 border-cream bg-card text-ink shadow-[6px_6px_0_0_var(--color-caramel)] sm:shadow-[10px_10px_0_0_var(--color-caramel)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            <div className="flex flex-col border-b-2 border-ink bg-paper p-6 sm:p-8 lg:border-r-2 lg:border-b-0">
              <div>
                <p className="font-display text-2xl">Stefan Perovski</p>
                <p className="mt-1 text-sm text-ink/70">
                  I&apos;m a 4th year software engineering student at FINKI.
                </p>
              </div>

              <ul className="mt-6 divide-y-2 divide-dashed divide-ink/15">
                {rows.map((r) => (
                  <li key={r.label} className="flex items-center gap-3 py-3.5">
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl border-2 border-ink bg-caramel">
                      {r.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold tracking-[0.12em] text-cocoa uppercase">{r.label}</p>
                      {r.href ? (
                        <a
                          href={r.href}
                          download={r.download || undefined}
                          target={r.href.startsWith("http") ? "_blank" : undefined}
                          rel={r.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className="link-underline block truncate font-semibold"
                        >
                          {r.value}
                        </a>
                      ) : (
                        <p className="font-semibold">{r.value}</p>
                      )}
                    </div>
                    {r.copy && <CopyEmail email={links.email} />}
                  </li>
                ))}
              </ul>
            </div>

            {/* Notebook paper pattern adapted from Uiverse.io by artvelog */}
            <div className="uv-notebook p-6 pl-8 sm:p-8 sm:pl-10">
              <p className="font-display text-2xl">Send a note</p>
              <p className="mt-1 mb-6 text-sm text-ink/70">A few lines is plenty. I read everything.</p>
              <ContactForm email={links.email} />
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-cream/20 pt-6 text-sm text-cream/60">
          <p>© {new Date().getFullYear()} Stefan Perovski</p>
          <p>
            Made in Skopje, probably with coffee. UI bits from{" "}
            <a href="https://uiverse.io" target="_blank" rel="noopener noreferrer" className="link-underline text-cream/80">
              Uiverse.io
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="shrink-0">
      <path d="M3 8h10m0 0L9 4m4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function HandWave() {
  return (
    <svg viewBox="0 0 24 24" className="wave inline-block size-[0.85em] translate-y-[0.02em] fill-cinnamon" aria-hidden>
      <path d="m4.5 23c-1.687-.216-2.948-1.448-3.437-3.067-.239-.793.209-1.63 1.002-1.87.792-.24 1.629.209 1.87 1.002.166.55.452.838.985.994.795.233 1.251 1.066 1.018 1.861-.191.654-.79 1.079-1.439 1.079zm14.449-18.887c-.395-1.479-1.494-2.589-3.016-3.049-.792-.238-1.631.209-1.869 1.002-.24.793.209 1.63 1.002 1.87.656.198.897.626.984.951.18.671.785 1.113 1.448 1.113.968.012 1.715-.953 1.45-1.888zm1.801 3.528c-.353-.52-1.018-.772-1.648-.573-.609.191-1.035.716-1.082 1.37 0 0-.03.845-.016 1.985l-.004-.005v1.333c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-3c-.482-.479-.878-.92-1.607-1.648-1.93-1.93-2.99-3.582-3.004-3.599-.455-.557-1.276-.643-1.834-.189-.561.455-.646 1.271-.194 1.831-.072.067 2.121 2.872 3.957 4.572.254.254.254.666 0 .92l-.002.002c-.254.254-.666.254-.92 0-1.503-1.154-5.195-5.943-5.008-6.066-.404-.595-1.214-.753-1.81-.351-.599.403-.757 1.209-.356 1.807-.281.009 3.639 5.149 5.329 6.456.254.254.254.666 0 .92l-.002.002c-.254.254-.666.254-.92 0-1.468-1.299-4.838-5.305-4.67-5.218-.34-.634-1.129-.875-1.764-.537-.637.339-.878 1.124-.542 1.76-.211-.107 3.361 4.281 5.13 5.84.254.254.254.666 0 .92s-.666.254-.92 0c-1.162-1.123-3.238-3.331-3.036-3.182-.449-.563-1.27-.656-1.833-.208-.563.45-.657 1.269-.209 1.832-.228-.197 1.84 2.063 3.079 3.249 2.506 2.46 5.638 5.136 9.138 5.136 2.5 0 7.5-1.5 7.5-7.5s-1.249-7.859-1.249-7.859z" />
    </svg>
  );
}

function WaveMark() {
  return (
    <svg viewBox="0 0 48 48" className="size-10" fill="none" aria-hidden>
      <path d="M4 18c5-5 10-5 15 0s10 5 15 0 10-5 10-5" stroke="var(--color-ink)" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M4 30c5-5 10-5 15 0s10 5 15 0 10-5 10-5" stroke="var(--color-cream)" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
}

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
} as const;

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg {...iconProps}>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4M12 10v7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg {...iconProps}>
      <path d="M9 19c-4 1.5-4-2-6-2.5m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg {...iconProps}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 14 15" fill="none" aria-hidden>
      <path
        d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
        fill="currentColor"
      />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg {...iconProps} width={16} height={16} className="dl-icon">
      <path d="M12 4v11m0 0-4.5-4.5M12 15l4.5-4.5M5 20h14" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  );
}
