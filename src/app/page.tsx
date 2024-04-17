"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, onSnapshot, doc } from "firebase/firestore";
import { db } from "./firebase";

interface ListItem {
  id: string;
  name: string;
}

export default function ListApp() {
  const [list, setList] = useState<ListItem[]>([]);
  const [newList, setNewList] = useState<{ listName: string }>({
    listName: "",
  });

  // Add data to database
  const addList = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newList.listName !== "") {
      await addDoc(collection(db, "Messages"), {
        name: newList.listName.trim(),
      });
      setNewList({ listName: "" });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-8 p-4 bg-black">
      <div className="w-full max-w-5xl mb-8">
        <h1 className="text-4xl p-4 text-center font-bold text-orange-500">
          Drop me a message anonymously
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <form className="grid grid-cols-6 gap-4" onSubmit={addList}>
            <input
              value={newList.listName}
              onChange={(e) =>
                setNewList({ ...newList, listName: e.target.value })
              }
              className="col-span-5 p-3 border rounded-md focus:outline-none focus:border-orange-500"
              type="text"
              placeholder="Wishing for something good..."
            />
            <button
              type="submit"
              className="col-span-1 flex items-center justify-center text-white bg-orange-500 hover:bg-orange-600 p-3 rounded-md"
            >
              <span className="text-xl">+</span>
            </button>
          </form>
          <div className="text-center text-gray-500 mt-4">
            Developed by Abdullah Siraj
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500">&copy; 2024</div>
    </main>
  );
}
