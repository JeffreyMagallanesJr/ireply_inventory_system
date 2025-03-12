<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Employee;
use App\Models\Equipment;
use Illuminate\Support\Facades\Log;

class TransactionController extends Controller
{
    public function index(): Response
    {
        $transactions = Transaction::with(['user', 'employee', 'equipment'])->get(); // Fetch transactions with related data
        
        return Inertia::render('transaction', [
            'transactions' => $transactions,
        ]);
    }

    public function create(): Response
    {
        $users = User::all();
        $employees = Employee::all();
        $equipments = Equipment::all();

        return Inertia::render('transaction/transaction-form', [
            'users' => $users,
            'employees' => $employees,
            'equipments' => $equipments,
        ]);
    }

    public function store(Request $request)
    {
        // Validate input
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

        // Store transaction in the database
        Transaction::create($validated);

        return redirect()->route('transaction')->with('success', 'Transaction added successfully!');
    }

    public function show($id)
    {
        $transaction = Transaction::with(['user', 'employee', 'equipment'])->find($id);

        if (!$transaction) {
            abort(404, 'Transaction not found');
        }

        return Inertia::render('transaction/transaction-view', [
            'transaction' => $transaction
        ]);
    }

    public function edit($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            abort(404, 'Transaction not found');
        }

        $users = User::all();
        $employees = Employee::all();
        $equipments = Equipment::all();

        return Inertia::render('transaction/transaction-edit', [
            'transaction' => $transaction,
            'users' => $users,
            'employees' => $employees,
            'equipments' => $equipments,
        ]);
    }

    public function update(Request $request, $id)
    {
        $transaction = Transaction::find($id);
        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        // Validate input
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

        // Update transaction
        $transaction->update($validated);

        return redirect()->route('transaction')->with('success', 'Transaction updated successfully');
    }

    public function destroy($id)
    {
        $transaction = Transaction::find($id);

        if (!$transaction) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        $transaction->delete();

        return redirect()->route('transactions')->with('success', 'Transaction deleted successfully');
    }
}
