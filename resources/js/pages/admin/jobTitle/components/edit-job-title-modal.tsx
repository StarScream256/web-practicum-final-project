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
import { Textarea } from '@/components/ui/textarea';
import { update } from '@/routes/admin/job-title';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { JobTitle } from '..';

export interface EditJobTitleModalProps {
    prev: JobTitle;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmitted?: () => void;
}

export default function EditJobTitleModal({
    prev,
    open,
    onOpenChange,
    onSubmitted,
}: EditJobTitleModalProps) {
    const { data, setData, errors, patch, reset } = useForm({
        title: prev.title,
        description: prev.description,
    });

    useEffect(() => {
        if (prev) {
            setData({
                title: prev.title,
                description: prev.description,
            });
        }
    }, [prev]);

    const handleSubmit = () => {
        patch(update({ jobTitle: prev.id }).url, {
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
                    <DialogTitle>Edit Job Title</DialogTitle>
                    <DialogDescription>
                        Edit job title <strong>{prev.title}</strong>
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Job title</Label>
                        <Input
                            id="title"
                            value={data.title}
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
