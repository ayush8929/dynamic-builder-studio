import { ResumeData } from '@/types/resume';

export const MinimalTemplate = ({ data }: { data: ResumeData }) => {
  const { personalInfo, summary, experience, education, skills, projects, certifications } = data;

  const contactItems = [
    personalInfo.email,
    personalInfo.phone,
    personalInfo.location,
    personalInfo.linkedin,
    personalInfo.website,
  ].filter(Boolean);

  return (
    <div className="bg-white text-gray-900 p-10 text-sm leading-relaxed" style={{ fontFamily: 'Georgia, Times New Roman, serif' }}>
      {/* Header */}
      <div className="text-center mb-6 pb-4 border-b border-gray-300">
        <h1 className="text-2xl font-bold tracking-wide uppercase">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        {contactItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mt-2 text-gray-600 text-xs">
            {contactItems.map((info, i) => (
              <span key={i}>{info}</span>
            ))}
          </div>
        )}
      </div>

      {summary && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">Summary</h2>
          <p className="text-gray-700">{summary}</p>
        </div>
      )}

      {experience.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Experience</h2>
          {experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between">
                <strong>{exp.position}</strong>
                <span className="text-gray-500 text-xs">
                  {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="italic text-gray-600">{exp.company}</p>
              {exp.description && (
                <p className="text-gray-700 mt-1 whitespace-pre-line">{exp.description}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {education.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Education</h2>
          {education.map(edu => (
            <div key={edu.id} className="mb-3">
              <div className="flex justify-between">
                <strong>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</strong>
                <span className="text-gray-500 text-xs">{edu.startDate} — {edu.endDate}</span>
              </div>
              <p className="italic text-gray-600">{edu.institution}</p>
            </div>
          ))}
        </div>
      )}

      {skills.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-2">Skills</h2>
          <p className="text-gray-700">{skills.join(' • ')}</p>
        </div>
      )}

      {projects.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Projects</h2>
          {projects.map(proj => (
            <div key={proj.id} className="mb-3">
              <strong>{proj.name}</strong>
              {proj.technologies && <span className="text-gray-500 text-xs ml-2">({proj.technologies})</span>}
              {proj.description && <p className="text-gray-700 mt-1">{proj.description}</p>}
            </div>
          ))}
        </div>
      )}

      {certifications.length > 0 && (
        <div className="mb-5">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-200 pb-1 mb-3">Certifications</h2>
          {certifications.map(cert => (
            <div key={cert.id} className="mb-2">
              <strong>{cert.name}</strong>
              <span className="text-gray-600"> — {cert.issuer}</span>
              {cert.date && <span className="text-gray-500 text-xs ml-1">({cert.date})</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
