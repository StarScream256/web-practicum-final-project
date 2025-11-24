import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    index as adminPatientsIndex,
} from '@/routes/admin/patients';

import { PageProps, type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Patients',
        href: adminPatientsIndex().url,
    },
    {
        title: 'Patient Details',
        href: '',
    },
];

interface Patient {
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

interface PatientShowPageProps extends PageProps {
    patient: Patient;
}

export default function Show(props: PatientShowPageProps) {
    const { patient } = props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Patient Details" />
            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={patient.name} readOnly />
                </div>
                
                {/* email */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={patient.user.email} readOnly />
                </div>
                
                {/* phone */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={patient.phone} readOnly />
                </div>
                
                {/* gender */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="gender">Gender</Label>
                    <Input 
                        id="gender" 
                        value={patient.gender.charAt(0).toUpperCase() + patient.gender.slice(1)} 
                        readOnly 
                    />
                </div>
                
                {/* date of birth */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input 
                        id="dob" 
                        value={new Date(patient.dob).toLocaleDateString()} 
                        readOnly 
                    />
                </div>
                
                {/* address */}
                <div className="col-span-2 flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={patient.address} readOnly />
                </div>

                <div className="col-span-2 flex w-full justify-center gap-5">
                    <Link href={adminPatientsIndex().url}>
                        <Button type="button" variant={'outline'}>
                            <ArrowLeft size={18} />
                            Back to Patients
                        </Button>
                    </Link>
                </div>
            </div>
        </AppLayout>
    );
}