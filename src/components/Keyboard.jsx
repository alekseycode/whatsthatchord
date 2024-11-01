import BlackKey from "./BlackKey";
import WhiteKey from "./WhiteKey";

const Keyboard = () => {
  const notes = [
    {
      whiteNote: "C",
      BlackNote: "Cs",
    },
    {
      whiteNote: "D",
      BlackNote: "Ds",
    },
    {
      whiteNote: "E",
      BlackNote: "",
    },
    {
      whiteNote: "F",
      BlackNote: "Fs",
    },
    {
      whiteNote: "G",
      BlackNote: "Gs",
    },
    {
      whiteNote: "A",
      BlackNote: "As",
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
              <WhiteKey note={note.whiteNote} octive={"3"} />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey note={note.BlackNote} octive={"3"} />
              </div>
            )}
          </div>
        ))}
        {notes.map((note) => (
          <div key={note.whiteNote + "-set2"} className="relative inline-block">
            <div>
              <WhiteKey note={note.whiteNote} octive={"4"} />
            </div>
            {note.BlackNote && (
              <div className="absolute top-0 left-[70%] z-10">
                <BlackKey note={note.BlackNote} octive={"4"} />
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
