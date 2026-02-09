import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ResumeData, createEmptyResume } from '@/types/resume';
import { getResumes, saveResume, deleteResume } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Plus, Trash2, Copy, FileText, Sparkles, Clock } from 'lucide-react';
import { toast } from 'sonner';

const MyResumes = () => {
  const [resumes, setResumes] = useState<ResumeData[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    setResumes(getResumes());
  }, []);

  const handleCreate = () => {
    const newResume = createEmptyResume();
    saveResume(newResume);
    navigate(`/builder/${newResume.id}`);
  };

  const handleDuplicate = (resume: ResumeData) => {
    const duplicate: ResumeData = {
      ...resume,
      id: crypto.randomUUID(),
      name: `${resume.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    saveResume(duplicate);
    setResumes(getResumes());
    toast.success('Resume duplicated!');
  };

  const handleDelete = (id: string) => {
    deleteResume(id);
    setResumes(getResumes());
    toast.success('Resume deleted');
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString();
    } catch {
      return '';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 py-4 max-w-5xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">ResumeAI</span>
        </Link>
        <ThemeToggle />
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Resumes</h1>
            <p className="text-muted-foreground mt-1">Manage your saved resumes</p>
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" /> New Resume
          </Button>
        </div>

        {resumes.length === 0 ? (
          <div className="text-center py-20">
            <FileText className="h-16 w-16 mx-auto text-muted-foreground/30 mb-4" />
            <h2 className="text-xl font-semibold text-foreground mb-2">No resumes yet</h2>
            <p className="text-muted-foreground mb-6">Create your first resume to get started</p>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" /> Create Resume
            </Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {resumes.map(resume => (
              <Card
                key={resume.id}
                className="group hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => navigate(`/builder/${resume.id}`)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground truncate">
                        {resume.name || 'Untitled'}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1 capitalize">
                        {resume.template} template
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {formatDate(resume.updatedAt)}
                      </div>
                    </div>
                    <div
                      className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={e => e.stopPropagation()}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleDuplicate(resume)}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDelete(resume.id)}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                  {resume.personalInfo.fullName && (
                    <p className="text-sm text-muted-foreground mt-3 truncate">
                      {resume.personalInfo.fullName}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyResumes;
