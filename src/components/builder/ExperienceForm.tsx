import { Experience } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

export const ExperienceForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([
      ...data,
      { id: crypto.randomUUID(), company: '', position: '', startDate: '', endDate: '', current: false, description: '' },
    ]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: string, value: string | boolean) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-4">
      {data.map(exp => (
        <Card key={exp.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm text-foreground">{exp.position || 'New Position'}</h4>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(exp.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Position</Label>
                <Input placeholder="Software Engineer" value={exp.position} onChange={e => update(exp.id, 'position', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Company</Label>
                <Input placeholder="Company Name" value={exp.company} onChange={e => update(exp.id, 'company', e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Start Date</Label>
                <Input type="month" value={exp.startDate} onChange={e => update(exp.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End Date</Label>
                <Input type="month" value={exp.endDate} disabled={exp.current} onChange={e => update(exp.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox checked={exp.current} onCheckedChange={v => update(exp.id, 'current', !!v)} id={`current-${exp.id}`} />
              <Label htmlFor={`current-${exp.id}`} className="text-xs">Currently working here</Label>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description</Label>
              <Textarea placeholder="Describe your responsibilities and achievements..." value={exp.description} onChange={e => update(exp.id, 'description', e.target.value)} rows={3} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full" onClick={add}>
        <Plus className="h-4 w-4 mr-2" /> Add Experience
      </Button>
    </div>
  );
};
