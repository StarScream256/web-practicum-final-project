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
import { show as TransactionsShow } from '@/routes/admin/transactions';
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
    CircleOff,
    Ghost,
    Search,
    View,
} from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Transactions',
        href: '',
    },
];

export interface Patient {
    id: number;
    name: string;
}

export interface Staff {
    id: number;
    name: string;
    specialization: string;
}

export interface Invoice {
    id: number;
    appointment: {
        id: number;
        patient: Patient;
        staff: Staff;
        appointment_start_time: string;
    };
}

export interface Transaction {
    id: number;
    invoice_id: number;
    invoice: Invoice;
    amount_paid: number;
    payment_method: string;
    payment_date: string;
    reference_number: string | null;
    notes: string | null;
    created_at: string;
    updated_at: string;
}

interface TransactionsIndexProps extends PageProps {
    transactions: Transaction[];
}

export default function Index({ transactions }: TransactionsIndexProps) {
    console.log('Transactions data:', transactions);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');

    const columns: ColumnDef<Transaction>[] = [
        {
            id: 'rowNumber',
            header: 'No',
            accessorFn: (row, index) => index,
            cell: (info) => info.row.index + 1,
            enableSorting: true,
        },
        {
            accessorKey: 'invoice.appointment.patient.name',
            header: 'Patient',
            accessorFn: (row) => row.invoice.appointment.patient.name,
            cell: ({ row }) => {
                return `${row.original.invoice.appointment.patient.name}`;
            },
        },
        // {
        //     accessorKey: 'invoice.appointment.staff.name',
        //     header: 'Doctor',
        //     accessorFn: (row) => row.invoice.appointment.staff.name,
        //     cell: ({ row }) => {
        //         return `${row.original.invoice.appointment.staff.name}`;
        //     },
        // },
        {
            accessorKey: 'payment_date',
            header: 'Payment Date',
            cell: ({ row }) =>
                toHumanReadableDateTime(row.original.payment_date),
        },
        {
            accessorKey: 'payment_method',
            header: 'Payment Method',
            accessorFn: (row) => row.payment_method,
            cell: ({ row }) => {
                function formatPaymentMethod(method: string) {
                    return method
                        .split(/[\s,_-]+/)
                        .map(
                            (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1),
                        )
                        .join(' ');
                }

                return `${formatPaymentMethod(row.original.payment_method)}`;
            },
        },
        {
            accessorKey: 'amount_paid',
            header: 'Total Payment',
            accessorFn: (row) => row.amount_paid,
            cell: ({ row }) => {
                return `Rp. ${new Intl.NumberFormat('id-ID').format(row.original.amount_paid)}`;
            },
        },
        {
            id: 'actions',
            header: 'Action',
            enableSorting: false,
            cell: ({ row }) => {
                const transactions = row.original;
                return (
                    <span className="flex h-fit w-fit items-center gap-3">
                        <Link
                            href={
                                TransactionsShow({
                                    transaction: transactions.id,
                                }).url
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
        data: transactions,
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
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex h-fit w-full gap-5">
                    <div className="relative h-fit w-full">
                        <Input
                            type="text"
                            placeholder="Search transaction"
                            className="pl-10"
                            value={globalFilter ?? ''}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                        />
                        <Search className="absolute top-1/2 left-3 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                </div>

                {/* Table Section */}
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
                                            {/* Sorting Icon */}
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

                                            {/* Header Title */}
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
                        {table.getRowModel().rows.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <tr
                                    key={row.id}
                                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                                >
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
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={columns.length}
                                    className="py-8 text-center"
                                >
                                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                                        <Ghost
                                            size={48}
                                            className="mb-2 opacity-50"
                                        />
                                        <p>No transactions found</p>
                                        <p className="text-sm">
                                            No payment transactions have been
                                            recorded yet.
                                        </p>
                                    </div>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {transactions.length <= 0 && (
                    <span className="flex h-fit w-full items-center justify-center gap-3 pt-3">
                        <CircleOff size={18} />
                        <p>No available data to display here</p>
                    </span>
                )}

                {/* Pagination Section */}
                {table.getRowModel().rows.length > 0 && (
                    <div className="mt-4 flex items-center justify-between">
                        {/* Rows Per Page Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-700 dark:text-gray-300">
                                Rows per page:
                            </span>
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
                                    {[10, 20, 30, 40, 50].map((pageSize) => (
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

                        {/* Page Number Indicator */}
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                            Showing <strong>{firstRowOnPage}</strong> -{' '}
                            <strong>{lastRowOnPage}</strong> of{' '}
                            <strong>{totalFilteredRows}</strong> entries
                        </span>

                        {/* Pagination Controls */}
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
                )}
            </div>
        </AppLayout>
    );
}
