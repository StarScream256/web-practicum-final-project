import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

const hours = Array.from({ length: 24 }, (_, i) =>
    i.toString().padStart(2, '0'),
);
const minutes = ['00', '30'];

interface TimePickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
}

export function TimePicker({ value, onChange, className }: TimePickerProps) {
    const [hour, minute] = value ? value.split(':') : ['', ''];

    const handleHourChange = (newHour: string) => {
        onChange(`${newHour}:${minute || '00'}`);
    };

    const handleMinuteChange = (newMinute: string) => {
        onChange(`${hour || '00'}:${newMinute}`);
    };

    return (
        <div className={cn('flex gap-2', className)}>
            <Select value={hour} onValueChange={handleHourChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Hour" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                    {hours.map((h) => (
                        <SelectItem key={h} value={h}>
                            {h}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select value={minute} onValueChange={handleMinuteChange}>
                <SelectTrigger>
                    <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                    {minutes.map((m) => (
                        <SelectItem key={m} value={m}>
                            {m}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}
