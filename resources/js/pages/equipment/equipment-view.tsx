import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';
import { format } from 'date-fns';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Equipment', href: '/equipment/items' },
    { title: 'View Equipment', href: '#' },
];

interface Equipment {
    id: number;
    item: string;
    serial_number: string;
    specs: string;
    description: string;
    status: string;
    stored_date: string;
}

export default function EquipmentView() {
    const { props } = usePage<PageProps<{ equipment: Equipment }>>();
    const equipment = props.equipment;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Equipment" />
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Equipment Details</h2>
                <div className="space-y-2">
                    <p><strong>Item Name:</strong> {equipment.item}</p>
                    <p><strong>Serial Number:</strong> {equipment.serial_number}</p>
                    <p><strong>Specs:</strong> {equipment.specs}</p>
                    <p><strong>Description:</strong> {equipment.description}</p>
                    <p><strong>Status:</strong> {equipment.status}</p>
                    <p><strong>Stored Date:</strong> {format(new Date(equipment.stored_date), 'MMMM d, yyyy')}</p>
                </div>
                <div className="mt-4">
                    <Link href="/equipment/items" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Back</Link>
                    <Link href={`/equipment/equipment-edit/${equipment.id}`} className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Edit</Link>
                </div>
            </div>
        </AppLayout>
    );
}
