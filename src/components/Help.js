import { useState } from "react";
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import { faqs } from "../confiq";

const SectionTile = ({ title, descp, visible, setVisible, ids }) => {
  return (
    <>
      <div className="py-6 border-b border-gray-400">
        <div
          onClick={() => setVisible({ id: ids, status: !visible })}
          className="flex justify-between items-center pr-8 text-slate-500 ease-in duration-300 hover:text-rose-600 hover:cursor-pointer"
        >
          <h2 className="text-sm sm:text-lg">{title}</h2>

          {visible ? (
            <SlArrowUp className="text-sm sm:text-lg" />
          ) : (
            <SlArrowDown className="text-sm sm:text-lg" />
          )}
        </div>
        {visible && (
          <p className="text-gray-500 text-xs sm:text-sm mt-2 mr-4 sm:mr-12">
            {descp}
          </p>
        )}
      </div>
    </>
  );
};

const Help = () => {
  const [isVisisble, setisVisisble] = useState({
    id: 0,
    status: false,
  });
  return (
    <>
      <div className="bg-gradient-to-r from-[#0BAB64] to-[#3BB78F] min-h-[500px] p-6 sm:p-12">
        <div className="sm:mx-8">
          <div className="sm:mx-6 my-4 mb-6 text-white">
            <h1 className="text-2xl sm:text-3xl font-bold">Help & Support</h1>
            <h4 className="text-sm sm:text-base">
              Let's take a step ahead and help you better.
            </h4>
          </div>
          <div className="bg-slate-100 min-h-[300px] p-8 shadow-lg shadow-gray-600">
            <h2 className="text-xl sm:text-2xl font-bold">FAQs</h2>
            {faqs.map((item) => {
              return (
                <SectionTile
                  title={item.title}
                  descp={item.descriptions}
                  key={item.id}
                  ids={item.id}
                  visible={isVisisble.status && isVisisble.id === item.id}
                  setVisible={(obj) => setisVisisble(obj)}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Help;
