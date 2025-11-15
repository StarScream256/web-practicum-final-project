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
import { destroy } from '@/routes/admin/service';
import { router } from '@inertiajs/react';

export interface DeleteServiceModalProps {
    id: number;
    name: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteServiceModal({
    id,
    name,
    onOpenChange,
    open,
}: DeleteServiceModalProps) {
    const handleDelete = () => {
        onOpenChange(false);
        router.delete(destroy({ service: id }), {
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
                        delete the service{' '}
                        <strong className="text-primary">{name}</strong> and
                        their associated appointment.
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
