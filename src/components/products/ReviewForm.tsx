import React from 'react';

const ReviewForm = () => {
  return (
    <form className="space-y-4 max-w-sm mx-auto">
      <label className="block text-sm font-medium text-gray-700">
        Rating:
        <input type="number" min="1" max="5" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Title:
        <input type="text" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </label>
      <label className="block text-sm font-medium text-gray-700">
        Content:
        <textarea rows={4} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" />
      </label>
      <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">Submit</button>
    </form>
  );
};

export default ReviewForm;
