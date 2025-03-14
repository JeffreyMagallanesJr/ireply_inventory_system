import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { Head, router } from "@inertiajs/react";
import { type BreadcrumbItem } from "@/types";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Transactions", href: "/transaction" },
    { title: "Add Transaction", href: "/transaction-form" },
];

export default function TransactionForm({ users, employees, equipments, statusEnum, releaseModeEnum, releaseStateEnum, returnStateEnum }) {
    const [formData, setFormData] = useState({
        user_id: "",
        employee_id: "",
        equipment_id: "",
        status: "released",
        release_mode: "on_site",
        release_state: "good_condition",
        release_date: "",
        return_state: "",
        return_date: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData] && key !== "return_state" && key !== "return_date") {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            router.post("/transaction", formData, {
                onSuccess: () => console.log("Transaction added successfully!"),
                onError: (errors) => setErrors(errors),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Transaction" />
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Transaction</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Approver */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Approved By</label>
                        <select name="user_id" value={formData.user_id} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                            <option value="">Select an approver</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                        {errors.user_id && <p className="text-red-500 text-sm">{errors.user_id}</p>}
                    </div>

                    {/* Borrower */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Borrower</label>
                        <select name="employee_id" value={formData.employee_id} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                            <option value="">Select a borrower</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>{employee.name}</option>
                            ))}
                        </select>
                        {errors.employee_id && <p className="text-red-500 text-sm">{errors.employee_id}</p>}
                    </div>

                    {/* Item */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Item</label>
                        <select name="equipment_id" value={formData.equipment_id} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                            <option value="">Select an item</option>
                            {equipments.map((equipment) => (
                                <option key={equipment.id} value={equipment.id}>{equipment.name}</option>
                            ))}
                        </select>
                        {errors.equipment_id && <p className="text-red-500 text-sm">{errors.equipment_id}</p>}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Status</label>
                        <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                            {statusEnum.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    {/* Release Mode */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Release Mode</label>
                        <select name="release_mode" value={formData.release_mode} onChange={handleChange} className="w-full px-3 py-2 border rounded">
                            {releaseModeEnum.map((mode) => (
                                <option key={mode} value={mode}>{mode}</option>
                            ))}
                        </select>
                    </div>

                    {/* Release Date */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Release Date</label>
                        <input type="date" name="release_date" value={formData.release_date} onChange={handleChange} className="w-full px-3 py-2 border rounded" />
                        {errors.release_date && <p className="text-red-500 text-sm">{errors.release_date}</p>}
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        Submit
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
