import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";

const Keyboard = () => {
  const notes = [
    {
      whiteNote: "C",
      BlackNote: "C#",
    },
    {
      whiteNote: "D",
      BlackNote: "D#",
    },
    {
      whiteNote: "E",
      BlackNote: "",
    },
    {
      whiteNote: "F",
      BlackNote: "F#",
    },
    {
      whiteNote: "G",
      BlackNote: "G#",
    },
    {
      whiteNote: "A",
      BlackNote: "A#",
    },
    {
      whiteNote: "B",
      BlackNote: "",
    },
  ];

  return (
    <>
      <div className="flex border border-gray-400">
        {notes.map((note) => (
          <div key={note.whiteNote + "-set1"} className="relative inline-block">
            <div>
              <WhiteKey note={note.whiteNote} />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey note={note.BlackNote} />
              </div>
            )}
          </div>
        ))}
        {notes.map((note) => (
          <div key={note.whiteNote + "-set2"} className="relative inline-block">
            <div>
              <WhiteKey note={note.whiteNote} />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey note={note.BlackNote} />
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
