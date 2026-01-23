import "./Notes.css";
import { useEffect, useState } from "react";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../Components/Loading/Loading";
import { useAuth } from "../../Context/useAuth";

const NotesPage = () => {
  const { auth } = useAuth();
  const api = useAxiosPrivate();
  const nav = useNavigate();

  const [note, setNote] = useState({
    UserName: auth?.user?.username,
    title: "",
    note: "",
    category: "",
    tags: [""],
    Private: false,
  });
  const testNotes = [
    {
      UserID: auth?.user?.id || "",
      UserName: auth?.user?.username,
      title: "Title",
      note: "Contents this is a note",
      category: "test",
      tags: ["Test", "Temporary"],
      Private: false,
    },
  ];
  const [notes, setNotes] = useState(testNotes);
  const [currentNote, setcurrentNote] = useState(testNotes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [viewPublic, setViewPublic] = useState(false);
  const [viewMode, setViewMode] = useState(true);
  const [selection, setSelectoin] = useState([]);

  const createNote = async () => {
    try {
      const TestNote = testNotes[0];
      console.log(auth);
      const res = await api.post("/notes/post", note).then((res) => {
        return res;
      });
      setRefresh((prev) => !prev);
      // console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const editNote = async (id) => {
    try {
      const res = await api.post(`/notes/edit/${id}`, note).then((res) => {
        return res;
      });
      setRefresh((prev) => !prev);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

  const submit = async () => {
    if (selection.length === 0) {
      await createNote();
    } else if (selection.length === 1) {
      await editNote(selection[0]);
    }
  };

  const deleteNote = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setRefresh((prev) => !prev);
    } catch (error) {
      console.error(error);
    }
  };

  const handleNoteClick = (e, i) => {
    if (selection.includes(i)) {
      setSelectoin([]);
    } else {
      setSelectoin([i]);
      setNote(notes.find((note) => note.id === i));
      console.log(note);
    }
    console.log(i);
    console.log(selection);
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await api
          .get(`/notes/${viewPublic ? "all" : "profile"}/20`, {
            signal: controller.signal,
          })
          .then((res) => {
            return res;
          });
        setNotes(response.data);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        isMounted = false;
      }
    };

    getNotes();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [refresh, viewPublic]);

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getNotes = async () => {
      try {
        const response = await api
          .get(`/notes/search/${searchTerm}`)
          .then((res) => {
            return res;
          });
        // console.log(response);
        setNotes(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    searchTerm !== "" ? getNotes() : setRefresh((prev) => !prev);
    return () => {
      isMounted = false;
    };
  }, [searchTerm]);

  return (
    <>
      <div className="notes-dashboard">
        {isLoading ? <LoadingComponent /> : <></>}
        <div className="notes-controlls">
          <h3>Notes</h3>
          <div className="controlls">
            <div className="switch-container switch-small">
              <input
                type="checkbox"
                id="view-mode"
                onChange={(e) => {
                  setViewMode(e.target.checked);
                }}
                checked={viewMode}
              />
              <label className="switch" htmlFor="view-mode"></label>
              <p>View mode</p>
            </div>
            <div className="switch-container switch-small">
              <input
                type="checkbox"
                id="view-public"
                onChange={(e) => {
                  setViewPublic(e.target.checked);
                }}
              />
              <label className="switch" htmlFor="view-public"></label>
              <p>View public</p>
            </div>
            <button onClick={submit}> + </button>
          </div>
        </div>
        <div className="notes-container">
          <div className="notes-search">
            <input
              type="text"
              placeholder="Search"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                // console.log(searchTerm);
              }}
            />
            {notes.map((note, i) => {
              const Delete = async () => {
                console.log("delete attempt" + note.id);
                await deleteNote(note.id);
              };
              // console.log("n");
              // console.log(selection.includes(note.id));
              return (
                <div
                  className={`note ${
                    selection.includes(note.id) ? "selected" : ""
                  }`}
                  key={i}
                  onClick={(e) => handleNoteClick(e, note.id)}
                >
                  <div className="note-head">
                    <h2>{note.title}</h2>
                    <p>
                      {note.UserName === auth?.user?.name
                        ? note.UserName
                        : note.Private
                        ? "Private"
                        : "Public"}
                    </p>
                    <p onClick={Delete}>delete</p>
                  </div>
                  <div className="note-content">
                    <p>
                      {note.note.length > 25
                        ? String(note.note).substring(0, 25) + "..."
                        : note.note}
                    </p>
                  </div>
                  <div className="tags">
                    {note.tags.slice(0, 3).map((tag, i) => {
                      return <p className="tag">{tag}</p>;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
          {viewMode ? (
            <div className="note-current">Currently under development</div>
          ) : (
            <div className="note-current">
              {/* <input type="text" value={currentNote.title} /> */}
              <input
                type="text"
                className="note-edit-title"
                value={note.title}
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <div className="note-extra-options">
                <div className="switch-container switch-small">
                  <input
                    type="checkbox"
                    id="Private"
                    onChange={(e) => {
                      setNote((prev) => ({
                        ...prev,
                        Private: e.target.checked,
                      }));
                    }}
                    checked={note.Private}
                  />
                  <label className="switch" htmlFor="Private"></label>
                  <p>Private</p>
                </div>
                <input
                  type="text"
                  placeholder="Tags (separate by ',')"
                  onChange={(e) => {
                    const tags = e.target.value.split(",");
                    setNote((prev) => ({ ...prev, tags: tags }));
                  }}
                  value={note.tags.join(",")}
                />
                <input
                  type="text"
                  placeholder="Category"
                  onChange={(e) => {
                    setNote((prev) => ({ ...prev, category: e.target.value }));
                  }}
                />
              </div>
              <textarea
                value={note.note}
                onChange={(e) =>
                  setNote((prev) => ({ ...prev, note: e.target.value }))
                }
                className="note-Note"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default NotesPage;
