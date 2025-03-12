import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';

interface Equipment {
    id: number;
    item: string;
    description: string;
    quantity: string;
    status: string;
}

export default function EquipmentItem({ equipments }: { equipments: Equipment[] }) {
    const [sortColumn, setSortColumn] = useState<'description' | 'quantity' | 'status'>('description');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const toggleSort = (column: 'description' | 'quantity' | 'status') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const sortedEquipments = [...equipments].sort((a, b) => {
        const aValue = a[sortColumn].toString().toLowerCase();
        const bValue = b[sortColumn].toString().toLowerCase();
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });

    return (
        <AppLayout>
            <Head title={`Equipment - ${equipments[0]?.item}`} />
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">{equipments[0]?.item}</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {[
                                    { key: 'description', label: 'Description' },
                                    { key: 'quantity', label: 'Quantity' },
                                    { key: 'status', label: 'Status' },
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 dark:border-gray-700 p-2 cursor-pointer text-center"
                                        onClick={() => toggleSort(key as 'description' | 'quantity' | 'status')}
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            {label}
                                            <ChevronsUpDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEquipments.length > 0 ? (
                                sortedEquipments.map((equipment) => (
                                    <tr key={equipment.id} className="border border-gray-300 dark:border-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.description}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.quantity}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.status}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="p-4 text-center">No equipment found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <Link href="/equipment/inventory" className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Back to Inventory
                </Link>
            </div>
        </AppLayout>
    );
}
