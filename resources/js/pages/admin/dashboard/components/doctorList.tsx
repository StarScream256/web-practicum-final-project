import { Card, CardContent} from '@/components/ui/card';
import { Staff } from '@/pages/admin/staff';

export interface DoctorsProps {
    doctors: Staff[];
}

export default function DoctorList({
    doctors,
}: DoctorsProps) {
    return (
        <div className="flex h-fit w-full flex-col gap-4">
            <h2 className="text-xl font-semibold">Doctors</h2>
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        No
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Name
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Email
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Specialization
                                    </th>
                                    <th className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
                                        Job Title
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                                {doctors.length > 0 ? (
                                    doctors.map((doctor, index) => (
                                        <tr key={doctor.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-white">
                                                {index + 1}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {doctor.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {doctor.user.email}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {doctor.specialization}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-white">
                                                {doctor.job_title?.title ||
                                                    'N/A'}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-3 py-4 text-center text-sm text-gray-500 dark:text-gray-400"
                                        >
                                            No doctors found
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
