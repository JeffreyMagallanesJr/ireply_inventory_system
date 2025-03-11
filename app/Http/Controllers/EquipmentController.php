<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Equipment;
use Illuminate\Support\Facades\Log;

class EquipmentController extends Controller
{
    public function index(): Response
    {
        $equipments = Equipment::all(); // Fetch all equipment from the database
        return Inertia::render('equipment', [
            'equipments' => $equipments,
        ]);
    }

    public function inventory(): Response
    {
        $equipments = Equipment::all(); // Fetch all equipment from the database
        return Inertia::render('equipment/inventory', [
            'equipments' => $equipments,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('equipment/equipment-form');
    }

    public function store(Request $request)
    {
        // Validate input
        $validated = $request->validate([
            'item' => 'required|string|max:255',
            'specs' => 'nullable|string',
            'description' => 'nullable|string',
            'serial_number' => 'required|unique:equipments,serial_number',
            'stored_date' => 'required|date',
            'status' => 'required|in:available,unavailable',
            'quantity' => 'nullable|integer|min:1',
        ]);

        // Store data in the database
        Equipment::create($validated);

        return redirect('/equipment/items')->with('success', 'Equipment added successfully!');
    }

    public function show($id)
    {
        // Log the incoming request ID
        Log::info("Fetching equipment with ID: " . $id);

        // Fetch the equipment
        $equipment = Equipment::find($id);

        // Debug output
        if (!$equipment) {
            Log::error("Equipment not found for ID: " . $id);
            abort(404, 'Equipment not found');
        }

        Log::info("Equipment found: ", $equipment->toArray());

        return Inertia::render('equipment/equipment-view', [
            'equipment' => $equipment
        ]);
    }

    public function edit($id)
    {
        $equipment = Equipment::find($id);

        if (!$equipment) {
            abort(404, 'Equipment not found');
        }

        return inertia('equipment/equipment-edit', ['equipment' => $equipment]);
    }

    public function destroy($id)
    {
        // Find the equipment by ID
        $equipment = Equipment::find($id);

        if (!$equipment) {
            return response()->json(['message' => 'Equipment not found'], 404);
        }

        // Delete the equipment
        $equipment->delete();

        return redirect()->route('equipment.index')->with('success', 'Equipment deleted successfully');
    }

    public function update(Request $request, $id)
    {
        // Validate request
        $validated = $request->validate([
            'item' => 'required|string|max:255',
            'specs' => 'nullable|string',
            'description' => 'nullable|string',
            'serial_number' => 'required|string|unique:equipments,serial_number,' . $id,
            'stored_date' => 'required|date',
            'status' => 'required|in:available,unavailable',
            'quantity' => 'nullable|integer|min:1',
        ]);

        // Find equipment by ID
        $equipment = Equipment::find($id);
        if (!$equipment) {
            return response()->json(['message' => 'Equipment not found'], 404);
        }

        // Update equipment
        $equipment->update($validated);

        return redirect()->route('equipment.index')->with('success', 'Equipment updated successfully');
    }
}