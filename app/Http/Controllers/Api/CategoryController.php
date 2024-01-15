<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Http\Requests\CategoryStoreRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage; //php artisan storage:link = `http://127.0.0.1:8000/storage/${category.image}`

class CategoryController extends Controller
{
    
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        //All Category
        $categories = Category::all();

        //Return Json Response
        return response()->json([
            'categories' => $categories
        ],200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryStoreRequest $request)
    {
        try {
            $imageName = Str::Random(32).".".$request->image->getClientOriginalExtension();
            //Create Category
            Category::create([
                'name' => $request->name,
                'image' => $imageName,
            ]);
            // Save Image in Storage folder
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            //Return Jsom Response
            return response()->json([
                'message' => "Category successfully created."
            ],200);
        } catch (\Exception $e) {
            //Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show( $id)
    {
        //Category Detail
        $category = Category::find($id);
        if(!$category) {
            # code...
            return response()->json([
                'message' => 'Category not found.'
            ], 404);           
        }
        // $this->authorize('view', $category);

        //Return Json Response
        return response()->json([
            'category' => $category
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryStoreRequest  $request , $id)
    {
        try {
            //find category
            $category = Category::find($id);
            if(!$category){
                return response()->json([
                    'message' => 'Category Not Found.'
                ], 404);
            }

            $category->name = $request->name;
            
            if($request->image){
                // Public storage
                $storage = Storage::disk('public');
            }

            //Old image delete
            if ($storage->exists($category->image)){
                # code...
                $storage->delete($category->image);

                //Image name
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $category->image =$imageName;

                //Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            //Update Category
            $category->save();

            //Return Json Response
            return response()->json([
                'message' => "Category successfully updated."
            ],200);

        }catch (\Exception $e){
            //Return Json Response
            return response()->json([
                'message' => "Something went really wrong!"
            ],500);
        }
            
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        //Detail
        $category = Category::find($id);
        if (!$category) {
            # code...
            return response()->json([
                'message' => 'Category not found.'
            ],404);
        }
        //Public Storage
        $storage = Storage::disk('public');

        //Image delete
        if($storage->exists($category->image))
             $storage->delete($category->image);

        //Delete Category
        $category->delete();

        return response()->json([
            'message' => "Category Successfully deleted."
        ],200);

    }
}
