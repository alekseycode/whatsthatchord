const WhiteKey = ({ note }) => {
  return (
    <>
      <div className="flex justify-center items-end border border-l-transparent border-y-transparent border-r-gray-400 lg:h-[30vh] h-[18vh] w-[8vw] lg:w-[5vw] cursor-pointer hover:bg-gray-100">
        <div className="lg:mb-6 mb-4 text-2xl text-gray-600">{note}</div>
      </div>
    </>
  );
};

export default WhiteKey;
