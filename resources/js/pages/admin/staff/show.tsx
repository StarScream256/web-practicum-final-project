import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes/admin';
import {
    destroy as adminStaffDestroy,
    edit as adminStaffEdit,
    index as adminStaffIndex,
} from '@/routes/admin/staff';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

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
        title: 'Show Staff',
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

    const handleDelete = () => {
        router.delete(adminStaffDestroy({ staff: staff.id }), {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Show Staff" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={staff.name} readOnly />
                </div>
                {/* email */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={staff.user.email} readOnly />
                </div>
                {/* job title */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="job_title">Job title</Label>
                    <Input
                        id="job_title"
                        value={staff.job_title.title}
                        readOnly
                    />
                </div>
                {/* specialization */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                        id="specialization"
                        value={staff.specialization}
                        readOnly
                    />
                </div>
                {/* salutation */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="salutation">Salutation</Label>
                    <Input id="salutation" value={staff.salutation} readOnly />
                </div>
                {/* bio */}
                <div className="flex h-fit w-full flex-col gap-1.5">
                    <Label htmlFor="bio">Bio</Label>
                    <Input id="bio" value={staff.bio ?? ''} readOnly />
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminStaffIndex().url}>
                        <Button type="reset" variant={'outline'}>
                            <ArrowLeft size={18} />
                            Back
                        </Button>
                    </Link>
                    <Link href={adminStaffEdit({ staff: staff.id }).url}>
                        <Button type="reset" variant={'default'}>
                            Update
                        </Button>
                    </Link>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant={'destructive'}>Delete</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>
                                    Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete the staff member{' '}
                                    <strong>{staff.name}</strong> and their
                                    associated user account.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    variant="destructive"
                                    onClick={handleDelete}
                                >
                                    Yes, delete
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </AppLayout>
    );
}
