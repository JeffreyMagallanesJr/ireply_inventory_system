import { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import EmployeeForm from './employee/employee-form';
import EmployeeView from './employee/employee-view';
import EmployeeEdit from './employee/employee-edit';
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogTitle, 
    DialogDescription, 
    DialogClose 
} from "@/components/ui/dialog";
import { Eye, Edit, Trash2 } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast"; // Import Toast Hook
import { ToastProvider, Toast } from "@/components/ui/toast"; // Import Toast Component

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employee', href: '/employee' },
];

interface Employee {
    id_number: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    department: string;
    position: string;
    date_hired: string; // Keeping it as a string for sorting conversion
}

export default function Employee({ employees }: { employees: Employee[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<'id_number' | 'last_name' | 'department' | 'position' | 'date_hired'>('id_number');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { delete: destroy } = useForm();
    
        const handleDelete = () => {
            if (selectedEmployee) {
                destroy(route('employee.destroy', selectedEmployee.id_number), {});
            }
            setIsDeleteModalOpen(false);
        };

    const sortedEmployees = useMemo(() => {
        return [...employees]
            .filter(employee =>
                employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
                employee.position.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                const aValue = sortColumn === 'date_hired' ? new Date(a.date_hired).getTime() : a[sortColumn].toString().toLowerCase();
                const bValue = sortColumn === 'date_hired' ? new Date(b.date_hired).getTime() : b[sortColumn].toString().toLowerCase();
                return sortOrder === 'asc' 
                    ? (aValue < bValue ? -1 : 1)
                    : (aValue > bValue ? -1 : 1);
            });
    }, [employees, searchTerm, sortColumn, sortOrder]);

    const toggleSort = (column: 'id_number' | 'last_name' | 'department' | 'position' | 'date_hired') => {
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
                    
                    {/* Add Employee Modal */}
                    <Dialog>
                        <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded">
                            Add Employee
                        </DialogTrigger>
                        <DialogContent className="!max-w-4xl w-200">
                            <DialogTitle>Add Employee</DialogTitle>
                            <EmployeeForm />
                        </DialogContent>
                    </Dialog>

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
                                    { key: 'date_hired', label: 'Date Hired' }
                                ].map(({ key, label }) => (
                                    <th
                                        key={key}
                                        className="border border-gray-300 dark:border-gray-700 p-2 cursor-pointer text-center"
                                        onClick={() => toggleSort(key as any)}
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
                                        <td className="p-2 text-center">{employee.id_number}</td>
                                        <td className="p-2 text-center">
                                            {employee.last_name}, {employee.first_name} {employee.middle_name || ''}
                                        </td>
                                        <td className="p-2 text-center">{employee.department}</td>
                                        <td className="p-2 text-center">{employee.position}</td>
                                        <td className="p-2 text-center">
                                            {new Date(employee.date_hired).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </td>
                                        <td className="p-2 text-center flex justify-center gap-2">
    {/* View Employee Modal */}
    <Dialog>
        <DialogTrigger className="text-blue-500 hover:text-blue-700">
            <Eye className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Details</DialogTitle>
            <EmployeeView employee={employee} />
        </DialogContent>
    </Dialog>

    {/* Edit Employee Modal */}
    <Dialog>
        <DialogTrigger
            className="text-green-500 hover:text-green-700"
            onClick={() => setSelectedEmployee(employee)}
        >
            <Edit className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent className="!max-w-4xl w-200">
            <DialogTitle>Edit Employee</DialogTitle>
            <EmployeeEdit employee={selectedEmployee!} />
        </DialogContent>
    </Dialog>

    {/* Delete Employee Modal */}
    <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogTrigger
            className="text-red-500 hover:text-red-700"
            onClick={() => {
                setSelectedEmployee(employee);
                setIsDeleteModalOpen(true);
            }}
        >
            <Trash2 className="w-5 h-5" />
        </DialogTrigger>
        <DialogContent>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
                Are you sure you want to delete {selectedEmployee?.first_name} {selectedEmployee?.last_name}?
            </DialogDescription>
            <div className="flex justify-end gap-4 mt-4">
                <DialogClose className="px-4 py-2 bg-gray-400 text-white rounded">
                    Cancel
                </DialogClose>
                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                    Confirm Delete
                </button>
            </div>
        </DialogContent>
    </Dialog>
</td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={6} className="p-4 text-center">No employees found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
