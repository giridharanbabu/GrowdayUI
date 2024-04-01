import React from "react";

const EmptyData = ({ title, onClick, disable }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-[8%] m-5 p-20 border-dashed rounded-md border-lightborder dark:border-darkborder border-[4px]">
      <h2 className="mb-5 font-light text-xl">
        You don&apos;t have any {title} created yet
      </h2>
      <button
        disabled={disable}
        onClick={onClick}
        className="bg-addNewBtn disabled:bg-gray-400 text-white px-4 py-2 rounded "
      >
        Create New {title}
      </button>
    </div>
  );
};

export default EmptyData;
