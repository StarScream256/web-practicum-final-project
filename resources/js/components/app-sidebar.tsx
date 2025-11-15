import { NavFooter } from '@/components/nav-footer';
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
import { dashboard as userDashboard } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { index as adminServiceIndex } from '@/routes/admin/service';
import { index as adminStaffIndex } from '@/routes/admin/staff';
import { index as adminStaffAvailIndex } from '@/routes/admin/staff-availability';
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
            href: '',
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
            href: '',
            icon: UserCog,
        },
        {
            title: 'Services',
            href: adminServiceIndex(),
            icon: HandPlatter,
        },
        {
            title: 'Appointments',
            href: '',
            icon: ClipboardCheck,
        },
        {
            title: 'Transactions',
            href: '',
            icon: CircleDollarSign,
        },
    ];

    const userNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: userDashboard(),
            icon: LayoutGrid,
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
                                        : userDashboard()
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
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
