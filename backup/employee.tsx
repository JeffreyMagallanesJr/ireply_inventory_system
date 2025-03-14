import { useState, useMemo } from 'react';
import { useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { ChevronsUpDown, Eye, Edit, Trash2 } from 'lucide-react';
import EmployeeForm from './employee/employee-form';
import EmployeeView from './employee/employee-view';
import EmployeeEdit from './employee/employee-edit';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const breadcrumbs: BreadcrumbItem[] = [{ title: 'Employee', href: '/employee' }];

interface Employee {
    id_number: string;
    first_name: string;
    last_name: string;
    email: string;
    address: string;
    contact_number: string;
    department: string;
    position: string;
    date_hired: string;
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

    const sortedEmployees = useMemo(() => {
        return employees.filter(employee =>
            employee.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            employee.position.toLowerCase().includes(searchTerm.toLowerCase())
        ).sort((a, b) => {
            const aValue = sortColumn === 'date_hired' ? new Date(a.date_hired).getTime() : a[sortColumn].toString().toLowerCase();
            const bValue = sortColumn === 'date_hired' ? new Date(b.date_hired).getTime() : b[sortColumn].toString().toLowerCase();
            return sortOrder === 'asc' ? (aValue < bValue ? -1 : 1) : (aValue > bValue ? -1 : 1);
        });
    }, [employees, searchTerm, sortColumn, sortOrder]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Employee" />
            <ToastContainer />

            <div className="flex flex-col gap-4 p-4">
                <div className="flex justify-between mb-4">
                    <Dialog>
                        <DialogTrigger className="px-4 py-2 bg-blue-500 text-white rounded">Add Employee</DialogTrigger>
                        <DialogContent>
                            <DialogTitle>Add Employee</DialogTitle>
                            <EmployeeForm onSuccess={handleAddEmployee} />
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

                <div className="border rounded-xl p-4 bg-white">
                    <table className="w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-100">
                                {['id_number', 'last_name', 'department', 'position', 'date_hired'].map((key) => (
                                    <th key={key} className="p-2 cursor-pointer" onClick={() => setSortColumn(key as any)}>
                                        <div className="flex items-center gap-1">
                                            {key.toUpperCase()}
                                            <ChevronsUpDown className="w-4 h-4" />
                                        </div>
                                    </th>
                                ))}
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedEmployees.length > 0 ? sortedEmployees.map((employee) => (
                                <tr key={employee.id_number}>   
                                    <td className="p-2 text-center">{employee.id_number}</td>
                                    <td className="p-2 text-center">{employee.last_name}, {employee.first_name}</td>
                                    <td className="p-2 text-center">{employee.department}</td>
                                    <td className="p-2 text-center">{employee.position}</td>
                                    <td className="p-2 text-center">{new Date(employee.date_hired).toLocaleDateString()}</td>
                                    <td className="p-2 text-center flex gap-2">
                                        <Dialog>
                                            <DialogTrigger className="text-blue-500"><Eye className="w-5 h-5" /></DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Details</DialogTitle>
                                                <EmployeeView employee={employee} />
                                            </DialogContent>
                                        </Dialog>

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
                            )) : (
                                <tr><td colSpan={6} className="p-4 text-center">No employees found.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}