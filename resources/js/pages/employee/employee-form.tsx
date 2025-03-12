import { useState, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { DialogClose } from "@/components/ui/dialog";

export default function EmployeeForm() {
    const [formData, setFormData] = useState({
        id_number: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        address: "",
        department: "",
        position: "",
        date_hired: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const dialogCloseRef = useRef<HTMLButtonElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        let newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key as keyof typeof formData] && key !== "middle_name") {
                newErrors[key] = "This field is required";
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            router.post('/employee', formData, {
                onSuccess: () => {
                    console.log("Employee added successfully!");
                    dialogCloseRef.current?.click(); // Close the dialog
                },
                onError: (errors) => setErrors(errors)
            });
        }
    };

    return (
        <>
            <Head title="Add Employee" />
            <div className="max-w-2xl mx-auto mt-6 p-6 bg-white dark:bg-gray-900">
                <h2 className="text-2xl font-semibold mb-4"></h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Employee ID</label>
                        <input
                            type="text"
                            name="id_number"
                            value={formData.id_number}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.id_number && <p className="text-red-500 text-sm">{errors.id_number}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[ { label: "First Name", name: "first_name" }, { label: "Last Name", name: "last_name" }].map(({ label, name }) => (
                            <div key={name}>
                                <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                                <input
                                    type="text"
                                    name={name}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {[ { label: "Email", name: "email", type: "email" }, { label: "Contact Number", name: "contact_number" }].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                                <input
                                    type={type || "text"}
                                    name={name}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>
                    <div>
                        <label className="block text-gray-700 dark:text-gray-300">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border rounded"
                        />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
                    </div>
                    <div className="grid grid-cols-3 gap-4">
                        {[ { label: "Department", name: "department" }, { label: "Position", name: "position" }, { label: "Date Hired", name: "date_hired", type: "date" }].map(({ label, name, type }) => (
                            <div key={name}>
                                <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                                <input
                                    type={type || "text"}
                                    name={name}
                                    value={formData[name as keyof typeof formData]}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded"
                                />
                                {errors[name] && <p className="text-red-500 text-sm">{errors[name]}</p>}
                            </div>
                        ))}
                    </div>
                    
                    <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Submit
                    </button>
                    
                    {/* Hidden DialogClose Button */}
                    <DialogClose asChild>
                        <button ref={dialogCloseRef} className="hidden" />
                    </DialogClose>
                </form>
            </div>
        </>
    );
}
