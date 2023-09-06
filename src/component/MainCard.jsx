import React, { useState } from "react";
import { useSelector } from "react-redux";
import Card from "./card";
import { RiAddCircleLine } from "react-icons/ri"; // Import ikon plus

const MainCard = () => {
  const notes = useSelector((state) => state.notes); // Mengambil data catatan dari Redux Store
  const [addingNote, setAddingNote] = useState(false); // State untuk mengontrol tampilan form tambah catatan
  const [newNoteData, setNewNoteData] = useState({ title: "", body: "" }); // State untuk menyimpan data tambahan
  const [newNotes, setNewNotes] = useState([]); // State untuk menyimpan catatan yang baru ditambahkan

  const toggleAddNote = () => {
    setAddingNote(!addingNote); // Toggle tampilan form tambah catatan
  };

  const handleSaveNote = () => {
    // Validasi apakah judul dan isi catatan tidak kosong sebelum menyimpan
    if (newNoteData.title.trim() === "" || newNoteData.body.trim() === "") {
      alert("Judul dan isi catatan harus diisi.");
      return;
    }

    // Buat objek catatan baru
    const newNote = {
      id: Date.now(),
      title: newNoteData.title,
      body: newNoteData.body,
      archived: false,
      formattedDate: new Date().toLocaleDateString(),
    };

    // Tambahkan catatan baru ke dalam state newNotes
    setNewNotes([...newNotes, newNote]);

    // Reset data tambahan dan tutup form tambah catatan
    setNewNoteData({ title: "", body: "" });
    setAddingNote(false);
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
              type="text"
              placeholder="Id"
              className="w-full border p-2 mb-2"
              value={newNoteData.id}
              onChange={(e) =>
                setNewNoteData({ ...newNoteData, title: e.target.value })
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
          <div className="cursor-pointer" onClick={toggleAddNote}>
            <RiAddCircleLine className="text-green-500 text-3xl" />
          </div>
        )}
        {/* Tampilkan catatan dari state newNotes */}
        {notes.concat(newNotes).map((note) => (
          <Card key={note.id} data={note} />
        ))}
      </div>
    </div>
  );
};

export default MainCard;
