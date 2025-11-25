import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { JobTitle } from '..';

export interface ShowJobTitleModalProps {
    jobTitle: JobTitle;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ShowJobTitleModal({
    jobTitle,
    open,
    onOpenChange,
}: ShowJobTitleModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Show Job Title</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="title">Job title</Label>
                        <Input
                            id="title"
                            value={jobTitle.title}
                            placeholder="Job title"
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="No description provided"
                            value={jobTitle.description}
                            readOnly
                        />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Close</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
