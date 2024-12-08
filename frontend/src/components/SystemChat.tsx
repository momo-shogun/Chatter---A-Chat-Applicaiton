const SystemChat = ({ data }: { data: string[] }) => {
  return (
    <>
      {data.map((element, index) => {
        return (
          <div
            className="grid grid-cols-3 max-w-[400px] mt-2 grid-flow-row "
            key={index}
          >
            <div className="border-2 border-yellow-400 p-4 text-yellow-300 font-sans max-w-[450px] col-span-2">
              {element}
            </div>

            <div className="col-span-2 ms-auto text-[8px] font-bold text-yellow-800">
              17/07/2024 05:70 AM
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SystemChat;
