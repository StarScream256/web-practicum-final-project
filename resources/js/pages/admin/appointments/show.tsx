import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as adminAppointmentsIndex,
    checkIn as adminAppointmentsCheckIn,
    checkout as adminAppointmentsCheckout,
} from '@/routes/admin/appointments';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toHumanReadableDateTime } from '@/lib/utils';
import AppLayout from '@/layouts/app-layout';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from '@tanstack/react-table';
import {
    ArrowDown,
    ArrowUp,
    ArrowUpDown,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Patients',
        href: adminAppointmentsIndex().url,
    },
    {
        title: 'Patient Details',
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
    pivot: {
        added_by: string;
        quantity: number;
        price: number;
    }
}

export interface AppointmentService {
    id: number;
    appointment_id: number;
    price: number;
    quantity: number;
    service_id: number;
    service: Service;

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
    services: Service[];
}

interface AppointmentPageProps extends PageProps {
    appointment: Appointment;
    invoice?: { // Make it optional if not always available
        id: number;
        total_amount: number;
        status: string;
    };
}
const columns: ColumnDef<Service>[] = [
    {
        id: 'rowNumber',
        header: 'No',
        cell: (info) => info.row.index + 1
    },
    {
        accessorFn: row => row.name,
        header: 'Service'
    },
    {
        accessorFn: row => String(row.cost),
        header: 'Cost'
    },
    {
        accessorFn: row => row.pivot.quantity,
        header: 'Quantity'
    },
    {
        accessorFn: row => row.description,
        header: 'Description'
    },
];


interface DisplayFieldProps {
    label: string;
    value: string | number | null | undefined;
    className?: string;
}

export function DisplayField({ label, value, className = '' }: DisplayFieldProps) {
    return (
        <div className={`flex flex-col ${className}`}>
            <span className="text-sm font-medium text-gray-700">{label}</span>
            <span className={`text-base border border-dark p-1 pl-2 rounded-md ${value ? 'text-gray-900' : 'text-gray-400'}`}>
                {value || 'N/A'}
            </span>
        </div>
    );
}

export default function Show(props: AppointmentPageProps) {
    const { appointment, invoice } = props;
    const services = appointment.services;
    const totalCost = services.reduce((total, service) => total + Number(service.cost * service.pivot.quantity), 0);
    console.log(invoice);
    const table = useReactTable({
        data: services,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
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
            <Head title="Patient Details" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Name" value={appointment.patient.name} />
                </div>

                {/* gender */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Gender" value={appointment.patient.gender} />
                </div>

                {/* staff */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Doctor" value={appointment.staff.name} />
                </div>

                {/* status */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Status" value={appointment.status} />
                </div>

                {/* check in time */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Check in" value={appointment.check_in_time ?
                        new Date(appointment.check_in_time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) :
                        ''
                    } />
                </div>

                {/* check out time */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Check out" value={appointment.check_out_time ?
                        new Date(appointment.check_out_time).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) :
                        ''
                    } />
                </div>

                {/* notes */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Notes" value={appointment.notes} />
                </div>

                {/* total Bill */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <DisplayField label="Total Bill" value={"Rp. " + (new Intl.NumberFormat('id-ID').format(totalCost))} />
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminAppointmentsIndex().url}>
                        <Button type="button" variant={'outline'}>
                            <ArrowLeft size={18} />
                            Back to Appointment
                        </Button>
                    </Link>
                    <Link href={adminAppointmentsCheckIn(appointment).url}>
                        <Button type="button" variant={'default'}>
                            Create Invoice
                        </Button>
                    </Link>
                    <Link href={adminAppointmentsCheckout({invoice: invoice?.id!}).url}>
                        <Button type="button" variant={'default'}>
                            Check out
                        </Button>
                    </Link>
                </div>
            </div>
            <h1 className="display-1 text-center">Services</h1>
            <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 ml-4 mr-4">
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
                        Page {table.getState().pagination.pageIndex + 1} of{' '}
                        {table.getPageCount()}
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
        </AppLayout>
    );
}