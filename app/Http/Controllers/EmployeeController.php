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
            'employee_id' => 'required|unique:employees,employee_id',
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
        $employee = Employee::where('employee_id', $id)->first();

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


}
