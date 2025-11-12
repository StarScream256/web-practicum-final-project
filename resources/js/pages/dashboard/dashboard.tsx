import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ClipboardPlus, Search } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Search bar */}
                <div className="flex h-fit w-full gap-5">
                    <form className="relative flex h-fit w-full items-center justify-between rounded-lg">
                        <Input placeholder="Search appointment" />
                        <button
                            type="submit"
                            className="absolute right-1 rounded-md p-1"
                        >
                            <Search className="w-5 text-primary" />
                        </button>
                    </form>
                    <Button variant="default">
                        <ClipboardPlus />
                        Make Appointment
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}
