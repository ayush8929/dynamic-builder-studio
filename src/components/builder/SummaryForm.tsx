import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Props {
  data: string;
  onChange: (data: string) => void;
}

export const SummaryForm = ({ data, onChange }: Props) => (
  <div className="space-y-2">
    <Label>Professional Summary</Label>
    <Textarea
      placeholder="Write a brief professional summary highlighting your key strengths and career objectives..."
      value={data}
      onChange={e => onChange(e.target.value)}
      rows={6}
    />
    <p className="text-xs text-muted-foreground">
      2-4 sentences summarizing your professional background and goals
    </p>
  </div>
);
