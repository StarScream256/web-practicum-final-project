import { Card, CardContent, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { toHumanReadableDateTime } from '@/lib/utils';
import { dashboard } from '@/routes/patient';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CalendarClock, ClipboardCheck, Timer } from 'lucide-react';
import { Appointment } from '../appointment';
import RecentAppointments from './components/recentAppointments';
import RecentInvoices, { Invoice } from './components/recentInvoices';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardPageProps extends PageProps {
    nextAppointment: Appointment | null;
    scheduledAppointment: number;
    completedAppointment: number;
    recentAppointments: Appointment[];
    recentInvoices: Invoice[];
    quote: {
        author: string;
        message: string;
    };
}

export default function Dashboard({
    nextAppointment,
    scheduledAppointment,
    completedAppointment,
    recentAppointments,
    recentInvoices,
    quote,
    auth,
    flash,
}: DashboardPageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-5 overflow-x-auto rounded-xl p-4">
                <div className="grid h-fit w-full grid-cols-3 gap-5">
                    <Card className="h-fit gap-3 border-primary p-3">
                        <CardTitle className="flex items-center gap-3">
                            <Timer />
                            <p className="line-clamp-1">Next appointment</p>
                        </CardTitle>
                        <CardContent className="px-1">
                            {nextAppointment ? (
                                <p className="">
                                    {toHumanReadableDateTime(
                                        nextAppointment.appointment_start_time,
                                    )}{' '}
                                    with doctor {nextAppointment.staff.name}
                                </p>
                            ) : (
                                <p className="">No upcoming appointment</p>
                            )}
                        </CardContent>
                    </Card>
                    <Card className="gap-3 border-primary p-3">
                        <CardTitle className="flex items-center gap-3">
                            <CalendarClock />
                            <p className="line-clamp-1">
                                Scheduled appointment
                            </p>
                        </CardTitle>
                        <CardContent className="px-1">
                            <p className="">
                                {scheduledAppointment == 0
                                    ? 'No'
                                    : scheduledAppointment}{' '}
                                upcoming appointment
                            </p>
                        </CardContent>
                    </Card>
                    <Card className="gap-3 border-primary p-3">
                        <CardTitle className="flex items-center gap-3">
                            <ClipboardCheck />
                            <p className="line-clamp-1">
                                Completed appointment
                            </p>
                        </CardTitle>
                        <CardContent className="px-1">
                            <p className="">
                                {completedAppointment == 0
                                    ? 'No'
                                    : completedAppointment}{' '}
                                completed appointment
                            </p>
                        </CardContent>
                    </Card>
                    {/* <Card className="col-span-3 flex-row gap-3 bg-blue-500/10 px-4 py-3">
                        <MessageSquareQuote />
                        {`"${quote.message}" - ${quote.author}`}
                    </Card> */}
                </div>

                <RecentAppointments recentAppointments={recentAppointments} />
                <RecentInvoices recentInvoices={recentInvoices} />
            </div>
        </AppLayout>
    );
}
