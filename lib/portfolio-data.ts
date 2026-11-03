/**
 * SUMBER DATA TUNGGAL untuk konten yang berubah sesuai bidang.
 * Untuk menambah bidang baru, lihat PANDUAN_PENGISIAN.md
 */

export type FieldId = 'qa' | 'it-support' | 'developer' | 'operations'

/** Section yang bisa diatur per bidang. Hero selalu tampil. */
export type SectionId = 'about' | 'skills' | 'experience' | 'projects' | 'contact'

export interface Stat {
  number: string
  label: string
}

export interface Skill {
  name: string
  icon: string
  description: string
  category: string
}

export interface Project {
  id: number // harus unik di dalam satu bidang
  title: string
  category: string
  description: string
  fullDescription: string
  tags: string[]
  year: string
  features: string[]
  image: string
  link: string
}

export interface ExperienceItem {
  id: number
  role: string
  company: string
  period: string
  description: string
  highlights: string[]
}

export interface FieldContent {
  id: FieldId
  /** Label di layar pilih bidang */
  label: string
  sublabel: string
  /** Teks kecil di atas nama pada hero section */
  heroTitle: string
  /** Section yang tampil dan urutannya. Hapus id untuk menyembunyikan section. */
  sections: SectionId[]
  about: {
    headingTop: string
    headingBottom: string
    badge: string
    paragraphs: string[]
  }
  cv: {
    file: string
    downloadName: string
  }
  stats: Stat[]
  skills: Skill[]
  tools: string[]
  projects: Project[]
  /** Isi section Experience. Tiap bidang boleh punya urutan dan sorotan berbeda. */
  experience: {
    work: ExperienceItem[]
    organization: ExperienceItem[]
    education: ExperienceItem[]
  }
}

/* ------------------------------------------------------------------ */
/* PROJECT (didefinisikan sekali, boleh dipakai di banyak bidang)      */
/* ------------------------------------------------------------------ */

const portfolioProject: Project = {
  id: 1,
  title: 'Persona Theme Portfolio',
  category: 'Frontend Development',
  description: 'An interactive and animated portfolio website inspired by the Persona game series UI/UX.',
  fullDescription:
    'This portfolio is a personal project designed to showcase my frontend development skills. It is built with Next.js and heavily utilizes Framer Motion for complex animations and page transitions, creating a dynamic and engaging user experience reminiscent of the Persona game series. The entire interface, from the custom cursor to the themed menus, is designed to be interactive and visually cohesive.',
  tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  year: '2026',
  features: [
    'Game-inspired UI/UX',
    'Complex animations & transitions',
    'Theme-switching functionality',
    'Interactive custom components',
  ],
  image: '/images/portfolio.webp',
  link: 'https://stevenyoe.is-a.dev/',
}

const pazarProject: Project = {
  id: 2,
  title: 'Pazar Brand & Company Website',
  category: 'Full-stack Development',
  description: 'Independently developed a complete company website with responsive design and robust backend system.',
  fullDescription:
    "As a Full-stack Developer, I independently designed and developed a comprehensive company website with a responsive user interface. I built a robust backend system integrated with a solid database architecture, significantly enhancing the company's digital presence through modern web technologies.",
  tags: ['Laravel', 'PHP', 'Tailwind CSS', 'MySQL'],
  year: '2025',
  features: [
    'Complete responsive company website',
    'Robust backend system',
    'Comprehensive database architecture',
    'Enhanced digital presence',
  ],
  image: '/images/pazar.webp',
  link: 'https://bumbupazar.com/',
}

const reseCornerProject: Project = {
  id: 3,
  title: "Rese Corner's Website",
  category: 'Project Management & Backend Development',
  description: 'Managed communication between development teams and developed backend systems.',
  fullDescription:
    'In this role, I served as both Project Manager and Programmer, overseeing the communication between backend and frontend development teams. My primary focus was on developing robust backend systems, and I also contributed to the frontend development efforts to ensure seamless integration and functionality.',
  tags: ['Laravel', 'PHP', 'MySQL'],
  year: '2024',
  features: [
    'Managed cross-team communication',
    'Developed core backend systems',
    'Assisted frontend integration',
    'Ensured seamless functionality',
  ],
  image: '/images/rese-corner.webp',
  link: 'http://resecorner.com/',
}

/* ------------------------------------------------------------------ */
/* EXPERIENCE (didefinisikan sekali, tiap bidang memilih dan menyesuaikan) */
/* ------------------------------------------------------------------ */

type ExperienceBase = Omit<ExperienceItem, 'id'>

/** Memberi id berurutan dan menerapkan perubahan khusus bidang. */
const numbered = (items: ExperienceBase[]): ExperienceItem[] =>
  items.map((item, i) => ({ ...item, id: i + 1 }))

const tweak = (base: ExperienceBase, patch: Partial<ExperienceBase>): ExperienceBase => ({ ...base, ...patch })

const globalLoyalty: ExperienceBase = {
  role: 'Product Operation Intern – Quality Assurance',
  company: 'PT Global Loyalty Indonesia',
  period: 'August 2025 – January 2026',
  description:
    'Focused on ensuring seamless user experiences and validating functional requirements within a high-traffic mobile application as a Product Operation Intern – Quality Assurance.',
  highlights: [
    'Executed manual and functional testing for Alfagift mobile app features',
    'Designed test scenarios and test cases, and re-ran failed cases after fixes',
    'Reported results and tracked defects in Jira with testing evidence',
    'Validated REST APIs with Postman and verified data using DBeaver, MongoDB, and Redis',
    'Prepared user guides for features covered by the assigned test scenarios',
  ],
}

const pristine: ExperienceBase = {
  role: 'IT Internship',
  company: 'PT Pristine Prima Lestari',
  period: 'March - July 2025',
  description:
    'Managed full-stack web development across the entire SDLC and provided technical support for company operations as an IT Intern.',
  highlights: [
    'Independently developed the Pazar company website and recruitment portal with Laravel, PHP, and MySQL',
    'Gathered requirements from internal departments and turned them into functional features',
    'Designed backend functionality and database structures using Laravel MVC and OOP',
    'Handled testing, deployment coordination, and maintenance',
    'Resolved office hardware and connectivity issues, including a PC-to-printer problem',
  ],
}

const samanasoft: ExperienceBase = {
  role: 'Web Development Internship',
  company: 'PT Samanasoft Inovasi Persada',
  period: 'June - July 2024',
  description:
    'Contributed to client web projects by developing and enhancing website features and producing tutorial materials.',
  highlights: [
    'Developed and enhanced website features based on client requirements',
    'Collaborated with the development team throughout feature implementation',
    'Produced tutorial materials and documentation to improve user understanding',
  ],
}

const rendyAudio: ExperienceBase = {
  role: 'Retail Store Operations & Sales Assistant (Part-time)',
  company: 'Rendy Audio',
  period: '2017 - Present',
  description:
    'Supports daily operations at a family-owned automotive audio retail store, from customer service to inventory and technical assistance.',
  highlights: [
    'Assisted customers in choosing audio products based on their needs and budgets',
    'Checked stock manually and reported low-stock items to support replenishment',
    'Received, checked, and organized incoming products to keep stock accurate',
    'Assisted technicians with installation and removal of automotive audio systems',
    'Supported sales activities with product information and customer inquiries',
  ],
}

// Dipakai bersama oleh semua bidang
const organizationExperience: ExperienceItem[] = numbered([
  {
    role: 'Equipment & Logistics Division',
    company: 'Outbound WMK FB UMN 2024 (Digital Entrepreneurship Event)',
    period: 'November 2024',
    description: 'Managed equipment and logistics for the digital entrepreneurship event.',
    highlights: ['Managed equipment and logistics'],
  },
  {
    role: 'Treasurer & Head of Multimedia Division',
    company: 'Inaugurasi 2024 (Senate Session Welcoming New Students)',
    period: 'January - August 2024',
    description: "Managed finances and led multimedia activities for the new student welcoming event 'Inaugurasi 2024'.",
    highlights: [
      'Managed event finances, budgeting, and fund allocation',
      'Led multimedia documentation and publication activities',
      'Supported other teams in a small cross-functional committee',
    ],
  },
  {
    role: 'Secretary & Treasurer',
    company: 'Anagata 2024 (New Student Orientation)',
    period: 'January - August 2024',
    description: "Served in key roles for the new student orientation event 'Anagata 2024', focusing on administration and finance.",
    highlights: [
      'Managed event administration, documentation, and budgeting',
      'Coordinated financial reporting across multiple committees',
      'Guided committee members on Front of House operations',
    ],
  },
  {
    role: 'Treasurer & Front of House (FoH)',
    company: 'ECLIVAL 2024 (E-Commerce Logistics Student Association Festival)',
    period: 'January - August 2024',
    description:
      'Handled finance and Front of House operations for ECLIVAL 2024, a large-scale festival organized by the E-Commerce Logistics Student Association.',
    highlights: [
      'Managed event budgeting, financial recording, and fund allocation',
      'Supported Front of House operations and event coordination',
      'Coordinated with multiple committees and stakeholders',
    ],
  },
  {
    role: 'Treasurer',
    company: 'E-Commerce Logistics Student Association',
    period: 'January 2023 - June 2024',
    description: 'Managed the financial affairs of the E-Commerce Logistics Student Association.',
    highlights: [
      'Managed budgeting, financial administration, and fund allocation',
      'Prepared transparent financial reporting',
      'Maintained financial accountability for organizational programs',
    ],
  },
  {
    role: 'Head of Fresh Money Division',
    company: 'Ashandya 2023 (Cultural Events)',
    period: 'July - December 2023',
    description: "Led fundraising initiatives for the cultural event 'Ashandya 2023'.",
    highlights: ['Led fundraising activities', 'Coordinated division members to meet event financial objectives'],
  },
  {
    role: 'Event Division',
    company: 'Anagata 2023 (New Student Orientation)',
    period: 'January - August 2023',
    description: 'Contributed to the event organization team for Anagata 2023.',
    highlights: ['Assisted in event planning and execution'],
  },
  {
    role: 'Committee',
    company: 'MNP Campus Visit Committee 2023',
    period: 'January, June, & August 2023',
    description: 'Served as a committee member for the MNP Campus Visit.',
    highlights: ['Contributed to campus visit organization'],
  },
])

// Dipakai bersama oleh semua bidang
const educationExperience: ExperienceItem[] = numbered([
  {
    role: 'E-Commerce Logistics (S.Tr.Log.)',
    company: 'Multimedia Nusantara Polytechnic',
    period: '2022 - 2026',
    description: 'Graduated with a strong academic record and was recognized as a scholarship recipient.',
    highlights: [
      'GPA: 3.81/4.0',
      'Scholarship recipient',
      'Declared Competent in Inventory Management (Pengelolaan Persediaan)',
    ],
  },
  {
    role: 'Certifications & Achievements',
    company: 'Various Platforms',
    period: '2023 - 2024',
    description: 'Participated in various online courses and training sessions to enhance technical skills and professional knowledge.',
    highlights: [
      'Samsung Innovation Campus Batch 5',
      'DQLab Data Analysis and Visualization',
      'Disaster Preparedness & Post-Disaster Resilience',
    ],
  },
])

/* ------------------------------------------------------------------ */
/* BIDANG                                                              */
/* ------------------------------------------------------------------ */

export const FIELDS: FieldContent[] = [
  /* ============================ QA ============================ */
  {
    id: 'qa',
    label: 'QA & TESTING',
    sublabel: 'Software & API Testing',
    heroTitle: 'IT QUALITY ASSURANCE',
    sections: ['about', 'skills', 'experience', 'projects', 'contact'],
    about: {
      headingTop: 'ENSURING',
      headingBottom: 'SOFTWARE QUALITY',
      badge: 'QA',
      paragraphs: [
        "I am an Applied Bachelor's graduate in E-Commerce Logistics with hands-on experience in software quality assurance and web development. I focus on manual and functional testing, REST API validation, and defect tracking.",
        'At PT Global Loyalty Indonesia I tested features of the Alfagift mobile app, designed test scenarios and test cases, and worked closely with developers and product teams through Jira. Analytical thinking and attention to detail guide how I test and report issues.',
      ],
    },
    cv: { file: '/cv/CV_Steven_QA.pdf', downloadName: 'CV_Steven_QA.pdf' },
    stats: [
      { number: '3', label: 'Internship Experience' },
      { number: '6', label: 'Months QA Internship' },
      { number: '3.81', label: 'GPA / 4.00' },
      { number: '5+', label: 'Web Projects' },
    ],
    skills: [
      {
        name: 'Manual & Functional Testing',
        icon: '✅',
        description:
          'Executed test scenarios and test cases for Alfagift mobile app features, reporting results with evidence and re-running failed cases after fixes.',
        category: 'Testing',
      },
      {
        name: 'Defect Tracking',
        icon: '🐞',
        description: 'Identified, documented, and tracked defects in Jira while collaborating with developers and product teams.',
        category: 'Testing',
      },
      {
        name: 'API Testing',
        icon: '🔌',
        description: 'REST API validation with Postman, plus data verification using DBeaver, MongoDB, and Redis.',
        category: 'API',
      },
      {
        name: 'Requirements & SDLC',
        icon: '📋',
        description: 'Requirements analysis and functional requirements, with an understanding of the full application lifecycle.',
        category: 'Process',
      },
      {
        name: 'Web Development',
        icon: '🌐',
        description: 'Laravel, PHP, and MySQL experience from building and maintaining company websites.',
        category: 'Development',
      },
      {
        name: 'Documentation',
        icon: '📝',
        description: 'Prepared user guides for features covered by the assigned test scenarios.',
        category: 'Documentation',
      },
    ],
    tools: [
      'Jira', 'Postman', 'DBeaver', 'Git', 'GitHub', 'VS Code',
      'Word', 'Excel', 'PowerPoint',
      'Google Colab', 'R Studio', 'Tableau', 'Power BI',
    ],
    projects: [reseCornerProject, pazarProject],
    experience: {
      work: numbered([globalLoyalty, tweak(pristine, {
        description: 'Handled the web application lifecycle from requirements analysis to testing and maintenance as an IT Intern.',
        highlights: [
          'Gathered requirements and translated them into functional features',
          'Developed and maintained the company website and recruitment portal with Laravel, PHP, and MySQL',
          'Performed debugging and testing based on user feedback and operational requirements',
        ],
      }), samanasoft]),
      organization: organizationExperience,
      education: educationExperience,
    },
  },

  /* ========================= IT SUPPORT ========================= */
  {
    id: 'it-support',
    label: 'IT SUPPORT',
    sublabel: 'Technician & Technical Support',
    heroTitle: 'IT SUPPORT & TECHNICIAN',
    sections: ['about', 'skills', 'experience', 'projects', 'contact'],
    about: {
      headingTop: 'KEEPING',
      headingBottom: 'SYSTEMS RUNNING',
      badge: 'SUPPORT',
      paragraphs: [
        "I am an Applied Bachelor's graduate in E-Commerce Logistics with hands-on experience in IT support, software troubleshooting, and web application maintenance. On my own laptop and PC I handle upgrades and repairs, from RAM and SSD to Wi-Fi card and thermal paste replacement.",
        'During my IT internship I supported office hardware, software, and connectivity issues, including a PC-to-printer problem, and I have helped at a family-owned automotive audio store since 2017. I learn fast and enjoy working through technical problems.',
      ],
    },
    cv: { file: '/cv/CV_Steven_IT_Technician.pdf', downloadName: 'CV_Steven_IT_Support.pdf' },
    stats: [
      { number: '3', label: 'Internship Experience' },
      { number: '8+', label: 'Years at Rendy Audio' },
      { number: '5', label: 'Hands-on Hardware Tasks' },
      { number: '3.81', label: 'GPA / 4.00' },
    ],
    skills: [
      {
        name: 'Hardware Troubleshooting',
        icon: '🔧',
        description: 'Laptop disassembly, RAM and SSD upgrades, Wi-Fi card and CPU thermal paste replacement through hands-on practice.',
        category: 'Hardware',
      },
      {
        name: 'IT Support',
        icon: '🖥️',
        description:
          'Basic support for office hardware, software, peripherals, and connectivity, including resolving a PC-to-printer connection problem.',
        category: 'Support',
      },
      {
        name: 'Networking Basics',
        icon: '📡',
        description: 'TCP/IP, LAN, Wi-Fi, and network connectivity troubleshooting.',
        category: 'Networking',
      },
      {
        name: 'Operating Systems',
        icon: '💿',
        description: 'Windows and basic Linux, OS installation and reinstallation, driver installation and configuration.',
        category: 'Systems',
      },
      {
        name: 'Application Support',
        icon: '🛠️',
        description: 'Application debugging, testing, and maintenance based on user feedback and operational needs.',
        category: 'Software',
      },
      {
        name: 'Equipment Handling',
        icon: '🔊',
        description: 'Assisted technicians with audio system installation, removal, and equipment preparation.',
        category: 'Equipment',
      },
      {
        name: 'Technical Documentation',
        icon: '📝',
        description: 'Prepared user guides and operational documentation for internal teams and end users.',
        category: 'Documentation',
      },
    ],
    tools: [
      'Odoo', 'Jira', 'Postman', 'DBeaver', 'VS Code', 'Git', 'GitHub',
      'Word', 'Excel', 'PowerPoint',
      'OBS Studio', 'vMix', 'Figma', 'Canva',
    ],
    projects: [pazarProject, reseCornerProject],
    experience: {
      work: numbered([
        tweak(pristine, {
          description: 'Provided IT support for office hardware, software, and connectivity while maintaining the company website and recruitment portal.',
          highlights: [
            'Troubleshot office hardware, software, peripherals, and connectivity issues',
            'Resolved a PC-to-printer connection problem',
            'Maintained the company website and recruitment portal (Laravel, PHP, MySQL)',
            'Debugged and enhanced applications based on user feedback',
            'Worked with internal departments to identify technical needs and practical solutions',
          ],
        }),
        tweak(globalLoyalty, {
          description: 'Tested mobile application features and produced documentation for internal teams and end users as a Product Operation Intern – Quality Assurance.',
          highlights: [
            'Tested Alfagift mobile app features against business requirements',
            'Documented and tracked defects in Jira',
            'Validated REST APIs with Postman and verified data in DBeaver, MongoDB, and Redis',
            'Prepared user guides and operational documentation',
          ],
        }),
        samanasoft,
        tweak(rendyAudio, {
          role: 'Technical & Retail Operations Assistant (Part-time)',
          description: 'Supports daily technical and retail operations involving automotive audio equipment.',
          highlights: [
            'Assisted technicians with audio system installation, removal, and equipment preparation',
            'Assisted customers with product selection and basic technical inquiries',
            'Supported daily technical and retail operations',
          ],
        }),
      ]),
      organization: organizationExperience,
      education: educationExperience,
    },
  },

  /* ========================= DEVELOPER ========================= */
  {
    id: 'developer',
    label: 'WEB DEVELOPER',
    sublabel: 'Web Development & Project Coordination',
    heroTitle: 'WEB DEVELOPER',
    sections: ['about', 'skills', 'experience', 'projects', 'contact'],
    about: {
      headingTop: 'BUILDING',
      headingBottom: 'WEB APPLICATIONS',
      badge: 'DEVELOPER',
      paragraphs: [
        "I am an Applied Bachelor's graduate in E-Commerce Logistics who builds and maintains web applications with Laravel, PHP, and MySQL. I am comfortable with MVC architecture, OOP, REST APIs, Git, and database design.",
        'I gather requirements, turn them into functional system design, and carry applications from planning to deployment, both on my own and in a team. I also bring a QA mindset and project coordination experience to every build.',
      ],
    },
    cv: { file: '/cv/CV_Steven_IT.pdf', downloadName: 'CV_Steven_Web_Developer.pdf' },
    stats: [
      { number: '3', label: 'Internship Experience' },
      { number: '5+', label: 'Web Projects' },
      { number: '3+', label: 'Happy Clients' },
      { number: '3.81', label: 'GPA / 4.00' },
    ],
    skills: [
      {
        name: 'Backend Development',
        icon: '⚙️',
        description: 'Laravel MVC, PHP, and OOP principles for backend functionality and REST API development.',
        category: 'Development',
      },
      {
        name: 'Frontend Development',
        icon: '🌐',
        description: 'ReactJS, Next.js, jQuery, HTML, and CSS for responsive user interfaces.',
        category: 'Development',
      },
      {
        name: 'Database Design',
        icon: '🗄️',
        description: 'MySQL, MariaDB, PostgreSQL, MongoDB, and Redis for data storage and structure.',
        category: 'Data',
      },
      {
        name: 'Requirements to Delivery',
        icon: '📋',
        description: 'Gathering user requirements and turning them into functional features, from planning through deployment.',
        category: 'Process',
      },
      {
        name: 'Programming Languages',
        icon: '💻',
        description: 'PHP, Python, C#, and JavaScript.',
        category: 'Language',
      },
      {
        name: 'Version Control & Testing',
        icon: '🔀',
        description: 'Git and GitHub for version control, with debugging, testing, and API validation using Postman.',
        category: 'Tools',
      },
      {
        name: 'Project Coordination',
        icon: '🤝',
        description: 'Coordinated team communication and monitored milestones as Project Manager and Programmer of the Rese Corner website.',
        category: 'Management',
      },
    ],
    tools: [
      'Git', 'GitHub', 'VS Code', 'DBeaver', 'Postman', 'Jira',
      'Figma', 'Canva', 'OBS Studio', 'vMix', 'Odoo', 'Linux', 'Google Analytics',
      'Google Colab', 'R Studio', 'Tableau', 'Power BI',
      'Word', 'Excel', 'PowerPoint',
    ],
    projects: [pazarProject, reseCornerProject, portfolioProject],
    experience: {
      work: numbered([
        pristine,
        tweak(globalLoyalty, {
          description: 'Tested new features of a high-traffic mobile application and collaborated with developers and product teams to improve product quality.',
          highlights: [
            'Designed test scenarios and test cases from functional requirements',
            'Tracked defects in Jira and worked with developers on resolution',
            'Validated REST APIs with Postman and verified data in DBeaver, MongoDB, and Redis',
          ],
        }),
        samanasoft,
      ]),
      organization: organizationExperience,
      education: educationExperience,
    },
  },

  /* ========================= OPERATIONS ========================= */
  {
    id: 'operations',
    label: 'OPS & LEADERSHIP',
    sublabel: 'Retail, Management Trainee & Team Leadership',
    heroTitle: 'OPERATIONS & TEAM LEADERSHIP',
    sections: ['about', 'skills', 'experience', 'projects', 'contact'],
    about: {
      headingTop: 'LEADING',
      headingBottom: 'RETAIL OPERATIONS',
      badge: 'LEADER',
      paragraphs: [
        "I am an Applied Bachelor's graduate in E-Commerce Logistics with hands-on retail operations experience from a family-owned automotive audio store, covering customer service, inventory support, and team coordination.",
        'In 2024 I held three executive committee roles in major university events at the same time, alongside treasurer duties, studies, and part-time work. I take ownership, adapt quickly, and lead from the field.',
      ],
    },
    cv: { file: '/cv/CV_Steven_Operations_Leadership.pdf', downloadName: 'CV_Steven_Operations_Leadership.pdf' },
    stats: [
      { number: '8+', label: 'Years Retail Experience' },
      { number: '3', label: 'Concurrent Event Roles' },
      { number: '4', label: 'Treasurer Roles' },
      { number: '3.81', label: 'GPA / 4.00' },
    ],
    skills: [
      {
        name: 'Retail & Store Operations',
        icon: '🏪',
        description: 'Supported daily operations at a family-owned automotive audio store since 2017, from store readiness to service delivery.',
        category: 'Operations',
      },
      {
        name: 'Customer Service',
        icon: '🛍️',
        description: 'Helped customers choose suitable products based on their needs and budgets and handled customer inquiries.',
        category: 'Customer',
      },
      {
        name: 'Inventory & Stock Control',
        icon: '📦',
        description: 'Manual stock checking, low-stock reporting, and organizing incoming products. Declared Competent in Inventory Management.',
        category: 'Inventory',
      },
      {
        name: 'Team Leadership',
        icon: '👥',
        description: 'Held three concurrent executive committee roles in 2024 and led the multimedia and fundraising divisions.',
        category: 'Leadership',
      },
      {
        name: 'Financial Administration',
        icon: '💰',
        description: 'Treasurer for the student association and major events: budgeting, fund allocation, and financial reporting.',
        category: 'Finance',
      },
      {
        name: 'Project & Operations Management',
        icon: '📊',
        description: 'Led planning and monitored milestones as Project Manager of the Rese Corner website, and coordinated cross-functional teams at events.',
        category: 'Management',
      },
      {
        name: 'Business Tools',
        icon: '🧾',
        description: 'Excel, PowerPoint, Tableau, Power BI, and Odoo for business analysis and reporting.',
        category: 'Tools',
      },
    ],
    tools: [
      'Excel', 'PowerPoint', 'Tableau', 'Power BI', 'Odoo',
      'Jira', 'Postman', 'DBeaver', 'GitHub', 'VS Code',
      'Canva', 'Figma', 'OBS Studio', 'vMix',
    ],
    projects: [reseCornerProject, pazarProject],
    experience: {
      work: numbered([
        rendyAudio,
        tweak(globalLoyalty, {
          description: 'Contributed to product quality through structured testing, execution discipline, and continuous feedback.',
          highlights: [
            'Executed manual testing for new features of the Alfagift mobile app',
            'Designed test scenarios and test cases from functional specifications',
            'Worked closely with developers and product teams to resolve defects',
            'Prepared user guides and operational documentation for internal teams and end users',
          ],
        }),
        tweak(pristine, {
          description: 'Worked with different departments to identify requirements and deliver practical digital solutions as an IT Intern.',
          highlights: [
            'Managed the full SDLC from planning and system design to deployment',
            'Designed database architecture and backend logic for business operations',
            'Provided technical support to keep daily operational activities running',
          ],
        }),
        samanasoft,
      ]),
      organization: organizationExperience,
      education: educationExperience,
    },
  },
]

export const DEFAULT_FIELD: FieldId = 'qa'

export function getFieldContent(id: FieldId | null | undefined): FieldContent {
  return FIELDS.find((f) => f.id === id) ?? FIELDS.find((f) => f.id === DEFAULT_FIELD)!
}
