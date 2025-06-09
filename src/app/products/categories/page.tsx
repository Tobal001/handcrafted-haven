
// app/dashboard/categories/page.tsx

'use client'; // This is a client component

import React, { useState, useEffect } from 'react';
import {
  createCategory,
  fetchCategories,
  updateCategory,
  deleteCategory,
  deleteAllCategories,
} from '@/lib/data/categories'; // Import all necessary server actions
import { Category, CategoryFormValidationErrors, CategoryRelationInfo } from '@/lib/definitions'; // Import relevant types, including CategoryRelationInfo

// Define a common state structure for form fields
interface CategoryFormState {
  name: string;
  description: string;
  parentCategoryId: string;
}

// Define a minimal interface for category nodes that can be traversed by isDescendant.
// This interface matches the structure of Category as it's returned by fetchCategories,
// allowing it to have subcategories which are of type CategoryRelationInfo.
interface CategoryNodeForTraversal {
  categoryId: string;
  subcategories?: CategoryRelationInfo[]; // Subcategories are CategoryRelationInfo objects
}


export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formState, setFormState] = useState<CategoryFormState>({
    name: '',
    description: '',
    parentCategoryId: '', // For dropdown selection
  });
  const [formErrors, setFormErrors] = useState<CategoryFormValidationErrors | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const fetchAndSetCategories = async () => {
    setLoading(true);
    try {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setMessage('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories on component mount
  useEffect(() => {
    fetchAndSetCategories();
  }, []);

  // Handler for form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
    // Clear specific error when field changes
    if (formErrors && formErrors[name as keyof CategoryFormValidationErrors]) {
      setFormErrors(prevErrors => ({
        ...prevErrors,
        [name]: undefined,
      }));
    }
  };

  // Handle form submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFormErrors(null);

    const formData = new FormData();
    formData.append('name', formState.name);
    // Append description only if it has a value, otherwise it will be null in DB
    if (formState.description) {
      formData.append('description', formState.description);
    }
    // Only append parentCategoryId if it's not empty, otherwise it's null in DB
    if (formState.parentCategoryId) {
      formData.append('parentCategoryId', formState.parentCategoryId);
    }

    let result;
    if (isEditing && currentCategoryId) {
      result = await updateCategory(currentCategoryId, formData);
    } else {
      result = await createCategory(formData);
    }

    if (result.errors) {
      const flattenedErrors: CategoryFormValidationErrors = {};
      result.errors.forEach(err => {
        if (err.path && err.path.length > 0) {
          const path = err.path[0] as keyof CategoryFormValidationErrors;
          if (flattenedErrors[path]) {
            // If there are multiple errors for the same field, concatenate them
            flattenedErrors[path]!.push(err.message);
          } else {
            flattenedErrors[path] = [err.message];
          }
        }
      });
      setFormErrors(flattenedErrors);
      setMessage(result.message);
    } else {
      setMessage(result.message);
      setFormState({ name: '', description: '', parentCategoryId: '' }); // Reset form
      setIsEditing(false);
      setCurrentCategoryId(null);
      fetchAndSetCategories(); // Re-fetch categories to update the list
    }
  };

  // Handle individual delete
  const handleDelete = async (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      setMessage(null);
      const result = await deleteCategory(categoryId);
      setMessage(result.message);
      // Assuming 'Failed' indicates an error message
      if (!result.message.includes('Failed')) {
        fetchAndSetCategories(); // Re-fetch categories to update the list
      }
    }
  };

  // Handle "Delete All"
  const handleDeleteAll = async () => {
    if (window.confirm('Are you absolutely sure you want to delete ALL categories? This cannot be undone and may cause errors if products are linked!')) {
      setMessage(null);
      const result = await deleteAllCategories();
      setMessage(result.message);
      if (!result.message.includes('Failed')) {
        setCategories([]); // Clear list immediately on successful deletion of all
      }
    }
  };

  // Handle edit button click
  const handleEdit = async (category: Category) => {
    setIsEditing(true);
    setCurrentCategoryId(category.categoryId);
    setFormState({
      name: category.name,
      description: category.description || '',
      parentCategoryId: category.parentCategoryId || '',
    });
    setMessage(null);
    setFormErrors(null);
    // Scroll to form if needed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setCurrentCategoryId(null);
    setFormState({ name: '', description: '', parentCategoryId: '' });
    setFormErrors(null);
    setMessage(null);
  };

  // Filter categories to be used as parent options (exclude self and subcategories of self during edit)
  const availableParentCategories = categories.filter(cat =>
    !isEditing || (cat.categoryId !== currentCategoryId && !isDescendant(currentCategoryId!, cat))
  );

  // Helper function to check if targetId is a descendant of currentCategory.
  // Given the current data fetching (CategoryRelationInfo objects do not have nested subcategories),
  // this function can only check for direct descendants.
  function isDescendant(targetId: string, currentCategory: CategoryNodeForTraversal): boolean {
    if (currentCategory.subcategories) {
      for (const sub of currentCategory.subcategories) {
        if (sub.categoryId === targetId) {
          return true; // targetId is a direct subcategory
        }
        // The 'sub' object is of type CategoryRelationInfo.
        // As per definitions.ts, CategoryRelationInfo does NOT have a 'subcategories' property.
        // Therefore, a recursive call passing 'sub' to isDescendant would be illogical
        // if isDescendant expects 'subcategories' for further traversal.
        // The type error you received confirms this. The problematic recursive call is removed.
        // If deep descendant checking is needed (e.g., sub-subcategories), the data fetching
        // in fetchCategories must be modified to bring multiple levels of nested subcategories,
        // and CategoryRelationInfo would need to be defined recursively in definitions.ts.
      }
    }
    return false;
  }


  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 bg-gray-50 rounded-lg shadow-xl">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6 lg:mb-8">
        Product Categories Management
      </h1>

      {message && (
        <div className={`p-3 mb-4 rounded-md text-sm ${
          message.includes('Failed') ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-green-100 text-green-700 border border-green-200'
        }`}>
          {message}
        </div>
      )}

      {/* Category Creation/Edit Form */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">
          {isEditing ? 'Edit Category' : 'Create New Category'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Category Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleInputChange}
              required
              className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formErrors?.name ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {formErrors?.name && <p className="text-red-600 text-xs mt-1">{formErrors.name.join(', ')}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description (Optional):
            </label>
            <textarea
              id="description"
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              rows={4}
              className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formErrors?.description ? 'border-red-500' : 'border-gray-300'
              }`}
            ></textarea>
            {formErrors?.description && <p className="text-red-600 text-xs mt-1">{formErrors.description.join(', ')}</p>}
          </div>

          <div>
            <label htmlFor="parentCategoryId" className="block text-sm font-medium text-gray-700 mb-1">
              Parent Category (Optional):
            </label>
            <select
              id="parentCategoryId"
              name="parentCategoryId"
              value={formState.parentCategoryId}
              onChange={handleInputChange}
              className={`block w-full px-4 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                formErrors?.parentCategoryId ? 'border-red-500' : 'border-gray-300'
              }`}
            >
              <option value="">-- No Parent --</option>
              {availableParentCategories.map((cat) => (
                <option key={cat.categoryId} value={cat.categoryId}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formErrors?.parentCategoryId && <p className="text-red-600 text-xs mt-1">{formErrors.parentCategoryId.join(', ')}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              {isEditing ? 'Update Category' : 'Create Category'}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-6 py-2 bg-gray-500 text-white font-semibold rounded-md shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Cancel Edit
              </button>
            )}
          </div>
        </form>
      </div>

      {/* List of Categories */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Existing Categories</h2>

      {loading ? (
        <p className="text-center text-gray-600 py-4">Loading categories...</p>
      ) : categories.length === 0 ? (
        <p className="text-center text-gray-600 py-4">No categories found. Start by creating one!</p>
      ) : (
        <>
          <button
            onClick={handleDeleteAll}
            className="px-5 py-2 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition duration-150 ease-in-out mb-4"
          >
            Delete All Categories
          </button>

          <ul className="space-y-4">
            {categories.map((category) => (
              <li key={category.categoryId} className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
                  {category.description && <p className="text-gray-600 mt-1 text-sm">{category.description}</p>}
                  {category.parent && (
                    <p className="text-gray-500 text-xs mt-1">
                      Parent: <span className="font-semibold">{category.parent.name}</span>
                    </p>
                  )}
                  {category.subcategories && category.subcategories.length > 0 && (
                    <p className="text-gray-500 text-xs mt-1">
                      Subcategories: <span className="italic">{category.subcategories.map(sub => sub.name).join(', ')}</span>
                    </p>
                  )}
                </div>
                <div className="flex gap-2 mt-2 md:mt-0">
                  <button
                    onClick={() => handleEdit(category)}
                    className="px-4 py-2 bg-yellow-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 transition duration-150 ease-in-out"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.categoryId)}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}