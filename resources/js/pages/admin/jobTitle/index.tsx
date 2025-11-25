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
import { dashboard } from '@/routes/admin';
import { PageProps, type BreadcrumbItem } from '@/types';
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
    Pencil,
    Search,
    Trash,
    View,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import CreateJobTitleModal from './components/create-job-title-modal';
import DeleteJobTitleModal from './components/delete-job-title-modal';
import EditJobTitleModal from './components/edit-job-title-modal';
import ShowJobTitleModal from './components/show-job-title-modal';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Job Title',
        href: '',
    },
];

export interface JobTitle {
    id: number;
    title: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface JobTitlePageProps extends PageProps {
    jobTitles: JobTitle[];
}

export default function Index({ auth, jobTitles }: JobTitlePageProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [globalFilter, setGlobalFilter] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [isShowOpen, setIsShowOpen] = useState(false);
    const [selectedJobTitle, setSelectedJobTitle] = useState<JobTitle>();

    useEffect(() => {
        console.log(selectedJobTitle);
    }, [selectedJobTitle]);

    const columns: ColumnDef<JobTitle>[] = [
        {
            id: 'rowNumber',
            header: 'No',
            accessorFn: (row, index) => index,
            cell: (info) => info.row.index + 1,
            enableSorting: true,
        },
        {
            accessorKey: 'title',
            header: 'Job Title',
        },
        {
            id: 'actions',
            header: 'Action',
            enableSorting: false,
            cell: ({ row }) => {
                const jobTitle = row.original;

                return (
                    <span className="flex h-fit w-fit items-center gap-3">
                        <button
                            onClick={() => {
                                setSelectedJobTitle(jobTitle);
                                setIsShowOpen(true);
                            }}
                            className="p-1"
                        >
                            {' '}
                            <View size={18} />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedJobTitle(jobTitle);
                                setIsEditOpen(true);
                            }}
                            className="p-1"
                        >
                            {' '}
                            <Pencil size={18} />
                        </button>
                        <button
                            onClick={() => {
                                setSelectedJobTitle(jobTitle);
                                setIsDeleteOpen(true);
                            }}
                            className="p-1"
                        >
                            {' '}
                            <Trash size={18} className="text-red-500" />
                        </button>
                    </span>
                );
            },
        },
    ];

    const table = useReactTable({
        data: jobTitles,
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
            <Head title="Staff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* search bar */}
                <div className="flex h-fit w-full gap-5">
                    <div className="relative h-fit w-full">
                        <Input
                            placeholder="Search job title"
                            value={globalFilter}
                            onChange={(e) => setGlobalFilter(e.target.value)}
                            className="pl-10"
                        />
                        <Search className="absolute top-1/2 left-3 w-5 -translate-y-1/2 text-gray-400" />
                    </div>
                    <CreateJobTitleModal
                        open={isCreateOpen}
                        onOpenChange={setIsCreateOpen}
                    />
                </div>

                {/* table */}
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
            </div>

            {selectedJobTitle && (
                <>
                    <EditJobTitleModal
                        prev={selectedJobTitle}
                        open={isEditOpen}
                        onOpenChange={setIsEditOpen}
                    />
                    <DeleteJobTitleModal
                        id={selectedJobTitle.id}
                        title={selectedJobTitle.title}
                        open={isDeleteOpen}
                        onOpenChange={setIsDeleteOpen}
                    />
                    <ShowJobTitleModal
                        jobTitle={selectedJobTitle}
                        open={isShowOpen}
                        onOpenChange={setIsShowOpen}
                    />
                </>
            )}
        </AppLayout>
    );
}
