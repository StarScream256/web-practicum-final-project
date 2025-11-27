import { Card, CardTitle } from '@/components/ui/card';
import { toCurrency, toHumanReadableDateTime } from '@/lib/utils';
import { index as patientInvoiceIndex } from '@/routes/patient/invoices';
import { Link } from '@inertiajs/react';
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
import { CircleOff } from 'lucide-react';
import { useState } from 'react';
import { Appointment } from '../../appointment';

export interface Invoice {
    appointment_id: number;
    patient_user_id: number;
    total_amount: number;
    status: 'pending' | 'paid';
    created_at: string;
    updated_at: string;
    appointment: Appointment;
}

interface RecentInvoicesProp {
    recentInvoices: Invoice[];
}

export default function RecentInvoices({ recentInvoices }: RecentInvoicesProp) {
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
        data: recentInvoices,
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
                <CardTitle>Recent Invoices</CardTitle>
                <Link
                    href={patientInvoiceIndex().url}
                    className="text-sm text-primary hover:underline"
                >
                    View all invoices
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

            {recentInvoices.length <= 0 && (
                <span className="flex h-fit w-full items-center justify-center gap-3 pt-3">
                    <CircleOff size={18} />
                    <p>No available invoices data to display here</p>
                </span>
            )}
        </Card>
    );
}
