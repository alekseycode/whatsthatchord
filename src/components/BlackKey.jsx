const BlackKey = ({ note, octive, isClicked, onClick }) => {
  const audio = new Audio(`/sounds/notes/${note}${octive}.mp3`);

  return (
    <div
      className={`${isClicked && "bg-lime-100"}`}
      onClick={() => {
        onClick();
        if (!isClicked) {
          audio.currentTime = 0;
          audio.play();
        }
      }}
    >
      <div
        className={`flex justify-center items-end bg-black lg:h-[18vh] h-[10vh] w-[4vw] lg:w-[3vw] cursor-pointer
          ${isClicked ? "bg-opacity-20" : "hover:bg-gray-800"}`}
      >
        <div className="lg:mb-6 mb-4 text-xl text-gray-200">
          {note.replace("s", "#")}
        </div>
      </div>
    </div>
  );
};

export default BlackKey;
