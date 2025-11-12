import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';

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
                {/* Stat bar */}
                <div className="grid h-fit w-full grid-cols-4 gap-5">
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Appointments today
                            </CardTitle>
                        </CardHeader>
                        <CardContent>as</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Appointments this month
                            </CardTitle>
                        </CardHeader>
                        <CardContent>as</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Total patients
                            </CardTitle>
                        </CardHeader>
                        <CardContent>as</CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="line-clamp-1">
                                Total staff
                            </CardTitle>
                        </CardHeader>
                        <CardContent>as</CardContent>
                    </Card>
                </div>

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
                </div>
            </div>
        </AppLayout>
    );
}
