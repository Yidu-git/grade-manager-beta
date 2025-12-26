import { useAuth } from "../../Hooks/Context/useAuth.jsx";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Notes.css";
import useAxiosPrivate from "../../Hooks/State/useAxiosPrivate.js";

export const NotesPage = () => {
  const { auth } = useAuth();
  const [refreshState, setRefreshState] = useState(false);
  const [includePublicNotes, setIncludePublicNotes] = useState(false);
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [noteError, setNoteError] = useState(null);
  const [note, setNote] = useState({
    title: "",
    note: "",
    category: null,
    Private: true,
    userID: auth.user ? auth.user.id : null,
    userName: auth.user ? auth.user.username : null,
    description: "",
    tags: [],
  });
  const apiPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getNotes = async () => {
      try {
        const response = await apiPrivate
          .get(`/notes/${includePublicNotes ? "all" : "profile"}/10`, {
            signal: controller.signal,
          })
          .then((res) => {
            return res;
          });
        setNotes(response.data);
        console.log(response);
      } catch (error) {
        console.error("Error while fetching notes:", error);
      }
    };

    getNotes();
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // };
  }, [refreshState]);

  const postNote = async () => {
    try {
      const response = await apiPrivate.post("/notes/post", note);
      return response;
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  const deleteNote = async (id) => {
    {
      try {
        const response = await apiPrivate.delete(`/notes/${id}`);
        console.log("Note deleted:", response.data);
        setRefreshState((prev) => !prev);
      } catch (error) {
        console.error("Error deleting note:", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await postNote();
      console.log("Note created:", response.data);
      setRefreshState((prev) => !prev);
      //   setNotes((prev) => [...prev, response.data]);
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
      <Link to="/">Home</Link>
      <h2>
        Welcome to notes{auth?.user ? " " + auth?.user?.displayname : ""}!
      </h2>
      <input
        type="checkbox"
        onChange={(e) => setIncludePublicNotes(e.target.checked)}
      />
      <label>View notes from other users</label>
      <div className="notes-container">
        {notes?.length > 0 ? (
          notes.map((note) => (
            <div key={note.id} className="note-card">
              <div>
                <h3>{note.title}</h3>
                <p>Created by {note.UserName}</p>
              </div>
              <p>{note.note}</p>
              {auth.user?.username === note.UserName ? (
                <button onClick={() => deleteNote(note.id)}>delete</button>
              ) : null}
            </div>
          ))
        ) : (
          <p>No notes to display yet!</p>
        )}

        <button onClick={() => setRefreshState((prev) => !prev)}>
          Refresh
        </button>
      </div>

      <form onSubmit={handleSubmit} className="note-form">
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
          placeholder="Catagory"
          onChange={(e) =>
            setNote((prev) => ({ ...prev, catagory: e.target.value }))
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
  );
};
