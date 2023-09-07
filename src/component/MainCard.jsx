import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import { RiAddCircleLine } from "react-icons/ri";

const MainCard = () => {
  // Ubah state notes menjadi state lokal
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

  useEffect(() => {
    // Ambil data catatan dari localStorage saat komponen dimuat
    const savedNotes = JSON.parse(localStorage.getItem("notes"));
    if (savedNotes) {
      setNotes(savedNotes);
    }
  }, []);

  useEffect(() => {
    // Simpan perubahan data catatan ke localStorage setiap kali notes berubah
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    setAddingNote(!addingNote);
  };

  const handleSaveNote = () => {
    if (newNoteData.title.trim() === "" || newNoteData.body.trim() === "") {
      alert("Judul dan isi catatan harus diisi.");
      return;
    }

    if (!/^\d+$/.test(newNoteData.id)) {
      alert("ID harus berupa angka.");
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

    // Perbarui notes dengan data yang baru
    setNotes((prevNotes) => [...prevNotes, newNote]);

    // Bersihkan data yang baru diinput
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
    if (title.trim() === "" || body.trim() === "") {
      alert("Judul dan isi catatan harus diisi.");
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

    // Perbarui notes dengan data yang diperbarui
    setNotes(updatedNotes);

    // Bersihkan state pengeditan
    setEditingNoteId(null);
    setEditingNoteData({ id: "", title: "", body: "" });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center underline">
        List of Notes
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {addingNote ? (
          <div className="bg-white shadow-md rounded-md p-4 mb-4">
            <h2 className="text-xl font-semibold mb-2">Add New Note</h2>
            <input
              type="number"
              placeholder="Id"
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
        {notes.concat(newNotes).map((note) => (
          <div key={note.id} className="relative">
            <Card
              data={note}
              onUpdate={handleUpdateNote}
              onEdit={handleEditNote} // Pass the callback function
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainCard;

