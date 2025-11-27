import AppLogoIcon from '@/components/app-logo-icon';
import { login, register } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { dashboard as patientDashboard } from '@/routes/patient';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BadgeJapaneseYen,
    Clock,
    Heart,
    Mail,
    MapPin,
    Phone,
    Shield,
    Users,
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome to Clinic Tongfang">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
                {/* Simple Header */}
                <header className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-4">
                            {/* Clinic Logo and Name */}
                            <div className="flex items-center space-x-3">
                                <div className="rounded-lg bg-blue-600 p-2 text-white">
                                    <AppLogoIcon className="h-10 w-10" />
                                </div>
                                <div>
                                    <h1 className="font-kaushan-script text-xl font-bold text-gray-900 dark:text-white">
                                        Clinic Tongfang
                                    </h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Quality Healthcare Since 2077
                                    </p>
                                </div>
                            </div>

                            {/* User Auth Links */}
                            <div className="flex items-center space-x-3">
                                {auth.user ? (
                                    <Link
                                        href={
                                            auth.user.role === 'admin'
                                                ? adminDashboard()
                                                : patientDashboard()
                                        }
                                        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                Register
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                <main className="container mx-auto px-4 py-16">
                    <div className="mx-auto max-w-4xl">
                        <div className="mb-1 flex w-full items-center justify-center">
                            <div className="flex items-center justify-center">
                                <AppLogoIcon className="h-50 w-50" />
                            </div>
                        </div>
                        <div className="display-flex fle justify-center"></div>
                        <div className="mb-16 text-center">
                            <h1 className="mb-6 text-4xl font-bold text-gray-900 lg:text-5xl dark:text-white">
                                Welcome to Clinic Tongfang
                            </h1>
                            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-600 dark:text-gray-300">
                                We just opened yesterday, but my neighbor said
                                it's work.
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Compassionate Care
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Patient-centered approach with genuine
                                    concern for your well-being
                                    <br />
                                    (we charge extra for hugs)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Trusted Experience
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    1 day of medical excellence and community
                                    service
                                    <br />
                                    (we just opened yesterday)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Expert Team
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Qualified doctors and staff dedicated to
                                    your health
                                    <br />
                                    (we hired my neighbor's cousin)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                                    <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    Convenient Access
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">
                                    Easy appointment scheduling and flexible
                                    hours
                                    <br /> (if the server not goes down)
                                </p>
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="mb-16 rounded-lg border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                            <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-white">
                                Our Commitment to You
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p className="mb-4 text-center">
                                    We don't have Commitment
                                    <br />
                                    Owh I just remember we had one, we'll keep
                                    your money as much as possible
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <h3 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
                                Ready to Spend Your Money?
                            </h3>
                            <p className="mx-auto mb-8 max-w-2xl text-gray-600 dark:text-gray-300">
                                Join no one of satisfied patients who trust
                                Clinic Tongfang with their health needs.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                {auth.user ? (
                                    <Link
                                        href={
                                            auth.user.role === 'admin'
                                                ? adminDashboard()
                                                : patientDashboard()
                                        }
                                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center justify-center rounded-md border border-blue-600 px-8 py-3 text-lg font-medium text-blue-600 transition-colors hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-900"
                                        >
                                            Existing Patient Login
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white transition-colors hover:bg-blue-700"
                                            >
                                                New Patient Registration
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="bg-gray-800 py-12 text-white">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                            <div>
                                <div className="mb-4 flex items-center space-x-3">
                                    <BadgeJapaneseYen className="h-8 w-8" />
                                    <span className="text-2xl font-bold">
                                        Clinic Tongfang
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300">
                                    Providing compassionate healthcare to our
                                    community since 1985. Traditional values,
                                    modern medicine.
                                </p>
                            </div>
                            <div>
                                <h4 className="mb-4 text-lg font-bold">
                                    Contact Information
                                </h4>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-center">
                                        <MapPin className="mr-3 h-4 w-4" />
                                        <span>
                                            123 Main Street, Medical District
                                        </span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="mr-3 h-4 w-4" />
                                        <span>(555) 123-HEALTH</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="mr-3 h-4 w-4" />
                                        <span>contact@clinictongfang.com</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="mb-4 text-lg font-bold">
                                    Clinic Hours
                                </h4>
                                <div className="space-y-2 text-sm text-gray-300">
                                    <div className="pt-2 font-semibold text-white">
                                        We just open whenever we want
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 border-t border-gray-700 pt-8 text-center text-gray-300">
                            <p>
                                &copy; 2077-Doomday Clinic Tongfang. All rights
                                is right.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
