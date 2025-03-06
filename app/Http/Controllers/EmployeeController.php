<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Employee;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index(): Response
    {
        $employees = Employee::all(); // Fetch all employees from the database
        return Inertia::render('employee', [
            'employees' => $employees,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('employee/employee-form');
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'id_number' => 'required|unique:employees,id_number',
            'first_name' => 'required',
            'middle_name' => 'nullable',
            'last_name' => 'required',
            'email' => 'required|email|unique:employees,email',
            'contact_number' => 'required',
            'address' => 'required',
            'department' => 'required',
            'position' => 'required',
            'date_hired' => 'required|date',
        ]);

        // Store data in the database
        Employee::create($validated);

        return redirect('/employee')->with('success', 'Employee added successfully!');
    }

    public function show($id)
    {
        // Log the incoming request ID
        Log::info("Fetching employee with ID: " . $id);

        // Fetch the employee using the correct column
        $employee = Employee::where('id_number', $id)->first();

        // Debug output
        if (!$employee) {
            Log::error("Employee not found for ID: " . $id);
            abort(404, 'Employee not found');
        }

        Log::info("Employee found: ", $employee->toArray());

        return Inertia::render('employee/employee-view', [
            'employee' => $employee
        ]);
    }

    public function edit($id)
    {
        $employee = Employee::where('id_number', $id)->first();

        if (!$employee) {
            abort(404, 'Employee not found');
        }

        return inertia('employee/employee-edit', ['employee' => $employee]);
    }

    public function update(Request $request, $id)
    {
        // Validate request
        $validated = $request->validate([
            'first_name' => 'required|string|max:255',
            'middle_name' => 'nullable|string|max:255',
            'last_name' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'position' => 'required|string|max:255',
        ]);

        // Find employee by ID
        $employee = Employee::where('id_number', $id)->first();
        if (!$employee) {
            return response()->json(['message' => 'Employee not found'], 404);
        }

        // Update employee
        $employee->update($validated);

        // Redirect back with success message
        return redirect()->route('employee.index')->with('success', 'Employee updated successfully');
    }




}