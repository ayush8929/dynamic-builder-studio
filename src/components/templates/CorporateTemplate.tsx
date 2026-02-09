import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const CorporateTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 font-sans text-sm leading-relaxed flex" style={{ minHeight: '1123px' }}>
      {/* Left Sidebar */}
      <div className="w-1/3 bg-slate-800 text-white p-6">
        <h1 className="text-xl font-bold mb-1">{personalInfo.fullName || 'Your Name'}</h1>

        <div className="mt-4 space-y-2 text-slate-300 text-xs">
          {personalInfo.email && (
            <div className="flex items-center gap-2"><Mail className="h-3 w-3 shrink-0" /> {personalInfo.email}</div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center gap-2"><Phone className="h-3 w-3 shrink-0" /> {personalInfo.phone}</div>
          )}
          {personalInfo.location && (
            <div className="flex items-center gap-2"><MapPin className="h-3 w-3 shrink-0" /> {personalInfo.location}</div>
          )}
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2"><Linkedin className="h-3 w-3 shrink-0" /> {personalInfo.linkedin}</div>
          )}
          {personalInfo.website && (
            <div className="flex items-center gap-2"><Globe className="h-3 w-3 shrink-0" /> {personalInfo.website}</div>
          )}
        </div>

        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-2">Skills</h2>
            <div className="space-y-1">
              {skills.map(skill => (
                <div key={skill} className="text-slate-300 text-xs py-1 border-b border-slate-700">
                  {skill}
                </div>
              ))}
            </div>
          </div>
        )}

        {certifications.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-200 mb-2">Certifications</h2>
            {certifications.map(cert => (
              <div key={cert.id} className="mb-2 text-xs">
                <p className="font-medium text-white">{cert.name}</p>
                <p className="text-slate-400">{cert.issuer}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right Main Content */}
      <div className="w-2/3 p-6">
        {summary && (
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-300 pb-1 mb-2">
              Profile
            </h2>
            <p className="text-gray-700">{summary}</p>
          </div>
        )}

        {experience.length > 0 && (
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-300 pb-1 mb-3">
              Experience
            </h2>
            {experience.map(exp => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold">{exp.position}</h3>
                    <p className="text-slate-600 text-xs">{exp.company}</p>
                  </div>
                  <span className="text-gray-500 text-xs whitespace-nowrap">
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className="text-gray-600 mt-1 whitespace-pre-line">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        )}

        {education.length > 0 && (
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-300 pb-1 mb-3">
              Education
            </h2>
            {education.map(edu => (
              <div key={edu.id} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-semibold">
                      {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                    </h3>
                    <p className="text-slate-600 text-xs">{edu.institution}</p>
                  </div>
                  <span className="text-gray-500 text-xs">{edu.startDate} — {edu.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {projects.length > 0 && (
          <div className="mb-5">
            <h2 className="text-base font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-300 pb-1 mb-3">
              Projects
            </h2>
            {projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <h3 className="font-semibold">{proj.name}</h3>
                {proj.technologies && <p className="text-xs text-slate-500">{proj.technologies}</p>}
                {proj.description && <p className="text-gray-600 mt-1">{proj.description}</p>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
