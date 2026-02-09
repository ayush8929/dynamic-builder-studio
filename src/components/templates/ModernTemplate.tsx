import { ResumeData } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

export const ModernTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  return (
    <div className="bg-white text-gray-800 p-8 font-sans text-sm leading-relaxed">
      {/* Header */}
      <div className="border-b-2 border-teal-600 pb-4 mb-6">
        <h1 className="text-3xl font-bold text-teal-800">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 mt-2 text-gray-600 text-xs">
          {personalInfo.email && (
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> {personalInfo.email}</span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> {personalInfo.phone}</span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {personalInfo.location}</span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" /> {personalInfo.linkedin}</span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1"><Globe className="h-3 w-3" /> {personalInfo.website}</span>
          )}
        </div>
      </div>

      {summary && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-2">Professional Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-3">Work Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">{exp.position}</h3>
                  <p className="text-teal-600 text-sm">{exp.company}</p>
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
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-3">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {edu.degree}{edu.field ? ` in ${edu.field}` : ''}
                  </h3>
                  <p className="text-teal-600 text-sm">{edu.institution}</p>
                </div>
                <span className="text-gray-500 text-xs">{edu.startDate} — {edu.endDate}</span>
              </div>
              {edu.description && <p className="text-gray-600 mt-1">{edu.description}</p>}
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <span key={skill} className="px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-xs font-medium">
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-3">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <h3 className="font-semibold text-gray-800">{proj.name}</h3>
              {proj.technologies && <p className="text-xs text-teal-600">{proj.technologies}</p>}
              {proj.description && <p className="text-gray-600 mt-1">{proj.description}</p>}
              {proj.url && <p className="text-teal-600 text-xs underline mt-0.5">{proj.url}</p>}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-teal-700 mb-3">Certifications</h2>
          {certifications.map(cert => (
            <div key={cert.id} className="mb-2">
              <h3 className="font-semibold text-gray-800">{cert.name}</h3>
              <p className="text-gray-600 text-xs">
                {cert.issuer}
                {cert.date && ` • ${cert.date}`}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
