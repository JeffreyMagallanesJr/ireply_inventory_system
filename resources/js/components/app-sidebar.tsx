import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type NavGroup } from '@/types';
import { Link } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Monitor, UserCircle, ClipboardList, Smartphone, File } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: (NavItem | NavGroup)[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: 'Employee',
        url: '/employee',
        icon: UserCircle,
    },
    {
        title: 'Equipment',
        icon: Monitor, // No URL because it's a dropdown
        items: [
            {
                title: 'Inventory',
                url: '/equipment/inventory',
                icon: ClipboardList,
            },
            {
                title: 'Items',
                url: '/equipment/items',
                icon: Smartphone,
            },
        ],
    },
    {
        title: 'Transaction',
        url: '/transaction',
        icon: File,
    },
];


{/* 
const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];
*/}

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarContent>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            </SidebarContent>
        </Sidebar>
    );
}