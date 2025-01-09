import { useEffect, useState } from "react";
import {
  notes,
  noteNames,
  chordTypes,
  extensions,
} from "../note-names/note-names";
import { detectChord } from "../chords/chords";
import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";

const Keyboard = () => {
  const [clickedKeys, setClickedKeys] = useState({});
  const [chord, setChord] = useState("");
  const [selectedChord, setSelectedChord] = useState({
    noteName: "",
    chordType: "",
    extension: "",
  });

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
      setSelectedChord({
        noteName: "",
        chordType: "",
        extension: "",
      });
    }
  };

  const handleReset = () => {
    setClickedKeys({});
    setChord("");
    setSelectedChord({
      noteName: "",
      chordType: "",
      extension: "",
    });
  };

  const handleNoteSelect = (event) => {
    const noteName = event.target.value;
    setSelectedChord((prevChord) => ({ ...prevChord, noteName }));
  };

  const handleChordTypeSelect = (event) => {
    const chordType = event.target.value;
    setSelectedChord((prevChord) => ({ ...prevChord, chordType }));
  };

  const handleExtensionSelect = (event) => {
    const extension = event.target.value;
    setSelectedChord((prevChord) => ({ ...prevChord, extension }));
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
      <div className="mb-5">{chord}</div>
      <div className="flex items-center space-x-5">
        <div>
          <label htmlFor="note-select" className="mr-2">
            Note:
          </label>
          <select
            id="note-select"
            value={selectedChord.noteName}
            onChange={handleNoteSelect}
            className="px-2 py-1 border border-gray-400 rounded-md"
          >
            <option value={""}></option>
            {noteNames.map((noteName) => (
              <option key={noteName} value={noteName}>
                {noteName.replace("s", "#")}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="chord-type" className="mr-2">
            Chord type:
          </label>
          <select
            id="chord-type"
            value={selectedChord.chordType}
            onChange={handleChordTypeSelect}
            className="px-2 py-1 border border-gray-400 rounded-md"
          >
            <option value=""></option>
            {chordTypes.map((chordType) => (
              <option key={chordType} value={chordType}>
                {chordType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="extension" className="mr-2">
            Extension:
          </label>
          <select
            id="extension"
            value={selectedChord.extension}
            onChange={handleExtensionSelect}
            className="px-2 py-1 border border-gray-400 rounded-md"
          >
            <option value=""></option>
            {extensions.map((extension) => (
              <option key={extension} value={extension}>
                {extension}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Keyboard;
