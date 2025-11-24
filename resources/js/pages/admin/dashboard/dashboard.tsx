import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Staff } from '@/pages/admin/staff';
import { dashboard } from '@/routes/admin';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head} from '@inertiajs/react';
import AppointmentsList from './components/appointmentsList';
import DoctorList from './components/doctorList';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Patient {
    id: number;
    name: string;
}

interface Appointment {
    id: number;
    patient: Patient;
    staff: Staff;
    appointment_start_time: string;
    appointment_end_time: string;
    status: 'scheduled' | 'checked-in' | 'completed' | 'canceled';
}

interface AdminDashboardProps extends PageProps {
    appointmentsToday: number;
    appointmentsThisMonth: number;
    totalPatients: number;
    totalStaff: number;
    doctors: Staff[];
    appointments: Appointment[];
}

export default function Dashboard({
    appointmentsToday,
    appointmentsThisMonth,
    totalPatients,
    totalStaff,
    appointments,
    doctors,
}: AdminDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Stat bar */}
                <div className="grid h-fit w-full grid-cols-4 gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Appointments today
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {appointmentsToday}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Appointments this month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {appointmentsThisMonth}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Total patients
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">
                                {totalPatients}
                            </p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Total staff
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-2xl font-bold">{totalStaff}</p>
                        </CardContent>
                    </Card>
                </div>
                <AppointmentsList
                    appointments={appointments}
                />

                {/* Doctors Section */}
                <DoctorList 
                    doctors={doctors} 
                />
            </div>
        </AppLayout>
    );
}
