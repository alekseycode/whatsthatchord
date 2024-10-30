import { useState } from "react";

const WhiteKey = ({ note }) => {
  const [toggleClick, setToggleClick] = useState(false);

  const handleButtonClick = () => {
    setToggleClick(!toggleClick);
  };

  const clicked = "bg-lime-100";
  return (
    <div className={toggleClick ? clicked : "hover:bg-gray-100"}>
      <div
        className="flex justify-center items-end border border-l-transparent border-y-transparent border-r-gray-400 lg:h-[30vh] h-[18vh] w-[8vw] lg:w-[5vw] cursor-pointer "
        onClick={handleButtonClick}
      >
        <div className="lg:mb-6 mb-4 text-2xl text-gray-600">{note}</div>
      </div>
    </div>
  );
};

export default WhiteKey;
