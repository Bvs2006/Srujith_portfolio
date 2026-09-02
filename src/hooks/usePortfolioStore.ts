import { useSyncExternalStore } from "react";
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

export interface PortfolioState {
  personalInfo: PersonalInfo;
  projects: ProjectItem[];
  certs: CertItem[];
  skills: Record<string, string[]>;
  competitiveStats: CompetitiveStats;
}

function readLocal<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(`portfolio_${key}_v5`);
    if (!saved) return fallback;
    const parsed = JSON.parse(saved);
    if (typeof fallback === "object" && fallback !== null && !Array.isArray(fallback)) {
      return { ...fallback, ...parsed };
    }
    return Array.isArray(fallback) ? (Array.isArray(parsed) ? parsed : fallback) : parsed;
  } catch {
    return fallback;
  }
}

function writeLocal<T>(key: string, val: T): void {
  try {
    localStorage.setItem(`portfolio_${key}_v5`, JSON.stringify(val));
  } catch {
    // ignore
  }
}

// ── Singleton Global Store ───────────────────────────────────────────────────
let globalState: PortfolioState = {
  personalInfo: readLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO),
  projects: readLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS),
  certs: readLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS),
  skills: readLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS),
  competitiveStats: readLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS),
};

const listeners = new Set<() => void>();

function notify() {
  listeners.forEach((l) => l());
}

function updateGlobalState(partial: Partial<PortfolioState>) {
  globalState = { ...globalState, ...partial };
  notify();
}

let hasInitializedCloud = false;

function initCloudSync() {
  if (hasInitializedCloud) return;
  hasInitializedCloud = true;

  // Initial load from Supabase
  Promise.all([
    getFromSupabase(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO),
    getFromSupabase(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS),
    getFromSupabase(STORAGE_KEYS.CERTS, DEFAULT_CERTS),
    getFromSupabase(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS),
    getFromSupabase(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS),
  ])
    .then(([cloudPersonal, cloudProjects, cloudCerts, cloudSkills, cloudCompetitive]) => {
      const updated: Partial<PortfolioState> = {};
      if (cloudPersonal) {
        updated.personalInfo = { ...DEFAULT_PERSONAL_INFO, ...cloudPersonal };
        writeLocal(STORAGE_KEYS.PERSONAL, updated.personalInfo);
      }
      if (cloudProjects && Array.isArray(cloudProjects)) {
        updated.projects = cloudProjects;
        writeLocal(STORAGE_KEYS.PROJECTS, cloudProjects);
      }
      if (cloudCerts && Array.isArray(cloudCerts)) {
        updated.certs = cloudCerts;
        writeLocal(STORAGE_KEYS.CERTS, cloudCerts);
      }
      if (cloudSkills && typeof cloudSkills === "object") {
        updated.skills = { ...DEFAULT_SKILLS, ...cloudSkills };
        writeLocal(STORAGE_KEYS.SKILLS, updated.skills);
      }
      if (cloudCompetitive) {
        updated.competitiveStats = { ...DEFAULT_COMPETITIVE_STATS, ...cloudCompetitive };
        writeLocal(STORAGE_KEYS.COMPETITIVE, updated.competitiveStats);
      }
      updateGlobalState(updated);
    })
    .catch((err) => console.warn("Supabase fetch warning:", err));

  // Supabase Realtime Listener
  try {
    supabase
      .channel("portfolio_global_changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "portfolio_content" },
        (payload) => {
          const row = payload.new as { key?: string; data?: unknown };
          if (row?.key && row?.data) {
            const updated: Partial<PortfolioState> = {};
            if (row.key === STORAGE_KEYS.PERSONAL) {
              updated.personalInfo = { ...DEFAULT_PERSONAL_INFO, ...(row.data as object) };
              writeLocal(STORAGE_KEYS.PERSONAL, updated.personalInfo);
            } else if (row.key === STORAGE_KEYS.PROJECTS && Array.isArray(row.data)) {
              updated.projects = row.data as ProjectItem[];
              writeLocal(STORAGE_KEYS.PROJECTS, updated.projects);
            } else if (row.key === STORAGE_KEYS.CERTS && Array.isArray(row.data)) {
              updated.certs = row.data as CertItem[];
              writeLocal(STORAGE_KEYS.CERTS, updated.certs);
            } else if (row.key === STORAGE_KEYS.SKILLS && typeof row.data === "object") {
              updated.skills = { ...DEFAULT_SKILLS, ...(row.data as object) };
              writeLocal(STORAGE_KEYS.SKILLS, updated.skills);
            } else if (row.key === STORAGE_KEYS.COMPETITIVE && typeof row.data === "object") {
              updated.competitiveStats = { ...DEFAULT_COMPETITIVE_STATS, ...(row.data as object) };
              writeLocal(STORAGE_KEYS.COMPETITIVE, updated.competitiveStats);
            }
            updateGlobalState(updated);
          }
        }
      )
      .subscribe();
  } catch (err) {
    console.warn("Supabase realtime subscription warning:", err);
  }
}

// Subscribe helper for useSyncExternalStore
function subscribe(listener: () => void) {
  listeners.add(listener);
  initCloudSync();
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot(): PortfolioState {
  return globalState;
}

export function usePortfolioStore() {
  const state = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    const next = { ...state.personalInfo, ...info };
    writeLocal(STORAGE_KEYS.PERSONAL, next);
    updateGlobalState({ personalInfo: next });
    saveToSupabase(STORAGE_KEYS.PERSONAL, next);
  };

  const updateCompetitiveStats = (stats: Partial<CompetitiveStats>) => {
    const next = { ...state.competitiveStats, ...stats };
    writeLocal(STORAGE_KEYS.COMPETITIVE, next);
    updateGlobalState({ competitiveStats: next });
    saveToSupabase(STORAGE_KEYS.COMPETITIVE, next);
  };

  const addProject = (project: Omit<ProjectItem, "id">) => {
    const newProject: ProjectItem = {
      ...project,
      id: `proj-${Date.now()}`,
    };
    const next = [newProject, ...state.projects];
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    updateGlobalState({ projects: next });
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const updateProject = (id: string, project: Partial<ProjectItem>) => {
    const next = state.projects.map((p) => (p.id === id ? { ...p, ...project } : p));
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    updateGlobalState({ projects: next });
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const deleteProject = (id: string) => {
    const next = state.projects.filter((p) => p.id !== id);
    writeLocal(STORAGE_KEYS.PROJECTS, next);
    updateGlobalState({ projects: next });
    saveToSupabase(STORAGE_KEYS.PROJECTS, next);
  };

  const addCert = (cert: Omit<CertItem, "id">) => {
    const newCert: CertItem = {
      ...cert,
      id: `cert-${Date.now()}`,
    };
    const next = [newCert, ...state.certs];
    writeLocal(STORAGE_KEYS.CERTS, next);
    updateGlobalState({ certs: next });
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const updateCert = (id: string, cert: Partial<CertItem>) => {
    const next = state.certs.map((c) => (c.id === id ? { ...c, ...cert } : c));
    writeLocal(STORAGE_KEYS.CERTS, next);
    updateGlobalState({ certs: next });
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const deleteCert = (id: string) => {
    const next = state.certs.filter((c) => c.id !== id);
    writeLocal(STORAGE_KEYS.CERTS, next);
    updateGlobalState({ certs: next });
    saveToSupabase(STORAGE_KEYS.CERTS, next);
  };

  const updateSkillCategory = (category: string, items: string[]) => {
    const next = { ...state.skills, [category]: items };
    writeLocal(STORAGE_KEYS.SKILLS, next);
    updateGlobalState({ skills: next });
    saveToSupabase(STORAGE_KEYS.SKILLS, next);
  };

  const deleteSkillCategory = (category: string) => {
    const next = { ...state.skills };
    delete next[category];
    writeLocal(STORAGE_KEYS.SKILLS, next);
    updateGlobalState({ skills: next });
    saveToSupabase(STORAGE_KEYS.SKILLS, next);
  };

  const resetToDefaults = () => {
    const resetState: PortfolioState = {
      personalInfo: DEFAULT_PERSONAL_INFO,
      projects: DEFAULT_PROJECTS,
      certs: DEFAULT_CERTS,
      skills: DEFAULT_SKILLS,
      competitiveStats: DEFAULT_COMPETITIVE_STATS,
    };
    writeLocal(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    writeLocal(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    writeLocal(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    writeLocal(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    writeLocal(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
    updateGlobalState(resetState);
    saveToSupabase(STORAGE_KEYS.PERSONAL, DEFAULT_PERSONAL_INFO);
    saveToSupabase(STORAGE_KEYS.PROJECTS, DEFAULT_PROJECTS);
    saveToSupabase(STORAGE_KEYS.CERTS, DEFAULT_CERTS);
    saveToSupabase(STORAGE_KEYS.SKILLS, DEFAULT_SKILLS);
    saveToSupabase(STORAGE_KEYS.COMPETITIVE, DEFAULT_COMPETITIVE_STATS);
  };

  const exportAllData = () => {
    return JSON.stringify(
      {
        personalInfo: state.personalInfo,
        projects: state.projects,
        certs: state.certs,
        skills: state.skills,
        competitiveStats: state.competitiveStats,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importAllData = (jsonStr: string) => {
    try {
      const data = JSON.parse(jsonStr);
      const updated: Partial<PortfolioState> = {};
      if (data.personalInfo) {
        updated.personalInfo = { ...DEFAULT_PERSONAL_INFO, ...data.personalInfo };
        writeLocal(STORAGE_KEYS.PERSONAL, updated.personalInfo);
        saveToSupabase(STORAGE_KEYS.PERSONAL, updated.personalInfo);
      }
      if (data.projects && Array.isArray(data.projects)) {
        updated.projects = data.projects;
        writeLocal(STORAGE_KEYS.PROJECTS, data.projects);
        saveToSupabase(STORAGE_KEYS.PROJECTS, data.projects);
      }
      if (data.certs && Array.isArray(data.certs)) {
        updated.certs = data.certs;
        writeLocal(STORAGE_KEYS.CERTS, data.certs);
        saveToSupabase(STORAGE_KEYS.CERTS, data.certs);
      }
      if (data.skills && typeof data.skills === "object") {
        updated.skills = { ...DEFAULT_SKILLS, ...data.skills };
        writeLocal(STORAGE_KEYS.SKILLS, updated.skills);
        saveToSupabase(STORAGE_KEYS.SKILLS, updated.skills);
      }
      if (data.competitiveStats) {
        updated.competitiveStats = { ...DEFAULT_COMPETITIVE_STATS, ...data.competitiveStats };
        writeLocal(STORAGE_KEYS.COMPETITIVE, updated.competitiveStats);
        saveToSupabase(STORAGE_KEYS.COMPETITIVE, updated.competitiveStats);
      }
      updateGlobalState(updated);
      return { success: true };
    } catch (err: unknown) {
      return { success: false, error: (err as Error).message };
    }
  };

  return {
    ...state,
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
