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
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as adminPatientsIndex,
    update as adminPatientUpdate,
} from '@/routes/admin/patients';

import AppLayout from '@/layouts/app-layout';
import { toDbDate } from '@/lib/utils';
import { InputCalendar } from '@/pages/patient/appointment/components/input-calendar';
import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

interface patient {
    id: number;
    name: string;
    user: {
        email: string;
    };
    phone: string;
    gender: string;
    dob: string;
    address: string;
}

interface PatientEditPageProps extends PageProps {
    patient: patient;
}

export default function Edit(props: PatientEditPageProps) {
    const { patient } = props;

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Dashboard', href: adminDashboard().url },
        { title: 'Patient', href: adminPatientsIndex().url },
        { title: 'Edit Patient', href: '' },
    ];

    const { data, setData, patch, errors } = useForm({
        name: patient.name ?? '',
        email: patient.user?.email ?? '',
        phone: patient.phone ?? '',
        gender: patient.gender ?? '',
        dob: patient.dob ? String(patient.dob).split('T')[0] : '',
        address: patient.address ?? '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        patch(adminPatientUpdate(Number(patient.id)).url);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit patient" />
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
                        placeholder="Enter email address"
                        required
                        onChange={(e) => setData('email', e.target.value)}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">{errors.email}</p>
                    )}
                </div>

                {/* phone */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={data.phone}
                        placeholder="Enter phone number"
                        onChange={(e) => setData('phone', e.target.value)}
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-500">{errors.phone}</p>
                    )}
                </div>

                {/* gender */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Select
                        value={data.gender}
                        onValueChange={(value) => setData('gender', value)}
                    >
                        <SelectTrigger id="gender">
                            <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    {errors.gender && (
                        <p className="text-sm text-red-500">{errors.gender}</p>
                    )}
                </div>

                {/* date of birth */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <InputCalendar
                        label="Date of Birth"
                        initialValue={new Date(data.dob)}
                        onChange={(date) => setData('dob', toDbDate(date))}
                    />
                    {errors.dob && (
                        <p className="text-sm text-red-500">{errors.dob}</p>
                    )}
                </div>

                {/* address */}
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input
                        id="address"
                        name="address"
                        value={data.address}
                        placeholder="Enter address"
                        onChange={(e) => setData('address', e.target.value)}
                    />
                    {errors.address && (
                        <p className="text-sm text-red-500">{errors.address}</p>
                    )}
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminPatientsIndex().url}>
                        <Button type="button" variant={'outline'}>
                            Cancel
                        </Button>
                    </Link>
                    <Button type="submit" variant={'default'}>
                        Update patient
                    </Button>
                </div>
            </form>
        </AppLayout>
    );
}
