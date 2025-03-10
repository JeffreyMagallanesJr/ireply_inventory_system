import { useState } from 'react';
import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type NavGroup } from '@/types';
import { Link, usePage } from '@inertiajs/react';

export function NavMain({ items = [] }: { items: (NavItem | NavGroup)[] }) {
    const page = usePage();

    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                {items.map((item) =>
                    'items' in item ? (
                        <NavGroupItem key={item.title} group={item} currentUrl={page.url} />
                    ) : (
                        <SidebarMenuItem key={item.title}>
                            <SidebarMenuButton asChild isActive={item.url === page.url}>
                                <Link href={item.url} prefetch>
                                    {item.icon && <item.icon />}
                                    <span>{item.title}</span>
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
        <SidebarMenuItem>
            <SidebarMenuButton onClick={() => setIsOpen(!isOpen)}>
                {group.icon && <group.icon />}
                <span>{group.title}</span>
            </SidebarMenuButton>
            {isOpen && (
                <div className="ml-4 space-y-2">
                    {group.items.map((subItem) => (
                        <SidebarMenuItem key={subItem.title}>
                            <SidebarMenuButton asChild isActive={subItem.url === currentUrl}>
                                <Link href={subItem.url}>
                                    {subItem.icon && <subItem.icon />}
                                    <span>{subItem.title}</span>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    ))}
                </div>
            )}
        </SidebarMenuItem>
    );
}
