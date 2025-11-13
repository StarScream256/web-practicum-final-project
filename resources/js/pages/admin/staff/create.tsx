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
import { dashboard } from '@/routes/admin';
import {
    index as adminStaffIndex,
    store as adminStaffStore,
} from '@/routes/admin/staff';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';

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
        title: 'Create Staff',
        href: '',
    },
];

interface JobTitle {
    id: number;
    title: string;
    description: string | null;
}

interface StaffCreatePageProps extends PageProps {
    jobTitles: JobTitle[];
}

export default function Create() {
    const { jobTitles } = usePage<StaffCreatePageProps>().props;

    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        job_title_id: '',
        specialization: '',
        salutation: '',
        bio: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(adminStaffStore().url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Staff" />
            <form
                onSubmit={handleSubmit}
                className="grid h-fit grid-cols-2 gap-10 overflow-x-auto rounded-xl p-4"
            >
                {/* general */}
                <div className="flex w-full flex-col gap-5">
                    <p className="text-sm font-medium text-gray-500">
                        General information
                    </p>

                    {/* name */}
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            placeholder="Enter full name"
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        {errors.name && (
                            <p className="text-sm text-red-500">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    {/* job title */}
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="job_title_id">Job title</Label>
                        <Select
                            required
                            value={data.job_title_id}
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
                                        {job.title}
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
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="specialization">Specialization</Label>
                        <Input
                            id="specialization"
                            name="specialization"
                            placeholder="Enter specialization"
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
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="salutation">
                            Salutation (optional)
                        </Label>
                        <Input
                            id="salutation"
                            name="salutation"
                            placeholder="Enter salutation e.g. dr."
                            onChange={(e) =>
                                setData('salutation', e.target.value)
                            }
                        />
                        {errors.salutation && (
                            <p className="text-sm text-red-500">
                                {errors.salutation}
                            </p>
                        )}
                    </div>
                    {/* bio */}
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="bio">Bio (optional)</Label>
                        <Input
                            id="bio"
                            name="bio"
                            placeholder="Enter bio"
                            onChange={(e) => setData('bio', e.target.value)}
                        />
                        {errors.bio && (
                            <p className="text-sm text-red-500">{errors.bio}</p>
                        )}
                    </div>
                </div>

                {/* credentials */}
                <div className="flex w-full flex-col gap-3">
                    <p className="text-sm font-medium text-gray-500">
                        Credentials
                    </p>

                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="off"
                            placeholder="Enter email address"
                            required
                            onChange={(e) => setData('email', e.target.value)}
                        />
                        {errors.email && (
                            <p className="text-sm text-red-500">
                                {errors.email}
                            </p>
                        )}
                    </div>
                    <div className="flex h-fit w-full flex-col gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Enter password"
                            required
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                        />
                        {errors.password && (
                            <p className="text-sm text-red-500">
                                {errors.password}
                            </p>
                        )}
                    </div>
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Button type="reset" variant={'outline'}>
                        Reset
                    </Button>
                    <Button type="submit" variant={'default'}>
                        Submit
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
