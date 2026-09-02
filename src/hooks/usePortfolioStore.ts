import { useState, useEffect, useCallback } from "react";
import { supabase, getFromSupabase, saveToSupabase } from "../lib/supabase";

export interface ProjectItem {
  id: string;
  name: string;
  tag: string;
  desc: string;
  details?: string;
  stack: string[];
  accent: string;
  img: string;
  alt: string;
  demoUrl?: string;
  githubUrl?: string;
}

export interface CertItem {
  id: string;
  name: string;
  issuer: string;
  year: string;
  icon: string;
  color: string;
  bg: string;
  credentialUrl?: string;
}

export interface CompetitiveStats {
  totalSolved: number;
  leetcode: {
    handle: string;
    solved: number;
    rating: number;
    ranking: number;
    easy: number;
    medium: number;
    hard: number;
  };
  codechef: {
    handle: string;
    solved: number;
    rating: number;
    stars: string;
  };
  codeforces: {
    handle: string;
    rating: number;
    maxRating: number;
    rank: string;
  };
  hackerrank: {
    handle: string;
    solved: number;
    badges: string;
  };
  geeksforgeeks: {
    handle: string;
    solved: number;
    score: number;
  };
}

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  bio1: string;
  bio2: string;
  cgpa: string;
  problemsCount: string;
  projectsCount: string;
  university: string;
  degree: string;
  class12: string;
  class12Score: string;
  email: string;
  github: string;
  linkedin: string;
  leetcode: string;
  codechef: string;
  codeforces: string;
  hackerrank: string;
  geeksforgeeks: string;
  resumeUrl: string;
}

export const DEFAULT_COMPETITIVE_STATS: CompetitiveStats = {
  totalSolved: 674,
  leetcode: {
    handle: "srujithcoder",
    solved: 360,
    rating: 1451,
    ranking: 376165,
    easy: 228,
    medium: 128,
    hard: 4,
  },
  codechef: {
    handle: "bvs_coder",
    solved: 208,
    rating: 1247,
    stars: "1★ / Div 4",
  },
  codeforces: {
    handle: "Bvs2006",
    rating: 1240,
    maxRating: 1240,
    rank: "Pupil",
  },
  hackerrank: {
    handle: "srujith7780",
    solved: 48,
    badges: "5 Badges (Problem Solving Gold ★, 3★ Java, 3★ SQL, 3★ C)",
  },
  geeksforgeeks: {
    handle: "bvs2006",
    solved: 58,
    score: 162,
  },
};

export const DEFAULT_PERSONAL_INFO: PersonalInfo = {
  name: "Venkata Srujith Bellamkonda",
  title: "AI & ML Engineer · Full-Stack Developer",
  tagline: "Building at the intersection of intelligent algorithms and scalable software — specializing in AI/ML, competitive programming, and modern full-stack systems.",
  bio1: "I'm Srujith — a B.Tech AI & ML student at Aditya University (CGPA 8.87) passionate about machine learning, competitive algorithms, and engineering resilient digital products.",
  bio2: "674+ competitive programming problems solved across six platforms (360 LeetCode, 208 CodeChef, 58 GFG, 48 HackerRank), supervised ML models with scikit-learn, and full-stack apps in React, Java, C++, and Python.",
  cgpa: "8.87",
  problemsCount: "674",
  projectsCount: "6",
  university: "Aditya University, Surampalem",
  degree: "B.Tech · AI & ML · 2024–Present",
  class12: "Narayana Jr. College · 95.8%",
  class12Score: "95.8%",
  email: "venkatasrujithb@gmail.com",
  github: "https://github.com/Bvs2006",
  linkedin: "https://linkedin.com/in/venkata-srujith-bellamkonda-b78626336/",
  leetcode: "https://leetcode.com/srujithcoder",
  codechef: "https://www.codechef.com/users/bvs_coder",
  codeforces: "https://codeforces.com/profile/Bvs2006",
  hackerrank: "https://www.hackerrank.com/profile/srujith7780",
  geeksforgeeks: "https://www.geeksforgeeks.org/user/bvs2006/",
  resumeUrl: "https://drive.google.com/file/d/1_ExampleResumeLink/view?usp=sharing",
};

export const DEFAULT_PROJECTS: ProjectItem[] = [
  {
    id: "proj-1",
    name: "Movie Sentiment Classifier",
    tag: "AI / ML · Python",
    desc: "Logistic Regression & Naive Bayes on 50k IMDb samples with TF-IDF vectorization, 88%+ accuracy, full NLTK preprocessing pipeline.",
    details: "Built end-to-end sentiment classification using Natural Language Processing. Tokenized text, removed stop words, performed lemmatization, and generated TF-IDF matrices to benchmark Naive Bayes, Logistic Regression, and SVM classifiers.",
    stack: ["Python", "scikit-learn", "NLTK", "TF-IDF", "NumPy"],
    accent: "#6366f1",
    img: "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?w=600&h=340&fit=crop&auto=format",
    alt: "Neural network abstract visualization",
    githubUrl: "https://github.com/Bvs2006/movie-sentiment-classifier",
  },
  {
    id: "proj-2",
    name: "NoteWise",
    tag: "Full Stack · React",
    desc: "Teacher-student collaboration platform with role-based access control and real-time Firebase features. 35% engagement increase.",
    details: "Interactive classroom and study management portal featuring live notes sharing, assignment submissions, RBAC security rules, and real-time Firestore database synchronization.",
    stack: ["React", "Firebase", "Firestore", "RBAC", "Tailwind CSS"],
    accent: "#06b6d4",
    img: "https://images.unsplash.com/photo-1551721434-8b94ddff0e6d?w=600&h=340&fit=crop&auto=format",
    alt: "Person using notes app",
    demoUrl: "https://notewise.demo.app",
    githubUrl: "https://github.com/Bvs2006/notewise",
  },
  {
    id: "proj-3",
    name: "Emporium",
    tag: "Full Stack · React",
    desc: "Multi-vendor e-commerce with Admin / Vendor / Customer roles, REST APIs, and MongoDB backend.",
    details: "Complete e-commerce platform with product catalogs, shopping cart, vendor management dashboard, inventory tracking, and payment processing flow.",
    stack: ["React", "Node.js", "Express", "MongoDB", "REST API"],
    accent: "#f43f5e",
    img: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=340&fit=crop&auto=format",
    alt: "Online shopping with laptop",
    githubUrl: "https://github.com/Bvs2006/emporium-ecommerce",
  },
  {
    id: "proj-4",
    name: "Mini GameHub",
    tag: "Systems · C++",
    desc: "Console game suite — Tic-Tac-Toe, Minesweeper, Sliding Puzzle, Match-3 — from scratch with clean game-loop architecture.",
    details: "High-performance modular console games engineered in modern C++ with object-oriented abstractions, state machines, and algorithmic solvers for AI opponents.",
    stack: ["C++", "OOP", "Game Logic", "Algorithms"],
    accent: "#f59e0b",
    img: "https://images.unsplash.com/photo-1498736297812-3a08021f206f?w=600&h=340&fit=crop&auto=format",
    alt: "Retro arcade cabinets",
    githubUrl: "https://github.com/Bvs2006/mini-gamehub",
  },
  {
    id: "proj-5",
    name: "Resume Builder GUI",
    tag: "Desktop · Java",
    desc: "GUI resume generator with Java Swing, OOP principles and Collections Framework for dynamic section management.",
    details: "Desktop application allowing users to input career details, select formatted templates, preview resume layouts, and export cleanly formatted documents.",
    stack: ["Java", "Swing", "OOP", "Collections API"],
    accent: "#10b981",
    img: "https://images.unsplash.com/photo-1698047681432-006d2449c631?w=600&h=340&fit=crop&auto=format",
    alt: "Professional reviewing a resume",
    githubUrl: "https://github.com/Bvs2006/resume-builder-java",
  },
  {
    id: "proj-6",
    name: "Swing MySQL CRUD App",
    tag: "Desktop · Java",
    desc: "Full-featured desktop app with JDBC integration supporting complete CRUD operations against a MySQL database.",
    details: "Enterprise-grade client-side management interface with prepared statements, SQL transaction handling, connection pooling, and table data binding.",
    stack: ["Java", "MySQL", "JDBC", "SQL"],
    accent: "#8b5cf6",
    img: "https://images.unsplash.com/photo-1639066648921-82d4500abf1a?w=600&h=340&fit=crop&auto=format",
    alt: "Server room",
    githubUrl: "https://github.com/Bvs2006/swing-mysql-crud",
  },
];

export const DEFAULT_CERTS: CertItem[] = [
  {
    id: "cert-1",
    name: "Red Hat Certified System Administrator (RHCSA)",
    issuer: "Red Hat",
    year: "2024",
    icon: "🎓",
    color: "#ef4444",
    bg: "rgba(239, 68, 68, 0.12)",
    credentialUrl: "https://drive.google.com/file/d/1_RedHatCert/view?usp=sharing",
  },
  {
    id: "cert-2",
    name: "Microsoft Office Specialist: Excel 2019 Associate",
    issuer: "Microsoft",
    year: "2024",
    icon: "📊",
    color: "#0284c7",
    bg: "rgba(2, 132, 199, 0.12)",
    credentialUrl: "https://drive.google.com/file/d/1_MOSExcelCert/view?usp=sharing",
  },
  {
    id: "cert-3",
    name: "Microsoft Certified: Power Platform Fundamentals",
    issuer: "Microsoft",
    year: "2024",
    icon: "⚡",
    color: "#9333ea",
    bg: "rgba(147, 51, 234, 0.12)",
    credentialUrl: "https://drive.google.com/file/d/1_PowerPlatformCert/view?usp=sharing",
  },
  {
    id: "cert-4",
    name: "SQL (Basic) Certificate",
    issuer: "HackerRank",
    year: "2023",
    icon: "🗄️",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.12)",
    credentialUrl: "https://www.hackerrank.com/certificates",
  },
  {
    id: "cert-5",
    name: "Problem Solving (Basic) Certificate",
    issuer: "HackerRank",
    year: "2023",
    icon: "🧩",
    color: "#10b981",
    bg: "rgba(16, 185, 129, 0.12)",
    credentialUrl: "https://www.hackerrank.com/certificates",
  },
  {
    id: "cert-6",
    name: "C Essentials Programming",
    issuer: "Cisco Networking Academy",
    year: "2023",
    icon: "🔷",
    color: "#3b82f6",
    bg: "rgba(59, 130, 246, 0.12)",
    credentialUrl: "https://drive.google.com/file/d/1_CiscoCCert/view?usp=sharing",
  },
  {
    id: "cert-7",
    name: "C++ Essentials Programming",
    issuer: "Cisco Networking Academy",
    year: "2023",
    icon: "🔶",
    color: "#f59e0b",
    bg: "rgba(245, 158, 11, 0.12)",
    credentialUrl: "https://drive.google.com/file/d/1_CiscoCppCert/view?usp=sharing",
  },
];

export const DEFAULT_SKILLS: Record<string, string[]> = {
  Languages: ["C++ (OOP & STL)", "Java", "Python", "SQL", "TypeScript", "JavaScript"],
  Frontend: ["React.js", "Tailwind CSS", "HTML5", "CSS3", "Vite"],
  Databases: ["MongoDB", "MySQL", "Oracle SQL", "Firebase Firestore"],
  "AI / ML": ["scikit-learn", "NLTK", "TF-IDF", "NumPy", "Pandas", "Feature Engineering"],
  Tools: ["Git & GitHub", "MS Excel", "Java Swing", "JDBC", "REST APIs", "VS Code"],
  "CS Core": ["DSA", "Algorithms", "OOP", "OS Concepts", "System Design Basics"],
};

export const STORAGE_KEYS = {
  PERSONAL: "personal_info",
  PROJECTS: "projects_data",
  CERTS: "certs_data",
  SKILLS: "skills_data",
  COMPETITIVE: "competitive_data",
};

const SYNC_EVENT = "portfolio_store_sync_event";

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`portfolio_${key}_v5`);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      return { ...fallback, ...parsed };
    }
    return parsed;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`portfolio_${key}_v5`, JSON.stringify(val));
    window.dispatchEvent(new CustomEvent(SYNC_EVENT));
  } catch {
    // ignore
  }
}

export function usePortfolioStore() {
  const [personalInfo, setPersonalInfoState] = useState<PersonalInfo>(() =>
    readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO)
  );

  const [projects, setProjectsState] = useState<ProjectItem[]>(() =>
    readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS)
  );

  const [certs, setCertsState] = useState<CertItem[]>(() =>
    readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS)
  );

  const [skills, setSkillsState] = useState<Record<string, string[]>>(() =>
    readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS)
  );

  const [competitiveStats, setCompetitiveStatsState] = useState<CompetitiveStats>(() =>
    readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS)
  );

  // Sync from Supabase on mount
  useEffect(() => {
    let isMounted = true;
    async function loadCloudData() {
      try {
        const [cloudPersonal, cloudProjects, cloudCerts, cloudSkills, cloudCompetitive] = await Promise.all([
          getFromSupabase(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO),
          getFromSupabase(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS),
          getFromSupabase(STORAGE_KEYS.CERTS, DEFAULT_CERTS),
          getFromSupabase(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS),
          getFromSupabase(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS),
        ]);

        if (isMounted) {
          if (cloudPersonal) {
            setPersonalInfoState(cloudPersonal);
            writeLocal(STORAGE_KEYS.PERSONAL, cloudPersonal);
          }
          if (cloudProjects && Array.isArray(cloudProjects)) {
            setProjectsState(cloudProjects);
            writeLocal(STORAGE_KEYS.PROJECTS, cloudProjects);
          }
          if (cloudCerts && Array.isArray(cloudCerts)) {
            setCertsState(cloudCerts);
            writeLocal(STORAGE_KEYS.CERTS, cloudCerts);
          }
          if (cloudSkills) {
            setSkillsState(cloudSkills);
            writeLocal(STORAGE_KEYS.SKILLS, cloudSkills);
          }
          if (cloudCompetitive) {
            setCompetitiveStatsState(cloudCompetitive);
            writeLocal(STORAGE_KEYS.COMPETITIVE, cloudCompetitive);
          }
        }
      } catch (err) {
        console.warn("Could not load from Supabase cloud:", err);
      }
    }

    loadCloudData();

    // Setup Supabase Realtime subscription
    const channel = supabase
      .channel("portfolio_content_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        (payload) => {
          const newRow = payload.new as { key?: string; data?: unknown };
          if (newRow && newRow.key && newRow.data) {
            if (newRow.key === STORAGE_KEYS.PERSONAL) {
              setPersonalInfoState(newRow.data as PersonalInfo);
              writeLocal(STORAGE_KEYS.PERSONAL, newRow.data);
            } else if (newRow.key === STORAGE_KEYS.PROJECTS) {
              setProjectsState(newRow.data as ProjectItem[]);
              writeLocal(STORAGE_KEYS.PROJECTS, newRow.data);
            } else if (newRow.key === STORAGE_KEYS.CERTS) {
              setCertsState(newRow.data as CertItem[]);
              writeLocal(STORAGE_KEYS.CERTS, newRow.data);
            } else if (newRow.key === STORAGE_KEYS.SKILLS) {
              setSkillsState(newRow.data as Record<string, string[]>);
              writeLocal(STORAGE_KEYS.SKILLS, newRow.data);
            } else if (newRow.key === STORAGE_KEYS.COMPETITIVE) {
              setCompetitiveStatsState(newRow.data as CompetitiveStats);
              writeLocal(STORAGE_KEYS.COMPETITIVE, newRow.data);
            }
          }
        }
      )
      .subscribe();

    return () => {
      isMounted = false;
      supabase.removeChannel(channel);
    };
  }, []);

  // Sync state whenever storage or custom sync event fires
  const reloadFromStorage = useCallback(() => {
    setPersonalInfoState(readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO));
    setProjectsState(readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS));
    setCertsState(readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS));
    setSkillsState(readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS));
    setCompetitiveStatsState(readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS));
  }, []);

  useEffect(() => {
    const handleSync = () => reloadFromStorage();
    window.addEventListener(SYNC_EVENT, handleSync);
    window.addEventListener("storage", handleSync);
    return () => {
      window.removeEventListener(SYNC_EVENT, handleSync);
      window.removeEventListener("storage", handleSync);
    };
  }, [reloadFromStorage]);

  // Actions that write to local cache AND save to Supabase cloud
  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    const current = readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    const next = { ...current, ...info };
    setPersonalInfoState(next);
    writeLocal(STORAGE_KEYS.PERSONAL, next);
    saveToSupabase(STORAGE_KEYS.PERSONAL, next);
  };

  const updateCompetitiveStats = (stats: Partial<CompetitiveStats>) => {
    const current = readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
    const next = { ...current, ...stats };
    setCompetitiveStatsState(next);
    writeLocal(STORAGE_KEYS.COMPETITIVE, next);
    saveToSupabase(STORAGE_KEYS.COMPETITIVE, next);
  };

  const addProject = (project: Omit<ProjectItem, "id">) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const newProject: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    const next = [newProject, ...current];
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const next = current.map((p) => (p.id === id ? { ...p, ...project } : p));
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const deleteProject = (id: string) => {
    const current = readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    const next = current.filter((p) => p.id !== id);
    setProjectsState(next);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const addCert = (cert: Omit<CertItem, "id">) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const newCert: CertItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    const next = [newCert, ...current];
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const updateCert = (id: string, cert: Partial<CertItem>) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const next = current.map((c) => (c.id === id ? { ...c, ...cert } : c));
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const deleteCert = (id: string) => {
    const current = readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    const next = current.filter((c) => c.id !== id);
    setCertsState(next);
    writeLocal(STORAGE_KEYS.CERTS, next);
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const updateSkillCategory = (category: string, items: string[]) => {
    const current = readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    const next = { ...current, [category]: items };
    setSkillsState(next);
    writeLocal(STORAGE_KEYS.SKILLS, next);
    saveToSupabase(STORAGE_KEYS.SKILLS, next);
  };

  const deleteSkillCategory = (category: string) => {
    const current = readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    const next = { ...current };
    delete next[category];
    setSkillsState(next);
    writeLocal(STORAGE_KEYS.SKILLS, next);
    saveToSupabase(STORAGE_KEYS.SKILLS, next);
  };

  const resetToDefaults = () => {
    setPersonalInfoState(DEFAULT_PERSONAL_INFO);
    setProjectsState(DEFAULT_PROJECTS);
    setCertsState(DEFAULT_CERTS);
    setSkillsState(DEFAULT_SKILLS);
    setCompetitiveStatsState(DEFAULT_COMPETITIVE_STATS);
    writeLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    writeLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    writeLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    writeLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    writeLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
    saveToSupabase(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    saveToSupabase(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    saveToSupabase(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    saveToSupabase(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    saveToSupabase(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
  };

  const exportAllData = () => {
    return JSON.stringify(
      {
        personalInfo,
        projects,
        certs,
        skills,
        competitiveStats,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importAllData = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.personalInfo) {
        setPersonalInfoState(data.personalInfo);
        writeLocal(STORAGE_KEYS.PERSONAL, data.personalInfo);
        saveToSupabase(STORAGE_KEYS.PERSONAL, data.personalInfo);
      }
      if (data.projects && Array.isArray(data.projects)) {
        setProjectsState(data.projects);
        writeLocal(STORAGE_KEYS.PROJECTS, data.projects);
        saveToSupabase(STORAGE_KEYS.PROJECTS, data.projects);
      }
      if (data.certs && Array.isArray(data.certs)) {
        setCertsState(data.certs);
        writeLocal(STORAGE_KEYS.CERTS, data.certs);
        saveToSupabase(STORAGE_KEYS.CERTS, data.certs);
      }
      if (data.skills && typeof data.skills === "object") {
        setSkillsState(data.skills);
        writeLocal(STORAGE_KEYS.SKILLS, data.skills);
        saveToSupabase(STORAGE_KEYS.SKILLS, data.skills);
      }
      if (data.competitiveStats) {
        setCompetitiveStatsState(data.competitiveStats);
        writeLocal(STORAGE_KEYS.COMPETITIVE, data.competitiveStats);
        saveToSupabase(STORAGE_KEYS.COMPETITIVE, data.competitiveStats);
      }
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  return {
    personalInfo,
    projects,
    certs,
    skills,
    competitiveStats,
    updatePersonalInfo,
    updateCompetitiveStats,
    addProject,
    updateProject,
    deleteProject,
    addCert,
    updateCert,
    deleteCert,
    updateSkillCategory,
    deleteSkillCategory,
    resetToDefaults,
    exportAllData,
    importAllData,
  };
}
