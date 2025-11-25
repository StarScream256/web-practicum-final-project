import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import { transaction } from '@/routes/admin/appointments';
import {
    index as TransactionsIndex,
    show as TransactionsShow,
} from '@/routes/admin/transactions';

import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Patients',
        href: TransactionsIndex().url,
    },
    {
        title: 'transactions Details',
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

export function DisplayField({ label, value, className = '' }: DisplayFieldProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className={`text-base border border-dark p-1 pl-2 rounded-md ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                {value || 'N/A'}
            </span>
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
                    <DisplayField label="Name" value={transaction.invoice.appointment.patient.name} />
                </div>

                {/* email */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Doctor" value={transaction.invoice.appointment.staff.name} />
                </div>

                {/* gender */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Gender" value={transaction.invoice.appointment.patient.gender} />
                </div>

                {/* date of birth */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Phone" value={transaction.invoice.appointment.patient.phone} />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Checkin time" value={transaction.invoice.appointment.check_in_time ?
                        new Date(transaction.invoice.appointment.check_in_time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) :
                        ''} />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Checkout time" value={transaction.invoice.appointment.check_out_time ?
                        new Date(transaction.invoice.appointment.check_out_time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) :
                        ''} />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Payment" value={transaction.payment_method} />
                </div>

                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Payment Amount" value={transaction.amount_paid} />
                </div>

                {/* address */}
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                </div>

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