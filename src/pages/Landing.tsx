import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Eye, Download, Palette, FileText, ArrowRight, Sparkles } from 'lucide-react';

const features = [
  { icon: Eye, title: 'Live Preview', description: 'See your resume update in real-time as you type' },
  { icon: Palette, title: '3 Templates', description: 'Modern, Minimal, and Corporate designs to choose from' },
  { icon: Download, title: 'PDF Export', description: 'One-click download as a polished PDF document' },
  { icon: FileText, title: 'Multi-Resume', description: 'Create and manage multiple resumes for different roles' },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link to="/" className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">ResumeAI</span>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/resumes">
            <Button variant="ghost">My Resumes</Button>
          </Link>
          <ThemeToggle />
        </div>
      </nav>

      <section className="max-w-4xl mx-auto text-center px-6 pt-20 pb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <Sparkles className="h-4 w-4" /> Build Your Perfect Resume
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
          Create stunning resumes
          <br />
          <span className="text-primary">in minutes</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          Choose from professional templates, fill in your details with our intuitive editor,
          and export a polished PDF — all from your browser, no sign-up required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/builder">
            <Button size="lg" className="text-base px-8">
              Get Started <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
          </Link>
          <Link to="/resumes">
            <Button size="lg" variant="outline" className="text-base px-8">
              My Resumes
            </Button>
          </Link>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>Built with React & Tailwind CSS. No account needed — your data stays in your browser.</p>
      </footer>
    </div>
  );
};

export default Landing;
