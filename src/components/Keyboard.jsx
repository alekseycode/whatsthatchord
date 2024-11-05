import { useEffect, useState } from "react";
import { notes } from "../../public/note-names/note-names";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";

const Keyboard = () => {
  const [clickedKeys, setClickedKeys] = useState({});

  const handleKeyClick = (note) => {
    setClickedKeys((prevKeys) => ({
      ...prevKeys,
      [note]: !prevKeys[note],
    }));
  };

  useEffect(() => {
    window.addEventListener("contextmenu", handleRightClickAnywhere);

    return () => {
      window.removeEventListener("contextmenu", handleRightClickAnywhere);
    };
  }, []);

  const handleRightClickAnywhere = (event) => {
    event.preventDefault();
    setClickedKeys({});
  };

  return (
    <>
      <div className="flex border border-gray-400">
        {notes.map((note) => (
          <div key={note.WhiteNote + "-set1"} className="relative inline-block">
            <div>
              <WhiteKey
                note={note.WhiteNote}
                octive={"3"}
                isClicked={!!clickedKeys[note.WhiteNote + "3"]}
                onClick={() => handleKeyClick(note.WhiteNote + "3")}
              />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey
                  note={note.BlackNote}
                  octive={"3"}
                  isClicked={!!clickedKeys[note.BlackNote + "3"]}
                  onClick={() => handleKeyClick(note.BlackNote + "3")}
                />
              </div>
            )}
          </div>
        ))}
        {notes.map((note) => (
          <div key={note.WhiteNote + "-set2"} className="relative inline-block">
            <div>
              <WhiteKey
                note={note.WhiteNote}
                octive={"4"}
                isClicked={!!clickedKeys[note.WhiteNote + "4"]}
                onClick={() => handleKeyClick(note.WhiteNote + "4")}
              />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey
                  note={note.BlackNote}
                  octive={"4"}
                  isClicked={!!clickedKeys[note.BlackNote + "4"]}
                  onClick={() => handleKeyClick(note.BlackNote + "4")}
                />
              </div>
            )}
          </div>
        ))}
      </div>
      <div></div>
    </>
  );
};

export default Keyboard;
