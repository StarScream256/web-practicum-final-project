import AppLayout from '@/layouts/app-layout';
import { dashboard as userDashboard } from '@/routes';
import { create as userAppointmentCreate } from '@/routes/user/appointment';
import { BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: userDashboard().url,
    },
    {
        title: 'Make Appointment',
        href: userAppointmentCreate().url,
    },
];

export default function CreateAppointment() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Appointment" />
        </AppLayout>
    );
}
