import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle, Eye, EyeOff } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthSimpleLayout from '@/layouts/auth-layout';

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

    const [showPassword, setShowPassword] = useState(false);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthSimpleLayout title="LOGIN" description=''>
            <Head title="Log in" />

            <form className="flex flex-col gap-6" onSubmit={submit}>
                <div className="grid gap-4">
                    {/* Email Input */}
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            required
                            autoFocus
                            autoComplete="email"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="Email"
                            className="rounded-lg bg-gray-100 border-gray-300 text-black"
                        />
                        <InputError message={errors.email} />
                    </div>

                    {/* Password Input with Toggle */}
                    <div className="grid gap-2 relative">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                required
                                autoComplete="current-password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Enter password"
                                className="rounded-lg bg-gray-100 border-gray-300 text-black pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        <InputError message={errors.password} />
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} />
                            <Label htmlFor="remember" className="text-gray-700">Remember me</Label>
                        </div>
                        {canResetPassword && (
                            <a href={route('password.request')} className="text-sm text-blue-500">
                                Forgot password?
                            </a>
                        )}
                    </div>

                    {/* Sign In Button */}
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3">
                        {processing ? <LoaderCircle className="h-5 w-5 animate-spin" /> : "Sign in"}
                    </Button>
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-3">
                    <hr className="flex-grow border-gray-300" />
                    <span className="px-2 text-gray-500 text-sm">or</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Social Login Buttons */}
                <div className="flex space-x-3">
                    <button className="flex items-center justify-center w-50 p-3 bg-black text-white rounded-lg">
                        <img src="/google-icon.svg" alt="Google" className="w-5 h-5 mr-2" />
                        Sign in with Google
                    </button>
                    <button className="flex items-center justify-center w-50 p-3 bg-black text-white rounded-lg">
                        <img src="/slack-icon.png" alt="Slack" className="" />
                        Sign in with Slack
                    </button>
                </div>

                {/* Register Link */}
                <p className="text-center text-sm text-gray-600 mt-3">
                    Don’t have an account? <a href={route('register')} className="text-blue-500 font-semibold">Register now</a>
                </p>
            </form>
        </AuthSimpleLayout>
    );
}
