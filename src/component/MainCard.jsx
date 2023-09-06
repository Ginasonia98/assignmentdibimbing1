import React from "react";
import { useSelector } from 'react-redux';
import Card from "./card";

const MainCard = () => {
  const notes = useSelector((state) => state.notes); // Mengambil data catatan dari Redux Store

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center underline">List of Notes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <Card key={note.id} data={note} />
        ))}
      </div>
    </div>
  );
};

export default MainCard;
