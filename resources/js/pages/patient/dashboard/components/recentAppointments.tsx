import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { toHumanReadableDateTime } from '@/lib/utils';
import {
    destroy as patientAppointmentDestroy,
    index as PatientAppointmentIndex,
    show as patientAppointmentShow,
} from '@/routes/patient/appointment';
import { Link, router } from '@inertiajs/react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from '@tanstack/react-table';
import { CircleOff, Trash, View } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '../../appointment';

interface RecentAppointmentsProp {
    recentAppointments: Appointment[];
}

export default function RecentAppointments({
    recentAppointments,
}: RecentAppointmentsProp) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns: ColumnDef<Appointment>[] = [
        {
            id: 'rowNumber',
            header: 'No',
            accessorFn: (row, index) => index,
            cell: (info) => info.row.index + 1,
            enableSorting: true,
        },
        {
            accessorKey: 'staff.name',
            header: 'Doctor',
            cell: ({ row }) => {
                return `${row.original.staff.name} (${row.original.staff.specialization})`;
            },
        },
        {
            accessorKey: 'appointment_start_time',
            header: 'Date',
            cell: ({ row }) => {
                return toHumanReadableDateTime(
                    row.original.appointment_start_time,
                );
            },
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => {
                return (
                    row.original.status.charAt(0).toUpperCase() +
                    row.original.status.slice(1)
                );
            },
        },
        {
            id: 'actions',
            header: 'Action',
            enableSorting: false,
            cell: ({ row }) => {
                const appointmentData = row.original;
                const handleDelete = () => {
                    router.delete(
                        patientAppointmentDestroy(appointmentData.id).url,
                    );
                };

                return (
                    <span className="flex h-fit w-fit items-center gap-3">
                        <Link
                            href={
                                patientAppointmentShow({ id: row.original.id })
                                    .url
                            }
                            className="p-1"
                        >
                            <View size={18} />
                        </Link>
                        <Dialog>
                            <DialogTrigger asChild>
                                <button className="cursor-pointer text-red-500">
                                    <span className="sr-only">Delete</span>
                                    <Trash size={18} />
                                </button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Are you absolutely sure?
                                    </DialogTitle>
                                    <DialogDescription>
                                        This action cannot be undone. This will
                                        permanently delete the appointment data
                                        on{' '}
                                        <strong>
                                            {toHumanReadableDateTime(
                                                appointmentData.appointment_start_time,
                                            )}
                                        </strong>{' '}
                                        with doctor{' '}
                                        <strong>
                                            {appointmentData.staff.name}
                                        </strong>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button variant="outline">
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                    <Button
                                        variant="destructive"
                                        onClick={handleDelete}
                                    >
                                        Yes, delete
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </span>
                );
            },
        },
    ];

    const table = useReactTable({
        data: recentAppointments,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            globalFilter,
        },
    });
    return (
        <Card className="p-5">
            <span className="flex h-fit w-full justify-between">
                <CardTitle>Recent Appointments</CardTitle>
                <Link
                    href={PatientAppointmentIndex().url}
                    className="text-sm text-primary hover:underline"
                >
                    View all appointments
                </Link>
            </span>
            <table className="min-w-full divide-y divide-gray-300 border-primary dark:divide-gray-700">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th
                                    key={header.id}
                                    scope="col"
                                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-4 dark:text-white"
                                >
                                    <div className="flex cursor-pointer items-center gap-2 select-none">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td
                                    key={cell.id}
                                    className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-4 dark:text-white"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext(),
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            {recentAppointments.length <= 0 && (
                <span className="flex h-fit w-full items-center justify-center gap-3 pt-3">
                    <CircleOff size={18} />
                    <p>No available appointments data to display here</p>
                </span>
            )}
        </Card>
    );
}
