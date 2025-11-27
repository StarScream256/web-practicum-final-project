import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { toCurrency, toHumanReadableDateTime } from '@/lib/utils';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as TransactionsIndex } from '@/routes/admin/transactions';

import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Transactions',
        href: TransactionsIndex().url,
    },
    {
        title: 'Transaction Details',
        href: '',
    },
];

export interface Patient {
    id: number;
    name: string;
    gender: string;
    date_of_birth: string;
    phone: string;
    address: string;
}

export interface Staff {
    id: number;
    name: string;
    specialization: string;
}

export interface Invoice {
    id: number;
    appointment: {
        id: number;
        patient: Patient;
        staff: Staff;
        appointment_start_time: string;
        check_out_time: string | null;
        check_in_time: string | null;
    };
}

export interface Transaction {
    id: number;
    invoice_id: number;
    invoice: Invoice;
    amount_paid: number;
    payment_method: string;
    payment_date: string;
    reference_number: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface TransactionsIndexProps extends PageProps {
    transaction: Transaction;
}

interface DisplayFieldProps {
    label: string;
    value: string | number | null | undefined;
    className?: string;
}

export function DisplayField({
    label,
    value,
    className = '',
}: DisplayFieldProps) {
    return (
        <div className={`flex flex-col gap-3 ${className}`}>
            <Label>{label}</Label>
            <Input
                readOnly
                className={!value ? 'text-gray-500/70' : ''}
                value={value || 'N/A'}
            />
        </div>
    );
}

export default function Show(props: TransactionsIndexProps) {
    const { transaction } = props;
    console.log(props);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Details" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Name"
                        value={transaction.invoice.appointment.patient.name}
                    />
                </div>

                {/* email */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Doctor"
                        value={transaction.invoice.appointment.staff.name}
                    />
                </div>

                {/* gender */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Gender"
                        value={transaction.invoice.appointment.patient.gender}
                    />
                </div>

                {/* date of birth */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Phone"
                        value={transaction.invoice.appointment.patient.phone}
                    />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Checkin time"
                        value={
                            transaction.invoice.appointment.check_in_time
                                ? toHumanReadableDateTime(
                                      transaction.invoice.appointment
                                          .check_in_time,
                                  )
                                : ''
                        }
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Payment date"
                        value={toHumanReadableDateTime(
                            transaction.payment_date,
                        )}
                    />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Payment method"
                        value={transaction.payment_method
                            .split(/[\s,_-]+/)
                            .map(
                                (word) =>
                                    word.charAt(0).toUpperCase() +
                                    word.slice(1),
                            )
                            .join(' ')}
                    />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField
                        label="Payment Amount"
                        value={toCurrency(transaction.amount_paid)}
                    />
                </div>

                {/* address */}
                <div className="col-span-2 flex h-fit w-full flex-col gap-3"></div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={TransactionsIndex().url}>
                        <Button type="button" variant={'outline'}>
                            <ArrowLeft size={18} />
                            Back to Transactions
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
