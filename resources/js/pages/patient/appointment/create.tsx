import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { Appointment, cn, generateAvailableSlots } from '@/lib/utils';
import { Service } from '@/pages/admin/services';
import { Availability } from '@/pages/admin/staffAvailability/show';
import { dashboard as userDashboard } from '@/routes/patient';
import {
    create as appointmentCreate,
    store as appointmentStore,
} from '@/routes/patient/appointment';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { addMinutes, format, parse } from 'date-fns';
import { useEffect, useMemo, useState } from 'react';
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
    specialization: string;
    availabilities: Availability[];
}

interface CreateAppointmentProps extends PageProps {
    doctors: Doctor[];
    appointments: Appointment[];
    services: Service[];
}

export default function CreateAppointment({
    auth,
    doctors,
    appointments,
    services,
}: CreateAppointmentProps) {
    const { data, setData, post, errors } = useForm<{
        patient_id: number;
        staff_id: number;
        services: number[];
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

    console.log(appointments);
    const dayNames = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    const [appointmentDate, setAppointmentDate] = useState<Date | undefined>();
    const availableDoctors = useMemo(() => {
        if (!appointmentDate) return doctors;
        const targetDay = dayNames[appointmentDate.getDay()];
        return doctors.reduce(
            (acc, doc) => {
                const todaysAvailabilities = doc.availabilities.filter(
                    (avail) => avail.day_of_week === targetDay,
                );
                if (todaysAvailabilities.length > 0) {
                    acc.push({
                        ...doc,
                        availabilities: todaysAvailabilities,
                    });
                }
                return acc;
            },
            [] as typeof doctors,
        );
    }, [doctors, appointmentDate]);

    // reset the doctor if current doctor is not available on selected date
    useEffect(() => {
        if (data.staff_id !== -1 && availableDoctors) {
            const isStillAvailable = availableDoctors.find(
                (d) => d.id === data.staff_id,
            );
            if (!isStillAvailable) {
                setData('staff_id', -1);
            }
        }
    }, [availableDoctors]);

    useEffect(() => {
        setData((prev) => ({
            ...prev,
            appointment_start_time: '',
            appointment_end_time: '',
        }));
    }, [data.staff_id, appointmentDate]);

    const doctor = useMemo(() => {
        if (data.staff_id === -1) return undefined;
        return availableDoctors.find((doc) => doc.id === data.staff_id);
    }, [data, data.staff_id]);

    const timeSlots = useMemo(() => {
        if (!doctor || !appointmentDate) return [];
        return doctor.availabilities
            .flatMap((avail) =>
                generateAvailableSlots(
                    avail.start_time,
                    avail.end_time,
                    appointmentDate,
                    appointments,
                ),
            )
            .sort();
    }, [doctor, appointmentDate, appointments]);

    const handleTimeSelect = (timeStr: string) => {
        if (!appointmentDate) return;
        const dateStr = format(appointmentDate, 'yyyy-MM-dd');
        const dateTimeStr = `${dateStr} ${timeStr}`;
        const startDate = parse(dateTimeStr, 'yyyy-MM-dd HH:mm', new Date());
        const endDate = addMinutes(startDate, 30);
        setData((prev) => ({
            ...prev,
            appointment_start_time: format(startDate, 'yyyy-MM-dd HH:mm:ss'),
            appointment_end_time: format(endDate, 'yyyy-MM-dd HH:mm:ss'),
        }));
    };

    const handleServiceChange = (serviceId: number, isChecked: boolean) => {
        if (isChecked) {
            setData('services', [...data.services, serviceId]);
        } else {
            setData(
                'services',
                data.services.filter((id) => id !== serviceId),
            );
        }
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        console.log(data);
        post(appointmentStore().url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Appointment" />
            <form
                onSubmit={handleSubmit}
                className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4"
            >
                <div className="flex h-fit w-full flex-col gap-3">
                    <InputCalendar
                        label="Appointment date"
                        onChange={setAppointmentDate}
                    />
                </div>
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="doctor">Doctor</Label>
                    {availableDoctors && (
                        <Select
                            required
                            onValueChange={(value) =>
                                setData('staff_id', Number(value))
                            }
                        >
                            <SelectTrigger id="doctor">
                                <SelectValue placeholder="Select available doctor" />
                            </SelectTrigger>
                            <SelectContent>
                                {availableDoctors.map((doc) => (
                                    <SelectItem
                                        key={doc.id}
                                        value={doc.id.toString()}
                                    >
                                        {doc.name} ({doc.specialization})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    )}
                    {errors.staff_id && (
                        <p className="text-sm text-red-500">
                            {errors.staff_id}
                        </p>
                    )}
                </div>
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Appointment time</Label>
                    {!timeSlots ? (
                        <Input
                            disabled
                            type="text"
                            value="Select appointment date and doctor first"
                        />
                    ) : (
                        <div className="grid grid-cols-8 gap-3">
                            {timeSlots.map((slot) => {
                                const isSelected =
                                    data.appointment_start_time.includes(
                                        slot.time,
                                    );
                                return (
                                    <Label
                                        key={slot.time}
                                        htmlFor={`time-${slot.time}`}
                                        className={cn(
                                            'flex h-10 w-full cursor-pointer items-center justify-center rounded-md border text-sm font-semibold transition-all hover:bg-accent',
                                            isSelected &&
                                                'bg-primary text-primary-foreground ring-2 ring-offset-2 hover:bg-primary/90',
                                            !slot.available &&
                                                'cursor-not-allowed bg-muted text-muted-foreground opacity-50 hover:bg-muted',
                                        )}
                                    >
                                        <input
                                            type="radio"
                                            name="appointment_time"
                                            id={`time-${slot.time}`}
                                            value={slot.time}
                                            disabled={!slot.available}
                                            className="hidden"
                                            onChange={() =>
                                                handleTimeSelect(slot.time)
                                            }
                                        />
                                        <p className="line-clamp-1">{`${slot.time} ${!slot.available ? '(Reserved)' : ''}`}</p>
                                    </Label>
                                );
                            })}
                            {timeSlots.length === 0 && (
                                <p className="col-span-full text-sm text-muted-foreground">
                                    No available slots for this doctor on this
                                    day.
                                </p>
                            )}
                        </div>
                    )}
                </div>
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label>Services (optional)</Label>
                    <div
                        className={`grid w-fit ${
                            services.length > 8
                                ? 'grid-cols-4'
                                : 'flex flex-col'
                        } gap-3 pl-2`}
                    >
                        {services.map((service) => (
                            <span
                                key={service.id}
                                className="flex h-fit w-fit items-center gap-3"
                            >
                                <input
                                    type="checkbox"
                                    id={`service-${service.id}`}
                                    name="services[]"
                                    className="cursor-pointer rounded border-gray-300 text-primary focus:ring-primary"
                                    checked={data.services.includes(service.id)}
                                    onChange={(e) =>
                                        handleServiceChange(
                                            service.id,
                                            e.target.checked,
                                        )
                                    }
                                />
                                <label
                                    htmlFor={`service-${service.id}`}
                                    className="cursor-pointer text-sm"
                                >
                                    {service.name}
                                </label>
                            </span>
                        ))}
                    </div>
                    {errors.services && (
                        <p className="text-sm text-red-500">
                            {errors.services}
                        </p>
                    )}
                </div>

                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="">Notes (optional)</Label>
                    <Input
                        type="text"
                        placeholder="Enter notes here"
                        onChange={(e) => setData('notes', e.target.value)}
                    />
                </div>

                <div className="col-span-2 flex justify-center gap-5">
                    <Button type="submit">Book Appointment</Button>
                </div>
            </form>
        </AppLayout>
    );
}
