const UserChat = ({ data }: { data: string[] }) => {
  return (
    <>
      {data.map((element, index) => (
        <div
          className="grid grid-cols-3 max-w-[400px] mt-2 grid-flow-row "
          key={index}
        >
          <div className="border-2 border-[#3cbac1] p-4 text-[#7ee4ef] font-sans col-start-2  col-span-2 mt-4">
            {element}
          </div>
          <div className="col-start-2 col-span-2 text-[8px] font-bold text-yellow-800 ms-auto">
            17/07/2024 05:70 AM
          </div>
        </div>
      ))}
    </>
  );
};

export default UserChat;
