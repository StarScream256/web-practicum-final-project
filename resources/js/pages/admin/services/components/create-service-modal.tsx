import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/admin/service';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export interface CreateServiceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmitted?: () => void;
}

export default function CreateServiceModal({
    open,
    onOpenChange,
    onSubmitted,
}: CreateServiceModalProps) {
    const { data, setData, errors, post, reset } = useForm({
        name: '',
        description: '',
        duration_minutes: '',
        cost: '',
    });

    const handleSubmit = () => {
        post(store().url, {
            onSuccess: () => {
                reset();
                onSubmitted?.();
                onOpenChange(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button>
                    <Plus />
                    Create Service
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Service</DialogTitle>
                    <DialogDescription>Create a new service</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Service name</Label>
                        <Input
                            id="name"
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
                            onChange={(e) =>
                                setData('duration_minutes', e.target.value)
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
                        <DialogDescription className="text-xs">
                            Accept 2 point decimal e.g. 16000,75
                        </DialogDescription>
                        <Input
                            id="cost"
                            type="number"
                            min={0}
                            step={0.01}
                            placeholder="Cost e.g. 16000"
                            onChange={(e) => setData('cost', e.target.value)}
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
                    {/* <DialogClose asChild> */}
                    <Button onClick={handleSubmit} type="submit">
                        Add service
                    </Button>
                    {/* </DialogClose> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
