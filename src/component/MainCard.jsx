import React from "react";
import Card from "./card";

import data from "../db.json";

const mainCard = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">List of Cards</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.notes.map((note) => (
          <Card key={note.id} data={note} />
        ))}
      </div>
    </div>
  );
};

export default mainCard;
