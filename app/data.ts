export type Project = {
  title: string;
  kind: string;
  description: string;
  tags: string[];
  badge?: string;
  image?: string;
  imageBg?: string;
  /** Landscape wordmark: show it in a wider icon box than the default square. */
  logoWide?: boolean;
  links: { label: string; href: string }[];
};

export const featured: Project & { highlights: string[] } = {
  title: "FINKI Scheduler",
  kind: "Web + iOS & Android",
  badge: "Web & mobile",
  description:
    "The faculty timetable and consultations portal in one place, with a Flutter app alongside it. Automated ingestion matches professor names across both sources, so a schedule that used to live in scattered PDFs becomes one filterable weekly calendar.",
  highlights: [
    "Filterable weekly calendar with conflict detection and .ics export",
    "Automated ingestion that matches professor names across timetable and consultation sources",
    "Campus map so first-years can actually find the room",
    "Flutter app adding exams, tasks and reminders on iOS and Android",
  ],
  tags: ["Spring Boot 3", "Next.js", "PostgreSQL", "Flutter"],
  image: "/projects/finki-app-screen.png",
  links: [
    { label: "Web", href: "https://github.com/steff221/FINKIApp" },
    { label: "Mobile", href: "https://github.com/sperovski/FINKI-Mobile-App" },
  ],
};

export const projects: Project[] = [
  {
    title: "Linker",
    kind: "Internship platform",
    badge: "In production",
    description:
      "The internship and employment platform for students at Ss. Cyril and Methodius University, now live and under active development. I led the build as Chair of the Digitalisation Committee and still maintain and extend it: profiles and CV uploads for students, listings and applicant review for companies, real-time chat over SignalR, and integration tests against a real Postgres via Testcontainers.",
    tags: ["Angular", "ASP.NET Core", "PostgreSQL", "SignalR", "Docker"],
    image: "/projects/linker-logo.png",
    imageBg: "#ffffff",
    logoWide: true,
    links: [{ label: "GitHub", href: "https://github.com/sperovski/Linker" }],
  },
  {
    title: "MedTech",
    kind: "Healthcare administration",
    badge: "39/39 tests passing",
    description:
      "Separate portals for doctors, patients, nurses and administrators. I designed the data model, built the REST API with role-based access control and wrote the JUnit suite. GitHub Actions runs security scanning and staged deployments.",
    tags: ["Spring Boot 3", "Spring Security", "PostgreSQL", "Next.js", "Docker"],
    image: "/MedTech.png",
    imageBg: "#0a1a2f",
    links: [{ label: "GitHub", href: "https://github.com/steff221/MedTech2.0" }],
  },
  {
    title: "WaterWatch",
    kind: "Satellite water monitoring",
    badge: "CASSINI Hackathon · 48h",
    description:
      "Built in 48 hours at the CASSINI Hackathon in Skopje, against 20 teams. Processes Copernicus Sentinel-2 data into water quality indices for monitoring stations across North Macedonia, shown on an interactive map.",
    tags: ["Python", "Flask", "React", "Leaflet"],
    links: [
      { label: "Live", href: "https://water-watch-2t91.vercel.app" },
      { label: "GitHub", href: "https://github.com/steff221/WaterWatch" },
    ],
  },
  {
    title: "Netaville",
    kind: "Mobile app + admin panel",
    description:
      "A student space in Karposh with a digital stamp card, ranks, a coffee menu with UKIM student prices and an events calendar. Staff get a web panel for events and the TV screens around the building.",
    tags: ["React Native", "Expo", "Next.js", "TypeScript"],
    image: "/projects/netaville.png",
    imageBg: "#ffffff",
    links: [{ label: "GitHub", href: "https://github.com/sperovski/Netaville2.0" }],
  },
];

export const experience = [
  {
    title: "Chair of the Digitalisation Committee",
    org: "University Student Assembly, Ss. Cyril and Methodius University",
    when: "Mar – May 2026",
    points: [
      "Led the digital transformation of student-facing processes across the university.",
      "Built and shipped LINKER, the platform connecting students with internships and jobs.",
    ],
  },
  {
    title: "Lead Organizer, LINKER Hackathon",
    org: "FINKI / University Student Assembly",
    when: "Apr 18–19, 2026",
    points: [
      "Conceived and ran a 48-hour hackathon with 11 teams, built around a real gap between students and employers.",
      "Designed a six-part judging framework: relevance, innovation, functionality, UX/UI, impact and presentation.",
      "Coordinated participants, mentors, judges and company sponsors from kickoff to awards.",
    ],
  },
  {
    title: "Multimedia and Public Relations",
    org: "University Student Assembly",
    when: "Nov 2025 – now",
    points: ["Running multimedia content and public communication for the Assembly."],
  },
];

export const education = {
  degree: "BSc Software Engineering & Information Systems",
  school: "Faculty of Computer Science and Engineering (FINKI), Ss. Cyril and Methodius University",
  when: "Oct 2023 – now · fourth year",
  coursework: ["Software Testing", "Databases", "Algorithms & Data Structures", "Object-Oriented Programming", "CI/CD & DevOps"],
};

export const toolbox = [
  {
    group: "Core",
    items: [
      "Java",
      "Spring Boot",
      "Spring Security (JWT)",
      "JUnit & Mockito",
      "REST APIs",
      "PostgreSQL",
      "SQL",
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Docker",
      "Git",
      "Tailwind CSS",
    ],
  },
  { group: "Familiar", items: ["Angular", ".NET", "C#", "Flutter", "React Native", "MySQL", "Oracle SQL", "Bootstrap"] },
  { group: "Tools", items: ["GitHub Actions", "Jira", "Scrum", "Microsoft Azure", "Vercel"] },
];

export const languages = [
  { name: "Macedonian", level: "Native" },
  { name: "English", level: "C2" },
  { name: "Croatian", level: "C2" },
  { name: "German", level: "B2" },
];

export const habits = [
  "Teamwork",
  "Adaptability",
  "Strategic thinking",
  "Public relations",
  "Self-motivation",
  "Cognitive flexibility",
];

export const links = {
  email: "stefan.perovski20@gmail.com",
  github: "https://github.com/steff221",
  linkedin: "https://www.linkedin.com/in/stefan-perovski-a5b401294/",
  cv: "/Stefan-Perovski-CV.pdf",
};
