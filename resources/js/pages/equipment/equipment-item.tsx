import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { ChevronsUpDown } from 'lucide-react';

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

    // Grouping equipment by description
    const groupedEquipments = equipments.reduce((acc, equipment) => {
        const key = equipment.description;
        if (!acc[key]) {
            acc[key] = { description: key, totalQuantity: 0, availableCount: 0, totalCount: 0 };
        }
        acc[key].totalQuantity += parseInt(equipment.quantity, 10);
        acc[key].totalCount += 1;
        if (equipment.status.toLowerCase() === 'available') {
            acc[key].availableCount += 1;
        }
        return acc;
    }, {} as Record<string, { description: string; totalQuantity: number; availableCount: number; totalCount: number }>);

    const sortedEquipments = Object.values(groupedEquipments).sort((a, b) => {
        let aValue: string | number;
        let bValue: string | number;
    
        if (sortColumn === 'quantity') {
            aValue = a.totalQuantity;
            bValue = b.totalQuantity;
        } else if (sortColumn === 'status') {
            aValue = a.availableCount / a.totalCount; // Sort by availability ratio
            bValue = b.availableCount / b.totalCount;
        } else {
            aValue = a.description.toLowerCase();
            bValue = b.description.toLowerCase();
        }
    
        return sortOrder === 'asc' ? (aValue > bValue ? 1 : -1) : (aValue < bValue ? 1 : -1);
    });
    

    const toggleSort = (column: 'description' | 'quantity' | 'status') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Equipment',
            href: '/equipment/inventory',
        },
        {
            title: 'Inventory',
            href: '/equipment/inventory',
        },
        {
            title: `${equipments[0]?.item}`,
            href: `/equipment/${equipments[0]?.item}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Equipment - ${equipments[0]?.item}`} />
            <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-4">{equipments[0]?.item}</h1>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {[
                                    { key: 'description', label: 'Description' },
                                    { key: 'quantity', label: 'Total Quantity' },
                                    { key: 'status', label: 'Available/Total' },
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
                                    <tr key={equipment.description} className="border border-gray-300 dark:border-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.description}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.totalQuantity}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{`${equipment.availableCount}/${equipment.totalCount}`}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={3} className="p-4 text-center">No equipment found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
