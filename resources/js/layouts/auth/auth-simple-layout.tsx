import AppLogoIcon from '@/components/app-logo-icon';
import { Link } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSimpleLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    return (
        <div
            className="flex min-h-screen items-center justify-center p-6 md:p-10"
            style={{
                background: 'linear-gradient(299.62deg, #213D84 -15.18%, #1F62B1 21.49%, #FFFFFF 65.56%)',
            }}
        >
            <div className="flex w-full max-w-5xl items-center justify-between">
                {/* Left Section - Logo & Branding */}
                <div className="flex flex-col items-start text-left space-y-4 w-1/2">
                    <Link href={route('home')} className="flex items-center gap-3">
                        <AppLogoIcon className="" />
                        <span className="text-5xl font-bold text-gray-900"></span>
                    </Link>
                </div>

                {/* Right Section - Login Form */}
                <div className="bg-white p-7 rounded-lg shadow-x3">
                    <div className="space-y-2 text-center">
                        <h1 className="text-2xl font-semibold text-black">{title}</h1>
                        {description && <p className="text-sm text-gray-600">{description}</p>}
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}