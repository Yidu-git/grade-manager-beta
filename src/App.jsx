import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [note, setNote] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [notes, setNotes] = useState([
    { id: 1, title: "Sample Note", note: "This is a sample note." },
  ]);

  // URLS
  const baseURL = "https://decomposed-unshepherding-vilma.ngrok-free.dev";

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${baseURL}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          title: noteTitle,
          note: note,
        }),
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getNotes = async () => {
    const res = await fetch(`${baseURL}/notes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
    const data = await res.json();
    console.log(data);
    console.log(res);
    setNotes(data);
  };

  useEffect(() => {
    getNotes();
  }, []);

  fetch("https://decomposed-unshepherding-vilma.ngrok-free.dev/notes", {
    method: "OPTIONS",
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  })
    .then((r) => console.log(r))
    .catch((e) => console.log(e));

  return (
    <>
      <div>
        <p>Simple notes</p>
        <p>This is just a test</p>
        <div>
          <form onSubmit={submit}>
            <input
              type="text"
              placeholder="Note Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <br />
            <textarea
              placeholder="Write your notes here..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
            <br />
            <button type="submit">Add Note</button>
          </form>
          <button onClick={getNotes}>View notes</button>
          <div id="Notes">
            {notes.map((note) => (
              <div key={note.id}>
                <h3>{note.title}</h3>
                <p>{note.note}</p>
                <hr />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
