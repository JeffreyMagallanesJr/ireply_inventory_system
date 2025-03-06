import { useState, useEffect } from "react";
import { format } from "date-fns";
import { Breadcrumbs } from '@/components/breadcrumbs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';
import { ChevronLeft } from "lucide-react";

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const [currentTime, setCurrentTime] = useState(format(new Date(), "PPPP (hh:mm:ss a)"));

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(format(new Date(), "PPPP (hh:mm:ss a)"));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-300 px-6 transition-all ease-linear md:px-4">
            {/* Sidebar Toggle & Breadcrumbs */}
            <div className="flex items-center gap-2">
                <SidebarTrigger className="p-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition">
                    <ChevronLeft size={20} />
                </SidebarTrigger>
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>

            {/* Dashboard Title & Date-Time */}
            <div className="text-right">
                <h1 className="text-xl font-bold text-blue-700">EQUIPMENT INVENTORY SYSTEM</h1>
                <p className="text-sm text-gray-600">{currentTime}</p>
            </div>
        </header>
    );
}
