import { format } from 'date-fns';
import { Link } from '@inertiajs/react';

interface Transaction {
    id: number;
    approved_by: string;
    borrower_name: string;
    item: string;
    status: 'released' | 'returned' | 'lost';
    release_mode: 'on_site' | 'take_home';
    release_state: 'good_condition' | 'brand_new' | 'damaged';
    release_date: string;
    return_state: 'good_condition' | 'brand_new' | 'damaged';
    return_date: string | null;
}

interface TransactionViewProps {
    transaction: Transaction;
    onClose: () => void;
}

export default function TransactionView({ transaction, onClose }: TransactionViewProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg max-w-lg w-full">
                <h2 className="text-2xl font-semibold mb-4">Transaction Details</h2>
                <div className="space-y-2">
                    <p><strong>Transaction ID:</strong> {transaction.id}</p>
                    <p><strong>Approved By:</strong> {transaction.approved_by}</p>
                    <p><strong>Borrower Name:</strong> {transaction.borrower_name}</p>
                    <p><strong>Item:</strong> {transaction.item}</p>
                    <p><strong>Status:</strong> {transaction.status}</p>
                    <p><strong>Release Mode:</strong> {transaction.release_mode}</p>
                    <p><strong>Release State:</strong> {transaction.release_state}</p>
                    <p><strong>Release Date:</strong> {format(new Date(transaction.release_date), 'MMMM d, yyyy')}</p>
                    <p><strong>Return State:</strong> {transaction.return_state}</p>
                    <p><strong>Return Date:</strong> {transaction.return_date ? format(new Date(transaction.return_date), 'MMMM d, yyyy') : 'Not returned yet'}</p>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                        Close
                    </button>
                    <Link href={`/transaction/transaction-edit/${transaction.id}`} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Edit
                    </Link>
                </div>
            </div>
        </div>
    );
}
