import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard as userDashboard } from '@/routes/patient';
import { index as appointmentIndex } from '@/routes/patient/appointment';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { Appointment } from '.';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: userDashboard().url,
    },
    {
        title: 'Appointment',
        href: appointmentIndex().url,
    },
    {
        title: 'Show Appointment',
        href: '',
    },
];

interface CreateAppointmentProps extends PageProps {
    appointment: Appointment;
}

export default function CreateAppointment({
    auth,
    appointment,
}: CreateAppointmentProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Appointment" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Appointment time</Label>
                    <Input
                        readOnly
                        value={appointment.appointment_start_time}
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Appointment end time (estimated)</Label>
                    <Input readOnly value={appointment.appointment_end_time} />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Doctor</Label>
                    <Input
                        readOnly
                        value={`${appointment.staff.name} (${appointment.staff.specialization})`}
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Status</Label>
                    <Input
                        readOnly
                        value={
                            appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)
                        }
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Check-in time</Label>
                    <Input
                        readOnly
                        value={
                            appointment.check_in_time ??
                            "Haven't checked in yet"
                        }
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Seen by doctor time</Label>
                    <Input
                        readOnly
                        value={
                            appointment.seen_by_doctor_time ??
                            "Haven't seen by doctor yet"
                        }
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Check-out time</Label>
                    <Input
                        readOnly
                        value={
                            appointment.check_out_time ??
                            "Haven't checked out yet"
                        }
                    />
                </div>
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Notes</Label>
                    <Input
                        readOnly
                        type="text"
                        value={appointment.notes ?? '-'}
                    />
                </div>

                <div className="col-span-2 flex justify-center gap-5">
                    <Link href={appointmentIndex().url}>
                        <Button variant={'secondary'}>
                            <ArrowLeft />
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
