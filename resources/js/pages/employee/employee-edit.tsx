import { useState, useEffect } from "react";
import { useForm } from "@inertiajs/react";
import { DialogClose } from "@/components/ui/dialog";

interface Employee {
    id_number: string;
    first_name: string;
    last_name: string;
    contact_number: string;
    address: string,
    department: string;
    position: string;
    date_hired: string;
}

export default function EmployeeEdit({ employee }: { employee: Employee }) {
    const { data, setData, put, processing, errors } = useForm({
        id_number: employee.id_number,
        first_name: employee.first_name,
        last_name: employee.last_name,
        contact_number: employee.contact_number,
        address: employee.address,
        department: employee.department,
        position: employee.position,
        date_hired: employee.date_hired,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (employee) {
            setData({
                id_number: employee.id_number,
                first_name: employee.first_name,
                contact_number: employee.contact_number,
                address: employee.address,
                last_name: employee.last_name,
                department: employee.department,
                position: employee.position,
                date_hired: employee.date_hired,
            });
        }
    }, [employee]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        put(route("employee.update", employee.id_number), {
            preserveScroll: true,
            onSuccess: () => {
                alert("Employee updated successfully");
                setIsSubmitting(false);
            },
            onError: () => setIsSubmitting(false),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">First Name</label>
                    <input
                        type="text"
                        value={data.first_name}
                        onChange={(e) => setData("first_name", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.first_name && <p className="text-red-500 text-sm">{errors.first_name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Contact Number</label>
                    <input
                        type="text"
                        value={data.contact_number}
                        onChange={(e) => setData("contact_number", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <input
                        type="text"
                        value={data.address}
                        onChange={(e) => setData("address", e.target.value)}
                        className="w-full p-2 border rounded"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Last Name</label>
                    <input
                        type="text"
                        value={data.last_name}
                        onChange={(e) => setData("last_name", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.last_name && <p className="text-red-500 text-sm">{errors.last_name}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Department</label>
                    <input
                        type="text"
                        value={data.department}
                        onChange={(e) => setData("department", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.department && <p className="text-red-500 text-sm">{errors.department}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Position</label>
                    <input
                        type="text"
                        value={data.position}
                        onChange={(e) => setData("position", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.position && <p className="text-red-500 text-sm">{errors.position}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium">Date Hired</label>
                    <input
                        type="date"
                        value={data.date_hired}
                        onChange={(e) => setData("date_hired", e.target.value)}
                        className="w-full p-2 border rounded"
                        required
                    />
                    {errors.date_hired && <p className="text-red-500 text-sm">{errors.date_hired}</p>}
                </div>
            </div>

            <div className="flex justify-end gap-4">
                <DialogClose className="px-4 py-2 bg-gray-400 text-white rounded">
                    Cancel
                </DialogClose>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    disabled={isSubmitting || processing}
                >
                    {isSubmitting ? "Updating..." : "Update Employee"}
                </button>
            </div>
        </form>
    );
}
