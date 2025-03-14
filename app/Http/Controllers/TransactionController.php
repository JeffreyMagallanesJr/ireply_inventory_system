<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Employee;
use App\Models\Equipment;
use Illuminate\Support\Facades\DB; 

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::with(['user', 'employee', 'equipment'])->get();

        return Inertia::render('transaction', [
            'transactions' => $transactions->map(function ($transaction) {
                return [
                    'id' => $transaction->id,
                    'approved_by' => $transaction->user ? $transaction->user->first_name . ' ' . $transaction->user->last_name : 'N/A',
                    'borrower_name' => $transaction->employee ? $transaction->employee->first_name . ' ' . $transaction->employee->last_name : 'N/A',
                    'item' => $transaction->equipment ? $transaction->equipment->item : 'N/A',
                    'status' => $transaction->status,
                    'release_mode' => $transaction->release_mode,
                    'release_state' => $transaction->release_state,
                    'release_date' => $transaction->release_date,
                    'return_state' => $transaction->return_state,
                    'return_date' => $transaction->return_date,
                ];
            }),
        ]);
    }

    public function create()
    {
        return Inertia::render('transaction/transaction-form', [
            'users' => User::all(),
            'employees' => Employee::all(),
            'equipments' => Equipment::all(),
            'statusEnum' => ['released', 'returned'],
            'releaseModeEnum' => ['on_site', 'off_site'],
        ]);
    }



    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|exists:employees,id',
            'equipment_id' => 'required|exists:equipments,id|unique:transactions,equipment_id',
            'status' => 'required|in:released,returned,lost',
            'release_mode' => 'required|in:on_site,take_home',
            'release_state' => 'required|in:good_condition,brand_new,damaged',
            'release_date' => 'required|date',
            'return_state' => 'nullable|in:good_condition,brand_new,damaged',
            'return_date' => 'nullable|date|after_or_equal:release_date',
        ]);

        Transaction::create($validated);

        return redirect()->route('/transaction')->with('success', 'Transaction added successfully!');
    }

    public function show($id)
    {
        $transaction = Transaction::with(['user', 'employee', 'equipment'])->findOrFail($id);

        return Inertia::render('transaction/transaction-view', [
            'transaction' => [
                'id' => $transaction->id,
                'approved_by' => $transaction->user ? [
                    'id' => $transaction->user->id,
                    'first_name' => $transaction->user->first_name,
                    'last_name' => $transaction->user->last_name
                ] : null,

                'borrower_name' => $transaction->employee ? [
                    'id' => $transaction->employee->id,
                    'first_name' => $transaction->employee->first_name,
                    'last_name' => $transaction->employee->last_name
                ] : null,

                'item' => $transaction->equipment ? [
                    'id' => $transaction->equipment->id,
                    'name' => $transaction->equipment->item
                ] : null,

                'status' => $transaction->status,
                'release_mode' => $transaction->release_mode,
                'release_state' => $transaction->release_state,
                'release_date' => $transaction->release_date,
                'return_state' => $transaction->return_state,
                'return_date' => $transaction->return_date,
            ]
        ]);

    }

    // Function to retrieve ENUM values dynamically
    private function getEnumValues($table, $column)
    {
        $type = DB::selectOne("SHOW COLUMNS FROM {$table} WHERE Field = '{$column}'")->Type;

        preg_match('/enum\((.*)\)/', $type, $matches);
        $enumValues = str_getcsv($matches[1], ",", "'");

        return $enumValues;
    }

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);

        $users = User::select('id', 'first_name', 'last_name')->get();
        $employees = Employee::select('id', 'first_name', 'last_name')->get();
        $equipments = Equipment::select('id', 'item')->get();

        // Debug: Check if enums are fetched correctly
        $statusEnum = $this->getEnumValues('transactions', 'status');
        $releaseModeEnum = $this->getEnumValues('transactions', 'release_mode');
        $releaseStateEnum = $this->getEnumValues('transactions', 'release_state');
        $returnStateEnum = $this->getEnumValues('transactions', 'return_state');

        //\Log::info('Status Enum:', $statusEnum);
        //\Log::info('Release Mode Enum:', $releaseModeEnum);
        //\Log::info('Release State Enum:', $releaseStateEnum);
        //\Log::info('Return State Enum:', $returnStateEnum);

        return Inertia::render('transaction/transaction-edit', [
            'transaction' => $transaction,
            'users' => $users->map(fn($user) => [
                'id' => $user->id, 
                'name' => "{$user->first_name} {$user->last_name}"
            ]),
            'employees' => $employees->map(fn($employee) => [
                'id' => $employee->id, 
                'name' => "{$employee->first_name} {$employee->last_name}"
            ]),
            'equipments' => $equipments->map(fn($equipment) => [
                'id' => $equipment->id, 
                'name' => $equipment->item
            ]),
            'statusEnum' => $statusEnum,  // ✅ Ensure correct naming
            'releaseModeEnum' => $releaseModeEnum,  // ✅ Ensure correct naming
            'releaseStateEnum' => $releaseStateEnum,  // ✅ Ensure correct naming
            'returnStateEnum' => $returnStateEnum,  // ✅ Ensure correct naming
        ]);
        
    }

    

    /* public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'employee_id' => 'required|exists:employees,id',
            'equipment_id' => 'required|exists:equipments,id|unique:transactions,equipment_id,' . $id,
            'status' => 'required|in:released,returned,lost',
            'release_mode' => 'required|in:on_site,take_home',
            'release_state' => 'required|in:good_condition,brand_new,damaged',
            'release_date' => 'required|date',
            'return_state' => 'nullable|in:good_condition,brand_new,damaged',
            'return_date' => 'nullable|date|after_or_equal:release_date',
        ]);

        $transaction->update($validated);

        return redirect()->route('transaction')->with('success', 'Transaction updated successfully');
    }

    public function destroy($id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->delete();

        return redirect()->route('transaction')->with('success', 'Transaction deleted successfully');
    } */
}