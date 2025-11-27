import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as adminAppointmentIndex } from '@/routes/admin/appointments';
import { index as adminJobTitleIndex } from '@/routes/admin/job-title';
import { index as adminPatientsIndex } from '@/routes/admin/patients';
import { index as adminServiceIndex } from '@/routes/admin/service';
import { index as adminStaffIndex } from '@/routes/admin/staff';
import { index as adminStaffAvailIndex } from '@/routes/admin/staff-availability';
import { index as adminTransactionsIndex } from '@/routes/admin/transactions';
import { dashboard as patientDashboard } from '@/routes/patient';
import { index as patientAppointmentIndex } from '@/routes/patient/appointment';
import { index as patientInvoicesIndex } from '@/routes/patient/invoices';
import { PageProps, type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import {
    BookOpen,
    CalendarCheck,
    CircleDollarSign,
    ClipboardCheck,
    Contact,
    HandPlatter,
    LayoutGrid,
    ReceiptText,
    User,
    UserCog,
} from 'lucide-react';
import React from 'react';
import AppLogo from './app-logo';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { auth } = usePage<PageProps>().props;
    const user = auth.user;

    const adminNavItems: NavItem[] = [
        {
            title: 'Admin Dashboard',
            href: adminDashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Patients',
            href: adminPatientsIndex(),
            icon: User,
        },
        {
            title: 'Staff',
            href: adminStaffIndex(),
            icon: Contact,
        },
        {
            title: 'Staff Schedule',
            href: adminStaffAvailIndex(),
            icon: CalendarCheck,
        },
        {
            title: 'Job Title',
            href: adminJobTitleIndex(),
            icon: UserCog,
        },
        {
            title: 'Services',
            href: adminServiceIndex(),
            icon: HandPlatter,
        },
        {
            title: 'Appointments',
            href: adminAppointmentIndex(),
            icon: ClipboardCheck,
        },
    ];

    const transactionNavItem: NavItem = {
        title: 'Transactions',
        href: adminTransactionsIndex(),
        icon: CircleDollarSign,
    };

    if (
        auth.staff?.job_title &&
        ['Manager', 'Receptionist'].includes(auth.staff?.job_title)
    ) {
        adminNavItems.push(transactionNavItem);
    }

    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: patientDashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Appointment',
            href: patientAppointmentIndex(),
            icon: ClipboardCheck,
        },
        {
            title: 'Invoices',
            href: patientInvoicesIndex(),
            icon: ReceiptText,
        },
    ];

    const navItems = user.role === 'admin' ? adminNavItems : userNavItems;

    const footerNavItems: NavItem[] = [
        {
            title: 'Sidebar Footer ',
            href: '',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href={
                                    user.role === 'admin'
                                        ? adminDashboard()
                                        : patientDashboard()
                                }
                                prefetch
                            >
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                {/* <NavFooter items={footerNavItems} className="mt-auto" /> */}
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
