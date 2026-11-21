export const hero = {
  greeting: "Hi, I'm Subarat",
  lines: ["Building scalable", "digital experiences across"],
  highlight: "Web, FinTech, SaaS & Mobile Apps.",
  leftNote: "Okay... so how do I do that?",
  rightNote:
    "Working as a Software Developer at Loan2Grow, building fintech applications with React.js, TypeScript and REST APIs.",
  howTitle: "Here's How",
  scrollLabel: "Scroll Down",
};

export const navLinks = [
  { label: "Work", to: "/work" },
  { label: "Lab", to: "/", section: "lab" },
  { label: "Home", to: "/", section: "home" },
  { label: "About", to: "/about" },
  { label: "Resume", to: "/resume" },
];

export const projects = [
  {
    tag: "01 / FINTECH",
    title: "Building Smarter FinTech Dashboards",
    stack: "React.js · Redux Toolkit · REST APIs",
    desc: "Developing loan management dashboards with API integrations, application tracking, and streamlined workflows.",
    image: "/myPhoto/dashboard-img.png",
    video: "/edu/Loan2Grow.mp4",
  },
  {
    tag: "02 / FULL STACK",
    title: "Turning Complex Workflows into Simple Applications",
    stack: "React.js · Node.js · Express.js · MongoDB",
    desc: "Building full-stack systems with authentication, database operations, admin panels, and real-world business features.",
    image: "/myPhoto/problem-img.jpg",
  },
  {
    tag: "03 / MOBILE DEVELOPMENT",
    title: "Bringing Digital Experiences to Mobile",
    stack: "React Native · JavaScript · API Integration",
    desc: "Exploring cross-platform mobile development to create responsive, intuitive app experiences for Android and iOS.",
    image: "/myPhoto/mobile-img.jpg",
    video:"/CareCon/careConVideo.mp4"
  },
];

export const moreText = "More projects. More ideas. More in the works... ✏️";

export const story = {
  before: "But",
  highlight: "the real story",
  after: "comes from the people I build these projects with",
  closing: "People say those things because of how I work",
};

export const testimonials = [
  // {
  //   name: "Jaspreet Singh",
  //   company: "CEO & Founder, Access Assist",
  //   quote:
  //     "Subarat is a dedicated and enthusiastic developer who takes ownership of his work. His ability to understand requirements, build solutions, and continuously improve the product makes him a valuable part of any development team.",
  //   photo: "/Ref/JaspreetSingh.png",
  // },
  {
    name: "Kamal Kant",
    company: "Operations Manager, Konark Enterprises",
    quote:
      "Subarat is responsible, hardworking, and quick to learn. He understands business operations well and consistently demonstrates a positive attitude toward handling tasks and solving day-to-day challenges.",
    photo: "/Ref/kamal.jpeg",
  },
  {
    name: "Sourabh Chaudhary",
    company: "Sr. Backend Developer, EY",
    quote:
      "Subarat has a strong interest in technology and a practical approach to development. He is eager to learn, open to feedback, and continuously works on improving his technical skills and problem-solving abilities.",
    photo: "/Ref/sourabh.jpeg",
  },
  {
    name: "Aman Sharma",
    company: "Sr. Product Designer, Accenture",
    quote:
      "Working with Subarat is a smooth experience. He understands design requirements, pays attention to details, and focuses on translating ideas into clean, functional, and user-friendly interfaces.",
    photo: "/Ref/aman.jpeg",
  },
  {
    name: "Ashwin Sharma",
    company: "Founder, Rankers Library and Institute",
    quote:
      "Subarat is sincere, adaptable, and committed to delivering quality work. He understands requirements carefully and approaches responsibilities with dedication and a willingness to learn.",
    photo: "/Ref/ashwin.jpeg",
  },
  // {
  //   name: "Nidhi",
  //   company: "CEO & Owner, Loan2Grow",
  //   quote:
  //     "Subarat has demonstrated great ownership and dedication while working on our development projects. His contribution to building dashboards, integrating APIs, and improving user experiences reflects his commitment to delivering practical solutions.",
  //   photo: "/Ref/nidhi.png",
  // },
];

export const lab = {
  tag: "Code. Create. Iterate.",
  kicker: "Experiment. Build. Improve.",
  title: "I like turning ideas into working products.",
  sub: "Writing code, exploring solutions, and building for the real world.",
};

const icon = (n) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-original.svg`;

const dev = (n, v = 'original') =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${n}/${n}-${v}.svg`
const si = (slug, color) => `https://cdn.simpleicons.org/${slug}/${color}`

export const skillsRow1 = [
  { title: 'React.js', image: dev('react') },
  { title: 'TypeScript', image: dev('typescript') },
  { title: 'JavaScript', image: dev('javascript') },
  { title: 'Redux Toolkit', image: dev('redux') },
  { title: 'Next.js', image: dev('nextjs') },
  { title: 'React Router', image: dev('reactrouter') },
  { title: 'Tailwind CSS', image: dev('tailwindcss') },
  { title: 'DaisyUI', image: si('daisyui', '5A0EF8') },
  { title: 'GSAP', image: si('greensock', '88CE02') },
  { title: 'HTML5', image: dev('html5') },
  { title: 'CSS3', image: dev('css3') },
  { title: 'React Native', image: dev('react') },
]

export const skillsRow2 = [
  { title: 'Node.js', image: dev('nodejs') },
  { title: 'Express.js', image: dev('express') },
  { title: 'Python', image: dev('python') },
  { title: 'PostgreSQL', image: dev('postgresql') },
  { title: 'Prisma', image: dev('prisma') },
  { title: 'MongoDB', image: dev('mongodb') },
  { title: 'JWT', image: si('jsonwebtokens', 'D63AFF') },
  { title: 'Postman', image: dev('postman') },
  { title: 'Swagger', image: dev('swagger') },
  { title: 'Git', image: dev('git') },
  { title: 'GitHub', image: dev('github') },
  { title: 'VS Code', image: dev('vscode') },
  { title: 'Vercel', image: dev('vercel') },
  { title: 'Cloudinary', image: si('cloudinary', '3448C5') },
  { title: 'Render', image: si('render', '46E3B7') },
  // { title: 'Linux', image: dev('linux') },
]

export const footer = {
  philosophyTitle: "My Philosophy",
  philosophy: [
    [
      { t: "In short, I'm someone who enjoys " },
      { t: "building things that solve real problems.", hl: true },
    ],
    [
      { t: "I work across the stack, turning complex requirements into " },
      { t: "scalable applications", hl: true },
      {
        t: " with clean interfaces, reliable APIs, and thoughtful user experiences.",
      },
    ],
    [
      {
        t: "I believe great software isn't just about writing code — it's about ",
      },
      { t: "making things work better for people.", hl: true },
    ],
  ],
  name: "Subarat",
  bubble: "Got an idea? Let's build it!",
  connectTitle: "Connect with me!",
  links: [
    {
      label: "Subaratkumar.dev@outlook.com",
      href: "mailto:Subaratkumar.dev@outlook.com",
      icon: "mail",
      full: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/subarat-kumar-65081525b/",
      icon: "linkedin",
    },
    { label: "GitHub", href: "https://github.com/subarat001", icon: "github" },
    {
      label: "Instagram",
      href: "https://www.instagram.com/subarat_kr/",
      icon: "instagram",
    },
  ],
  copyright: "Designed & built by Subarat Kumar © 2026",
  tagline: "Building digital experiences, one line of code at a time.",
};

export const about = {
  kicker: "A little more than a portfolio",
  lines: ["Hi, I'm Subarat.", "A Full Stack Developer with a"],
  highlight: "builder's mindset.",
  text: "I build scalable web applications, powerful backend systems, and intuitive user interfaces. From FinTech dashboards and REST API integrations to full-stack business applications, I enjoy turning complex problems into practical digital solutions.",
  doodle: "Yep, that's me (in doodle form)",
  pill: "Software Developer at Loan2Grow · Gurgaon",
  stripLabel: "What I build",
  strip: ["Full Stack Apps", "FinTech", "REST APIs", "Mobile Apps"],
};

export const journey = {
  label: "The story so far",
  title:
    "From writing my first lines of code to building real-world applications.",
  text: "My journey has been about learning by building. Every project has helped me understand how frontend interfaces, backend systems, APIs, and databases work together to solve real problems.",
  note: ["Still learning. Still shipping.", "Still solving real problems."],
  timeline: [
    {
      label: "The starting point",
      title: "Learning by building",
      desc: "Developed my foundation in HTML, CSS, JavaScript, and React by creating websites, responsive interfaces, and practical projects.",
    },
    {
      label: "The next step",
      title: "From interfaces to full-stack systems",
      desc: "Expanded into Node.js, Express.js, databases, and REST APIs to understand how complete applications work beyond the frontend.",
    },
    {
      label: "The current chapter",
      title: "Software Developer at Loan2Grow",
      desc: "Working on real-world financial applications, developing dashboards, integrating REST APIs, and building features across multiple business workflows.",
      tech: [
        "React.js",
        "TypeScript",
        "Redux Toolkit",
        "REST APIs",
        "Node.js",
        "Python",
        "React Native",
      ],
    },
  ],
};

export const approach = {
  label: "How I like to work",
  title: "Think logically. Build smartly. Ship reliably.",
  text: "Great software isn't just about writing code. It's about understanding problems, choosing the right solutions, and building applications that are scalable, maintainable, and easy to use.",
  cards: [
    {
      icon: "chat",
      tag: "Start with why",
      title: "Understand the problem",
      desc: "I break down requirements, understand user needs, and explore how frontend, backend, and APIs can work together to solve real problems.",
    },
    {
      icon: "flask",
      tag: "Build to learn",
      title: "Experiment with solutions",
      desc: "I explore different approaches, build practical features, integrate APIs, and learn by solving challenges across web and mobile applications.",
    },
    {
      icon: "code",
      tag: "Sweat the details",
      title: "Build for the long run",
      desc: "I focus on reusable components, readable code, responsive interfaces, and reliable data flows to make applications easier to maintain and scale.",
    },
  ],
  note: "Less complexity. Better code. Real impact.",
};

export const toolkit = {
  label: "A few things in my toolkit",
  title: ["The stack evolves.", "The problem comes first."],
  text: "From crafting interfaces to building APIs and connecting databases, I choose tools that help me build reliable, maintainable, and scalable applications.",
  closing: "Always learning. Always building.",
  cards: [
    {
      icon: "code",
      title: "Frontend Development",
      tag: "Build",
      desc: "React.js, TypeScript, JavaScript, Redux Toolkit, Tailwind CSS, DaisyUI",
    },
    {
      icon: "server",
      title: "Backend & APIs",
      tag: "Connect",
      desc: "Node.js, Express.js, Python, REST APIs, Authentication",
    },
    {
      icon: "database",
      title: "Databases & Tools",
      tag: "Manage",
      desc: "MongoDB, PostgreSQL, Prisma, Git, GitHub",
    },
    {
      icon: "phone",
      title: "Mobile & Deployment",
      tag: "Explore",
      desc: "React Native, Vite, Vercel, Render",
    },
  ],
  note: "The best tool? The one that solves the problem.",
};

export const beyond = {
  label: "Beyond writing code",
  title: ["Solving today's problems.", "Building tomorrow's systems."],
  text: "I'm driven by curiosity, problem-solving, and the ambition to build intelligent software that solves real business challenges — from algorithms to AI-powered applications and enterprise systems.",
  cards: [
    {
      title: "The art of problem-solving",
      desc: "Practising Data Structures and Algorithms, sharpening logical thinking, and finding efficient solutions to challenging real-world problems.",
      image: "/myPhoto/dsa.jpg",
    },
    {
      title: "Exploring the future with AI",
      desc: "Working toward AI development, exploring machine learning and intelligent applications, and discovering how AI can solve meaningful problems.",
      image: "/myPhoto/ai.jpg",
    },
    {
      title: "Building systems that scale",
      desc: "My long-term goal is to build comprehensive ERP systems that connect finance, inventory, operations, and workflows to help businesses work smarter.",
      image: "/myPhoto/erp.jpg",
    },
  ],
  bottom: "Think deeper. Solve smarter. Build for the future.",
};


export const work = {
  tag: 'Build. Ship. Repeat.',
  title: ['Real products.', 'Real workflows.'],
  text: 'A look at the systems I have built, from loan platforms and ERPs to admin panels and dashboards.',
  note: 'Demo reels landing soon',
}

export const workProjects = [
  {
    id: 'loan-management',
    tag: 'FinTech · L2G Fincap',
    title: 'Two Wheeler & Education Loan Management System',
    url: 'loan-management / dashboard',
    summary: 'One platform for the full loan journey, from the first lead to the final report.',
    built: [
      'Lead capture, approval, disbursement, collection and reports in one flow',
      'CRIF credit bureau, V-KYC and bank statement analysis integrations',
      'Role-based dashboards for admin, operations, credit and collection teams',
      'Rule-engine approval flows with dynamic master configuration',
    ],
    stack: ['React', 'Redux Toolkit', 'Node.js', 'PostgreSQL', 'Prisma'],
    video: '/Twl/twlVideo.mp4',
    images: ["/Twl/twl1.png" , "/Twl/twl2.png", "/Twl/twl3.png"],
    poster: '',
  },
  // {
  //   id: 'library-management',
  //   tag: 'Freelance · Full Stack',
  //   title: 'Library Management System',
  //   url: 'library-management / admin',
  //   summary: 'A full stack admin dashboard for running multiple library branches from one place.',
  //   built: [
  //     'Role-based admin dashboard managing multiple library branches',
  //     'Student registration with live seat map, occupancy and availability per branch',
  //     'Fee tracking, due-date reminders and notifications that auto-refresh',
  //     'Fee and report views with a full activity history',
  //   ],
  //   stack: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'REST APIs'],
  //   video: '',
  //   images: [],
  //   poster: '',
  // },
  // {
  //   id: 'oneemperp',
  //   tag: 'ERP · Inventory',
  //   title: 'OneEmpErp: Stock & Inventory ERP',
  //   url: 'oneemperp / stock',
  //   summary: 'A stock management ERP with a pricing engine that adapts to the bill of materials.',
  //   built: [
  //     '10 modules including vendor master, finished-goods stock, orders and invoices',
  //     'Dynamic BOM-based pricing engine',
  //     'Normalized relational schema with transactional logic for stock accuracy',
  //   ],
  //   stack: ['Node.js', 'Express', 'PostgreSQL', 'Prisma'],
  //   video: '',
  //   poster: '',
  // },
  {
    id: 'rupee-yatra',
    tag: 'Website · Dashboard',
    title: 'Rupee Yatra',
    url: 'rupee-yatra / customer',
    summary: 'A customer-facing website paired with a multi-role operations dashboard.',
    built: [
      'Customer website with OTP login and a step-by-step journey',
      'Operations dashboard with multiple roles and lead handling',
    ],
    stack: ['React', 'Redux', 'Tailwind CSS', 'DaisyUI'],
    video: '/ruy/ruyVideo.mp4',
    images: ["/ruy/ruy1.png", "/ruy/ruy2.png" , "/ruy/ruy3.png"],
    poster: '',
  },
  {
    id: 'l2g-website',
    tag: 'Website · L2G Fincap',
    title: 'Loan2Grow: MSME & Business Loans',
    url: 'l2gfincap.in',
    link: 'https://www.l2gfincap.in/',
    summary: 'The public website for a specialized MSME lender serving small businesses across India.',
    built: [
      'Brand website explaining affordable credit options to entrepreneurs',
      'Responsive pages with SEO and Open Graph metadata for search and sharing',
    ],
    stack: ['React', 'Tailwind CSS'],
    video: '/l2g/l2gVideo.mp4',
    images: ["/l2g/l2g1.png" , "/l2g/l2g2.png" , "/l2g/l2g3.png" ],
    poster: '',
  },
  {
    id: 'learnity',
    tag: 'Website · Education Loans',
    title: 'Learnity: Student Education Loans',
    url: 'learnitya.com',
    link: 'https://learnitya.com/',
    summary: 'A student-facing site that connects learners with RBI-registered financial partners.',
    built: [
      'Landing page covering benefits, eligibility and the 100% online process',
      'SEO-focused structure for education loan search traffic',
    ],
    stack: ['HTML', 'CSS', 'JavaScript'],
    video: '/edu/Loan2Grow.mp4',
    images: [],
    poster: '',
  },
  {
    id: 'access-assist',
    tag: 'Website',
    title: 'Access Assist',
    url: 'accessassist.org',
    link: 'https://www.accessassist.org/',
    summary: 'A website built around helping people build healthy financial lives and join the connected economy.',
    built: [
      'Single-page React application with a branded, responsive interface',
      'Content structured around economic well-being solutions',
    ],
    stack: ['React'],
    video: '',
    images: [],
    poster: '',
  },
]


export const resume = {
  label: "The resume",
  title: ["Résumé.", "The short version."],
  doodle: "Yep, that's me (ready to ship)",
  pill: "Software Developer at Loan2Grow · Gurgaon",
  name: "Subarat Kumar",
  role: "Full Stack Developer · React · FinTech · AI",
  contact: [
    { label: "Subaratkumar.dev@outlook.com", href: "mailto:Subaratkumar.dev@outlook.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/subarat-kumar-65081525b/" },
    { label: "GitHub", href: "https://github.com/subarat001" },
    { label: "New Delhi, India" },
  ],
  summary:
    "Software Developer with hands-on experience building FinTech dashboards, integrating large sets of REST APIs and shipping full-stack business applications. Currently exploring AI and machine learning to build intelligent, AI-powered products.",
  skills: [
    { group: "Frontend", items: ["React.js", "TypeScript", "JavaScript", "Redux Toolkit", "Next.js", "React Router", "Tailwind CSS", "DaisyUI", "GSAP"] },
    { group: "Backend & APIs", items: ["Node.js", "Express.js", "Python", "REST APIs", "JWT Authentication"] },
    { group: "Databases & Tools", items: ["PostgreSQL", "Prisma", "MongoDB", "Git", "GitHub", "Postman", "Swagger"] },
    { group: "Mobile & Deployment", items: ["React Native", "Vite", "Vercel", "Render"] },
    { group: "AI & Fundamentals", items: ["AI / Machine Learning (learning)", "Data Structures & Algorithms"] },
  ],
  experience: [
    {
      role: "Software Developer",
      company: "L2G Fincap (Loan2Grow)",
      place: "Gurugram",
      period: "March 2026 – Present",
      points: [
        "Built the Two Wheeler and Education Loan management system covering lead capture, approval, disbursement, collection and reports.",
        "Integrated dozens of REST APIs including CRIF credit bureau, V-KYC and bank statement analysis.",
        "Developed role-based dashboards for admin, operations, credit and collection teams with Redux Toolkit.",
        "Implemented rule-engine approval flows with dynamic master configuration.",
      ],
    },
    {
      role: "Freelance Full Stack Developer",
      company: "TechNest (Build Studio)",
      place: "New Delhi",
      period: "January 2025 – January 2026",
      points: [
        "Delivered full-stack web applications with authentication, admin panels and database operations for clients.",
        "Built a multi-branch Library Management System with live seat map, fee tracking and reminders.",
      ],
    },
  ],
  education: [
    { title: "Master of Computer Applications (MCA)", place: "Amity University Online", period: "2026 – Present" },
    { title: "Bachelor of Arts (BA)", place: "IGNOU", period: "2023 – 2026" },
  ],
  downloadLabel: "Download Resume (PDF)",
  file: "/Subarat_resume.pdf",
};