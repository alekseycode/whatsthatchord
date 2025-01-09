import { useEffect, useState } from "react";
import { notes } from "../note-names/note-names";
import { detectChord } from "../chords/chords";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";

const Keyboard = () => {
  const [clickedKeys, setClickedKeys] = useState({});
  const [chord, setChord] = useState("");

  const handleKeyClick = (note) => {
    setClickedKeys((prevKeys) => {
      const updatedKeys = { ...prevKeys, [note]: !prevKeys[note] };

      const activeNotes = Object.keys(updatedKeys).filter(
        (key) => updatedKeys[key]
      );

      const generatedChord = detectChord(activeNotes);
      setChord(generatedChord);

      return updatedKeys;
    });
  };

  useEffect(() => {
    window.addEventListener("keydown", handleRPress);

    return () => {
      window.removeEventListener("keydown", handleRPress);
    };
  }, []);

  const handleRPress = (event) => {
    if (event.key === "r") {
      event.preventDefault();
      setClickedKeys({});
      setChord("");
    }
  };

  const handleReset = () => {
    setClickedKeys({});
    setChord("");
  };

  return (
    <div className="flex flex-col flex-center items-center">
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
      <div className="flex w-full mt-5 mb-10" onClick={handleReset}>
        <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
          Reset
        </button>
      </div>
      <div>{chord}</div>
    </div>
  );
};

export default Keyboard;
