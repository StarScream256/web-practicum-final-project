import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { dashboard } from '@/routes/admin';
import { Link } from '@inertiajs/react';
import { toHumanReadableDateTime } from '@/lib/utils';
import { Staff } from '@/pages/admin/staff';

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

export interface AppointmentsProps {
    appointments: Appointment[];
}

export default function AppointmentsList({
    appointments,
}: AppointmentsProps) {    
    return (
        <div className="flex h-fit w-full flex-col gap-4">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                    Recent Appointments
                </h2>
                <Link
                    href={dashboard().url}
                    className="text-sm text-primary hover:underline"
                >
                    View all appointments
                </Link>
            </div>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        No
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Patient
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Doctor
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Appointment Date
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Status
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {appointments.length > 0 ? (
                                    appointments.map((appointment, index) => (
                                        <tr key={appointment.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {appointment.patient.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {appointment.staff.name} (
                                                {appointment.staff.specialization}
                                                )
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {toHumanReadableDateTime(
                                                    appointment.appointment_start_time,
                                                )}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm">
                                                <span
                                                    className={`rounded-full px-2 py-1 text-xs font-semibold ${appointment.status ===
                                                            'scheduled'
                                                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                                            : appointment.status ===
                                                                'checked-in'
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                : appointment.status ===
                                                                    'completed'
                                                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                        }`}
                                                >
                                                    {appointment.status
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        appointment.status.slice(
                                                            1,
                                                        )}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            No appointments found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
