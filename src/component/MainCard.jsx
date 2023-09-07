import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import { RiAddCircleLine } from "react-icons/ri";

const MainCard = () => {
  // State variables
  const [notes, setNotes] = useState([]);
  const [newNotes, setNewNotes] = useState([]);
  const [addingNote, setAddingNote] = useState(false);
  const [newNoteData, setNewNoteData] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteData, setEditingNoteData] = useState({
    id: "",
    title: "",
    body: "",
  });
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchResults, setSearchResults] = useState([]); 

  useEffect(() => {
    // Load notes from localStorage on component mount
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    // Save notes to localStorage whenever 'notes' changes
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    setAddingNote(!addingNote);
  };

  const handleSaveNote = () => {
    // Validation checks
    if (newNoteData.title.trim() === "" || newNoteData.body.trim() === "") {
      alert("Title and content must be filled.");
      return;
    }

    if (!/^\d+$/.test(newNoteData.id)) {
      alert("ID must be a number.");
      return;
    }

    const formattedDate = new Date().toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const newNote = {
      id: newNoteData.id,
      title: newNoteData.title,
      body: newNoteData.body,
      archived: false,
      formattedDate: formattedDate,
    };

    // Update 'notes' with the new note
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Clear input data
    setNewNoteData({ id: "", title: "", body: "" });
    setAddingNote(false);
  };

  const handleEditNote = (note) => {
    setEditingNoteId(note.id);
    setEditingNoteData({
      id: note.id,
      title: note.title,
      body: note.body,
    });
  };

  const handleUpdateNote = (id, title, body) => {
    // Validation checks
    if (title.trim() === "" || body.trim() === "") {
      alert("Title and content must be filled.");
      return;
    }

    const updatedNotes = notes.map((note) => {
      if (note.id === id) {
        return {
          ...note,
          title: title,
          body: body,
        };
      }
      return note;
    });

    // Update 'notes' with the updated note
    setNotes(updatedNotes);

    // Clear editing state
    setEditingNoteId(null);
    setEditingNoteData({ id: "", title: "", body: "" });
  };

  const handleDeleteNote = (id) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this note?"
    );
    if (confirmation) {
      const updatedNotes = notes.filter((note) => note.id !== id);
      setNotes(updatedNotes);
    }
  };

  const handleSearch = () => {
    // Perform the search by filtering 'notes' based on the search term
    const results = notes.filter((note) => {
      const lowerSearchTerm = searchTerm.toLowerCase();
      return (
        note.id.toString().includes(lowerSearchTerm) ||
        note.title.toLowerCase().includes(lowerSearchTerm)
      );
    });
    setSearchResults(results);
  };

  const handleCancelSearch = () => {
    // Clear the search term and results
    setSearchTerm("");
    setSearchResults([]);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center underline">
        List of Notes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <div >
          <h2 className="text-xl font-semibold mb-2">Search Notes</h2>
          <input
            type="text"
            placeholder="Search by ID or Title"
            className="w-full border p-2 mb-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleSearch}
            >
              Find
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={handleCancelSearch}
            >
              Cancel
            </button>
          </div>
        </div>
        {addingNote ? (
          <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Add New Note</h2>
            <input
              type="number"
              placeholder="ID"
              className="w-full border p-2 mb-2"
              value={newNoteData.id}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, id: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Title"
              className="w-full border p-2 mb-2"
              value={newNoteData.title}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, title: e.target.value })
              }
            />
            <textarea
              placeholder="Content"
              className="w-full border p-2 mb-2"
              value={newNoteData.body}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, body: e.target.value })
              }
            />
            <button
              className="bg-green-500 text-white px-4 py-2 rounded-md"
              onClick={handleSaveNote}
            >
              Save
            </button>
          </div>
        ) : (
          <div className="cursor-pointer" onClick={handleAddNote}>
            <RiAddCircleLine className="text-green-500 text-3xl" />
          </div>
        )}
        {(searchTerm ? searchResults : notes.concat(newNotes)).map((note) => (
          <div key={note.id} className="relative">
            <Card
              data={note}
              onUpdate={handleUpdateNote}
              onDelete={handleDeleteNote}
              onEdit={handleEditNote}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;
