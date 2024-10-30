import { useState } from "react";

const BlackKey = ({ note }) => {
  const [toggleClick, setToggleClick] = useState(false);

  const handleButtonClick = () => {
    setToggleClick(!toggleClick);
  };

  return (
    <div
      className={`${toggleClick && "bg-lime-100"}`}
      onClick={handleButtonClick}
    >
      <div
        className={`flex justify-center items-end bg-black lg:h-[18vh] h-[10vh] w-[4vw] lg:w-[3vw] cursor-pointer
          ${!toggleClick ? "hover:bg-gray-800" : "bg-opacity-20"}`}
      >
        <div className="lg:mb-6 mb-4 text-xl text-gray-200">{note}</div>
      </div>
    </div>
  );
};

export default BlackKey;
