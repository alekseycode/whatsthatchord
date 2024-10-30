const BlackKey = ({ note }) => {
  return (
    <div className="flex justify-center items-end bg-black lg:h-[18vh] h-[10vh] w-[4vw] lg:w-[3vw] cursor-pointer hover:bg-gray-800">
      <div className="lg:mb-6 mb-4 text-xl text-gray-200">{note}</div>
    </div>
  );
};

export default BlackKey;
