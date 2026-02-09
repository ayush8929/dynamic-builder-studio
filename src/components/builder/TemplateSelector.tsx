import { TemplateType } from '@/types/resume';
import { cn } from '@/lib/utils';
import { FileText, Minus, Building2 } from 'lucide-react';

const templates: { type: TemplateType; label: string; icon: typeof FileText; desc: string }[] = [
  { type: 'modern', label: 'Modern', icon: FileText, desc: 'Clean with accents' },
  { type: 'minimal', label: 'Minimal', icon: Minus, desc: 'Black & white' },
  { type: 'corporate', label: 'Corporate', icon: Building2, desc: 'Two-column' },
];

interface Props {
  selected: TemplateType;
  onSelect: (template: TemplateType) => void;
}

export const TemplateSelector = ({ selected, onSelect }: Props) => (
  <div className="flex gap-1.5">
    {templates.map(({ type, label, icon: Icon, desc }) => (
      <button
        key={type}
        onClick={() => onSelect(type)}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm transition-all',
          selected === type
            ? 'border-primary bg-primary/10 text-primary font-medium'
            : 'border-border hover:border-primary/50 text-muted-foreground'
        )}
      >
        <Icon className="h-4 w-4 hidden sm:block" />
        <div className="text-left">
          <div className="font-medium text-xs">{label}</div>
          <div className="text-[10px] opacity-70 hidden md:block">{desc}</div>
        </div>
      </button>
    ))}
  </div>
);
