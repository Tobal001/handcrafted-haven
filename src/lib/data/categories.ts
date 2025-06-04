// src/lib/data/categories.ts

'use server';

import { unstable_noStore as noStore } from 'next/cache';
import { z } from 'zod';
import { Category, CategoryFormSchema } from '@/lib/definitions'; // Import Category interface and Zod schema
import prisma from '@/lib/prisma'; // Your Prisma client instance
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; // Import for specific Prisma error handling

// Helper function to safely get string values from FormData
function getStringValue(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  if (value === null || (typeof value === 'string' && value.trim() === '')) {
    return null;
  }
  if (typeof value === 'string') {
    return value;
  }
  return null;
}

/**
 * Creates a new product category.
 * @param formData - FormData object containing category details.
 * @returns An object with the created category, validation errors, or a message.
 */
export async function createCategory(formData: FormData): Promise<{ category?: Category, errors?: z.ZodIssue[], message: string }> {
  noStore();

  const data = {
    name: getStringValue(formData, 'name'),
    description: getStringValue(formData, 'description'),
    parentCategoryId: getStringValue(formData, 'parentCategoryId'),
  };

  const validatedFields = CategoryFormSchema.safeParse(data);

  if (!validatedFields.success) {
    console.error('Validation Error (createCategory):', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.errors,
      message: 'Failed to create category due to validation errors.',
    };
  }

  const { name, description, parentCategoryId } = validatedFields.data;

  try {
    const newCategory = await prisma.category.create({
      data: {
        name: name,
        description: description,
        parentCategoryId: parentCategoryId,
      },
    });
    return { category: newCategory, message: 'Category created successfully.' };
  } catch (error) {
    console.error('Database Error (createCategory):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') { // Unique constraint violation
        return { message: 'Failed to create category: A category with this name already exists.' };
      }
      // Add other Prisma error codes if you anticipate specific failures
      return { message: `Database error creating category: ${error.message}` };
    }
    return { message: 'Failed to create category: An unexpected error occurred.' };
  }
}

/**
 * Fetches a single category by its ID.
 * @param categoryId - The ID of the category to fetch.
 * @returns The Category object or null if not found.
 */
export async function fetchCategoryById(categoryId: string): Promise<Category | null> {
  noStore();
  try {
    const category = await prisma.category.findUnique({
      where: {
        categoryId: categoryId,
      },
      select: { // Use select to specify all fields, including relations
        categoryId: true,
        name: true,
        description: true,
        parentCategoryId: true,
        createdAt: true,
        updatedAt: true,
        parent: { // Select specific fields from the parent relation
          select: {
            categoryId: true,
            name: true,
          }
        },
        subcategories: { // Select specific fields from the subcategories relation
          select: {
            categoryId: true,
            name: true,
          }
        }
      }
    });
    return category;
  } catch (error) {
    console.error('Database Error (fetchCategoryById):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      // P2025 means record not found, but findUnique returns null for that, so this catch is for other DB errors
      console.error(`Prisma Error Code: ${error.code}`);
      console.error(`Prisma Error Message: ${error.message}`);
      return null; // Return null if a database error occurs, or rethrow a specific error as needed
    }
    console.error('Unexpected error fetching category by ID:', error);
    return null;
  }
}

/**
 * Fetches all categories, optionally including their parent and subcategories.
 * @returns An array of Category objects.
 */
export async function fetchCategories(): Promise<Category[]> {
  noStore();
  try {
    const categories = await prisma.category.findMany({
      orderBy: {
        name: 'asc', // Order categories alphabetically by name
      },
      select: { // Use select to specify all fields, including relations
        categoryId: true,
        name: true,
        description: true,
        parentCategoryId: true,
        createdAt: true,
        updatedAt: true,
        parent: { // Select specific fields from the parent relation
          select: {
            categoryId: true,
            name: true,
          }
        },
        subcategories: { // Select specific fields from the subcategories relation
          select: {
            categoryId: true,
            name: true,
          }
        }
      }
    });
    return categories;
  } catch (error: unknown) { // Type 'unknown' for better type safety
    console.error('Database Error (fetchCategories):', error);
    // If it's a Prisma error, log the specific error code/message.
    if (error instanceof PrismaClientKnownRequestError) {
      console.error(`Prisma Error Code: ${error.code}`);
      console.error(`Prisma Error Message: ${error.message}`);
      throw new Error(`Failed to fetch categories: ${error.message}`);
    } else if (error instanceof Error) {
      // For general JavaScript Error objects, include their message
      throw new Error(`Failed to fetch categories: An unexpected error occurred: ${error.message}`);
    } else {
      // For any other unexpected error type
      throw new Error('Failed to fetch categories: An unknown and unexpected error occurred.');
    }
  }
}

/**
 * Updates an existing product category.
 * @param categoryId - The ID of the category to update.
 * @param formData - FormData object containing updated details.
 * @returns An object with the updated category, validation errors, or a message.
 */
export async function updateCategory(categoryId: string, formData: FormData): Promise<{ category?: Category, errors?: z.ZodIssue[], message: string }> {
  noStore();

  const data = {
    name: getStringValue(formData, 'name'),
    description: getStringValue(formData, 'description'),
    parentCategoryId: getStringValue(formData, 'parentCategoryId'),
  };

  // Use .partial() to allow for partial updates, as not all fields might be submitted
  const validatedFields = CategoryFormSchema.partial().safeParse(data);

  if (!validatedFields.success) {
    console.error('Validation Error (updateCategory):', validatedFields.error.flatten().fieldErrors);
    return {
      errors: validatedFields.error.errors,
      message: 'Failed to update category due to validation errors.',
    };
  }

  const updateData: { [key: string]: any } = {};
  for (const key of Object.keys(validatedFields.data)) {
    const value = (validatedFields.data as any)[key];
    if (value !== undefined) { // Only include fields that were actually provided
      updateData[key] = value;
    }
  }

  try {
    const updatedCategory = await prisma.category.update({
      where: { categoryId: categoryId },
      data: updateData,
    });
    return { category: updatedCategory, message: 'Category updated successfully.' };
  } catch (error) {
    console.error('Database Error (updateCategory):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
          return { message: 'Failed to update category: A category with this name already exists.' };
      }
      if (error.code === 'P2025') { // Record not found
        return { message: 'Failed to update category: Category not found.' };
      }
      return { message: `Database error updating category: ${error.message}` };
    }
    return { message: 'Failed to update category: An unexpected error occurred.' };
  }
}

/**
 * Deletes a product category by its ID.
 * @param categoryId - The ID of the category to delete.
 * @returns An object with a success or error message.
 */
export async function deleteCategory(categoryId: string): Promise<{ message: string }> {
  noStore();
  try {
    await prisma.category.delete({
      where: { categoryId: categoryId },
    });
    return { message: 'Category deleted successfully.' };
  } catch (error) {
    console.error('Database Error (deleteCategory):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2025') { // Record not found
        return { message: 'Category not found or already deleted.' };
      }
      // Handle cases where other tables might have foreign key constraints
      if (error.code === 'P2003') { // Foreign key constraint failed
        return { message: 'Cannot delete category: It is currently linked to products or has subcategories.' };
      }
      return { message: `Database error deleting category: ${error.message}` };
    }
    return { message: 'Failed to delete category: An unexpected error occurred.' };
  }
}

/**
 * Deletes all product categories.
 * @returns An object with a success or error message.
 */
export async function deleteAllCategories(): Promise<{ message: string }> {
  noStore();
  try {
    await prisma.category.deleteMany({}); // Delete all records
    return { message: 'All categories deleted successfully.' };
  } catch (error) {
    console.error('Database Error (deleteAllCategories):', error);
    if (error instanceof PrismaClientKnownRequestError) {
      // Handle potential foreign key constraint issues if categories are linked to products
      if (error.code === 'P2003') {
        return { message: 'Cannot delete all categories: Some categories are currently linked to products or have subcategories. Please delete linked items first.' };
      }
      return { message: `Database error deleting all categories: ${error.message}` };
    }
    return { message: 'Failed to delete all categories: An unexpected error occurred.' };
  }
}