const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  {
    id: "safari",
    name: "Safari", // was "Safari"
    icon: "safari.png",
    canOpen: true,
  },
  {
    id: "photos",
    name: "Gallery", // was "Photos"
    icon: "photos.png",
    canOpen: true,
  },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  {
    id: "trash",
    name: "Archive", // was "Trash"
    icon: "trash.png",
    canOpen: false,
  },
];

const projects = [
  {
    id: 1,
    title: "NewTube",
    description:
      "A modern video streaming application built with Next.js, Tailwind CSS, tRPC, and PostgreSQL.",
    image: "/projects/newtube.png",
    link: "https://newtube-ruddy.vercel.app/",
    github: "https://github.com/kuldeeprajput-dev/newtube",
  },
  {
    id: 2,
    title: "Free Course Finder",
    description:
      "An AI-powered learning platform to discover free courses from multiple sources.",
    image: "/projects/snsta.png",
    link: "https://snsta.vercel.app/",
    github: "https://github.com/kuldeeprajput-dev/insta-things-downloader",
  },
  {
    id: 3,
    title: "Resume Ats Scanner",
    description:
      "AI-powered resume parsing and analysis platform optimized for ATS.",
    image: "/projects/resumeats.png",
    link: "https://resume-ats-omega.vercel.app/",
    github: "https://github.com/kuldeeprajput-dev/resume-ats-scanner",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript"],
  },
  // {
  //   category: "Mobile",
  //   items: ["React Native", "Expo"],
  // },
  {
    category: "Styling",
    items: ["Tailwind CSS", "Sass", "CSS"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "Rest API", "Bun", "TRPC"],
  },
  {
    category: "Database",
    items: ["MongoDB", "PostgreSQL"],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/kuldeeprajput-dev",
    img: "/images/github.png",
  },
  {
    id: 2,
    text: "Platform",
    icon: "/icons/atom.svg",
    bg: "#4bcb63",
    link: "#",
    img: "/images/youtube.png",
  },
  {
    id: 3,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/kuldeepdotcom",
    img: "/images/x.png",
  },
  {
    id: 4,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://linkedin.com/in/kuldeep-rajput-24196537b",
    img: "/images/linkedin.png",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  projects,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "NewTube",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "NewTube Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "This platform is a modern video streaming application built for performance, scalability, and user engagement. It features an advanced video player with quality controls, playback speed, picture-in-picture, and keyboard shortcuts for a smooth experience. Powered by Mux, videos are processed, optimized, and delivered globally via a fast CDN.",
            "It includes AI-powered tools for thumbnail generation, title suggestions, and description optimization, helping creators boost discoverability. The Creator Studio provides analytics, engagement metrics, and growth tracking. ",
            "Built with Next.js, Tailwind CSS, tRPC, and PostgreSQL, it ensures a fast, responsive, and scalable architecture across all devices.",
          ],
        },
        {
          id: 2,
          name: "newtube.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://newtube-ruddy.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "newtube.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/projects/newtube.png",
          imageMobUrl: "/projects/mobile/newtube-mob.png",
        },
        {
          id: 5,
          name: "github.com",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/kuldeeprajput-dev/newtube",
          position: "top-60 right-20",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "Snsta",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-52 right-80",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "Snsta Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "Download photos, videos, and reels from Instagram easily with a fast, user-friendly web app.",

            "Simply paste the link and get high-quality content instantly without any login or hassle. ",

            "Designed for speed, reliability, and convenience, this tool lets you save your favorite Instagram media anytime, anywhere, in just a few quick clicks.",
          ],
        },
        {
          id: 2,
          name: "snsta.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://snsta.vercel.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "snsta.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/projects/snsta.png",
          imageMobUrl: "/projects/mobile/snsta-mob.png",
        },
        {
          id: 5,
          name: "github.com",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/kuldeeprajput-dev/insta-things-downloader",
          position: "top-60 left-5",
        },
      ],
    },

    // ▶ Project 3
    {
      id: 7,
      name: "Resume Ats Scanner",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-7",
      children: [
        {
          id: 1,
          name: "Resume Ats Scanner Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "This is an AI-powered resume parsing and analysis platform designed to help job seekers optimize their resumes for Applicant Tracking Systems (ATS).",
            "It extracts key information from uploaded resumes, analyzes them against job descriptions, and provides detailed feedback on keyword optimization, formatting issues, and content improvements.",
            "Built with Gemini API, it ensures accurate parsing and intelligent scoring, helping users increase their chances of passing through automated screening processes.",
          ],
        },
        {
          id: 2,
          name: "resumeatsscanner.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://resume-ats-omega.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "resumeatsscanner.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/projects/resumeats.png",
          imageMobUrl: "/projects/mobile/resume-ats-mob.png",
        },
        {
          id: 5,
          name: "github.com",
          icon: "/images/github.png",
          kind: "file",
          fileType: "fig",
          href: "https://github.com/kuldeeprajput-dev/resume-ats-scanner",
          position: "top-60 right-20",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      description: [
        "Hey! I’m Kuldeep 👋, a web developer who enjoys building sleek, interactive websites that actually work well.",
        "I specialize in JavaScript, React, and Next.js—and I love making things feel smooth, fast, and just a little bit delightful.",
        "Outside of dev work, you'll find me tweaking layouts at 2AM, sipping overpriced coffee, or impulse-buying gadgets I absolutely convinced myself I needed 😅",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "trash1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "trash2.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
