import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as adminStaffIndex,
    update as adminStaffUpdate,
} from '@/routes/admin/staff';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
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

interface StaffEditPageProps extends PageProps {
    staff: Staff;
    jobTitles: JobTitle[];
}

export default function Edit(props: StaffEditPageProps) {
    const { staff, jobTitles } = props;

    const { data, setData, patch, errors } = useForm({
        name: staff.name,
        email: staff.user.email,
        password: '',
        job_title_id: staff.job_title_id,
        specialization: staff.specialization,
        salutation: staff.salutation,
        bio: staff.bio,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch(adminStaffUpdate(Number(staff.id)).url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Staff" />
            <form
                onSubmit={handleSubmit}
                className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4"
            >
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        name="name"
                        placeholder="Enter full name"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />
                    {errors.name && (
                        <p className="text-sm text-red-500">{errors.name}</p>
                    )}
                </div>
                {/* email */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={data.email}
                        autoComplete="off"
                        placeholder="Enter email address"
                        required
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                </div>
                {/* job title */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="job_title_id">Job title</Label>
                    <Select
                        required
                        value={data.job_title_id.toString()}
                        onValueChange={(value) =>
                            setData('job_title_id', value)
                        }
                    >
                        <SelectTrigger id="job_title_id">
                            <SelectValue placeholder="Select a job title" />
                        </SelectTrigger>
                        <SelectContent>
                            {jobTitles.map((job) => (
                                <SelectItem
                                    key={job.id}
                                    value={job.id.toString()}
                                >
                                    {job.title}{' '}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.job_title_id && (
                        <p className="text-sm text-red-500">
                            {errors.job_title_id}
                        </p>
                    )}
                </div>
                {/* specialization */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                        id="specialization"
                        name="specialization"
                        placeholder="Enter specialization"
                        value={data.specialization}
                        onChange={(e) =>
                            setData('specialization', e.target.value)
                        }
                    />
                    {errors.specialization && (
                        <p className="text-sm text-red-500">
                            {errors.specialization}
                        </p>
                    )}
                </div>
                {/* salutation */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="salutation">Salutation (optional)</Label>
                    <Input
                        id="salutation"
                        name="salutation"
                        placeholder="Enter salutation e.g. dr."
                        value={data.salutation}
                        onChange={(e) => setData('salutation', e.target.value)}
                    />
                    {errors.salutation && (
                        <p className="text-sm text-red-500">
                            {errors.salutation}
                        </p>
                    )}
                </div>
                {/* bio */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="bio">Bio (optional)</Label>
                    <Input
                        id="bio"
                        name="bio"
                        placeholder="Enter bio"
                        value={data.bio ?? ''}
                        onChange={(e) => setData('bio', e.target.value)}
                    />
                    {errors.bio && (
                        <p className="text-sm text-red-500">{errors.bio}</p>
                    )}
                </div>
                {/* password */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="password">New password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        placeholder="Leave blank to keep unchanged"
                        onChange={(e) => setData('password', e.target.value)}
                    />
                    {errors.password && (
                        <p className="text-sm text-red-500">
                            {errors.password}
                        </p>
                    )}
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminStaffIndex().url}>
                        <Button type="reset" variant={'outline'}>
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" variant={'default'}>
                        Update
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
