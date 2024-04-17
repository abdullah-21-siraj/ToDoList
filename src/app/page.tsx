"use client";
import React, { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
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
      await addDoc(collection(db, "Lists"), {
        name: newList.listName.trim(),
      });
      setNewList({ listName: "" });
    }
  };

  // Read Lists from database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "Lists"), (querySnapshot) => {
      let listsArr: ListItem[] = [];

      querySnapshot.forEach((doc) => {
        listsArr.push({ ...doc.data(), id: doc.id } as ListItem);
      });
      setList(listsArr);
    });

    return () => unsubscribe();
  }, []);

  // Delete Lists from database
  const deleteList = async (id: string) => {
    await deleteDoc(doc(db, "Lists", id));
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4 bg-gray-200">
      <div className="w-full max-w-5xl mb-8">
        <h1 className="text-4xl p-4 text-center font-bold text-blue-600">
          To Do List
        </h1>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <form className="grid grid-cols-6 gap-4" onSubmit={addList}>
            <input
              value={newList.listName}
              onChange={(e) =>
                setNewList({ ...newList, listName: e.target.value })
              }
              className="col-span-4 p-3 border rounded-md focus:outline-none focus:border-blue-500"
              type="text"
              placeholder="Enter list of work to do..."
            />
            <button
              type="submit"
              className="col-span-1 flex items-center justify-center text-white bg-blue-500 hover:bg-blue-600 p-3 rounded-md"
            >
              <span className="text-xl">+</span>
            </button>
          </form>
          <ul className="mt-4">
            {list.map((listItem) => (
              <li
                key={listItem.id}
                className="flex items-center justify-between bg-gray-100 rounded-md p-4 mb-2"
              >
                <span className="capitalize">{listItem.name}</span>
                <button
                  onClick={() => deleteList(listItem.id)}
                  className="text-red-500 hover:text-red-600 p-2 rounded-full bg-gray-200 hover:bg-gray-300 focus:outline-none focus:bg-gray-300"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
          <div className="text-center text-gray-500 mt-4">
            Developed by Abdullah Siraj
          </div>
        </div>
      </div>
      <div className="text-center text-gray-500">&copy; 2024</div>
    </main>
  );
}
