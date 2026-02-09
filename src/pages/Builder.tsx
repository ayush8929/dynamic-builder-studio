import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ResumeData, createEmptyResume } from '@/types/resume';
import { getResume, saveResume } from '@/utils/storage';
import { exportToPDF } from '@/utils/pdf';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PersonalInfoForm } from '@/components/builder/PersonalInfoForm';
import { SummaryForm } from '@/components/builder/SummaryForm';
import { ExperienceForm } from '@/components/builder/ExperienceForm';
import { EducationForm } from '@/components/builder/EducationForm';
import { SkillsForm } from '@/components/builder/SkillsForm';
import { ProjectsForm } from '@/components/builder/ProjectsForm';
import { CertificationsForm } from '@/components/builder/CertificationsForm';
import { TemplateSelector } from '@/components/builder/TemplateSelector';
import { ModernTemplate } from '@/components/templates/ModernTemplate';
import { MinimalTemplate } from '@/components/templates/MinimalTemplate';
import { CorporateTemplate } from '@/components/templates/CorporateTemplate';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Download, Save, ArrowLeft, Eye, PenLine } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { toast } from 'sonner';

const templateComponents = {
  modern: ModernTemplate,
  minimal: MinimalTemplate,
  corporate: CorporateTemplate,
};

const Builder = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [mobileView, setMobileView] = useState<'form' | 'preview'>('form');

  const [resume, setResume] = useState<ResumeData>(() => {
    if (id) {
      const existing = getResume(id);
      if (existing) return existing;
    }
    const newResume = createEmptyResume();
    saveResume(newResume);
    return newResume;
  });

  useEffect(() => {
    if (!id) {
      navigate(`/builder/${resume.id}`, { replace: true });
    }
  }, [id, resume.id, navigate]);

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      saveResume(resume);
    }, 500);
    return () => clearTimeout(timer);
  }, [resume]);

  const updateResume = useCallback((updates: Partial<ResumeData>) => {
    setResume(prev => ({ ...prev, ...updates }));
  }, []);

  const handleExport = async () => {
    await exportToPDF('resume-preview', resume.name || 'resume');
    toast.success('PDF exported successfully!');
  };

  const handleSave = () => {
    saveResume(resume);
    toast.success('Resume saved!');
  };

  const TemplateComponent = templateComponents[resume.template];

  const formPanel = (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border">
        <Input
          value={resume.name}
          onChange={e => updateResume({ name: e.target.value })}
          className="text-lg font-semibold border-none shadow-none px-0 focus-visible:ring-0"
          placeholder="Resume Name"
        />
      </div>
      <Tabs defaultValue="personal" className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full">
            <TabsTrigger value="personal" className="text-xs">Personal</TabsTrigger>
            <TabsTrigger value="summary" className="text-xs">Summary</TabsTrigger>
            <TabsTrigger value="experience" className="text-xs">Experience</TabsTrigger>
            <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="projects" className="text-xs">Projects</TabsTrigger>
            <TabsTrigger value="certs" className="text-xs">Certs</TabsTrigger>
          </TabsList>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <TabsContent value="personal" className="mt-0">
            <PersonalInfoForm data={resume.personalInfo} onChange={personalInfo => updateResume({ personalInfo })} />
          </TabsContent>
          <TabsContent value="summary" className="mt-0">
            <SummaryForm data={resume.summary} onChange={summary => updateResume({ summary })} />
          </TabsContent>
          <TabsContent value="experience" className="mt-0">
            <ExperienceForm data={resume.experience} onChange={experience => updateResume({ experience })} />
          </TabsContent>
          <TabsContent value="education" className="mt-0">
            <EducationForm data={resume.education} onChange={education => updateResume({ education })} />
          </TabsContent>
          <TabsContent value="skills" className="mt-0">
            <SkillsForm data={resume.skills} onChange={skills => updateResume({ skills })} />
          </TabsContent>
          <TabsContent value="projects" className="mt-0">
            <ProjectsForm data={resume.projects} onChange={projects => updateResume({ projects })} />
          </TabsContent>
          <TabsContent value="certs" className="mt-0">
            <CertificationsForm data={resume.certifications} onChange={certifications => updateResume({ certifications })} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );

  const previewPanel = (
    <div className="bg-muted/50 h-full overflow-auto p-4 flex justify-center">
      <div className="w-full max-w-[794px]">
        <div id="resume-preview" className="shadow-lg">
          <TemplateComponent data={resume} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="border-b border-border px-4 py-2.5 flex items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2">
          <Link to="/resumes">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <TemplateSelector
            selected={resume.template}
            onSelect={template => updateResume({ template })}
          />
        </div>
        <div className="flex items-center gap-2">
          {isMobile && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setMobileView(v => (v === 'form' ? 'preview' : 'form'))}
            >
              {mobileView === 'form' ? (
                <><Eye className="h-4 w-4 mr-1" /> Preview</>
              ) : (
                <><PenLine className="h-4 w-4 mr-1" /> Edit</>
              )}
            </Button>
          )}
          <Button variant="outline" size="sm" onClick={handleSave}>
            <Save className="h-4 w-4 mr-1" /> Save
          </Button>
          <Button size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-1" /> PDF
          </Button>
          <ThemeToggle />
        </div>
      </header>

      {isMobile ? (
        <div className="flex-1 overflow-hidden">
          {mobileView === 'form' ? formPanel : previewPanel}
        </div>
      ) : (
        <div className="flex-1 flex overflow-hidden">
          <div className="w-1/2 border-r border-border overflow-hidden">
            {formPanel}
          </div>
          <div className="w-1/2 overflow-hidden">{previewPanel}</div>
        </div>
      )}
    </div>
  );
};

export default Builder;
