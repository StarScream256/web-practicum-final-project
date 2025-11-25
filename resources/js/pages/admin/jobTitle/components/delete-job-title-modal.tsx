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
import { destroy } from '@/routes/admin/job-title';
import { router } from '@inertiajs/react';

export interface DeleteJobTitleModalProps {
    id: number;
    title: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteJobTitleModal({
    id,
    title,
    onOpenChange,
    open,
}: DeleteJobTitleModalProps) {
    const handleDelete = () => {
        onOpenChange(false);
        router.delete(destroy({ jobTitle: id }), {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete the job title{' '}
                        <strong className="text-primary">{title}</strong> and
                        make their associated is set to without job title.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button variant="destructive" onClick={handleDelete}>
                        Yes, delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
