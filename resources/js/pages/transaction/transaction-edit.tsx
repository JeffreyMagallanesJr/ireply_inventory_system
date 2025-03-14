import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, useForm, usePage } from '@inertiajs/react';
import { BreadcrumbItem, PageProps } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transactions', href: '/transaction' },
    { title: 'Edit Transaction', href: '#' },
];

interface Transaction {
    equipment_id: string | number | readonly string[] | undefined;
    id: number;
    approved_by: number;
    borrower_id: number;
    item_id: number;
    status: string;
    release_mode: string;
    release_state: string;
    release_date: string;
    return_state: string;
    return_date: string;
}

export default function TransactionEdit() {
    const { props } = usePage<PageProps<{ 
        transaction: Transaction, 
        users: any[], 
        employees: any[], 
        equipments: any[],
        statusEnum: { name: string, value: string }[],
        releaseModeEnum: { name: string, value: string }[],
        releaseStateEnum: { name: string, value: string }[],
        returnStateEnum: { name: string, value: string }[]
    }>>();

    // Debugging: Log received props
    console.log("Props received:", props);

    // Extracting data
    const { transaction, users, employees, equipments, statusEnum, releaseModeEnum, releaseStateEnum, returnStateEnum } = props;

    // Debugging: Log extracted values
    console.log("Transaction Data:", transaction);
    console.log("Users Data:", users);
    console.log("Employees Data:", employees);
    console.log("Equipments Data:", equipments);
    console.log("Status Enum:", statusEnum);
    console.log("Release Mode Enum:", releaseModeEnum);
    console.log("Release State Enum:", releaseStateEnum);
    console.log("Return State Enum:", returnStateEnum);

    const { data, setData, put, processing, errors } = useForm<Transaction>({
        id: transaction?.id || 0,
        approved_by: transaction?.approved_by || "",
        borrower_id: transaction?.borrower_id || "",
        item_id: transaction?.item_id || "",
        status: transaction?.status || "",
        release_mode: transaction?.release_mode || "",
        release_state: transaction?.release_state || "",
        release_date: transaction?.release_date || "",
        return_state: transaction?.return_state || "",
        return_date: transaction?.return_date || "",
    });

    // Debugging: Log initial form data
    console.log("Initial Form Data:", data);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Submitting Form Data:", data);
        put(`/transactions/update/${data.id}`);
    };
    
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Transaction" />
            <div className="max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">Edit Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block font-medium">Approved By</label>
                        <select
                            value={data.approved_by}
                            onChange={(e) => setData('approved_by', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {users.map(user => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    
                    <div>
                        <label className="block font-medium">Borrower Name</label>
                        <select
                            value={data.borrower_id}
                            onChange={(e) => setData('borrower_id', Number(e.target.value))}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {employees.map(employee => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Item</label>
                        <select
                            value={data.equipment_id}
                            onChange={(e) => setData('equipment_id', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            {props.equipments.map((equipment) => (
                                <option key={equipment.id} value={equipment.id}>
                                    {equipment.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Status</label>
                        <select 
                            value={data.status || ""} // ✅ Ensures value is always valid
                            onChange={(e) => setData('status', e.target.value)} 
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="" disabled>Select Status</option> {/* ✅ Placeholder */}
                            {props.statusEnum?.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Release Mode</label>
                        <select 
                            value={data.release_mode || ""}
                            onChange={(e) => setData('release_mode', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="" disabled>Select Release Mode</option>
                            {props.releaseModeEnum?.map((mode) => (
                                <option key={mode} value={mode}>{mode}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Release State</label>
                        <select 
                            value={data.release_state || ""}
                            onChange={(e) => setData('release_state', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="" disabled>Select Release State</option>
                            {props.releaseStateEnum?.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Release Date</label>
                        <input
                            type="date"
                            value={data.release_date}
                            onChange={(e) => setData('release_date', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Return State</label>
                        <select 
                            value={data.return_state || ""}
                            onChange={(e) => setData('return_state', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        >
                            <option value="" disabled>Select Return State</option>
                            {props.returnStateEnum?.map((state) => (
                                <option key={state} value={state}>{state}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Return Date</label>
                        <input
                            type="date"
                            value={data.return_date}
                            onChange={(e) => setData('return_date', e.target.value)}
                            className="w-full px-3 py-2 border rounded"
                        />
                    </div>

                    <div className="mt-4">
                        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600" disabled={processing}>
                            Update Transaction
                        </button>
                        <a href="/transaction" className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                            Cancel
                        </a>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
