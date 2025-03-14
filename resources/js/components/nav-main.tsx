import { useState } from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { ChevronDown } from "lucide-react";


export function NavMain({ items = [] }: { items: (NavItem | NavGroup)[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-3 py-2">
            <SidebarGroupLabel className="text-lg font-semibold text-gray-700 uppercase tracking-wide"></SidebarGroupLabel>
            <SidebarMenu className="mt-4 space-y-2">
                {items.map((item) =>
                    'items' in item ? (
                        <NavGroupItem key={item.title} group={item} currentUrl={page.url} />
                    ) : (
                        <SidebarMenuItem key={item.title} className="py-3">
                            <SidebarMenuButton asChild isActive={item.url === page.url} className="w-full flex items-center gap-4 p-4 text-lg rounded-lg hover:bg-gray-100 transition">
                                <Link href={item.url} prefetch className="flex items-center gap-3 w-ful">
                                    {item.icon && <item.icon className="w-6 h-6 text-gray-700 dark:text-white" />}
                                    <span className="flex-1 truncate">{item.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    )
                )}
            </SidebarMenu>
        </SidebarGroup>
    );
}

function NavGroupItem({ group, currentUrl }: { group: NavGroup; currentUrl: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarMenuItem className="py-3">
            <SidebarMenuButton onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-4 p-4 text-lg rounded-lg hover:bg-gray-100 transition">
                {group.icon && <group.icon className="w-4 h-5 text-gray-700 dark:text-white" />}
                <span className="flex-1">{group.title}</span>
                
                <ChevronDown className={`w-5 h-5 transition-transform duration-200 text-gray-700 dark:text-white ${isOpen ? "rotate-180" : "rotate-0"}`} />
            </SidebarMenuButton>
            <div className={`transition-[max-height] duration-300 ease-in-out overflow-hidden ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
                <div className="ml-6 mt-2 space-y-1">
                    {group.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title} className="py-0">
                            <SidebarMenuButton asChild isActive={subItem.url === currentUrl} className="w-full flex items-center gap-4 p-3 text-base rounded-lg hover:bg-gray-50 transition">
                                <Link href={subItem.url} className="flex items-center gap-4 w-full">
                                    {subItem.icon && <subItem.icon className="w-5 h-5 text-gray-500" />}
                                    <span className="flex-1 truncate">{subItem.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
                </div>
            
        </SidebarMenuItem>
    );
}