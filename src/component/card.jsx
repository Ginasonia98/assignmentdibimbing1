import React from 'react';
import { useSelector } from 'react-redux';

const Card = ({ data }) => {
  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">{data.id} . {data.title}</h2>
      <p className="text-gray-600">Penjelasan: {data.body}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-sm text-gray-500">{data.archived ? 'Archived' : 'Active'}</span>
        <span className="text-sm text-gray-500">{data.formattedDate}</span>
      </div>
    </div>
  );
};

export default Card;
