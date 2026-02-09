import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, X } from 'lucide-react';

interface Props {
  data: string[];
  onChange: (data: string[]) => void;
}

export const SkillsForm = ({ data, onChange }: Props) => {
  const [input, setInput] = useState('');

  const add = () => {
    const skill = input.trim();
    if (skill && !data.includes(skill)) {
      onChange([...data, skill]);
      setInput('');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          placeholder="Add a skill..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              e.preventDefault();
              add();
            }
          }}
        />
        <Button onClick={add} variant="outline" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {data.map(skill => (
          <Badge
            key={skill}
            variant="secondary"
            className="cursor-pointer gap-1 pr-1.5"
            onClick={() => onChange(data.filter(s => s !== skill))}
          >
            {skill}
            <X className="h-3 w-3" />
          </Badge>
        ))}
      </div>
      {data.length === 0 && (
        <p className="text-sm text-muted-foreground">Type a skill and press Enter to add it</p>
      )}
    </div>
  );
};
