import { login } from '@/routes';
import { store } from '@/routes/register';
import { Form, Head } from '@inertiajs/react';

import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';

export default function Register() {
    return (
        <AuthLayout
            title="Create an account"
            description="Enter your details below to create your account"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex w-full items-center justify-center"
            >
                {({ processing, errors }) => (
                    <div className="flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="flex w-full flex-col gap-6 md:flex-row">
                            <div className="flex w-full flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Full name"
                                    />
                                    <InputError
                                        message={errors.name}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="phone">Phone number</Label>
                                    <Input
                                        id="phone"
                                        type="number"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        name="phone"
                                        placeholder="Phone number"
                                    />
                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label>Gender</Label>
                                    <span className="flex w-full gap-4">
                                        <Label
                                            htmlFor="genderMale"
                                            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 outline-2 outline-transparent has-checked:bg-indigo-500/40 has-checked:outline-indigo-500"
                                        >
                                            <input
                                                id="genderMale"
                                                type="radio"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                name="gender"
                                                value="male"
                                                className=""
                                            />
                                            <p>Male</p>
                                        </Label>
                                        <Label
                                            htmlFor="genderFemale"
                                            className="flex w-full items-center gap-2 rounded-sm px-3 py-2 outline-2 outline-transparent has-checked:bg-indigo-500/40 has-checked:outline-indigo-500"
                                        >
                                            <input
                                                id="genderFemale"
                                                type="radio"
                                                required
                                                autoFocus
                                                tabIndex={1}
                                                name="gender"
                                                value="female"
                                                className=""
                                            />
                                            <p>Female</p>
                                        </Label>
                                    </span>
                                    <InputError
                                        message={errors.phone}
                                        className="mt-2"
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Address</Label>
                                    <Input
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        name="address"
                                        placeholder="Address"
                                    />
                                    <InputError
                                        message={errors.dob}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="flex w-full flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="dob">Date of birth</Label>
                                    <Input
                                        id="dob"
                                        type="date"
                                        required
                                        tabIndex={2}
                                        autoComplete="dob"
                                        name="dob"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email address</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        tabIndex={3}
                                        autoComplete="new-password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm password
                                    </Label>
                                    <Input
                                        id="password_confirmation"
                                        type="password"
                                        required
                                        tabIndex={4}
                                        autoComplete="new-password"
                                        name="password_confirmation"
                                        placeholder="Confirm password"
                                    />
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex w-full flex-col items-center gap-2">
                            <Button
                                type="submit"
                                className="mt-2 w-fit"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing && <Spinner />}
                                Create account
                            </Button>
                            <div className="text-center text-sm text-muted-foreground">
                                Already have an account?{' '}
                                <TextLink href={login()} tabIndex={6}>
                                    Log in
                                </TextLink>
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </AuthLayout>
    );
}
