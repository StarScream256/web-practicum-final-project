import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { toHumanReadableDateTime } from '@/lib/utils';
import { dashboard } from '@/routes/admin';
import { show as AppointmentShow } from '@/routes/admin/appointments';
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
    ClipboardPenIcon,
    Search,
} from 'lucide-react';
import { useState } from 'react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Appointment',
        href: '',
    },
];

export interface Patient {
    id: number;
    user_id: number;
    name: string;
    phone: string;
    gender: string;
    dob: string;
    address: string;
    user: {
        email: string;
    };
}

export interface Staff {
    id: number;
    user_id: number;
    name: string;
    job_title_id: number;
    specialization: string;
    salutation: string;
    bio: string;
    picture: string;
    user: {
        email: string;
    };
    job_title: {
        title: string;
    };
}

export interface Service {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    cost: number;
}

export interface AppointmentService {
    id: number;
    appointment_id: number;
    service_id: number;
    service: Service;
    price: number;
    quantity: number;
}

export interface Appointment {
    id: number;
    patient_id: number;
    patient: Patient;
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
    console.log(appointments);
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
            accessorKey: 'patient.name',
            header: 'Patient',
            accessorFn: (row) => row.patient.name,
            cell: ({ row }) => {
                return `${row.original.patient.name}`;
            },
        },
        {
            accessorKey: 'staff.name',
            header: 'Doctor',
            accessorFn: (row) => row.staff.name,
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
                const appointment = row.original;
                return (
                    <span className="flex h-fit w-fit items-center gap-3">
                        <Link
                            href={
                                AppointmentShow({ appointment: appointment.id })
                                    .url
                            }
                            className="p-1"
                        >
                            <ClipboardPenIcon size={20} />
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
            <Head title="Appointments" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex h-fit w-full gap-5">
                    <div className="relative h-fit w-full">
                        <Input
                            type="text"
                            placeholder="Search appointments"
                            className="pl-10"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <Search className="absolute top-1/2 left-3 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Table section */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                        <thead>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <th
                                            key={header.id}
                                            scope="col"
                                            className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-4 dark:text-white"
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
                                                            <ArrowUp
                                                                size={14}
                                                            />
                                                        )}
                                                        {header.column.getIsSorted() ===
                                                            'desc' && (
                                                            <ArrowDown
                                                                size={14}
                                                            />
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
                                                          header.column
                                                              .columnDef.header,
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
                    <div className="mt-4 flex items-center justify-between">
                        {/* pagination selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Rows per page:</span>
                            <Select
                                value={`${table.getState().pagination.pageSize}`}
                                onValueChange={(value) => {
                                    table.setPageSize(Number(value));
                                }}
                            >
                                <SelectTrigger className="w-[70px]">
                                    <SelectValue
                                        placeholder={
                                            table.getState().pagination.pageSize
                                        }
                                    />
                                </SelectTrigger>
                                <SelectContent>
                                    {[2, 5, 10, 20, 50].map((pageSize) => (
                                        <SelectItem
                                            key={pageSize}
                                            value={`${pageSize}`}
                                        >
                                            {pageSize}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* page number indicator */}
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <strong>{firstRowOnPage}</strong> -{' '}
                            <strong>{lastRowOnPage}</strong> of{' '}
                            <strong>{totalFilteredRows}</strong> entries
                        </span>

                        {/* button navigation control */}
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Page {table.getState().pagination.pageIndex + 1}{' '}
                                of {table.getPageCount()}
                            </span>
                            <Button
                                variant="outline"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
