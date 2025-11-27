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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { transaction } from '@/routes/admin/appointments';
import { useForm } from '@inertiajs/react';
import { Invoice } from '../show';

export interface CreateTransactionModalProps {
    totalBill: number;
    open: boolean;
    invoice: Invoice;
    onOpenChange: (open: boolean) => void;
    onSubmitted?: () => void;
}

export default function CheckoutModal({
    totalBill,
    invoice,
    open,
    onOpenChange,
    onSubmitted,
}: CreateTransactionModalProps) {
    console.log(
        'Rp. ' + String(new Intl.NumberFormat('id-ID').format(totalBill)),
    );

    const { data, setData, errors, post, reset } = useForm({
        bill: totalBill,
        payment_method: 'cash',
        notes: '',
    });

    const handleTransactionSubmit = () => {
        console.log('Submitting transaction for invoice ID:', invoice.id);
        post(transaction({ invoice: invoice.id }).url, {
            onSuccess: () => {
                reset();
                onSubmitted?.();
                onOpenChange(false);
            },
            onError: (errors) => {
                console.log('Error submitting transaction', errors);
            },
        });
    };
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Checkout Invoice</DialogTitle>
                    <DialogDescription>
                        Checkout Invoice for this appointment.
                    </DialogDescription>
                    <Label className="mt-4" htmlFor="total_cost">
                        Total Cost
                    </Label>
                    <Input
                        id="total_cost"
                        type="text"
                        value={
                            'Rp. ' +
                            new Intl.NumberFormat('id-ID').format(totalBill)
                        }
                        readOnly
                    />
                    <Label className="mt-4" htmlFor="payment_method">
                        Payment Method
                    </Label>
                    <Select
                        onValueChange={(value) =>
                            setData('payment_method', value)
                        }
                    >
                        <SelectTrigger id="job_title_id">
                            <SelectValue placeholder="Select payment method" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="cash">Cash</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="bank_transfer">
                                Bank transfer
                            </SelectItem>
                        </SelectContent>
                    </Select>
                    <Label className="mt-4" htmlFor="notes">
                        Notes
                    </Label>
                    <Textarea
                        id="notes"
                        placeholder="Enter any notes for this transaction..."
                        value={data.notes}
                        onChange={(e) => setData('notes', e.target.value)}
                    />
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => reset()} variant="outline">
                            Cancel
                        </Button>
                    </DialogClose>
                    <Button type="submit" onClick={handleTransactionSubmit}>
                        Proceed to Payment
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
