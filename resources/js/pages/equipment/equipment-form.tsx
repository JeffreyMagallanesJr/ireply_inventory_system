import { useState } from "react";
import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@/types";
import { Head, router } from "@inertiajs/react";

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Equipment", href: "/equipment" },
    { title: "Add Equipment", href: "/equipment/add" },
];

export default function EquipmentForm() {
    const [formData, setFormData] = useState({
        item: "",
        serial_number: "",
        quantity: "",
        status: "available",
        stored_date: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData]) {
                newErrors[key] = "This field is required";
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            router.post('/equipment', formData, {
                onSuccess: () => console.log("Equipment added successfully!"),
                onError: (errors) => setErrors(errors),
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Add Equipment" />
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-white dark:bg-gray-900 shadow-md rounded-lg">
                <h2 className="text-2xl font-semibold mb-4">Add Equipment</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Item Name */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Item Name</label>
                        <input
                            type="text"
                            name="item"
                            value={formData.item}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.item && <p className="text-red-500 text-sm">{errors.item}</p>}
                    </div>

                    {/* Serial Number */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Serial Number</label>
                        <input
                            type="text"
                            name="serial_number"
                            value={formData.serial_number}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.serial_number && <p className="text-red-500 text-sm">{errors.serial_number}</p>}
                    </div>

                    {/* Quantity & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            />
                            {errors.quantity && <p className="text-red-500 text-sm">{errors.quantity}</p>}
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                    </div>

                    {/* Stored Date */}
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Stored Date</label>
                        <input
                            type="date"
                            name="stored_date"
                            value={formData.stored_date}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.stored_date && <p className="text-red-500 text-sm">{errors.stored_date}</p>}
                    </div>

                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </AppLayout>
    );
}
