import { useState, useEffect } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { format } from "date-fns";
import EmployeeEdit from "./employee-edit";
import { Edit } from "lucide-react";

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
}

export default function EmployeeView({ employee }: { employee: Employee }) {
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [employeeData, setEmployeeData] = useState<Employee | null>(null);

    // Set employee data when component mounts or employee changes
    useEffect(() => {
        if (employee) {
            setEmployeeData(employee);
        }
    }, [employee]);

    if (!employeeData) return null; // Prevents rendering if data is not available

    return (
        <div className="max-w-2xl bg-white dark:bg-gray-900 p-6 rounded-md shadow-md">
            <h2 className="text-xl font-semibold">Employee Details</h2>
            <div className="space-y-2 mt-4">
                <p><strong>Employee ID:</strong> {employeeData.id_number}</p>
                <p><strong>Name:</strong> {employeeData.first_name} {employeeData.last_name}</p>
                <p><strong>Email:</strong> {employeeData.email}</p>
                <p><strong>Contact Number:</strong> {employeeData.contact_number}</p>
                <p><strong>Address:</strong> {employeeData.address}</p>
                <p><strong>Department:</strong> {employeeData.department}</p>
                <p><strong>Position:</strong> {employeeData.position}</p>
                <p><strong>Date Hired:</strong> {format(new Date(employeeData.date_hired), 'MMMM d, yyyy')}</p>
            </div>

            <div className="flex justify-end space-x-3 mt-4">
                {/* Close Dialog Button */}
                <DialogClose asChild>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Close
                    </button>
                </DialogClose>


                <Dialog>
                                            <DialogTrigger className="text-green-500"><Edit className="w-5 h-5" /></DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>Edit Employee</DialogTitle>
                                                <EmployeeEdit employee={employee} />
                                            </DialogContent>
                                        </Dialog>
            </div>

           
        </div>
    );
}
