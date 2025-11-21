import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { toHumanReadableDateTime } from '@/lib/utils';
import { Staff } from '@/pages/admin/staff';
import { dashboard as userDashboard } from '@/routes/patient';
import {
    create as patientAppointmentCreate,
    show as patientAppointmentShow,
} from '@/routes/patient/appointment';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
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
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
    ClipboardPlus,
    Search,
    View,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: userDashboard().url,
    },
    {
        title: 'Appointment',
        href: '',
    },
];
export interface Appointment {
    id: number;
    patient_id: number;
    staff_id: number;
    staff: Staff;
    appointment_start_time: string;
    appointment_end_time: string;
    check_in_time: string;
    seen_by_doctor_time: string;
    check_out_time: string;
    status: 'scheduled' | 'checked-in' | 'completed' | 'canceled';
    notes: string;
}

interface PatientAppointmentIndex extends PageProps {
    appointments: Appointment[];
}

export default function Index({ appointments }: PatientAppointmentIndex) {
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
                    </span>
                );
            },
        },
    ];

    const table = useReactTable({
        data: appointments,
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

    // pagination section
    const { pageIndex, pageSize } = table.getState().pagination;
    const totalFilteredRows = table.getFilteredRowModel().rows.length;
    const firstRowOnPage =
        totalFilteredRows === 0 ? 0 : pageIndex * pageSize + 1;
    const lastRowOnPage =
        totalFilteredRows === 0
            ? 0
            : firstRowOnPage + table.getRowModel().rows.length - 1;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Appointment" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Search bar */}
                <div className="flex h-fit w-full gap-5">
                    <div className="relative h-fit w-full">
                        <Input
                            placeholder="Search appointment"
                            value={''}
                            onChange={(e) => {}}
                            className="pl-10"
                        />
                        <Search className="absolute top-1/2 left-3 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                    <Link href={patientAppointmentCreate()}>
                        <Button variant={'default'}>
                            <ClipboardPlus />
                            Create Appointment
                        </Button>
                    </Link>
                </div>

                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                    <thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <tr key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <th
                                        key={header.id}
                                        scope="col"
                                        className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-0 dark:text-white"
                                    >
                                        <div
                                            className="flex cursor-pointer items-center gap-2 select-none"
                                            onClick={header.column.getToggleSortingHandler()}
                                        >
                                            {/* sorting icon */}
                                            {header.column.getCanSort() && (
                                                <>
                                                    {header.column.getIsSorted() ===
                                                        'asc' && (
                                                        <ArrowUp size={14} />
                                                    )}
                                                    {header.column.getIsSorted() ===
                                                        'desc' && (
                                                        <ArrowDown size={14} />
                                                    )}
                                                    {!header.column.getIsSorted() && (
                                                        <ArrowUpDown
                                                            size={14}
                                                        />
                                                    )}
                                                </>
                                            )}

                                            {/* header title */}
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
                                        className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-0 dark:text-white"
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
            </div>
        </AppLayout>
    );
}
