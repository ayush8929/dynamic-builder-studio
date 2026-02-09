import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, Linkedin, Globe, MapPin } from 'lucide-react';
import { ChangeEvent } from 'react';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const fields: { key: keyof PersonalInfo; label: string; icon: typeof User; placeholder: string }[] = [
  { key: 'fullName', label: 'Full Name', icon: User, placeholder: 'John Doe' },
  { key: 'email', label: 'Email', icon: Mail, placeholder: 'john@example.com' },
  { key: 'phone', label: 'Phone', icon: Phone, placeholder: '+1 (555) 123-4567' },
  { key: 'location', label: 'Location', icon: MapPin, placeholder: 'New York, NY' },
  { key: 'linkedin', label: 'LinkedIn', icon: Linkedin, placeholder: 'linkedin.com/in/johndoe' },
  { key: 'website', label: 'Website', icon: Globe, placeholder: 'johndoe.com' },
];

export const PersonalInfoForm = ({ data, onChange }: Props) => {
  const update = (field: keyof PersonalInfo) => (e: ChangeEvent<HTMLInputElement>) => {
    onChange({ ...data, [field]: e.target.value });
  };

  return (
    <div className="space-y-4">
      {fields.map(({ key, label, icon: Icon, placeholder }) => (
        <div key={key} className="space-y-1.5">
          <Label htmlFor={key}>{label}</Label>
          <div className="relative">
            <Icon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id={key}
              className="pl-9"
              placeholder={placeholder}
              value={data[key]}
              onChange={update(key)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
