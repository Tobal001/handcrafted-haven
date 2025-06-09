
// src/components/products/ProductForm.tsx

'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { PhotoIcon } from '@heroicons/react/24/outline';

interface ProductFormProps {
  sellerId: string;
  onSubmit: (formData: FormData) => void;
  categories?: { categoryId: string; name: string }[];
  product?: any; // Keep 'any' if product structure varies, or refine with Product interface
  imageUrl?: string;
  onImageUrlChange?: (url: string) => void;
  isEditing?: boolean;
}

export default function ProductForm({
  sellerId,
  onSubmit,
  categories,
  product,
  imageUrl = '',
  onImageUrlChange,
  isEditing = false
}: ProductFormProps) {
  const { pending } = useFormStatus();

  return (
    // Enhanced form container for a modern card-like appearance
    <form action={onSubmit} className="space-y-6 p-8 bg-[#FDFBF8] rounded-xl shadow-lg border border-[#E6E1DC] max-w-3xl mx-auto">
      <input type="hidden" name="sellerId" value={sellerId} />

      {/* Form Title - Dynamic based on isEditing prop */}
      <h2 className="text-3xl font-bold text-[#3E3E3E] text-center mb-8 pb-4 border-b-2 border-[#E6E1DC]">
        {isEditing ? 'Edit Product' : 'Create New Product'}
      </h2>

      {/* Product Image */}
      <div>
        {/* Updated label styling */}
        <label htmlFor="imageUrl" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Product Image URL
        </label>
        <div className="relative">
          <input
            id="imageUrl"
            name="imageUrl"
            type="url"
            value={imageUrl}
            onChange={(e) => onImageUrlChange?.(e.target.value)}
            // Enhanced input field styles
            className={`
              block w-full rounded-md border-2 py-2 pl-10 pr-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
              border-[#E6E1DC] hover:border-[#D0C9C2]
            `}
            placeholder="Paste image URL here, e.g., https://example.com/product.jpg"
          />
          <PhotoIcon className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#6C6C6C]" />
        </div>
        {imageUrl && (
          <div className="mt-4 flex justify-center"> {/* Centered image preview */}
            <img
              src={imageUrl}
              alt="Product preview"
              className="h-40 w-40 object-contain border-2 border-[#E6E1DC] rounded-lg shadow-sm" // Larger, more prominent preview
            />
          </div>
        )}
      </div>

      {/* Product Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Product Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={product?.name}
          // Enhanced input field styles
          className={`
            block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
            focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
            bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
            border-[#E6E1DC] hover:border-[#D0C9C2]
          `}
          placeholder="Enter product name (e.g., 'Hand-carved Wooden Bowl')"
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Description <span className="text-red-500">*</span>
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          required
          defaultValue={product?.description}
          // Enhanced textarea styles
          className={`
            block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
            focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
            bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
            border-[#E6E1DC] hover:border-[#D0C9C2]
          `}
          placeholder="Provide a detailed description of your product, its features, and uniqueness."
        ></textarea>
      </div>

      {/* Price and Quantity - Grouped in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#E6E1DC]">
        <div>
          <label htmlFor="price" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Price (USD)*
          </label>
          <div className="relative"> {/* Added relative for currency symbol */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6C6C6C] font-medium">$</span>
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              required
              defaultValue={product?.price}
              // Enhanced input styles, adjusted padding for currency symbol
              className={`
                block w-full rounded-md border-2 py-2 pl-8 pr-3 shadow-sm text-[#3E3E3E]
                focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
                bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
                border-[#E6E1DC] hover:border-[#D0C9C2]
              `}
              placeholder="e.g., 5000.00"
            />
          </div>
        </div>
        <div>
          <label htmlFor="quantityAvailable" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Quantity Available <span className="text-red-500">*</span>
          </label>
          <input
            id="quantityAvailable"
            name="quantityAvailable"
            type="number"
            min="1"
            required
            defaultValue={product?.quantityAvailable}
            // Enhanced input styles
            className={`
              block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
              border-[#E6E1DC] hover:border-[#D0C9C2]
            `}
            placeholder="e.g., 10, 50"
          />
        </div>
      </div>

      {/* Category */}
      <div>
        <label htmlFor="categoryId" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Category
        </label>
        <select
          id="categoryId"
          name="categoryId"
          defaultValue={product?.categoryId || ''}
          // Enhanced select styles
          className={`
            block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
            focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
            bg-white transition-all duration-200 ease-in-out cursor-pointer
            border-[#E6E1DC] hover:border-[#D0C9C2]
          `}
        >
          <option value="" disabled>Select a category</option> {/* Disabled option for clearer prompt */}
          {categories?.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      {/* Materials and Dimensions - Grouped in a responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[#E6E1DC]">
        <div>
          <label htmlFor="materialsUsed" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Materials Used
          </label>
          <input
            id="materialsUsed"
            name="materialsUsed"
            type="text"
            defaultValue={product?.materialsUsed || ''}
            // Enhanced input styles
            className={`
              block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
              border-[#E6E1DC] hover:border-[#D0C9C2]
            `}
            placeholder="e.g., Wood, Clay, Fabric"
          />
        </div>
        <div>
          <label htmlFor="dimensions" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
            Dimensions
          </label>
          <input
            id="dimensions"
            name="dimensions"
            type="text"
            defaultValue={product?.dimensions || ''}
            // Enhanced input styles
            className={`
              block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
              focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
              bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out
              border-[#E6E1DC] hover:border-[#D0C9C2]
            `}
            placeholder="e.g., 10cm x 15cm x 5cm"
          />
        </div>
      </div>

      {/* Care Instructions */}
      <div>
        <label htmlFor="careInstructions" className="block text-sm font-semibold text-[#3E3E3E] mb-2">
          Care Instructions
        </label>
        <textarea
          id="careInstructions"
          name="careInstructions"
          rows={3}
          defaultValue={product?.careInstructions || ''}
          // Enhanced textarea styles
          className={`
            block w-full rounded-md border-2 py-2 px-3 shadow-sm text-[#3E3E3E]
            focus:outline-none focus:border-[#B55B3D] focus:ring-2 focus:ring-[#B55B3D] focus:ring-opacity-50
            bg-white placeholder:text-[#9A9A9A] transition-all duration-200 ease-in-out resize-y
            border-[#E6E1DC] hover:border-[#D0C9C2]
          `}
          placeholder="Provide instructions on how to care for the product."
        ></textarea>
      </div>

      {/* Featured Checkbox */}
      <div className="flex items-center gap-3 mt-8 pt-4 border-t border-[#E6E1DC]"> {/* Added top border for clear section separation */}
        <input
          id="isFeatured"
          name="isFeatured"
          type="checkbox"
          defaultChecked={product?.isFeatured || false}
          // Enhanced checkbox styles
          className="h-5 w-5 text-[#B55B3D] focus:ring-[#B55B3D] border-[#E6E1DC] rounded-sm cursor-pointer"
        />
        <label htmlFor="isFeatured" className="text-base font-medium text-[#3E3E3E] select-none">
          Mark as Featured Product
        </label>
      </div>

      {/* Active/Inactive Checkbox */}
      <div className="flex items-center gap-3">
        <input
          id="isActive"
          name="isActive"
          type="checkbox"
          defaultChecked={product?.isActive !== undefined ? product.isActive : true}
          // Enhanced checkbox styles
          className="h-5 w-5 text-[#B55B3D] focus:ring-[#B55B3D] border-[#E6E1DC] rounded-sm cursor-pointer"
        />
        <label htmlFor="isActive" className="text-base font-medium text-[#3E3E3E] select-none">
          Product is Active (uncheck to deactivate)
        </label>
      </div>

      {/* Submit Button Section */}
      <div className="flex justify-end gap-4 pt-8"> {/* Increased padding for spacing */}
        <Button
          type="button"
          variant="outline"
          className="
            border-2 border-[#3E3E3E] text-[#3E3E3E] font-semibold py-2.5 px-6 rounded-lg shadow-sm
            hover:bg-[#F9F4EF] hover:border-[#B55B3D] transition-all duration-200 ease-in-out
            focus:outline-none focus:ring-2 focus:ring-[#3E3E3E] focus:ring-offset-2 focus:ring-offset-[#FDFBF8]
          "
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <SubmitButton isEditing={isEditing} pending={pending} />
      </div>
    </form>
  );
}

// SubmitButton component - only updated its className for consistent modern aesthetics and interactive states
function SubmitButton({ isEditing, pending }: { isEditing: boolean; pending: boolean }) {
  return (
    <Button
      type="submit"
      className="
        bg-[#B55B3D] hover:bg-[#9E4F37] text-white font-semibold py-2.5 px-8 rounded-lg shadow-md
        transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-[#B55B3D] focus:ring-offset-2 focus:ring-offset-[#FDFBF8]
        disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:active:scale-100
      "
      disabled={pending}
    >
      {pending ? (
        isEditing ? 'Updating...' : 'Creating...'
      ) : (
        isEditing ? 'Update Product' : 'Create Product'
      )}
    </Button>
  );
}