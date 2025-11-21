import { InertiaLinkProps } from '@inertiajs/react';
import { type ClassValue, clsx } from 'clsx';
import { addMinutes, format, parse, parseISO } from 'date-fns';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function isSameUrl(
    url1: NonNullable<InertiaLinkProps['href']>,
    url2: NonNullable<InertiaLinkProps['href']>,
) {
    return resolveUrl(url1) === resolveUrl(url2);
}

export function resolveUrl(url: NonNullable<InertiaLinkProps['href']>): string {
    return typeof url === 'string' ? url : url.url;
}

export interface Appointment {
    id: number;
    staff_id: number;
    appointment_start_time: string; // "2025-11-21 09:00:00"
    appointment_end_time: string; // "2025-11-21 10:00:00"
}

export interface TimeSlot {
    time: string; // "09:30"
    available: boolean;
}

export function generateAvailableSlots(
    startStr: string,
    endStr: string,
    selectedDate: Date,
    appointments: Appointment[],
): TimeSlot[] {
    const slots: TimeSlot[] = [];
    const step = 30;
    const dayStart = parse(startStr, 'HH:mm:ss', selectedDate);
    const dayEnd = parse(endStr, 'HH:mm:ss', selectedDate);

    let currentSlot = dayStart;
    while (currentSlot < dayEnd) {
        const slotTimeString = format(currentSlot, 'HH:mm');
        const isBooked = appointments.some((appt) => {
            const apptStart = parseISO(appt.appointment_start_time);
            const apptEnd = parseISO(appt.appointment_end_time);

            // Logic: The slot is booked if the current slot time is
            // equal to or after the start AND strictly before the end.
            // (e.g. 09:00 is booked for a 09:00-10:00 appt.
            //       09:30 is booked.
            //       10:00 is FREE).
            return currentSlot >= apptStart && currentSlot < apptEnd;
        });

        slots.push({
            time: slotTimeString,
            available: !isBooked,
        });
        currentSlot = addMinutes(currentSlot, step);
    }

    return slots;
}
