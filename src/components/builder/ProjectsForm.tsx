import { Project } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export const ProjectsForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), name: '', description: '', url: '', technologies: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: string, value: string) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-4">
      {data.map(proj => (
        <Card key={proj.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm text-foreground">{proj.name || 'New Project'}</h4>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(proj.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Project Name</Label>
              <Input placeholder="My Awesome Project" value={proj.name} onChange={e => update(proj.id, 'name', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Technologies</Label>
              <Input placeholder="React, Node.js, PostgreSQL" value={proj.technologies} onChange={e => update(proj.id, 'technologies', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">URL (optional)</Label>
              <Input placeholder="https://..." value={proj.url} onChange={e => update(proj.id, 'url', e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Describe the project..." value={proj.description} onChange={e => update(proj.id, 'description', e.target.value)} rows={2} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full" onClick={add}>
        <Plus className="h-4 w-4 mr-2" /> Add Project
      </Button>
    </div>
  );
};
