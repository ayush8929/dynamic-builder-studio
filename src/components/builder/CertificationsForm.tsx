import { Certification } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export const CertificationsForm = ({ data, onChange }: Props) => {
  const add = () =>
    onChange([...data, { id: crypto.randomUUID(), name: '', issuer: '', date: '', url: '' }]);
  const remove = (id: string) => onChange(data.filter(e => e.id !== id));
  const update = (id: string, field: string, value: string) =>
    onChange(data.map(e => (e.id === id ? { ...e, [field]: value } : e)));

  return (
    <div className="space-y-4">
      {data.map(cert => (
        <Card key={cert.id}>
          <CardContent className="pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="font-medium text-sm text-foreground">{cert.name || 'New Certification'}</h4>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => remove(cert.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">Certification Name</Label>
              <Input placeholder="AWS Solutions Architect" value={cert.name} onChange={e => update(cert.id, 'name', e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">Issuer</Label>
                <Input placeholder="Amazon Web Services" value={cert.issuer} onChange={e => update(cert.id, 'issuer', e.target.value)} />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Date</Label>
                <Input type="month" value={cert.date} onChange={e => update(cert.id, 'date', e.target.value)} />
              </div>
            </div>
            <div className="space-y-1">
              <Label className="text-xs">URL (optional)</Label>
              <Input placeholder="https://..." value={cert.url} onChange={e => update(cert.id, 'url', e.target.value)} />
            </div>
          </CardContent>
        </Card>
      ))}
      <Button variant="outline" className="w-full" onClick={add}>
        <Plus className="h-4 w-4 mr-2" /> Add Certification
      </Button>
    </div>
  );
};
