import React from 'react';

const ReviewItem = () => {
  return (
    <li className="border border-gray-200 p-4 rounded-md shadow-sm">
      <div className="flex items-center mb-2">
        <div className="text-yellow-500 mr-2">{'★'.repeat(5)}{'☆'.repeat(5 - 5)}</div> {/* Placeholder for 5 stars */}
        <div className="font-semibold">User Name</div> {/* Placeholder for user name */}
        <div className="ml-auto text-sm text-gray-500">Timestamp</div> {/* Placeholder for timestamp */}
      </div>
      {/* <h3 className="text-lg font-medium mb-1">Review Title</h3> Placeholder for title */}
      <p className="text-gray-700">Review content goes here.</p> {/* Placeholder for content */}
    </li>
  );
};

export default ReviewItem;
