<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (request()->isMethod('post')) {
            # code...
            return [
                'name' => 'required|string|max:258',
                'description' => 'required|string',
                'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'price' => 'required|integer',
                'category_name' => 'required|string'
            ];
        }else {
            return [
                'name' => 'required|string|max:258',
                'description' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
                'price' => 'required|integer',
                'category_name' => 'required|string'
            ];
        }
    }

    public function messages()
    {
        if (request()->isMethod('post')) {
            # code...
            return[
                'name.required' => 'Name is required!',
                'description.required' => 'Description is required!',
                'image.required' => 'Image is required!',
                'price.required' => 'Price is required!',
                'category_name.required' => 'Category is required!'
            ];
        } else {
            return [
                'name.required' => 'name is required!',
                'description.required' => 'Description is required!',
                'price.required' => 'Price is required!',
                'category_name.required' => 'Category is required!'
            ];
        }
    }
}
