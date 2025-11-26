// checkout.tsx
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as adminAppointmentsIndex,
    checkout as adminAppointmentsCheckout,
    transaction as adminAppointmentsTransaction,
} from '@/routes/admin/appointments';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Appointments',
        href: adminAppointmentsIndex().url,
    },
    {
        title: 'Checkout',
        href: '',
    },
];

export interface Invoice {
    id: number;
    appointment_id: number;
    patient_user_id: number;
    patient_name: string;
    total_amount: number;
    status: string;
    created_at: string;
    updated_at: string;
    appointment:{
        id: number;
        patient: {
            name: string;
        };
        staff: {
            name: string;
        };
    };
}

interface CheckoutPageProps extends PageProps {
    invoice: Invoice;
}

export default function Checkout({ invoice }: CheckoutPageProps) {
    console.log('Invoice data:', invoice);
    const { data, setData, post, processing, errors } = useForm({
        payment_method: 'cash',
        notes: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(adminAppointmentsTransaction({ invoice: invoice.id }).url, {
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Checkout" />
            <div className="mx-auto space-y-6 p-6">
                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="rounded-lg border border-gray-200 p-6">
                        <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Patient Name (Display only) */}
                            <div>
                                <Label htmlFor="patient_name" className="text-base">Patient</Label>
                                <Input
                                    id="patient_name"
                                    type="text"
                                    value={invoice.appointment.patient.name || ''}
                                    className="w-full mt-2 bg-gray-50"
                                    readOnly
                                    disabled
                                />
                            </div>

                            {/* Staff Name (Display only) */}
                            <div>
                                <Label htmlFor="staff_name" className="text-base">Doctor</Label>
                                <Input
                                    id="staff_name"
                                    type="text"
                                    value={invoice.appointment.staff.name || ''}
                                    className="w-full mt-2 bg-gray-50"
                                    readOnly
                                    disabled
                                />
                            </div>
                        </div>
                        {/* Amount Paid (Display only) */}
                        <div>
                            <Label htmlFor="amount_paid" className="text-base">Amount to Pay</Label>
                            <Input
                                id="amount_paid"
                                type="text"
                                value={`Rp. ${new Intl.NumberFormat('id-ID').format(invoice.total_amount)}`}
                                className="w-full mt-2 bg-gray-50"
                                readOnly
                                disabled
                            />
                        </div>

                        {/* Payment Method */}
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="payment_method" className="text-base">Payment Method</Label>
                                <Select
                                    value={data.payment_method}
                                    defaultValue='cash'
                                    onValueChange={(value) => setData('payment_method', value)}
                                >
                                    <SelectTrigger className="w-full mt-2">
                                        <SelectValue placeholder="Select payment method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="cash">Cash</SelectItem>
                                        <SelectItem value="insurance">insurance</SelectItem>
                                        <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.payment_method && (
                                    <p className="text-red-500 text-sm mt-1">{errors.payment_method}</p>
                                )}
                            </div>



                            {/* Notes */}
                            <div>
                                <Label htmlFor="notes" className="text-base">Notes (Optional)</Label>
                                <textarea
                                    id="notes"
                                    value={data.notes}
                                    onChange={(e) => setData('notes', e.target.value)}
                                    className="w-full mt-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    rows={3}
                                    placeholder="Add any additional notes about this payment..."
                                />
                                {errors.notes && (
                                    <p className="text-red-500 text-sm mt-1">{errors.notes}</p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center pt-4">
                        <Link href={adminAppointmentsIndex().url}>
                            <Button type="button" variant="outline" className="flex items-center gap-2">
                                <ArrowLeft size={18} />
                                Back to Appointments
                            </Button>
                        </Link>
                        <Button
                            type="submit"
                            disabled={processing}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            {processing ? 'Processing...' : 'Complete Payment'}
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}