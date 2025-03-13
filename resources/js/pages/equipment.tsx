import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import { format } from 'date-fns';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Equipment',
        href: '/equipment/items',
    },
    {
        title: 'Items',
        href: '/equipment/items',
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
    const searchParams = new URLSearchParams(window.location.search);
    const url = searchParams.get('search');
    const [searchTerm, setSearchTerm] = useState(url || '');
    const [sortColumn, setSortColumn] = useState<'item' | 'description' | 'serial_number' | 'stored_date' | 'status'>('item');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
    const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);

    const { delete: destroy } = useForm();

    const handleDelete = () => {
        if (!selectedEquipment) return;

        destroy(route('equipment.destroy', selectedEquipment.id), {
            preserveScroll: true,
            onSuccess: () => {
                setDeleteConfirmOpen(false);
                setDeleteSuccessOpen(true);
            },
            onError: (errors) => alert(errors.message),
        });
    };

    const sortedEquipments = [...equipments]
        .filter(equipment =>
            equipment.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.serial_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
            equipment.status.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortColumn].toString().toLowerCase();
            const bValue = b[sortColumn].toString().toLowerCase();
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });

        const toggleSort = (column: 'item' | 'description' | 'serial_number' | 'stored_date' | 'status') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Equipment" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between mb-4">
                    <Link href="/equipment/equipment-form" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Equipment
                    </Link>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border md:min-h-min p-4 bg-white dark:bg-gray-900">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {[
                                    { key: 'item', label: 'Item Name' },
                                    { key: 'description', label: 'Description' },
                                    { key: 'serial_number', label: 'Serial Number' },
                                    { key: 'stored_date', label: 'Stored Date' },
                                    { key: 'status', label: 'Status' },
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 dark:border-gray-700 p-2 cursor-pointer text-center"
                                        onClick={() => toggleSort(key as 'item' | 'description' | 'serial_number' | 'stored_date' | 'status')}
                                    >
                                        <div className="flex items-center justify-center gap-1">
                                            {label}
                                            <ChevronsUpDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                ))}
                                <th className="border border-gray-300 dark:border-gray-700 p-2">Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {sortedEquipments.length > 0 ? (
                                sortedEquipments.map((equipment) => (
                                    <tr key={equipment.id} className="border border-gray-300 dark:border-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.item}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.description}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.serial_number}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{format(new Date(equipment.stored_date), 'MMMM d, yyyy')}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{equipment.status}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                                            <Link
                                                href={`/equipment/equipment-view/${equipment.id}`}
                                                className="px-2 py-1 text-blue-500 hover:underline"
                                            >
                                                View
                                            </Link>
                                            <Link href={`/equipment/equipment-edit/${equipment.id}`} className="ml-2 px-2 py-1 text-green-500 hover:underline">
                                                Edit
                                            </Link>

                                            <Dialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
                                                <DialogTrigger asChild>
                                                    <button
                                                        onClick={() => {
                                                            setSelectedEquipment(equipment);
                                                            setDeleteConfirmOpen(true);
                                                        }}
                                                        className="text-red-500 hover:underline"
                                                    >
                                                        Delete
                                                    </button>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle>Are you sure?</DialogTitle>
                                                    <DialogDescription>
                                                        This action cannot be undone. Do you want to proceed?
                                                    </DialogDescription>
                                                    <DialogFooter>
                                                        <button onClick={handleDelete} className="text-red-500 hover:underline">Confirm Delete</button>
                                                        <DialogClose asChild>
                                                            <button className="text-gray-500 hover:underline">Cancel</button>
                                                        </DialogClose>
                                                    </DialogFooter>
                                                </DialogContent>
                                            </Dialog>

                                            {/* <button
                                                onClick={() => handleDelete(equipment.id)}
                                                className="ml-2 px-2 py-1 text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button> */}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">No equipment found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <Dialog open={deleteSuccessOpen} onOpenChange={setDeleteSuccessOpen}>
                <DialogContent>
                    <DialogTitle>Item Deleted</DialogTitle>
                    <DialogDescription>The item has been successfully deleted.</DialogDescription>
                    <DialogFooter>
                        <DialogClose asChild>
                            <button className="text-blue-500 hover:underline">OK</button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}
