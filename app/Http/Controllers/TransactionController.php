<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Employee;
use App\Models\Equipment;

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

    public function create(): Response
    {
        return Inertia::render('transaction/transaction-form', [
            'users' => User::select('id', 'first_name', 'last_name')->get(),
            'employees' => Employee::select('id', 'first_name', 'last_name')->get(),
            'equipments' => Equipment::select('id', 'item')->get(),
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

        return redirect()->route('transaction')->with('success', 'Transaction added successfully!');
    }

    public function show($id)
    {
        $transaction = Transaction::findOrFail($id);

        return Inertia::render('transaction/transaction-view', [
            'transaction' => $transaction
        ]);
    }

    public function edit($id)
    {
        $transaction = Transaction::findOrFail($id);

        return Inertia::render('transaction/transaction-edit', [
            'transaction' => $transaction,
            'users' => User::select('id', 'first_name', 'last_name')->get(),
            'employees' => Employee::select('id', 'first_name', 'last_name')->get(),
            'equipments' => Equipment::select('id', 'item')->get(),
        ]);
    }

    public function update(Request $request, $id)
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
    }
}