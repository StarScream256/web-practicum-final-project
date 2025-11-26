import { login, register } from '@/routes';
import { dashboard as adminDashboard } from '@/routes/admin';
import { dashboard as patientDashboard } from '@/routes/patient';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    Stethoscope,
    MapPin,
    Phone,
    Mail,
    Heart,
    Shield,
    Users,
    Clock
} from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';

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
                <header className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
                    <div className="container mx-auto px-4">
                        <div className="flex items-center justify-between py-4">
                            {/* Clinic Logo and Name */}
                            <div className="flex items-center space-x-3">
                                <div className="bg-blue-600 text-white p-2 rounded-lg">
                                    <AppLogoIcon className="h-10 w-10" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Clinic Tongfang</h1>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Quality Healthcare Since 2077</p>
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
                                        className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-block rounded-md border border-blue-600 px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900"
                                        >
                                            Log in
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
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
                    <div className="max-w-4xl mx-auto">
                        <div className="flex justify-center items-center w-full mb-1">
                            <div className="flex justify-center items-center">
                                <AppLogoIcon className="h-50 w-50" />
                            </div>
                        </div>
                        <div className="display-flex justify-center fle">
                        </div>
                        <div className="text-center mb-16">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Welcome to Clinic Tongfang
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-8 max-w-3xl mx-auto">
                                We just opened yesterday, but my neighbor said it's work.
                            </p>
                        </div>

                        {/* Key Features */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                            <div className="text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Heart className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Compassionate Care</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Patient-centered approach with genuine concern for your well-being<br/>(we charge extra for hugs)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Trusted Experience</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    1 day of medical excellence and community service<br/>(we just opened yesterday)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Expert Team</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Qualified doctors and staff dedicated to your health<br/>(we hired my neighbor's cousin)
                                </p>
                            </div>

                            <div className="text-center">
                                <div className="bg-blue-100 dark:bg-blue-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Clock className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Convenient Access</h3>
                                <p className="text-gray-600 dark:text-gray-300 text-sm">
                                    Easy appointment scheduling and flexible hours<br/> (if the server not goes down)
                                </p>
                            </div>
                        </div>

                        {/* Detailed Description */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-8 mb-16">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                Our Commitment to You
                            </h2>
                            <div className="prose prose-lg dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
                                <p className="mb-4 text-center">
                                    We don't have Commitment<br/>
                                    Owh I just remember we had one, we'll keep your money as much as possible
                                </p>
                            </div>
                        </div>

                        {/* Call to Action */}
                        <div className="text-center">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                                Ready to Spend Your Money?
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
                                Join no one of satisfied patients who trust Clinic Tongfang with their health needs.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Link
                                        href={
                                            auth.user.role === 'admin'
                                                ? adminDashboard()
                                                : patientDashboard()
                                        }
                                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
                                    >
                                        Go to Dashboard
                                    </Link>
                                ) : (
                                    <>
                                        <Link
                                            href={login()}
                                            className="inline-flex items-center justify-center rounded-md border border-blue-600 px-8 py-3 text-lg font-medium text-blue-600 hover:bg-blue-50 transition-colors dark:text-blue-400 dark:border-blue-400 dark:hover:bg-blue-900"
                                        >
                                            Existing Patient Login
                                        </Link>
                                        {canRegister && (
                                            <Link
                                                href={register()}
                                                className="inline-flex items-center justify-center rounded-md bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700 transition-colors"
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
                <footer className="bg-gray-800 text-white py-12">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div>
                                <div className="flex items-center space-x-3 mb-4">
                                    <Stethoscope className="h-8 w-8" />
                                    <span className="text-2xl font-bold">Clinic Tongfang</span>
                                </div>
                                <p className="text-gray-300 text-sm">
                                    Providing compassionate healthcare to our community since 1985.
                                    Traditional values, modern medicine.
                                </p>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4">Contact Information</h4>
                                <div className="space-y-3 text-gray-300">
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 mr-3" />
                                        <span>123 Main Street, Medical District</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Phone className="h-4 w-4 mr-3" />
                                        <span>(555) 123-HEALTH</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Mail className="h-4 w-4 mr-3" />
                                        <span>contact@clinictongfang.com</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg mb-4">Clinic Hours</h4>
                                <div className="space-y-2 text-gray-300 text-sm">
                                    <div className="pt-2 font-semibold text-white">
                                        We just open whenever we want
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
                            <p>&copy; 2077-Doomday Clinic Tongfang. All rights is right.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}