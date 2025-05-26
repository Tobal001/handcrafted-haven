

// src/components/skeletons/register-form-skeleton.tsx

export function RegisterFormSkeleton() {
  return (
    <div className="rounded-md bg-amber-50 p-4 md:p-6">
      <div className="mb-4 h-8 w-1/3 rounded bg-amber-200"></div>
      <div className="mb-6 space-y-4">
        <div className="h-10 rounded bg-amber-200"></div>
        <div className="h-10 rounded bg-amber-200"></div>
        <div className="h-10 rounded bg-amber-200"></div>
        <div className="flex gap-4">
          <div className="h-10 w-1/2 rounded bg-amber-200"></div>
          <div className="h-10 w-1/2 rounded bg-amber-200"></div>
        </div>
      </div>
      <div className="h-10 w-full rounded bg-amber-300"></div>
    </div>
  );
}
