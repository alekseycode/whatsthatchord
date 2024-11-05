const WhiteKey = ({ note, octive, isClicked, onClick }) => {
  const audio = new Audio(`/sounds/notes/${note}${octive}.mp3`);

  const clicked = "bg-lime-100";
  return (
    <div className={isClicked ? clicked : "hover:bg-gray-100"}>
      <div
        className="flex justify-center items-end border border-l-transparent border-y-transparent border-r-gray-400 lg:h-[30vh] h-[18vh] w-[8vw] lg:w-[5vw] cursor-pointer "
        onClick={() => {
          onClick();
          if (!isClicked) {
            audio.currentTime = 0;
            audio.play();
          }
        }}
      >
        <div className="lg:mb-6 mb-4 text-2xl text-gray-600">{note}</div>
      </div>
    </div>
  );
};

export default WhiteKey;
