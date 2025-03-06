import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment',
        href: '/equipment',
    },
];

export default function Employee() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Header Section */}
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    {/* Card 1: Total Employees */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h2 className="text-lg font-semibold">Total Employees</h2>
                            <p className="text-3xl font-bold">1,234</p>
                        </div>
                    </div>

                    {/* Card 2: Active Employees */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h2 className="text-lg font-semibold">Active Employees</h2>
                            <p className="text-3xl font-bold">1,000</p>
                        </div>
                    </div>

                    {/* Card 3: On Leave */}
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border">
                        <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                            <h2 className="text-lg font-semibold">On Leave</h2>
                            <p className="text-3xl font-bold">234</p>
                        </div>
                    </div>
                </div>

                {/* Employee List Section */}
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min">
                    <PlaceholderPattern className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" />
                    <div className="absolute inset-0 flex flex-col p-6">
                        <h2 className="mb-4 text-xl font-semibold">Employee List</h2>
                        <div className="flex-1 overflow-auto">
                            {/* Placeholder for Employee List Table */}
                            <div className="grid gap-4">
                                {[...Array(10)].map((_, index) => (
                                    <div
                                        key={index}
                                        className="h-12 rounded-lg bg-neutral-100/50 dark:bg-neutral-800/50"
                                    ></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}