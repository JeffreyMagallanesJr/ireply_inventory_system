import { useState } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

interface Transaction {
    id: number;
    approved_by: string; // Changed from user_id
    borrower_name: string; // Changed from employee_id
    item: string; // Changed from equipment_id
    status: 'released' | 'returned' | 'lost';
    release_mode: 'on_site' | 'take_home';
    release_state: 'good_condition' | 'brand_new' | 'damaged';
    release_date: string;
    return_state: 'good_condition' | 'brand_new' | 'damaged';
    return_date: string;
}


// Define all available columns
const availableColumns = [
    { key: 'id', label: 'Transaction ID' },
    { key: 'approved_by', label: 'Approved By' }, // Full name of the user
    { key: 'borrower_name', label: 'Borrower Name' }, // Full name of the employee
    { key: 'item', label: 'Item' }, // Equipment item name
    { key: 'status', label: 'Status' },
    { key: 'release_mode', label: 'Release Mode' },
    { key: 'release_state', label: 'Release State' },
    { key: 'release_date', label: 'Release Date' },
    { key: 'return_state', label: 'Return State' },
    { key: 'return_date', label: 'Return Date' },
];


export default function Transactions({ transactions }: { transactions: Transaction[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<string>('id');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedColumns, setSelectedColumns] = useState<string[]>(['id', 'user_id', 'employee_id', 'equipment_id', 'status']);

    const { delete: destroy } = useForm();

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this transaction?')) {
            destroy(route('transactions.destroy', id), {
                preserveScroll: true,
                onSuccess: () => alert('Transaction deleted successfully'),
                onError: (errors) => alert(errors.message),
            });
        }
    };

    const sortedTransactions = [...transactions]
    .filter(transaction =>
        Object.values(transaction).some(value =>
            value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
    )
    .sort((a, b) => {
        const aValue = a[sortColumn as keyof Transaction]?.toString().toLowerCase() || '';
        const bValue = b[sortColumn as keyof Transaction]?.toString().toLowerCase() || '';
        return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });


    const toggleSort = (column: string) => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    const handleColumnSelection = (column: string) => {
        setSelectedColumns(prev =>
            prev.includes(column) ? prev.filter(col => col !== column) : [...prev, column]
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between mb-4">
                    <Link href="/transactions/create" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Transaction
                    </Link>
                    <input
                        type="text"
                        placeholder="Search..."
                        className="px-3 py-2 border rounded"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Column Selection */}
                <div className="mb-4 p-2 border rounded bg-gray-100 dark:bg-gray-800">
                    <p className="font-semibold mb-2">Select Columns:</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {availableColumns.map(({ key, label }) => (
                            <label key={key} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={selectedColumns.includes(key)}
                                    onChange={() => handleColumnSelection(key)}
                                />
                                <span>{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Transactions Table */}
                <div className="border rounded-xl p-4 bg-white dark:bg-gray-900">
                    <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
                        <thead>
                            <tr className="bg-gray-100 dark:bg-gray-800">
                                {availableColumns
                                    .filter(({ key }) => selectedColumns.includes(key))
                                    .map(({ key, label }) => (
                                        <th
                                            key={key}
                                            className="border p-2 cursor-pointer text-center"
                                            onClick={() => toggleSort(key)}
                                        >
                                            <div className="flex items-center justify-center gap-1">
                                                {label}
                                                <ChevronsUpDown className="w-4 h-4" />
                                            </div>
                                        </th>
                                    ))}
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedTransactions.length > 0 ? (
                                sortedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border">
                                        {availableColumns
                                            .filter(({ key }) => selectedColumns.includes(key))
                                            .map(({ key }) => (
                                                <td key={key} className="border p-2 text-center">
                                                    {transaction[key as keyof Transaction]?.toString() || '-'}
                                                </td>
                                            ))}
                                        <td className="border p-2 text-center">
                                            <Link href={`/transactions/view/${transaction.id}`} className="px-2 py-1 text-blue-500 hover:underline">
                                                View
                                            </Link>
                                            <Link href={`/transactions/edit/${transaction.id}`} className="ml-2 px-2 py-1 text-green-500 hover:underline">
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(transaction.id)}
                                                className="ml-2 px-2 py-1 text-red-500 hover:underline"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={selectedColumns.length + 1} className="p-4 text-center">
                                        No transactions found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
