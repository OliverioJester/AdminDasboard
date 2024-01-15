<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductStoreRequest;
use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
       //
        //All Product
        $products = Product::all();

        //Return Json Response
        return response()->json([
            'products' => $products
        ],200);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductStoreRequest $request)
    {
        try {
            $imageName = Str::Random(32).".".$request->image->getClientOriginalExtension();
            //Create Product
            Product::create([
                'name' => $request->name,
                'description' => $request->description,
                'image' => $imageName,
                'price' => $request->price,
                'category_name' => $request->category_name         
            ]);
            // Save Image in Storage folder
            Storage::disk('public')->put($imageName, file_get_contents($request->image));

            //Return Jsom Response
            return response()->json([
                'message' => "Product successfully created."
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
    public function show(string $id)
    {
        //Product Detail
        $products = Product::find($id);
        if(!$products) {
            # code...
            return response()->json([
                'message' => 'Product not found.'
            ], 404);           
        }
        // $this->authorize('view', $products);

        //Return Json Response
        return response()->json([
            'product' => $products
        ], 200);        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductStoreRequest $request, string $id)
    {
        try {
            //find category
            $product = Product::find($id);
            if(!$product){
                return response()->json([
                    'message' => 'Product Not Found.'
                ], 404);
            }

            $product->name = $request->name;
            $product->description = $request->description;
            $product->price = $request->price;
            $product->category_name = $request->category_name;
            
            if($request->image){
                // Public storage
                $storage = Storage::disk('public');
            }

            //Old image delete
            if ($storage->exists($product->image)){
                # code...
                $storage->delete($product->image);

                //Image name
                $imageName = Str::random(32).".".$request->image->getClientOriginalExtension();
                $product->image =$imageName;

                //Image save in public folder
                $storage->put($imageName, file_get_contents($request->image));
            }

            //Update Category
            $product->save();

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
        $product = Product::find($id);
        if (!$product) {
            # code...
            return response()->json([
                'message' => 'Product not found.'
            ],404);
        }
        //Public Storage
        $storage = Storage::disk('public');

        //Image delete
        if($storage->exists($product->image))
             $storage->delete($product->image);

        //Delete Product
        $product->delete();

        return response()->json([
            'message' => "Product Successfully deleted."
        ],200);
    }
}
