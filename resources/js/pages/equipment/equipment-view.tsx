import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Equipment', href: '/equipment' },
    { title: 'View Equipment', href: '#' },
];

interface Equipment {
    id: number;
    item: string;
    serial_number: string;
    quantity: number;
    status: string;
    stored_date: string;
    created_at: string;
    updated_at: string;
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
                    <p><strong>Quantity:</strong> {equipment.quantity}</p>
                    <p><strong>Status:</strong> {equipment.status}</p>
                    <p><strong>Stored Date:</strong> {equipment.stored_date}</p>
                    <p><strong>Created At:</strong> {new Date(equipment.created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(equipment.updated_at).toLocaleString()}</p>
                </div>
                <div className="mt-4">
                    <Link href="/equipment" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Back</Link>
                    <Link href={`/equipment/equipment-edit/${equipment.id}`} className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Edit</Link>
                </div>
            </div>
        </AppLayout>
    );
}
