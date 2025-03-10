import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Equipment', href: '/equipment/items' },
    { title: 'Edit Equipment', href: '#' },
];

interface Equipment {
    id: number;
    item: string;
    serial_number: string;
    quantity: number;
    status: string;
    stored_date: string;
}

export default function EquipmentEdit() {
    const { props } = usePage<PageProps<{ equipment: Equipment }>>();
    const equipment = props.equipment;

    const { data, setData, put, processing, errors } = useForm<Equipment>({
        id: equipment.id,
        item: equipment.item,
        serial_number: equipment.serial_number,
        quantity: equipment.quantity,
        status: equipment.status,
        stored_date: equipment.stored_date,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/equipment/update/${data.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Equipment" />
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Edit Equipment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Item Name</label>
                        <input
                            type="text"
                            value={data.item}
                            onChange={(e) => setData('item', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.item && <p className="text-red-500">{errors.item}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Serial Number</label>
                        <input
                            type="text"
                            value={data.serial_number}
                            onChange={(e) => setData('serial_number', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.serial_number && <p className="text-red-500">{errors.serial_number}</p>}
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" disabled={processing}>
                            Update Equipment
                        </button>
                        <a href="/equipment/items" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
