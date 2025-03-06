import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

interface LoginProps {
    status?: string;
    canResetPassword: boolean;
}

export default function Login({ status, canResetPassword }: LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm<LoginForm>({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout title="Equipment Inventory Login" description=''>
            <Head title="Log in" />

            <form className="flex flex-col gap-6 bg-white p-6 rounded-lg shadow-lg w-[400px] text-black" onSubmit={submit}>
                <div className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Enter your email"
                            className='text-black'
                        />
                        <InputError message={errors.email} />
                    </div>

                    <div className="grid gap-2 text-black">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            {canResetPassword && (
                                <a href={route('password.request')} className="ml-auto text-sm text-blue-500" tabIndex={5}>
                                    Forgot password?
                                </a>
                            )}
                        </div>
                        <Input
                            id="password"
                            type="password"
                            required
                            tabIndex={2}
                            autoComplete="current-password"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="Enter password"
                            className='text-black'
                        />
                        <InputError message={errors.password} />
                    </div>

                    <div className="flex items-center space-x-3 text-black ">
                        <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
                        <Label htmlFor="remember">Remember me</Label>
                    </div>

                    <Button type="submit" className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white" tabIndex={4} disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                        Sign in
                    </Button>
                </div>

                {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
            </form>
        </AuthLayout>
    );
}
