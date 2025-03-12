import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment',
        href: '/equipment/inventory',
    },
    {
        title: 'Inventory',
        href: '/equipment/inventory',
    },
];

interface Equipment {
    id: number;
    item: string;
    description: string;
    serial_number: string;
    stored_date: string;
    status: string;
}

export default function Equipment({ equipments }: { equipments: Equipment[] }) {
    console.log("my object: %o", equipments[0]['item'])
    const total_equipments = equipments.length;
    const available_equipments = equipments.filter(check_availability).length;

    const grouped_equipments = equipments.reduce((acc, equipment) => {
        const item_name = equipment.item;

        if (!acc[item_name]) {
            acc[item_name] = { available: [], unavailable: []};
        }

        if (equipment.status.toLowerCase() === 'available') {
            acc[item_name].available.push(equipment);
        } else {
            acc[item_name].unavailable.push(equipment);
        }

        return acc;
    }, {} as Record<string, { available: Equipment[]; unavailable: Equipment[] }>);


    function check_availability(equipment: Equipment) {
        return equipment['status'] === 'available'
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Inventory" />
            <div className="relative min-h-[100vh] flex overflow-hidden rounded-xl md:min-h-min p-4 bg-white dark:bg-gray-900 items-center justify-center">
                <div className="flex gap-2">
                    {Object.entries(grouped_equipments).map(([item_name, { available, unavailable }]) => (
                        <div key={item_name} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                            <a href={`/equipment/items/${encodeURIComponent(item_name)}`}>
                                {item_name}: {available.length} / {available.length + unavailable.length}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
}