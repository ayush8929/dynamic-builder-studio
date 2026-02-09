import { Education } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export const EducationForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), institution: '', degree: '', field: '', startDate: '', endDate: '', description: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: string, value: string) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-4">
      {data.map(edu => (
        <Card key={edu.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm text-foreground">{edu.degree || 'New Education'}</h4>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(edu.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Degree</Label>
                <Input placeholder="Bachelor of Science" value={edu.degree} onChange={e => update(edu.id, 'degree', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Field of Study</Label>
                <Input placeholder="Computer Science" value={edu.field} onChange={e => update(edu.id, 'field', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Institution</Label>
              <Input placeholder="University Name" value={edu.institution} onChange={e => update(edu.id, 'institution', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Start Date</Label>
                <Input type="month" value={edu.startDate} onChange={e => update(edu.id, 'startDate', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">End Date</Label>
                <Input type="month" value={edu.endDate} onChange={e => update(edu.id, 'endDate', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Description (optional)</Label>
              <Textarea placeholder="Notable achievements..." value={edu.description} onChange={e => update(edu.id, 'description', e.target.value)} rows={2} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full" onClick={add}>
        <Plus className="h-4 w-4 mr-2" /> Add Education
      </Button>
    </div>
  );
};
