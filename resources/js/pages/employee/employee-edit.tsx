import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Employee', href: '/employee' },
    { title: 'Edit Employee', href: '#' },
];

interface Employee {
    employee_id: string;
    first_name: string;
    middle_name?: string;
    last_name: string;
    department: string;
    position: string;
}

export default function EmployeeEdit() {
    const { props } = usePage<PageProps<{ employee: Employee }>>();
    const employee = props.employee;

    const { data, setData, put, processing, errors } = useForm<Employee>({
        employee_id: employee.employee_id,
        first_name: employee.first_name,
        middle_name: employee.middle_name || '',
        last_name: employee.last_name,
        department: employee.department,
        position: employee.position,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/employee/update/${data.employee_id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Employee" />
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Edit Employee</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">First Name</label>
                        <input
                            type="text"
                            value={data.first_name}
                            onChange={(e) => setData('first_name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.first_name && <p className="text-red-500">{errors.first_name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Middle Name</label>
                        <input
                            type="text"
                            value={data.middle_name}
                            onChange={(e) => setData('middle_name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Last Name</label>
                        <input
                            type="text"
                            value={data.last_name}
                            onChange={(e) => setData('last_name', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.last_name && <p className="text-red-500">{errors.last_name}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Department</label>
                        <input
                            type="text"
                            value={data.department}
                            onChange={(e) => setData('department', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.department && <p className="text-red-500">{errors.department}</p>}
                    </div>

                    <div>
                        <label className="block font-medium">Position</label>
                        <input
                            type="text"
                            value={data.position}
                            onChange={(e) => setData('position', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.position && <p className="text-red-500">{errors.position}</p>}
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" disabled={processing}>
                            Update Employee
                        </button>
                        <a href="/employee" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}