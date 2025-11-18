import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Service } from '@/pages/admin/services';
import { Availability } from '@/pages/admin/staffAvailability/show';
import { dashboard as userDashboard } from '@/routes/patient';
import { create as appointmentCreate } from '@/routes/patient/appointment';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { InputCalendar } from './components/input-calendar';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: userDashboard().url,
    },
    {
        title: 'Appointment',
        href: '',
    },
    {
        title: 'Create Appointment',
        href: appointmentCreate().url,
    },
];

interface Doctor {
    id: number;
    name: string;
    availabilities: Availability[];
}

interface CreateAppointmentProps extends PageProps {
    doctors: Doctor[];
    services: Service[];
}

export default function CreateAppointment({
    auth,
    doctors,
    services,
}: CreateAppointmentProps) {
    const { data, setData, post, errors } = useForm<{
        patient_id: number;
        staff_id: number;
        services: Service[];
        appointment_start_time: string;
        appointment_end_time: string;
        notes: string;
    }>({
        patient_id: auth.user.id,
        staff_id: -1,
        services: [],
        appointment_start_time: '',
        appointment_end_time: '',
        notes: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('');
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Appointment" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                <div className="flex h-fit w-full flex-col gap-3">
                    <InputCalendar label="Appointment date" />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Doctor</Label>
                    <Select
                        required
                        value={data.staff_id.toString()}
                        onValueChange={(value) =>
                            setData('staff_id', Number(value))
                        }
                    >
                        <SelectTrigger id="">
                            <SelectValue placeholder="Select available doctor" />
                        </SelectTrigger>
                        <SelectContent>
                            {['ok'].map((availability) => (
                                <SelectItem
                                    key={availability}
                                    value={availability}
                                >
                                    {availability}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.staff_id && (
                        <p className="text-sm text-red-500">
                            {errors.staff_id}
                        </p>
                    )}
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Appointment time</Label>
                    <div className="grid grid-cols-4 gap-3">
                        <Label
                            htmlFor="appointment-time-"
                            className="flex h-fit w-full items-center justify-center rounded-md border border-input py-3 text-sm font-semibold shadow-xs has-[:checked]:ring-2 has-[:checked]:ring-ring has-[:checked]:ring-offset-2"
                        >
                            <input
                                type="radio"
                                name="appointment_time"
                                id="appointment-time-"
                                value={''}
                                onChange={(e) =>
                                    setData(
                                        'appointment_start_time',
                                        e.target.value,
                                    )
                                }
                                className="hidden"
                            />
                            07:00
                        </Label>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
