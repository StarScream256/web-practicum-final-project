import { Card, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/patient';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    CalendarClock,
    ClipboardCheck,
    MessageSquareQuote,
    Timer,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardPageProps extends PageProps {
    quote: {
        author: string;
        message: string;
    };
}

export default function Dashboard({ quote }: DashboardPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto rounded-xl p-4">
                <div className="grid h-fit w-full grid-cols-3 gap-5">
                    <Card className="h-fit gap-3 border-black p-3 dark:border-white">
                        <CardTitle className="flex items-center gap-3">
                            <Timer />
                            <p className="line-clamp-1">Next appointment</p>
                        </CardTitle>
                        <CardContent className="px-1">
                            <p className="">November 24, 2025 at 08:00</p>
                            <p className="">Doctor Tirta mandira hudhi</p>
                        </CardContent>
                    </Card>
                    <Card className="gap-3 border-blue-500 bg-blue-500/20 p-3">
                        <CardTitle className="flex items-center gap-3">
                            <CalendarClock />
                            <p className="line-clamp-1">
                                Scheduled appointment
                            </p>
                        </CardTitle>
                        <CardContent className="px-1">
                            <p className="">6 incoming appointment</p>
                            <p className="">Doctor Tirta mandira hudhi</p>
                        </CardContent>
                    </Card>
                    <Card className="gap-3 border-green-500 bg-green-500/20 p-3">
                        <CardTitle className="flex items-center gap-3">
                            <ClipboardCheck />
                            <p className="line-clamp-1">
                                Completed appointment
                            </p>
                        </CardTitle>
                        <CardContent className="px-1">
                            <p className="">6 completed appointment</p>
                            <p className="">Doctor Tirta mandira hudhi</p>
                        </CardContent>
                    </Card>
                    <span className="col-span-3 flex w-full gap-3 rounded-lg border border-primary bg-yellow-500/20 px-4 py-3">
                        <MessageSquareQuote />
                        {`"${quote.message}" - ${quote.author}`}
                    </span>
                </div>
            </div>
        </AppLayout>
    );
}
