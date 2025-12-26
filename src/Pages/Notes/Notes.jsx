import { useAuth } from "../../Hooks/Context/useAuth.jsx";
import { useState, useEffect } from "react";
import { api } from "../../API/axios.js";
import { Link } from "react-router-dom";
import "./Notes.css";
import useAxiosPrivate from "../../Hooks/State/useAxiosPrivate.js";

export const NotesPage = () => {
  const { auth } = useAuth();
  const [notes, setNotes] = useState([]);
  const [note, setNote] = useState({
    title: "",
    note: "",
    catagory: null,
    Private: true,
    userID: auth.user ? auth.user.id : null,
    description: "",
    tags: [],
  });

  const apiPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(true);
  const [noteError, setNoteError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiPrivate.post("/notes", note);
      setNotes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error creating note:", error);
      setNoteError(error.message);
    }
  };

  if (!auth.user) {
    return (
      <div>
        <h1>Notes Page</h1>
        <p>You must be logged in to view this page.</p>
        <Link to="/login">Login</Link>
      </div>
    );
  }
  return (
    <div>
      <h1>Notes Page</h1>
      <h2>
        Welcome to notes{auth?.user ? " " + auth?.user?.displayname : ""}!
      </h2>
      <div className="notes-container">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <h3>{note.title}</h3>
              <p>{note.content}</p>
            </div>
          ))
        ) : (
          <p>No notes to display yet!</p>
        )}

        <button>Get notes</button>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Description"
            onChange={(e) =>
              setNote((prev) => ({ ...prev, description: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Content"
            onChange={(e) =>
              setNote((prev) => ({ ...prev, note: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="Title"
            onChange={(e) =>
              setNote((prev) => ({ ...prev, title: e.target.value }))
            }
          />
          <input
            type="text"
            placeholder="tags"
            onChange={(e) =>
              setNote((prev) => ({ ...prev, tags: e.target.value.split(",") }))
            }
          />
          <div>
            <input
              type="checkbox"
              onChange={(e) => {
                setNote((prev) => ({ ...prev, Private: e.target.checked }));
                console.log(note.Private);
              }}
            />
            {/* {note.Private ? "Private" : "Public"} */}
            <label>Private</label>
          </div>
          <button type="submit">Create Note</button>
        </form>
      </div>
    </div>
  );
};
