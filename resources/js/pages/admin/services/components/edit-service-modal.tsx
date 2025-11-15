import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { update } from '@/routes/admin/service';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { Service } from '..';

export interface CreateServiceModalProps {
    prev: Service;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmitted?: () => void;
}

export default function EditServiceModal({
    prev,
    open,
    onOpenChange,
    onSubmitted,
}: CreateServiceModalProps) {
    const { data, setData, errors, patch, reset } = useForm({
        name: prev.name,
        description: prev.description,
        duration_minutes: prev.duration_minutes,
        cost: prev.cost,
    });

    useEffect(() => {
        if (prev) {
            setData({
                name: prev.name,
                description: prev.description,
                duration_minutes: prev.duration_minutes,
                cost: prev.cost,
            });
        }
    }, [prev]);

    const handleSubmit = () => {
        patch(update({ service: prev.id }).url, {
            onSuccess: () => {
                reset();
                onSubmitted?.();
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Service</DialogTitle>
                    <DialogDescription>
                        Edit service <strong>{prev.name}</strong>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Service name</Label>
                        <Input
                            id="name"
                            value={data.name}
                            placeholder="Service name"
                            onChange={(e) => setData('name', e.target.value)}
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">
                            Description (optional)
                        </Label>
                        <Input
                            id="description"
                            placeholder="Service description (optional)"
                            value={data.description}
                            onChange={(e) =>
                                setData('description', e.target.value)
                            }
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="duration_minutes">
                            Duration (minutes)
                        </Label>
                        <Input
                            id="duration_minutes"
                            type="number"
                            min={0}
                            placeholder="Duration (minutes)"
                            value={data.duration_minutes}
                            onChange={(e) =>
                                setData(
                                    'duration_minutes',
                                    Number(e.target.value),
                                )
                            }
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cost">Cost</Label>
                        <DialogDescription>
                            Accept 2 point decimal e.g. 16000,75
                        </DialogDescription>
                        <Input
                            id="cost"
                            type="number"
                            min={0}
                            step={0.01}
                            value={data.cost}
                            placeholder="Cost e.g. 16000"
                            onChange={(e) =>
                                setData('cost', Number(e.target.value))
                            }
                        />
                        {errors.description && (
                            <p className="text-sm text-red-500">
                                {errors.description}
                            </p>
                        )}
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => reset()} variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button onClick={handleSubmit} type="submit">
                        Update
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
