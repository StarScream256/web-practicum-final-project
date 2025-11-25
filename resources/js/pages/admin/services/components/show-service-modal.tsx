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
import { toCurrency } from '@/lib/utils';
import { Service } from '..';

export interface CreateServiceModalProps {
    service: Service;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function ShowServiceModal({
    service,
    open,
    onOpenChange,
}: CreateServiceModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Show Service</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                    <div className="grid gap-3">
                        <Label htmlFor="name">Service name</Label>
                        <Input
                            id="name"
                            value={service.name}
                            placeholder="Service name"
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="No description provided"
                            value={service.description}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="duration_minutes">
                            Duration (minutes)
                        </Label>
                        <Input
                            id="duration_minutes"
                            type="string"
                            placeholder="Duration (minutes)"
                            value={`${service.duration_minutes} minutes`}
                            readOnly
                        />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="cost">Cost</Label>
                        <Input
                            id="cost"
                            type="string"
                            value={toCurrency(service.cost)}
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
