import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import { type PageProps } from '@/types';
import { BreadcrumbItem } from '@/types';
import { Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employee', href: '/employee' },
    { title: 'View Employee', href: '#' },
];

interface Employee {
    id_number: string;
    first_name: string;
    last_name: string;
    email: string;
    contact_number: string;
    address: string;
    department: string;
    position: string;
    date_hired: string;
    created_at: string;
    updated_at: string;
}

export default function EmployeeView() {
    const { props } = usePage<PageProps<{ employee: Employee }>>();
    const employee = props.employee;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="View Employee" />
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Employee Details</h2>
                <div className="space-y-2">
                    <p><strong>Employee ID:</strong> {employee.id_number}</p>
                    <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Contact Number:</strong> {employee.contact_number}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                    <p><strong>Department:</strong> {employee.department}</p>
                    <p><strong>Position:</strong> {employee.position}</p>
                    <p><strong>Date Hired:</strong> {employee.date_hired}</p>
                    <p><strong>Created At:</strong> {new Date(employee.created_at).toLocaleString()}</p>
                    <p><strong>Updated At:</strong> {new Date(employee.updated_at).toLocaleString()}</p>

                </div>
                <div className="mt-4">
                    <Link href="/employee" className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Back</Link>
                    <Link href={`/employee/employee-edit/${employee.id_number}`} className="ml-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Edit</Link>
                </div>
            </div>
        </AppLayout>
    );
}