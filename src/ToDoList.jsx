import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrash,
  faCheckCircle,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";

export const ToDoList = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  // Add new item to the list
  const addItem = () => {
    if (newItem.trim() === "") return;
    setItems([...items, { id: uuidv4(), text: newItem, completed: false }]);
    setNewItem("");
  };

  // Remove an item from the list by id
  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Start editing an item
  const startEditing = (index) => {
    setEditIndex(index);
    setEditValue(items[index].text);
  };

  // Save the edited item
  const saveEdit = () => {
    setItems(
      items.map((item, index) =>
        index === editIndex ? { ...item, text: editValue } : item
      )
    );
    setEditIndex(null);
    setEditValue("");
  };

  // Toggle the completion status of an item
  const toggleComplete = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ color: "#333", textAlign: "center", marginBottom: "20px" }}>
        To Do List
      </h1>
      <div style={{ display: "flex", marginBottom: "20px" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add Task"
          style={{
            flex: "1",
            padding: "10px",
            borderRadius: "4px",
            border: "1px solid #ddd",
            marginRight: "10px",
          }}
        />
        <button
          onClick={addItem}
          style={{
            padding: "10px 20px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#007bff",
            color: "#fff",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Add Task
        </button>
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {items.map((item, index) => (
          <li
            key={item.id}
            style={{
              display: "flex",
              alignItems: "center",
              padding: "10px",
              borderBottom: "1px solid #ddd",
              backgroundColor: item.completed ? "#e0f7fa" : "#fff",
              borderRadius: "4px",
              marginBottom: "10px",
            }}
          >
            <FontAwesomeIcon
              icon={item.completed ? faCheckCircle : faCircle}
              onClick={() => toggleComplete(item.id)}
              style={{
                marginRight: "10px",
                cursor: "pointer",
                color: item.completed ? "#007bff" : "#bbb",
              }}
            />
            {editIndex === index ? (
              <>
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  style={{
                    flex: "1",
                    padding: "5px",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  onClick={saveEdit}
                  style={{
                    marginLeft: "10px",
                    padding: "5px 10px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor: "#28a745",
                    color: "#fff",
                    cursor: "pointer",
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span style={{ flex: "1" }}>{item.text}</span>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => startEditing(index)}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "#ffc107",
                  }}
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => removeItem(item.id)}
                  style={{
                    marginLeft: "10px",
                    cursor: "pointer",
                    color: "#dc3545",
                  }}
                />
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
