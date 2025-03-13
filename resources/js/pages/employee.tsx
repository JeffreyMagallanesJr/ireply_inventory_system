
import { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Import useForm
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ChevronsUpDown , Trash2, Edit} from 'lucide-react';
import EmployeeForm from './employee/employee-form';
import EmployeeView from './employee/employee-view';
import EmployeeEdit from './employee/employee-edit';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    date_hired: Date;
}

export default function Employee({ employees }: { employees: Employee[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortColumn, setSortColumn] = useState<'id_number' | 'last_name' | 'department' | 'position'>('id_number');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const { delete: destroy } = useForm(); // Inertia's delete function

    // Function to handle employee deletion
    const handleDelete = () => {
        if (selectedEmployee) {
            destroy(route("employee.destroy", selectedEmployee.id_number), {
                onSuccess: () => toast.success("Employee deleted successfully!"),
                onError: () => toast.error("Failed to delete employee."),
            });
        }
        setIsDeleteModalOpen(false);
    };

    const handleAddEmployee = (newEmployee: Employee) => {
        if (newEmployee) {
            toast.success(`${newEmployee.first_name} ${newEmployee.last_name} has been successfully added.`);
        } else {
            toast.error("Failed to add employee.");
        }
    };

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
            <ToastContainer />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between mb-4">
                <Dialog>
                        <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded">Add Employee</DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add Employee</DialogTitle>
                            <EmployeeForm></EmployeeForm>
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
                                    { key: 'date_hired', label: 'Date Hired' },
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
                                        <td className="p-2 text-center">
                                            {new Date(employee.date_hired).toLocaleDateString('en-US', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </td>
                                        <td className="border border-gray-300 dark:border-gray-700 p-2 text-center">
                                            <Link
                                                href={`/employee/employee-view/${employee.id_number}`}
                                                className="px-2 py-1 text-blue-500 hover:underline"
                                            >
                                                View
                                            </Link>
                                            <Dialog>
                                            <DialogTrigger className="text-green-500"><Edit className="w-5 h-5" /></DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Edit Employee</DialogTitle>
                                                <EmployeeEdit employee={employee} />
                                            </DialogContent>
                                        </Dialog>

                                            <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
                                            <DialogTrigger
                                                className="text-red-500"
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
                                                    Are you sure you want to delete {employee.first_name} {employee.last_name}?
                                                </DialogDescription>
                                                <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">
                                                    Confirm Delete
                                                </button>
                                            </DialogContent>
                                        </Dialog>
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
