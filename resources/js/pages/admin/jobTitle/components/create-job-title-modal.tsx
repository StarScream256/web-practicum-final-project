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
import { Textarea } from '@/components/ui/textarea';
import { store } from '@/routes/admin/job-title';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';

export interface CreateJobTitleModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmitted?: () => void;
}

export default function CreateJobTitleModal({
    open,
    onOpenChange,
    onSubmitted,
}: CreateJobTitleModalProps) {
    const { data, setData, errors, post, reset } = useForm({
        title: '',
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
                    Create Job Title
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Create Job Title</DialogTitle>
                    <DialogDescription>
                        Create a new job title
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Job title</Label>
                        <Input
                            id="title"
                            placeholder="Job title"
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-sm text-red-500">
                                {errors.title}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">
                            Description (optional)
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Job title description (optional)"
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
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => reset()} variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    {/* <DialogClose asChild> */}
                    <Button onClick={handleSubmit} type="submit">
                        Add job title
                    </Button>
                    {/* </DialogClose> */}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
