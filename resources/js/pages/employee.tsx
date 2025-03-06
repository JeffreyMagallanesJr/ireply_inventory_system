import { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Link, usePage } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Employee',
        href: '/employee',
    },
];

interface Employee {
    id_number: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    department: string;
    position: string;
}

export default function Employee({ employees }: { employees: Employee[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<'id_number' | 'last_name' | 'department' | 'position'>('id_number');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    const sortedEmployees = [...employees]
        .filter(employee =>
            employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            const aValue = a[sortColumn].toString().toLowerCase();
            const bValue = b[sortColumn].toString().toLowerCase();
            return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        });

    const toggleSort = (column: 'id_number' | 'last_name' | 'department' | 'position') => {
        if (sortColumn === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortColumn(column);
            setSortOrder('asc');
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between mb-4">
                    <Link href="/employee/employee-form" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Add Employee
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
                                    { key: 'id_number', label: 'Employee ID' },
                                    { key: 'last_name', label: 'Name' },
                                    { key: 'department', label: 'Department' },
                                    { key: 'position', label: 'Position' },
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 dark:border-gray-700 p-2 cursor-pointer text-center"
                                        onClick={() => toggleSort(key as 'id_number' | 'last_name' | 'department' | 'position')}
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
                            {sortedEmployees.length > 0 ? (
                                sortedEmployees.map((employee) => (
                                    <tr key={employee.id_number} className="border border-gray-300 dark:border-gray-700">
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{employee.id_number}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                                            {employee.last_name}, {employee.first_name} {employee.middle_name || ''}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{employee.department}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">{employee.position}</td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                                            <Link
                                                href={`/employee/employee-view/${employee.id_number}`}
                                                className="px-2 py-1 text-blue-500 hover:underline"
                                            >
                                                View
                                            </Link>
                                            <Link href={`/employee/employee-edit/${employee.id_number}`} className="ml-2 px-2 py-1 text-green-500 hover:underline">
                                                Edit
                                            </Link>

                                            <button className="ml-2 px-2 py-1 text-red-500 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">No employees found.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}