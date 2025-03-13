import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Transaction', href: '/transaction' },
    { title: 'View Transaction', href: '#' },
];

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
    return_date: string;
}

export default function TransactionView({ transaction }: { transaction: Transaction }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Transaction #${transaction.id}`} />

            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md">
                <h1 className="text-2xl font-semibold mb-4">Transaction Details</h1>

                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Transaction ID:</p>
                        <p className="text-lg font-semibold">{transaction.id}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Approved By:</p>
                        <p className="text-lg font-semibold">{transaction.approved_by}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Borrower Name:</p>
                        <p className="text-lg font-semibold">{transaction.borrower_name}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Item:</p>
                        <p className="text-lg font-semibold">{transaction.item}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Status:</p>
                        <p className={`text-lg font-semibold ${transaction.status === 'lost' ? 'text-red-500' : 'text-green-500'}`}>
                            {transaction.status}
                        </p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Release Mode:</p>
                        <p className="text-lg font-semibold">{transaction.release_mode}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Release State:</p>
                        <p className="text-lg font-semibold">{transaction.release_state}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Release Date:</p>
                        <p className="text-lg font-semibold">{transaction.release_date}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Return State:</p>
                        <p className="text-lg font-semibold">{transaction.return_state || '-'}</p>
                    </div>

                    <div>
                        <p className="text-gray-600 dark:text-gray-300">Return Date:</p>
                        <p className="text-lg font-semibold">{transaction.return_date || '-'}</p>
                    </div>
                </div>

                <div className="mt-6 flex justify-between">
                    <Link
                        href="/transaction"
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                        Back to Transactions
                    </Link>

                    <div className="flex gap-2">
                        <Link
                            href={`/transaction/transaction-edit/${transaction.id}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Edit
                        </Link>

                        <button
                            onClick={() => {
                                if (confirm('Are you sure you want to delete this transaction?')) {
                                    // Implement delete functionality here
                                }
                            }}
                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
