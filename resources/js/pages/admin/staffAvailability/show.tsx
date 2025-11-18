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
import {
    Item,
    ItemActions,
    ItemContent,
    ItemMedia,
    ItemTitle,
} from '@/components/ui/item';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { TimePicker } from '@/components/ui/time-picker';
import AppLayout from '@/layouts/app-layout';
import { dashboard as adminDashboard } from '@/routes/admin';
import {
    store as adminStaffAvailCreate,
    destroy as adminStaffAvailDestroy,
    index as adminStaffAvailIndex,
    update as adminStaffAvailUpdate,
} from '@/routes/admin/staff-availability';
import { BreadcrumbItem, PageProps } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Ban, Pencil, Plus, Trash } from 'lucide-react';
import { Fragment, useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: adminDashboard().url,
    },
    {
        title: 'Staff Availability',
        href: adminStaffAvailIndex().url,
    },
    {
        title: 'Show',
        href: '',
    },
];

interface Staff {
    id: number;
    name: string;
    user: {
        email: string;
    };
    job_title: {
        title: string;
    };
    specialization: string;
}

export interface Availability {
    id: number;
    staff_id: number;
    day_of_week:
        | 'sunday'
        | 'monday'
        | 'tuesday'
        | 'wednesday'
        | 'thursday'
        | 'friday'
        | 'saturday';
    start_time: string;
    end_time: string;
    note: string | null;
}

interface StaffAvailShowPageProps extends PageProps {
    staff: Staff;
    availabilities: Availability[];
}

export default function Show(props: StaffAvailShowPageProps) {
    const { staff, availabilities } = props;

    const dayOfWeek = [
        'sunday',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
    ];

    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [selectedAvailability, setSelectedAvailability] =
        useState<Availability | null>(null);

    const { data, setData, post, patch, errors, reset } = useForm({
        staff_id: staff.id,
        day_of_week: '',
        start_time: '',
        end_time: '',
        note: '',
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post(adminStaffAvailCreate().url, {
            onSuccess: () => {
                reset();
                setIsCreateOpen(false);
            },
        });
    }

    function handleEdit(avail: Availability) {
        setSelectedAvailability(avail);
        setData({
            staff_id: avail.staff_id,
            day_of_week: avail.day_of_week,
            start_time: avail.start_time.slice(0, 5),
            end_time: avail.end_time.slice(0, 5),
            note: avail.note || '',
        });
        setIsEditOpen(true);
    }

    function handleUpdate(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedAvailability) return;

        patch(
            adminStaffAvailUpdate({ availability: selectedAvailability.id })
                .url,
            {
                onSuccess: () => {
                    reset();
                    setIsEditOpen(false);
                    setSelectedAvailability(null);
                },
            },
        );
    }

    function handleDeleteClick(avail: Availability) {
        setSelectedAvailability(avail);
        setIsDeleteOpen(true);
    }

    function handleDelete() {
        if (!selectedAvailability) return;

        router.delete(
            adminStaffAvailDestroy({ availability: selectedAvailability.id })
                .url,
            {
                onSuccess: () => {
                    setIsDeleteOpen(false);
                    setSelectedAvailability(null);
                },
            },
        );
    }

    const timeStepInSeconds = 1800;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Staff" />

            <div className="grid h-fit grid-cols-2 gap-5 overflow-x-auto rounded-xl p-4">
                <p className="col-span-2 text-lg font-bold">
                    Staff information
                </p>
                {/* name */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" value={staff.name} readOnly />
                </div>
                {/* email */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" value={staff.user.email} readOnly />
                </div>
                {/* job title */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="jobTitle">Job title</Label>
                    <Input
                        id="jobTitle"
                        value={staff.job_title.title}
                        readOnly
                    />
                </div>
                {/* specialization */}
                <div className="flex h-fit w-full flex-col gap-3">
                    <Label htmlFor="specialization">Specialization</Label>
                    <Input
                        id="specialization"
                        value={staff.specialization}
                        readOnly
                    />
                </div>
            </div>
            <div className="flex h-fit w-full flex-col gap-5 p-4">
                <span className="flex h-fit w-full items-center justify-between">
                    <p className="text-lg font-bold">Schedule</p>
                    {/* Create Dialog */}
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button>
                                <Plus />
                                Add schedule
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Add schedule</DialogTitle>
                                <DialogDescription>
                                    Create a new schedule for staff{' '}
                                    <b className="text-primary">{staff.name}</b>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="day_of_week">
                                        Day of week
                                    </Label>
                                    <Select
                                        required
                                        value={data.day_of_week}
                                        onValueChange={(value) =>
                                            setData('day_of_week', value)
                                        }
                                    >
                                        <SelectTrigger id="day_of_week">
                                            <SelectValue placeholder="Select day" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dayOfWeek.map((day) => (
                                                <SelectItem
                                                    key={day}
                                                    value={day}
                                                >
                                                    {day
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        day.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.day_of_week && (
                                        <p className="text-sm text-red-500">
                                            {errors.day_of_week}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="start_time">
                                        Start time
                                    </Label>
                                    <TimePicker
                                        value={data.start_time}
                                        onChange={(value) =>
                                            setData('start_time', value)
                                        }
                                    />
                                    {errors.start_time && (
                                        <p className="text-sm text-red-500">
                                            {errors.start_time}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="end_time">End time</Label>
                                    <TimePicker
                                        value={data.end_time}
                                        onChange={(value) =>
                                            setData('end_time', value)
                                        }
                                    />
                                    {errors.end_time && (
                                        <p className="text-sm text-red-500">
                                            {errors.end_time}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="note">
                                        Note (optional)
                                    </Label>
                                    <Input
                                        id="note"
                                        value={data.note}
                                        placeholder="e.g. Morning session"
                                        onChange={(e) =>
                                            setData('note', e.target.value)
                                        }
                                    />
                                    {errors.note && (
                                        <p className="text-sm text-red-500">
                                            {errors.note}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleSubmit} type="submit">
                                    Add schedule
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </span>

                {/* Edit Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit schedule</DialogTitle>
                            <DialogDescription>
                                Update the schedule for staff{' '}
                                <b className="text-primary">{staff.name}</b>
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4">
                            <div className="grid gap-3">
                                <Label htmlFor="edit_day_of_week">
                                    Day of week
                                </Label>
                                <Select
                                    required
                                    value={data.day_of_week}
                                    onValueChange={(value) =>
                                        setData('day_of_week', value)
                                    }
                                >
                                    <SelectTrigger id="edit_day_of_week">
                                        <SelectValue placeholder="Select day" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {dayOfWeek.map((day) => (
                                            <SelectItem key={day} value={day}>
                                                {day.charAt(0).toUpperCase() +
                                                    day.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.day_of_week && (
                                    <p className="text-sm text-red-500">
                                        {errors.day_of_week}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="edit_start_time">
                                    Start time
                                </Label>
                                <TimePicker
                                    value={data.start_time}
                                    onChange={(value) =>
                                        setData('start_time', value)
                                    }
                                />
                                {errors.start_time && (
                                    <p className="text-sm text-red-500">
                                        {errors.start_time}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="edit_end_time">End time</Label>
                                <TimePicker
                                    value={data.end_time}
                                    onChange={(value) =>
                                        setData('end_time', value)
                                    }
                                />
                                {errors.end_time && (
                                    <p className="text-sm text-red-500">
                                        {errors.end_time}
                                    </p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="edit_note">
                                    Note (optional)
                                </Label>
                                <Input
                                    id="edit_note"
                                    value={data.note}
                                    placeholder="e.g. Morning session"
                                    onChange={(e) =>
                                        setData('note', e.target.value)
                                    }
                                />
                                {errors.note && (
                                    <p className="text-sm text-red-500">
                                        {errors.note}
                                    </p>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <Button onClick={handleUpdate} type="submit">
                                Update schedule
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                {/* Delete Dialog */}
                <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete the schedule on{' '}
                                <strong className="capitalize">
                                    {selectedAvailability?.day_of_week}
                                </strong>{' '}
                                from{' '}
                                <strong>
                                    {selectedAvailability?.start_time.slice(
                                        0,
                                        5,
                                    )}
                                </strong>{' '}
                                to{' '}
                                <strong>
                                    {selectedAvailability?.end_time.slice(0, 5)}
                                </strong>
                                .
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

                {availabilities.length == 0 && (
                    <Item variant="outline">
                        <ItemMedia variant="icon">
                            <Ban />
                        </ItemMedia>
                        <ItemContent>
                            <ItemTitle>No schedule available</ItemTitle>
                        </ItemContent>
                    </Item>
                )}
                {dayOfWeek.map((day) => {
                    const todaysAvailabilities = availabilities.filter(
                        (avail) => avail.day_of_week === day,
                    );
                    return (
                        <Fragment key={day}>
                            {todaysAvailabilities.length > 0 && (
                                <div className="flex w-full flex-col gap-3">
                                    <Label className="capitalize">{day}</Label>
                                    {todaysAvailabilities.map(
                                        (avail, index) => (
                                            <Item
                                                key={avail.id}
                                                variant="outline"
                                                className="hover:bg-accent"
                                            >
                                                <ItemContent>
                                                    <span className="flex gap-3">
                                                        <ItemTitle>
                                                            Session{' '}
                                                            {index + 1}{' '}
                                                        </ItemTitle>
                                                        {avail.note && (
                                                            <p className="">
                                                                {avail.note}
                                                            </p>
                                                        )}
                                                    </span>
                                                    <div className="flex h-fit w-fit gap-5">
                                                        <span className="flex gap-1">
                                                            <p className="text-gray-400">
                                                                Start:
                                                            </p>
                                                            <p className="font-semibold">
                                                                {avail.start_time.slice(
                                                                    0,
                                                                    5,
                                                                )}
                                                            </p>
                                                        </span>
                                                        <span className="flex gap-1">
                                                            <p className="text-gray-400">
                                                                End:
                                                            </p>
                                                            <p className="font-semibold">
                                                                {avail.end_time.slice(
                                                                    0,
                                                                    5,
                                                                )}
                                                            </p>
                                                        </span>
                                                    </div>
                                                </ItemContent>
                                                <ItemActions className="gap-3">
                                                    <button
                                                        className="cursor-pointer p-1"
                                                        onClick={() =>
                                                            handleEdit(avail)
                                                        }
                                                    >
                                                        <Pencil size={18} />
                                                    </button>
                                                    <button
                                                        className="cursor-pointer p-1 text-red-500"
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                avail,
                                                            )
                                                        }
                                                    >
                                                        <Trash size={18} />
                                                    </button>
                                                </ItemActions>
                                            </Item>
                                        ),
                                    )}
                                </div>
                            )}
                        </Fragment>
                    );
                })}
            </div>
        </AppLayout>
    );
}
