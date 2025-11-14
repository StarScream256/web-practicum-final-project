import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import { index as adminStaffIndex } from '@/routes/admin/staff';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Staff',
        href: adminStaffIndex().url,
    },
    {
        title: 'Edit Staff',
        href: '',
    },
];

interface JobTitle {
    id: number;
    title: string;
    description: string | null;
}

interface Staff {
    id: number;
    name: string;
    user: {
        email: string;
    };
    job_title_id: string;
    job_title: {
        title: string;
    };
    specialization: string;
    salutation: string;
    bio: string;
}

interface StaffShowPageProps extends PageProps {
    staff: Staff;
    jobTitles: JobTitle[];
}

export default function Edit(props: StaffShowPageProps) {
    const { staff, jobTitles } = props;

    const [data, setData] = useState({
        name: staff.name,
        email: staff.user.email,
        password: '',
        job_title: staff.job_title.title,
        specialization: staff.specialization,
        salutation: staff.salutation,
        bio: staff.bio,
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Staff" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={data.name} readOnly />
                </div>
                {/* email */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={data.email} readOnly />
                </div>
                {/* job title */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="job_title">Job title</Label>
                    <Input id="job_title" value={data.job_title} readOnly />
                </div>
                {/* specialization */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                        id="specialization"
                        value={data.specialization}
                        readOnly
                    />
                </div>
                {/* salutation */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="salutation">Salutation</Label>
                    <Input id="salutation" value={data.salutation} readOnly />
                </div>
                {/* bio */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" value={data.bio ?? ''} readOnly />
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminStaffIndex().url}>
                        <Button type="reset" variant={'outline'}>
                            <ArrowLeft size={18} />
                            Back
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}
