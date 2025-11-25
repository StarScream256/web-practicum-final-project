import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { toCurrency, toHumanReadableDateTime } from '@/lib/utils';
import { dashboard as userDashboard } from '@/routes/patient';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head } from '@inertiajs/react';
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
    CircleOff,
    Search,
} from 'lucide-react';
import { useState } from 'react';
import { Invoice } from '../dashboard/components/recentInvoices';

interface PatientInvoiceIndexPageProps extends PageProps {
    invoices: Invoice[];
}

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

export default function Index({ invoices }: PatientInvoiceIndexPageProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns: ColumnDef<Invoice>[] = [
        {
            id: 'rowNumber',
            header: 'No',
            accessorFn: (row, index) => index,
            cell: (info) => info.row.index + 1,
            enableSorting: true,
        },
        {
            accessorKey: 'appointment.appointment_start_date',
            header: 'Appointment Date',
            cell: ({ row }) =>
                toHumanReadableDateTime(
                    row.original.appointment.appointment_start_time,
                ),
        },
        {
            accessorKey: 'total_amount',
            header: 'Total Amount',
            cell: ({ row }) => toCurrency(row.original.total_amount),
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
    ];

    const table = useReactTable({
        data: invoices,
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Invoices" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex h-fit w-full gap-5">
                    <div className="relative h-fit w-full">
                        <Input
                            placeholder="Search invoice"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute top-1/2 left-3 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
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

                {invoices.length <= 0 && (
                    <span className="flex h-fit w-full items-center justify-center gap-3 pt-3">
                        <CircleOff size={18} />
                        <p>No available data to display here</p>
                    </span>
                )}
            </div>
        </AppLayout>
    );
}
