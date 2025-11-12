import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Make Appointment',
        href: route('user.appointment.create'),
    },
];

export default function CreateAppointment() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Appointment" />
        </AppLayout>
    );
}
