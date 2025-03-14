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

    useEffect(() => {
        if (employee) {
            setEmployeeData(employee);
        }
    }, [employee]);

    if (!employeeData) return null;

    return (
        <div className="View">
            <h2 className="text-2xl font-semibold text-blue-800">Employee Details</h2>

            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Employee ID</p>
                    <p className="font-semibold text-lg">{employeeData.id_number}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Name</p>
                    <p className="font-semibold text-lg">{employeeData.first_name} {employeeData.last_name}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg col-span-1">
                    <p className="text-gray-600 text-sm">Contact Number</p>
                    <p className="font-semibold text-lg break-words">{employeeData.contact_number}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg col-span-2">
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold text-lg break-all">{employeeData.email}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg col-span-3">
                    <p className="text-gray-600 text-sm">Address</p>
                    <p className="font-semibold text-lg">{employeeData.address}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Department</p>
                    <p className="font-semibold text-lg">{employeeData.department}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Position</p>
                    <p className="font-semibold text-lg">{employeeData.position}</p>
                </div>

                <div className="bg-gray-200 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">Date Hired</p>
                    <p className="font-semibold text-lg">{format(new Date(employeeData.date_hired), 'MMMM d, yyyy')}</p>
                </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
                <DialogClose asChild>
                    <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600">
                        Close
                    </button>
                </DialogClose>

                <Dialog>
                    <DialogTrigger className="text-green-500">
                        <Edit className="w-6 h-6" />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogTitle>Edit Employee</DialogTitle>
                        <EmployeeEdit employee={employee} />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
}
