import { useState, useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { DialogClose } from "@/components/ui/dialog";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === "contact_number") {
            let digitsOnly = value.replace(/\D/g, ""); 
    
         
            if (digitsOnly.startsWith("")) {
                digitsOnly = digitsOnly.substring(2);
            } else if (digitsOnly.startsWith("+63")) {
                digitsOnly = digitsOnly.substring(3);
            }
    
         
            if (digitsOnly.length > 11) return;
    
            setFormData({ ...formData, contact_number: `+63${digitsOnly}` });
    
       
            if (digitsOnly.length < 11) {
                setErrors((prevErrors) => ({
                    ...prevErrors,
                    contact_number: "Contact number must be in format '+63XXXXXXXXXX' with 10 digits.",
                }));
            } else {
                setErrors((prevErrors) => {
                    const { contact_number, ...rest } = prevErrors;
                    return rest;
                });
            }
            return;
        }
    
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
    
        if (!formData.id_number.trim()) newErrors.id_number = "ID number is required.";
        if (!formData.first_name.trim()) newErrors.first_name = "First name is required.";
        if (!formData.last_name.trim()) newErrors.last_name = "Last name is required.";
        if (!formData.email.trim()) newErrors.email = "Email is required.";
        if (!formData.address.trim()) newErrors.address = "Address is required.";
        if (!formData.contact_number.trim()) newErrors.contact_number = "Contact number must be in format '+69XXXXXXXXXX' with 10 digits.";
        if (!formData.department.trim()) newErrors.department = "Department is required.";
        if (!formData.position.trim()) newErrors.position = "Position is required.";
        if (!formData.date_hired.trim()) newErrors.date_hired = "Date hired is required.";
        
        const contactNumberPattern = /^\+63\d{10}$/;
            if (!contactNumberPattern.test(formData.contact_number)) {
                newErrors.contact_number = "Contact number must be valid and 10 digits.";
    }
        setErrors(newErrors);
    
        return Object.keys(newErrors).length === 0; // Returns false if errors exist
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            router.post('/employee', formData, {
                onSuccess: () => {
                    toast.success("Employee added successfully!");
                    dialogCloseRef.current?.click(); 
                    setFormData({
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
                    setErrors({});
                },
                onError: (errors) => setErrors(errors),
            });
        }
    };

    return (
        <>
            <Head title="Add Employee" />
            <div className="">
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
                        {[
                            { label: "First Name", name: "first_name" },
                            { label: "Last Name", name: "last_name" }
                        ].map(({ label, name }) => (
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
                        {[
                         { label: "Email", name: "email", type: "email" },
                         { label: "Contact Number", name: "contact_number", type: "text" }
                             ].map(({ label, name, type }) => (
                          <div key={name}>
                            <label className="block text-gray-700 dark:text-gray-300">{label}</label>
                             {name === "contact_number" ? (
                              <input
                                type="text"
                                name="contact_number"
                                value={formData.contact_number || "+63"}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                maxLength={13}
                                 />
                                 ) : (
                                    <input
                                 type={type}
                                name={name}
                                value={formData[name as keyof typeof formData]}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded"
                                />
                                 )}
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
                        {[
                            { label: "Department", name: "department" },
                            { label: "Position", name: "position" },
                            { label: "Date Hired", name: "date_hired", type: "date" }
                        ].map(({ label, name, type }) => (
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
