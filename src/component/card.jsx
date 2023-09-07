import React, { useState } from "react";

const Card = ({ data, onUpdate, onDelete }) => {
  // Add onDelete prop
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onUpdate(editedData.id, editedData.title, editedData.body);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  const handleDelete = () => {
    onDelete(editedData.id); // Call the onDelete callback
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 mb-4">
      <h2 className="text-xl font-semibold mb-2">
        {editedData.id}. {editedData.title}
      </h2>
      {isEditing ? (
        <div>
          <input
            type="text"
            name="title"
            value={editedData.title}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <textarea
            name="body"
            value={editedData.body}
            onChange={handleChange}
            className="w-full border p-2 mb-2"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2" // Add some spacing
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md" // Add styles for delete button
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-600">Penjelasan: {editedData.body}</p>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-sm text-gray-500">
              {editedData.archived ? "Archived" : "Active"}
            </span>
            <span className="text-sm text-gray-500">
              {editedData.formattedDate}
            </span>
          </div>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 mr-2"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md mt-2" // Add styles for delete button
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
