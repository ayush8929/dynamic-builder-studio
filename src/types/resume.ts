export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  linkedin: string;
  website: string;
  location: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url: string;
  technologies: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export type TemplateType = 'modern' | 'minimal' | 'corporate';

export interface ResumeData {
  id: string;
  name: string;
  template: TemplateType;
  createdAt: string;
  updatedAt: string;
  personalInfo: PersonalInfo;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  projects: Project[];
  certifications: Certification[];
}

export const createEmptyResume = (name: string = 'Untitled Resume'): ResumeData => ({
  id: crypto.randomUUID(),
  name,
  template: 'modern',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    website: '',
    location: '',
  },
  summary: '',
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
});
