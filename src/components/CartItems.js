import React from "react";
import { img_cdn_path } from "../confiq";
import { useDispatch } from "react-redux";
import { removeItems } from "../utils/cartSlice";

const CartItems = ({ item }) => {
  const dispatch = useDispatch();
  const deleteCartItem = (id) => {
    dispatch(removeItems(id));
  };

  return (
    <div
      className="flex justify-between items-center p-6 border my-3 border-slate-300 rounded-md"
      key={item?.id}
    >
      <div className="flex items-center">
        <img
          className="w-[130px] mx-2 bg-contain shadow-lg"
          src={img_cdn_path + item?.imageId}
          alt="food-image"
        />
        <div className="ml-8 text-base font-medium text-slate-700">
          <h2 className="text-xl font-semibold line-clamp-1 text-[#60b246]">
            {item?.name}
          </h2>
          <h2 className="font-semibold text-neutral-500">
            Category : {item?.category}
          </h2>
          <h6 className="font-semibold text-sm line-clamp-2 text-slate-600 pr-2">
            Description : {item?.description}
          </h6>
          <h6 className="inline font-semibold">
            InStock - {item?.inStock == 1 ? "Yes" : "No"}
          </h6>
          <h6 className="inline mx-4 font-semibold">
            Price -{" ₹"}
            {item?.price / 100 ? item?.price / 100 : "402"}
          </h6>
        </div>
      </div>
      <button
        className="bg-[#60b246] p-2 mr-6 text-white hover:shadow-md"
        onClick={() => deleteCartItem(item?.id)}
      >
        Remove
      </button>
    </div>
  );
};

export default CartItems;
