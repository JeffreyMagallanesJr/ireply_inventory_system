import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { format } from "date-fns";
import { Link } from "@inertiajs/react";

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
    return (
        <Dialog open={true}>
            <DialogContent className="max-w-lg">
                <DialogHeader>
                    <DialogTitle>Employee Details</DialogTitle>
                </DialogHeader>
                <div className="space-y-2 p-4">
                    <p><strong>Employee ID:</strong> {employee.id_number}</p>
                    <p><strong>Name:</strong> {employee.first_name} {employee.last_name}</p>
                    <p><strong>Email:</strong> {employee.email}</p>
                    <p><strong>Contact Number:</strong> {employee.contact_number}</p>
                    <p><strong>Address:</strong> {employee.address}</p>
                    <p><strong>Department:</strong> {employee.department}</p>
                    <p><strong>Position:</strong> {employee.position}</p>
                    <p><strong>Date Hired:</strong> {format(new Date(employee.date_hired), 'MMMM d, yyyy')}</p>
                </div>
                <div className="flex justify-end space-x-3">
                    <Link 
                        href="/employee" 
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back
                    </Link>
                    <Link 
                        href={`/employee/employee-edit/${employee.id_number}`} 
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Edit
                    </Link>
                </div>
            </DialogContent>
        </Dialog>
    );
}
