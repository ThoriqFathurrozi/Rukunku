<?php

namespace App\Http\Controllers;

use App\Enums\CategoryTypeEnum;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        $type = $request->input('type');

        $categories = Category::when($type, function ($query) use ($type) {
            return $query->where('type', $type);
        })->get();
        return response()->json($categories);
    }

    public function create()
    {
        $type = CategoryTypeEnum::cases();
        return response()->json([
            'categoryType' => $type,
        ]);
    }
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $category = Category::create($request->all());

        return response()->json($category, 201);
    }

    public function update(Request $request, $categoryId)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'type' => 'required|string|max:255',
        ]);

        $category = Category::findOrFail($categoryId);

        $category->update($request->all());

        return response()->json(['message' => "Category updated successfully", 'category' => $category], 200);
    }

}
