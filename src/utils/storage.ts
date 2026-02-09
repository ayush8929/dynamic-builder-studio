import { ResumeData } from '@/types/resume';

const STORAGE_KEY = 'resume-builder-data';
const THEME_KEY = 'resume-builder-theme';

export const getResumes = (): ResumeData[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

export const saveResume = (resume: ResumeData): void => {
  const resumes = getResumes();
  const index = resumes.findIndex(r => r.id === resume.id);
  if (index >= 0) {
    resumes[index] = { ...resume, updatedAt: new Date().toISOString() };
  } else {
    resumes.push(resume);
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const deleteResume = (id: string): void => {
  const resumes = getResumes().filter(r => r.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(resumes));
};

export const getResume = (id: string): ResumeData | undefined => {
  return getResumes().find(r => r.id === id);
};

export const getTheme = (): 'light' | 'dark' => {
  return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
};

export const setTheme = (theme: 'light' | 'dark'): void => {
  localStorage.setItem(THEME_KEY, theme);
};
